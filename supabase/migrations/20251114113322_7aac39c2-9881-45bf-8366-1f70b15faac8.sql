-- Add new roles to app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'warden';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'mentor';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'support';