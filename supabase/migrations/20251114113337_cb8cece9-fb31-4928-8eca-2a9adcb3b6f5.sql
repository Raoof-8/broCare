-- Update the is_staff_or_admin function to include all staff roles
CREATE OR REPLACE FUNCTION public.is_staff_or_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('staff', 'hod', 'admin', 'grc', 'warden', 'mentor', 'support')
  );
$$;