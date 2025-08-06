-- Fix critical security vulnerabilities

-- 1. Drop the existing permissive RLS policy on profiles that allows users to update their role
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- 2. Create a more restrictive policy that prevents role updates by regular users
-- Note: We need separate policies for different scenarios since OLD/NEW references only work in triggers
CREATE POLICY "Users can update their own profile (non-admin users)" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id AND NOT has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (auth.uid() = user_id AND role = (SELECT role FROM public.profiles WHERE user_id = auth.uid()));

-- 3. Allow admins to update any profile including roles
CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. Update database functions to use explicit search paths for security
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  order_num TEXT;
BEGIN
  SELECT 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || LPAD((
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 14) AS INTEGER)), 0) + 1
    FROM public.orders 
    WHERE order_number LIKE 'ORD-' || to_char(now(), 'YYYYMMDD') || '-%'
  )::TEXT, 4, '0') INTO order_num;
  
  RETURN order_num;
END;
$function$;

-- 5. Update the has_role function with explicit search path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- 6. Update the handle_new_user function with explicit search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, first_name, last_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    'customer'
  );
  
  -- Insert default customer role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$function$;