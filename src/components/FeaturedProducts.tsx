import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import premiumKeyboard from "@/assets/premium-keyboard.jpg";
import audioEquipment from "@/assets/audio-equipment.jpg";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Steinway & Sons Digital Grand",
      brand: "Steinway & Sons",
      price: 12999,
      originalPrice: 14999,
      rating: 5,
      reviews: 24,
      image: premiumKeyboard,
      badge: "Exclusive",
      isNew: true,
    },
    {
      id: 2,
      name: "Roland Fantom-8 Workstation",
      brand: "Roland",
      price: 3499,
      rating: 4.8,
      reviews: 156,
      image: audioEquipment,
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Yamaha Montage M8x",
      brand: "Yamaha",
      price: 4199,
      rating: 4.9,
      reviews: 89,
      image: premiumKeyboard,
      badge: "Pro Choice",
    },
    {
      id: 4,
      name: "Moog Subsequent 37",
      brand: "Moog",
      price: 1599,
      rating: 4.7,
      reviews: 203,
      image: audioEquipment,
      badge: "Limited",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground">
              Hand-picked instruments from the world's finest manufacturers
            </p>
          </div>
          <Button variant="outline" className="hidden md:block hover-lift">
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.badge === 'Exclusive' ? 'bg-gold text-dark' :
                    product.badge === 'Best Seller' ? 'bg-green-500 text-white' :
                    product.badge === 'Pro Choice' ? 'bg-blue-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
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
                  <Button variant="gold" className="transform scale-95 group-hover:scale-100 transition-transform duration-300">
                    Quick View
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground font-medium">{product.brand}</span>
                </div>
                
                <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-dark">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <Button variant="premium" className="w-full">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Button variant="outline" className="hover-lift">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;