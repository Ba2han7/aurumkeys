import { Button } from "@/components/ui/button";
import { Star, Heart, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import premiumKeyboard from "@/assets/premium-keyboard.jpg";
import audioEquipment from "@/assets/audio-equipment.jpg";

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: products = [], isLoading, error } = useProducts(undefined, true);

  // Fallback products if no data from DB
  const fallbackProducts = [
    {
      id: "1",
      name: "Steinway & Sons Digital Grand",
      slug: "steinway-digital-grand",
      price: 12999,
      compare_at_price: 14999,
      discount_percentage: null,
      image_url: premiumKeyboard,
      description: "Premium digital grand piano",
      categories: { name: "Keyboards", slug: "keyboards" }
    },
    {
      id: "2", 
      name: "Roland Fantom-8 Workstation",
      slug: "roland-fantom-8",
      price: 3499,
      compare_at_price: null,
      discount_percentage: null,
      image_url: audioEquipment,
      description: "Professional workstation",
      categories: { name: "Keyboards", slug: "keyboards" }
    },
    {
      id: "3",
      name: "Yamaha Montage M8x",
      slug: "yamaha-montage-m8x",
      price: 4199,
      compare_at_price: null,
      discount_percentage: null,
      image_url: premiumKeyboard,
      description: "Professional synthesizer",
      categories: { name: "Keyboards", slug: "keyboards" }
    },
    {
      id: "4",
      name: "Focusrite Audio Interface",
      slug: "focusrite-audio-interface",
      price: 599,
      compare_at_price: null,
      discount_percentage: null,
      image_url: audioEquipment,
      description: "Professional audio interface",
      categories: { name: "Audio", slug: "audio" }
    },
  ];

  const displayProducts = products.length > 0 ? products.slice(0, 4) : fallbackProducts;

  const handleAddToCart = (product: any) => {
    const discountedPrice = product.discount_percentage 
      ? product.price * (1 - product.discount_percentage / 100)
      : product.price;
    
    addItem({
      id: product.id,
      name: product.name,
      brand: product.categories?.name || "Premium Brand",
      price: discountedPrice,
      image: product.image_url || premiumKeyboard,
    });
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
              {t("featuredProductsExtended")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("handPickedInstruments")}
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:block hover-lift"
            onClick={() => navigate('/explore')}
          >
            {t("viewAllProducts")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, index) => {
            const discountedPrice = product.discount_percentage 
              ? product.price * (1 - product.discount_percentage / 100)
              : product.price;
            const savings = product.price - discountedPrice;
            
            return (
            <div
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image_url || premiumKeyboard}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                  onClick={() => navigate(`/product/${product.slug}`)}
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  {product.discount_percentage && product.discount_percentage > 0 ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                      {product.discount_percentage}% {t("off")}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold text-dark">
                      {t("featured")}
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-dark opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    variant="gold" 
                    className="transform scale-95 group-hover:scale-100 transition-transform duration-300"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    {t("viewDetails")}
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground font-medium">
                    {product.categories?.name || "Premium"}
                  </span>
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
                  {product.compare_at_price && !savings && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.compare_at_price.toLocaleString()}
                    </span>
                  )}
                </div>

                <Button 
                  variant="premium" 
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  {t("addToCart")}
                </Button>
              </div>
            </div>
            );
          })}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Button 
            variant="outline" 
            className="hover-lift"
            onClick={() => navigate('/explore')}
          >
            {t("viewAllProducts")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;