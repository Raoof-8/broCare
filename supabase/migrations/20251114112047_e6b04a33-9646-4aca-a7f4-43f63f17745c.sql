-- Add 'Escalated' to complaint_status enum
ALTER TYPE complaint_status ADD VALUE IF NOT EXISTS 'Escalated';