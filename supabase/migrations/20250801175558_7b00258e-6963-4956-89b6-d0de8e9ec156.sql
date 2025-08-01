-- Insert categories
INSERT INTO public.categories (name, slug, description, image_url) VALUES
('Keyboards & Pianos', 'keyboards', 'Premium weighted-key digital pianos and synthesizers', '/src/assets/yamaha-piano.jpg'),
('Guitars', 'guitars', 'Acoustic, electric, and bass guitars from renowned brands', '/src/assets/electric-guitar.jpg'),
('Drums & Percussion', 'drums', 'Complete drum sets and percussion instruments', '/src/assets/drum-kit.jpg'),
('Violins & Strings', 'violins', 'Professional violins, violas, and string instruments', '/src/assets/violin.jpg'),
('Audio Equipment', 'audio', 'Professional recording and mixing equipment', '/src/assets/studio-mic.jpg'),
('Accessories', 'accessories', 'Cases, stands, cables, and essential accessories', '/src/assets/premium-keyboard.jpg')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;

-- Get category IDs for foreign key references
DO $$
DECLARE
  keyboards_id uuid;
  guitars_id uuid;
  drums_id uuid;
  violins_id uuid;
  audio_id uuid;
  accessories_id uuid;
BEGIN
  SELECT id INTO keyboards_id FROM public.categories WHERE slug = 'keyboards';
  SELECT id INTO guitars_id FROM public.categories WHERE slug = 'guitars';
  SELECT id INTO drums_id FROM public.categories WHERE slug = 'drums';
  SELECT id INTO violins_id FROM public.categories WHERE slug = 'violins';
  SELECT id INTO audio_id FROM public.categories WHERE slug = 'audio';
  SELECT id INTO accessories_id FROM public.categories WHERE slug = 'accessories';

  -- Insert products
  INSERT INTO public.products (name, slug, description, price, compare_at_price, image_url, category_id, is_active, is_featured, inventory_quantity) VALUES
  -- Keyboards
  ('Steinway & Sons Digital Grand', 'steinway-digital-grand', 'Premium digital grand piano with authentic weighted keys and superior sound quality', 12999, 15999, '/src/assets/yamaha-piano.jpg', keyboards_id, true, true, 5),
  ('Roland Fantom-8 Workstation', 'roland-fantom-8', 'Professional 88-key synthesizer workstation with advanced sound engine', 3499, 3999, '/src/assets/synthesizer.jpg', keyboards_id, true, true, 8),
  ('Yamaha Montage M8x', 'yamaha-montage-m8x', '88-key flagship synthesizer with Motion Control technology', 4199, null, '/src/assets/yamaha-piano.jpg', keyboards_id, true, false, 3),
  ('Korg Kronos 2 88', 'korg-kronos-2-88', 'Music workstation with 9 sound engines and extensive sampling', 3599, 4199, '/src/assets/synthesizer.jpg', keyboards_id, true, false, 6),
  
  -- Guitars  
  ('Gibson Les Paul Standard', 'gibson-les-paul-standard', 'Iconic electric guitar with mahogany body and maple cap', 2799, 3199, '/src/assets/electric-guitar.jpg', guitars_id, true, true, 12),
  ('Fender American Professional II Stratocaster', 'fender-strat-pro-ii', 'Professional electric guitar with modern enhancements', 1949, 2299, '/src/assets/electric-guitar.jpg', guitars_id, true, false, 15),
  ('Taylor 814ce Grand Auditorium', 'taylor-814ce-grand', 'Premium acoustic-electric guitar with sitka spruce top', 4299, null, '/src/assets/electric-guitar.jpg', guitars_id, true, true, 7),
  
  -- Drums
  ('DW Collectors Series 5-Piece Kit', 'dw-collectors-5pc', 'Professional drum kit with maple shells and chrome hardware', 3899, 4499, '/src/assets/drum-kit.jpg', drums_id, true, false, 4),
  ('Pearl Masters Maple Complete', 'pearl-masters-maple', '6-piece drum set with premium maple shells', 2799, 3299, '/src/assets/drum-kit.jpg', drums_id, true, true, 6),
  
  -- Violins
  ('Stradivarius Copy Professional Violin', 'stradivarius-copy-pro', 'Handcrafted violin based on classic Stradivarius design', 2499, 2999, '/src/assets/violin.jpg', violins_id, true, true, 8),
  ('Yamaha V7SG Student Violin', 'yamaha-v7sg-student', 'Quality student violin with excellent tone and playability', 599, 799, '/src/assets/violin.jpg', violins_id, true, false, 20),
  
  -- Audio Equipment
  ('Neumann U87 Ai Studio Microphone', 'neumann-u87-ai', 'Industry-standard large-diaphragm condenser microphone', 3695, null, '/src/assets/studio-mic.jpg', audio_id, true, true, 10),
  ('Universal Audio Apollo Twin X DUO', 'ua-apollo-twin-x', 'Desktop audio interface with real-time UAD processing', 899, 1099, '/src/assets/studio-mic.jpg', audio_id, true, false, 15),
  ('KRK Rokit 5 G4 Studio Monitors', 'krk-rokit-5-g4', 'Professional studio monitors with enhanced clarity', 349, 399, '/src/assets/studio-mic.jpg', audio_id, true, false, 25),
  
  -- Accessories
  ('Hercules KS120B Keyboard Stand', 'hercules-ks120b-stand', 'Heavy-duty adjustable keyboard stand', 89, 119, '/src/assets/premium-keyboard.jpg', accessories_id, true, false, 50),
  ('Shure SM58 Dynamic Microphone', 'shure-sm58-dynamic', 'Industry-standard vocal microphone', 99, 129, '/src/assets/studio-mic.jpg', accessories_id, true, false, 100);
END $$;