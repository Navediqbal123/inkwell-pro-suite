-- Assign admin role to specific email (navedahmad9012@gmail.com)
-- This will be triggered when the user signs up

-- Create a function to auto-assign admin role to specific email
CREATE OR REPLACE FUNCTION public.check_admin_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If the new user's email is the admin email, upgrade their role
  IF NEW.email = 'navedahmad9012@gmail.com' THEN
    UPDATE public.user_roles 
    SET role = 'admin'::app_role 
    WHERE user_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to run after profile is created
DROP TRIGGER IF EXISTS on_profile_created_check_admin ON public.profiles;
CREATE TRIGGER on_profile_created_check_admin
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_admin_email();