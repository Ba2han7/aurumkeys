-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role app_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  cost_price DECIMAL(10,2),
  category_id UUID REFERENCES public.categories(id),
  image_url TEXT,
  images TEXT[], -- Array of image URLs
  sku TEXT UNIQUE,
  inventory_quantity INTEGER NOT NULL DEFAULT 0,
  track_inventory BOOLEAN NOT NULL DEFAULT true,
  allow_backorder BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  weight DECIMAL(8,2),
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  
  -- Billing Address
  billing_first_name TEXT,
  billing_last_name TEXT,
  billing_company TEXT,
  billing_address_1 TEXT,
  billing_address_2 TEXT,
  billing_city TEXT,
  billing_state TEXT,
  billing_postal_code TEXT,
  billing_country TEXT,
  billing_phone TEXT,
  
  -- Shipping Address
  shipping_first_name TEXT,
  shipping_last_name TEXT,
  shipping_company TEXT,
  shipping_address_1 TEXT,
  shipping_address_2 TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_postal_code TEXT,
  shipping_country TEXT,
  shipping_phone TEXT,
  
  -- Payment info
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  stripe_payment_intent_id TEXT,
  
  notes TEXT,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Anyone can view categories"
  ON public.categories
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products"
  ON public.products
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all products"
  ON public.products
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage products"
  ON public.products
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders"
  ON public.orders
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for order_items
CREATE POLICY "Users can view their own order items"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders"
  ON public.order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all order items"
  ON public.order_items
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
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
$$;

-- Trigger to create profile automatically
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
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
$$;

-- Insert some sample categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Keyboards', 'keyboards', 'Digital and acoustic keyboards for all skill levels'),
  ('Guitars', 'guitars', 'Acoustic and electric guitars from top brands'),
  ('Drums', 'drums', 'Complete drum sets and individual pieces'),
  ('Violins', 'violins', 'Classical and electric violins for students and professionals'),
  ('Audio Equipment', 'audio', 'Professional audio recording and mixing equipment'),
  ('Accessories', 'accessories', 'Musical instrument accessories and parts');

-- Insert some sample products
INSERT INTO public.products (name, slug, description, price, category_id, image_url, inventory_quantity, is_active, is_featured) VALUES
  ('Premium Digital Keyboard', 'premium-digital-keyboard', 'Professional 88-key weighted digital keyboard with premium sound samples', 1299.99, (SELECT id FROM public.categories WHERE slug = 'keyboards'), '/src/assets/premium-keyboard.jpg', 15, true, true),
  ('Acoustic Guitar Pro', 'acoustic-guitar-pro', 'High-quality acoustic guitar perfect for professionals and advanced players', 899.99, (SELECT id FROM public.categories WHERE slug = 'guitars'), '/src/assets/hero-studio.jpg', 8, true, true),
  ('Professional Audio Interface', 'professional-audio-interface', 'Multi-channel audio interface for professional recording', 549.99, (SELECT id FROM public.categories WHERE slug = 'audio'), '/src/assets/audio-equipment.jpg', 12, true, true),
  ('Student Violin Set', 'student-violin-set', 'Complete violin set perfect for beginners and students', 299.99, (SELECT id FROM public.categories WHERE slug = 'violins'), '/src/assets/hero-studio.jpg', 20, true, false),
  ('Electronic Drum Kit', 'electronic-drum-kit', 'Full electronic drum kit with mesh heads and premium sounds', 1899.99, (SELECT id FROM public.categories WHERE slug = 'drums'), '/src/assets/audio-equipment.jpg', 5, true, true),
  ('Guitar Cable Premium', 'guitar-cable-premium', 'High-quality instrument cable for guitars and keyboards', 49.99, (SELECT id FROM public.categories WHERE slug = 'accessories'), '/src/assets/premium-keyboard.jpg', 50, true, false);