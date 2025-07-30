import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import premiumKeyboard from "@/assets/premium-keyboard.jpg";
import audioEquipment from "@/assets/audio-equipment.jpg";

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  const productsByCategory = {
    keyboards: [
      {
        id: 101,
        name: "Steinway & Sons Digital Grand",
        brand: "Steinway & Sons",
        price: 12999,
        rating: 5,
        reviews: 24,
        image: premiumKeyboard,
      },
      {
        id: 102,
        name: "Roland Fantom-8 Workstation",
        brand: "Roland",
        price: 3499,
        rating: 4.8,
        reviews: 156,
        image: audioEquipment,
      }
    ],
    guitars: [
      {
        id: 201,
        name: "Gibson Les Paul Standard",
        brand: "Gibson",
        price: 2799,
        rating: 4.9,
        reviews: 203,
        image: audioEquipment,
      }
    ],
    drums: [
      {
        id: 301,
        name: "Pearl Masters Maple Complete",
        brand: "Pearl",
        price: 3299,
        rating: 4.7,
        reviews: 98,
        image: audioEquipment,
      }
    ],
    violins: [
      {
        id: 401,
        name: "Stradivarius Copy Professional",
        brand: "Master Craft",
        price: 2499,
        rating: 4.8,
        reviews: 54,
        image: audioEquipment,
      }
    ],
    audio: [
      {
        id: 501,
        name: "Focusrite Scarlett 18i20",
        brand: "Focusrite",
        price: 599,
        rating: 4.6,
        reviews: 234,
        image: audioEquipment,
      }
    ],
    accessories: [
      {
        id: 601,
        name: "Premium Guitar Case",
        brand: "Pro Cases",
        price: 299,
        rating: 4.5,
        reviews: 167,
        image: audioEquipment,
      }
    ]
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    });
  };

  if (!category) {
    navigate('/explore');
    return null;
  }

  const products = productsByCategory[category as keyof typeof productsByCategory] || [];
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/explore')}
            className="mb-4"
          >
            ← Back to Categories
          </Button>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover-lift"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-dark opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground font-medium">{product.brand}</span>
                </div>
                
                <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>

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

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-dark">
                    ${product.price.toLocaleString()}
                  </span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;