-- Add video_urls column to products table
ALTER TABLE public.products 
ADD COLUMN video_urls TEXT[];