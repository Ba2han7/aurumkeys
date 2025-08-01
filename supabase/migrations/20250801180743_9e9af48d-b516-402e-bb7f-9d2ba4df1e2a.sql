-- Create a test admin user
-- This will create a profile and assign admin role
-- Email: admin@aurum.com, Password: admin123

DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Insert a test user profile (simulating a signed-up admin)
    INSERT INTO public.profiles (
        user_id, 
        display_name, 
        first_name, 
        last_name, 
        role
    ) VALUES (
        '00000000-0000-0000-0000-000000000001'::uuid,
        'Admin User',
        'Admin',
        'User', 
        'customer'
    ) ON CONFLICT (user_id) DO NOTHING;
    
    -- Assign admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
END $$;