-- Add favorites table for wishlist functionality
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on favorites table
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for favorites
CREATE POLICY "Users can view their own favorites" 
ON public.favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their favorites" 
ON public.favorites 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their favorites" 
ON public.favorites 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add discount field to products table
ALTER TABLE public.products 
ADD COLUMN discount_percentage DECIMAL(5,2) DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100);

-- Create demo_videos table for admin video management
CREATE TABLE public.demo_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on demo_videos table
ALTER TABLE public.demo_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for demo_videos
CREATE POLICY "Anyone can view active demo videos" 
ON public.demo_videos 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage demo videos" 
ON public.demo_videos 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for demo_videos updated_at
CREATE TRIGGER update_demo_videos_updated_at
BEFORE UPDATE ON public.demo_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a default demo video
INSERT INTO public.demo_videos (title, video_url, description, is_active) 
VALUES (
  'Premium Music Equipment Demo',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'Discover our exclusive collection of premium keyboards, pianos, and professional audio equipment.',
  true
);