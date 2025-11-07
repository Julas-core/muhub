-- Create material_reports table for flagging inappropriate materials
CREATE TABLE public.material_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  reporter_user_id UUID NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('wrong_content', 'spam', 'copyright_violation', 'inappropriate', 'other')),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.material_reports ENABLE ROW LEVEL SECURITY;

-- Users can create their own reports
CREATE POLICY "Users can create reports"
ON public.material_reports
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = reporter_user_id);

-- Users can view their own reports
CREATE POLICY "Users can view own reports"
ON public.material_reports
FOR SELECT
TO authenticated
USING (auth.uid() = reporter_user_id);

-- Admins can view all reports
CREATE POLICY "Admins can view all reports"
ON public.material_reports
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update reports
CREATE POLICY "Admins can update reports"
ON public.material_reports
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_material_reports_material_id ON public.material_reports(material_id);
CREATE INDEX idx_material_reports_status ON public.material_reports(status);