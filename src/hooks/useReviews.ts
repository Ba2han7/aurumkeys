import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string;
  } | null;
}

export interface ReviewForm {
  rating: number;
  title: string;
  comment: string;
}

export const useReviews = (productId?: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      if (!productId) return [];
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!productId,
  });
};

export const useReviewStats = (productId?: string) => {
  return useQuery({
    queryKey: ['review-stats', productId],
    queryFn: async () => {
      if (!productId) return { averageRating: 0, totalReviews: 0 };
      
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId)
        .eq('is_approved', true);

      if (error) throw error;
      
      if (!data || data.length === 0) {
        return { averageRating: 0, totalReviews: 0 };
      }

      const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / data.length;
      
      return { 
        averageRating: Math.round(averageRating * 10) / 10, 
        totalReviews: data.length 
      };
    },
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ productId, reviewData }: { productId: string; reviewData: ReviewForm }) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          product_id: productId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          ...reviewData,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['review-stats', variables.productId] });
    },
  });
};

export const useAdminReviews = () => {
  return useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Review> }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review-stats'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review-stats'] });
    },
  });
};