-- Create enums for type safety
CREATE TYPE public.app_role AS ENUM ('student', 'staff', 'hod', 'admin', 'grc');
CREATE TYPE public.complaint_category AS ENUM ('Academic', 'Hostel', 'Canteen', 'Harassment', 'Infrastructure', 'Other');
CREATE TYPE public.complaint_priority AS ENUM ('Low', 'Medium', 'High', 'Critical');
CREATE TYPE public.complaint_status AS ENUM ('Submitted', 'In Review', 'In Progress', 'Resolved', 'Closed');
CREATE TYPE public.file_type AS ENUM ('image', 'document', 'audio', 'video');
CREATE TYPE public.language_preference AS ENUM ('en', 'ml');

-- 1. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  language_preference language_preference DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. User Roles Table (CRITICAL: separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- 3. Complaints Table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category complaint_category NOT NULL,
  priority complaint_priority DEFAULT 'Medium',
  status complaint_status DEFAULT 'Submitted',
  is_anonymous BOOLEAN DEFAULT false,
  location TEXT,
  incident_date TIMESTAMPTZ,
  assigned_to UUID REFERENCES public.user_roles(id),
  escalated_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Complaint Evidence Table
CREATE TABLE public.complaint_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  file_type file_type NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Complaint Messages Table
CREATE TABLE public.complaint_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_staff BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Complaint Status History Table
CREATE TABLE public.complaint_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE NOT NULL,
  status complaint_status NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Feedback Ratings Table
CREATE TABLE public.feedback_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(complaint_id, user_id)
);

-- 8. Suggestions Table
CREATE TABLE public.suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

-- Security Definer Function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Security Definer Function to check if user is staff/admin/grc
CREATE OR REPLACE FUNCTION public.is_staff_or_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('staff', 'hod', 'admin', 'grc')
  );
$$;

-- RLS Policies for Profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Staff can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for User Roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for Complaints
CREATE POLICY "Students can view their own complaints"
  ON public.complaints FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Staff can view assigned complaints"
  ON public.complaints FOR SELECT
  USING (
    public.is_staff_or_admin(auth.uid()) OR
    auth.uid() = user_id
  );

CREATE POLICY "Students can insert their own complaints"
  ON public.complaints FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Staff can update assigned complaints"
  ON public.complaints FOR UPDATE
  USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for Complaint Evidence
CREATE POLICY "Users can view evidence for their complaints"
  ON public.complaint_evidence FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.complaints
      WHERE complaints.id = complaint_evidence.complaint_id
      AND (complaints.user_id = auth.uid() OR public.is_staff_or_admin(auth.uid()))
    )
  );

CREATE POLICY "Users can insert evidence for their complaints"
  ON public.complaint_evidence FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.complaints
      WHERE complaints.id = complaint_evidence.complaint_id
      AND complaints.user_id = auth.uid()
    )
  );

-- RLS Policies for Complaint Messages
CREATE POLICY "Users can view messages for their complaints"
  ON public.complaint_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.complaints
      WHERE complaints.id = complaint_messages.complaint_id
      AND (complaints.user_id = auth.uid() OR public.is_staff_or_admin(auth.uid()))
    )
  );

CREATE POLICY "Users can insert messages for their complaints"
  ON public.complaint_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.complaints
      WHERE complaints.id = complaint_messages.complaint_id
      AND (complaints.user_id = auth.uid() OR public.is_staff_or_admin(auth.uid()))
    )
  );

-- RLS Policies for Complaint Status History
CREATE POLICY "Users can view status history for their complaints"
  ON public.complaint_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.complaints
      WHERE complaints.id = complaint_status_history.complaint_id
      AND (complaints.user_id = auth.uid() OR public.is_staff_or_admin(auth.uid()))
    )
  );

-- RLS Policies for Feedback Ratings
CREATE POLICY "Users can view their own feedback"
  ON public.feedback_ratings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert feedback for their complaints"
  ON public.feedback_ratings FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.complaints
      WHERE complaints.id = feedback_ratings.complaint_id
      AND complaints.user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can view all feedback"
  ON public.feedback_ratings FOR SELECT
  USING (public.is_staff_or_admin(auth.uid()));

-- RLS Policies for Suggestions
CREATE POLICY "Users can view their own suggestions"
  ON public.suggestions FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert suggestions"
  ON public.suggestions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Staff can view all suggestions"
  ON public.suggestions FOR SELECT
  USING (public.is_staff_or_admin(auth.uid()));

-- Trigger: Auto-create profile and assign student role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, student_id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'student_id',
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger: Auto-insert status history on complaint status change
CREATE OR REPLACE FUNCTION public.track_complaint_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO public.complaint_status_history (complaint_id, status, changed_by)
    VALUES (NEW.id, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER track_status_changes
  AFTER UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.track_complaint_status_change();

-- Indexes for performance
CREATE INDEX idx_complaints_user_id ON public.complaints(user_id);
CREATE INDEX idx_complaints_status ON public.complaints(status);
CREATE INDEX idx_complaints_created_at ON public.complaints(created_at DESC);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_complaint_messages_complaint_id ON public.complaint_messages(complaint_id);
CREATE INDEX idx_complaint_status_history_complaint_id ON public.complaint_status_history(complaint_id);