/*
  # Create demo users for testing

  1. Demo Users
    - Admin user: admin@edumanager.com
    - Teacher user: teacher@edumanager.com  
    - Student user: student@edumanager.com

  2. Security
    - These are for demo purposes only
    - Passwords should be changed in production
*/

-- Insert demo users (these will be created through the auth system)
-- This migration creates the user profiles that will be linked when demo accounts are created

-- Note: The actual auth users need to be created through the Supabase Auth API
-- This migration just ensures the user profiles table is ready

-- Create a function to safely insert demo data
CREATE OR REPLACE FUNCTION create_demo_user_if_not_exists(
  user_email TEXT,
  user_name TEXT,
  user_role user_role
) RETURNS VOID AS $$
DECLARE
  demo_user_id UUID;
BEGIN
  -- Check if user already exists
  SELECT id INTO demo_user_id FROM auth.users WHERE email = user_email;
  
  IF demo_user_id IS NOT NULL THEN
    -- Insert into users table if not exists
    INSERT INTO users (id, full_name, email, role)
    VALUES (demo_user_id, user_name, user_email, user_role)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- This function will be called after demo auth users are created
-- For now, we'll just ensure the structure is ready