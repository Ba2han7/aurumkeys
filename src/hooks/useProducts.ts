import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  images: string[] | null;
  category_id: string | null;
  is_active: boolean;
  is_featured: boolean;
  discount_percentage: number | null;
  inventory_quantity: number;
  created_at: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

export const useProducts = (categorySlug?: string, featured?: boolean, searchQuery?: string) => {
  return useQuery({
    queryKey: ['products', categorySlug, featured, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('is_active', true);

      if (featured) {
        query = query.eq('is_featured', true);
      }

      if (categorySlug) {
        query = query.eq('categories.slug', categorySlug);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%, description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    }
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Category[];
    }
  });
};