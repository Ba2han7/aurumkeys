import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useReviews, useReviewStats, useCreateReview, ReviewForm } from "@/hooks/useReviews";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Star, Truck, Shield, RotateCcw, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch product by slug
  const { data: products = [], isLoading } = useProducts();
  const product = products.find(p => p.slug === slug);

  // Fetch reviews and stats
  const { data: reviews = [] } = useReviews(product?.id);
  const { data: reviewStats } = useReviewStats(product?.id);
  const createReviewMutation = useCreateReview();

  const reviewForm = useForm<ReviewForm>({
    defaultValues: {
      rating: 5,
      title: "",
      comment: "",
    },
    mode: "onChange",
  });

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      navigate('/auth');
      return;
    }
    
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

  const handleReviewSubmit = (data: ReviewForm) => {
    if (!user) {
      toast.error('Please sign in to write a review');
      navigate('/auth');
      return;
    }
    
    if (!product) return;

    createReviewMutation.mutate(
      { productId: product.id, reviewData: data },
      {
        onSuccess: () => {
          toast.success('Review submitted successfully!');
          reviewForm.reset();
          setShowReviewForm(false);
        },
        onError: () => {
          toast.error('Failed to submit review. Please try again.');
        },
      }
    );
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
                        i < Math.floor(reviewStats?.averageRating || 0) ? 'fill-gold text-gold' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {reviewStats?.averageRating?.toFixed(1) || '0.0'} ({reviewStats?.totalReviews || 0} reviews)
                </span>
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

              <Button
                onClick={handleAddToCart}
                className="w-full"
                variant="premium"
                size="lg"
                disabled={!product.inventory_quantity}
              >
                Add to Cart - ${(discountedPrice * quantity).toLocaleString()}
              </Button>
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

        {/* Reviews Section */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            {user ? (
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
              >
                Write a Review
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')} variant="outline">
                Sign in to Review
              </Button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && user && (
            <Card>
              <CardHeader>
                <CardTitle>Write Your Review</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...reviewForm}>
                  <form onSubmit={reviewForm.handleSubmit(handleReviewSubmit)} className="space-y-4">
                    <FormField
                      control={reviewForm.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => field.onChange(rating)}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    className={`h-6 w-6 ${
                                      rating <= field.value ? 'fill-gold text-gold' : 'text-muted'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={reviewForm.control}
                      name="title"
                      rules={{ 
                        required: "Review title is required",
                        minLength: { value: 3, message: "Title must be at least 3 characters" },
                        maxLength: { value: 100, message: "Title must be less than 100 characters" }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Review Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="Summarize your experience" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={reviewForm.control}
                      name="comment"
                      rules={{ 
                        required: "Review comment is required",
                        minLength: { value: 10, message: "Comment must be at least 10 characters" },
                        maxLength: { value: 1000, message: "Comment must be less than 1000 characters" }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Review *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your thoughts about this product"
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        disabled={createReviewMutation.isPending}
                      >
                        {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'fill-gold text-gold' : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          By Anonymous • {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;