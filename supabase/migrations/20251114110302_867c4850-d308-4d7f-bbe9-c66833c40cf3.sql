-- Create enum for complaint departments
CREATE TYPE complaint_department AS ENUM (
  'HOD',
  'Mentor',
  'Hostel Warden',
  'Exam Cell',
  'Admin Office',
  'Placement Team',
  'Library',
  'Transport',
  'IT Support',
  'General'
);

-- Add department column to complaints table
ALTER TABLE complaints 
ADD COLUMN IF NOT EXISTS department complaint_department;