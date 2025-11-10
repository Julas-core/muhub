-- Add view_count column to materials table
ALTER TABLE public.materials 
ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0;

-- Create material_views table to track individual views
CREATE TABLE IF NOT EXISTS public.material_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  material_id uuid NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  viewer_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  viewed_at timestamp with time zone NOT NULL DEFAULT now(),
  ip_address text
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_material_views_material_id ON public.material_views(material_id);
CREATE INDEX IF NOT EXISTS idx_material_views_viewed_at ON public.material_views(viewed_at);

-- Enable RLS on material_views
ALTER TABLE public.material_views ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create view records (for analytics)
CREATE POLICY "Anyone can create view records"
ON public.material_views
FOR INSERT
WITH CHECK (true);

-- Policy: Only view own view history
CREATE POLICY "Users can view own view history"
ON public.material_views
FOR SELECT
USING (auth.uid() = viewer_user_id);

-- Create material_downloads table to track downloads
CREATE TABLE IF NOT EXISTS public.material_downloads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  material_id uuid NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  downloader_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  downloaded_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_material_downloads_material_id ON public.material_downloads(material_id);
CREATE INDEX IF NOT EXISTS idx_material_downloads_downloaded_at ON public.material_downloads(downloaded_at);

-- Enable RLS on material_downloads
ALTER TABLE public.material_downloads ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can create download records
CREATE POLICY "Authenticated users can track downloads"
ON public.material_downloads
FOR INSERT
WITH CHECK (auth.uid() = downloader_user_id);

-- Policy: Users can view own download history
CREATE POLICY "Users can view own downloads"
ON public.material_downloads
FOR SELECT
USING (auth.uid() = downloader_user_id);

-- Create function to track material view and increment counter
CREATE OR REPLACE FUNCTION public.track_material_view(
  p_material_id uuid,
  p_viewer_user_id uuid DEFAULT NULL,
  p_ip_address text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert view record
  INSERT INTO public.material_views (material_id, viewer_user_id, ip_address)
  VALUES (p_material_id, p_viewer_user_id, p_ip_address);
  
  -- Increment view count
  UPDATE public.materials
  SET view_count = view_count + 1
  WHERE id = p_material_id;
END;
$$;

-- Create trending_materials view with advanced scoring algorithm
CREATE OR REPLACE VIEW public.trending_materials AS
SELECT 
  m.*,
  -- Calculate trending score with time-weighted factors
  (
    -- Downloads in last 24h (3x weight)
    COALESCE((
      SELECT COUNT(*) * 10 * 3
      FROM public.material_downloads md
      WHERE md.material_id = m.id 
        AND md.downloaded_at > NOW() - INTERVAL '24 hours'
    ), 0) +
    
    -- Downloads in last 7 days (1x weight)
    COALESCE((
      SELECT COUNT(*) * 10
      FROM public.material_downloads md
      WHERE md.material_id = m.id 
        AND md.downloaded_at > NOW() - INTERVAL '7 days'
        AND md.downloaded_at <= NOW() - INTERVAL '24 hours'
    ), 0) +
    
    -- Views in last 24h (3x weight)
    COALESCE((
      SELECT COUNT(*) * 1 * 3
      FROM public.material_views mv
      WHERE mv.material_id = m.id 
        AND mv.viewed_at > NOW() - INTERVAL '24 hours'
    ), 0) +
    
    -- Views in last 7 days (1x weight)
    COALESCE((
      SELECT COUNT(*) * 1
      FROM public.material_views mv
      WHERE mv.material_id = m.id 
        AND mv.viewed_at > NOW() - INTERVAL '7 days'
        AND mv.viewed_at <= NOW() - INTERVAL '24 hours'
    ), 0) +
    
    -- Recent ratings (5 points per 4-5 star rating)
    COALESCE((
      SELECT COUNT(*) * 5
      FROM public.ratings r
      WHERE r.material_id = m.id 
        AND r.rating >= 4
        AND r.created_at > NOW() - INTERVAL '7 days'
    ), 0)
  ) AS trending_score
FROM public.materials m
WHERE m.created_at > NOW() - INTERVAL '30 days'
ORDER BY trending_score DESC;