-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  complaint_id UUID REFERENCES public.complaints(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Create function to send notification on status change
CREATE OR REPLACE FUNCTION public.notify_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert notification for the complaint owner
  INSERT INTO public.notifications (user_id, complaint_id, type, title, message)
  VALUES (
    NEW.user_id,
    NEW.id,
    'status_change',
    'Complaint Status Updated',
    'Your complaint "' || NEW.title || '" status changed to ' || NEW.status
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for status changes
CREATE TRIGGER on_complaint_status_change
AFTER UPDATE OF status ON public.complaints
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION public.notify_status_change();