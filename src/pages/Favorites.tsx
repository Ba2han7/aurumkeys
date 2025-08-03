import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Star, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch user's favorite products
  const { data: favoriteProducts = [], isLoading } = useQuery({
    queryKey: ['favorite-products', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          products (
            *,
            categories (
              name,
              slug
            )
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(f => f.products).filter(Boolean);
    },
    enabled: !!user,
  });

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite-products'] });
      toast.success('Removed from favorites');
    },
    onError: () => {
      toast.error('Failed to remove from favorites');
    },
  });

  const handleAddToCart = (product: any) => {
    const discountedPrice = product.discount_percentage 
      ? product.price * (1 - product.discount_percentage / 100)
      : product.price;
    
    addItem({
      id: product.id,
      name: product.name,
      brand: product.categories?.name || "Premium Brand",
      price: discountedPrice,
      image: product.image_url || '',
    });
    toast.success('Added to cart');
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to view your favorites</h1>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
            My Favorites
          </h1>
          <p className="text-xl text-muted-foreground">
            Your curated collection of premium instruments
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
            <p className="text-muted-foreground mb-8">
              Start exploring our collection to find your perfect instruments
            </p>
            <Button onClick={() => navigate('/explore')} variant="premium">
              Explore Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteProducts.map((product: any) => {
              const discountedPrice = product.discount_percentage 
                ? product.price * (1 - product.discount_percentage / 100)
                : product.price;
              
              const savings = product.price - discountedPrice;

              return (
                <div
                  key={product.id}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover-lift"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image_url || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    />
                    
                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-500 hover:bg-red-600">
                          {product.discount_percentage}% OFF
                        </Badge>
                      </div>
                    )}

                    {/* Remove from Favorites Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => removeFavoriteMutation.mutate(product.id)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button 
                        variant="gold" 
                        className="transform scale-95 group-hover:scale-100 transition-transform duration-300"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2">
                      <Badge variant="secondary">
                        {product.categories?.name || "Premium"}
                      </Badge>
                    </div>
                    
                    <h3 
                      className="text-lg font-bold text-dark mb-3 group-hover:text-gold transition-colors duration-300 cursor-pointer"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 ? 'fill-gold text-gold' : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        4.8 (120+)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-dark">
                        ${discountedPrice.toLocaleString()}
                      </span>
                      {savings > 0 && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <Button 
                      variant="premium" 
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;