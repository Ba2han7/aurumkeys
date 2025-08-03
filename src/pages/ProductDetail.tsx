import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Star, Heart, Share, Truck, Shield, RotateCcw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fetch product by slug
  const { data: products = [], isLoading } = useProducts();
  const product = products.find(p => p.slug === slug);

  // Check if product is in favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', user.id);
      if (error) throw error;
      return data.map(f => f.product_id);
    },
    enabled: !!user,
  });

  const isFavorite = product && favorites.includes(product.id);

  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (!user || !product) throw new Error('User not authenticated');
      
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, product_id: product.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    },
    onError: () => {
      toast.error('Please sign in to add favorites');
    },
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    const discountedPrice = product.discount_percentage 
      ? product.price * (1 - product.discount_percentage / 100)
      : product.price;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.categories?.name || "Premium Brand",
        price: discountedPrice,
        image: product.image_url || '',
      });
    }
    toast.success(`Added ${quantity} item(s) to cart`);
  };

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

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/explore')}>Browse Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : product.image_url 
    ? [product.image_url] 
    : [];

  const discountedPrice = product.discount_percentage 
    ? product.price * (1 - product.discount_percentage / 100)
    : product.price;

  const savings = product.price - discountedPrice;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={images[selectedImage] || product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.categories?.name}</Badge>
                {product.is_featured && <Badge variant="outline">Featured</Badge>}
                {product.discount_percentage && product.discount_percentage > 0 && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {product.discount_percentage}% OFF
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-dark mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'fill-gold text-gold' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.8 (127 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-dark">
                  ${discountedPrice.toLocaleString()}
                </span>
                {product.discount_percentage && product.discount_percentage > 0 && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-green-600 font-medium">
                  You save ${savings.toLocaleString()}
                </p>
              )}
              {product.compare_at_price && (
                <p className="text-sm text-muted-foreground">
                  Compare at: ${product.compare_at_price.toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">About this product</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inventory_quantity > 0 
                    ? `${product.inventory_quantity} in stock`
                    : 'Out of stock'
                  }
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  variant="premium"
                  size="lg"
                  disabled={!product.inventory_quantity}
                >
                  Add to Cart - ${(discountedPrice * quantity).toLocaleString()}
                </Button>
                <Button
                  onClick={() => toggleFavoriteMutation.mutate()}
                  variant="outline"
                  size="lg"
                  className={isFavorite ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>Free shipping on orders over $299</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>2-year manufacturer warranty</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;