import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import premiumKeyboard from "@/assets/premium-keyboard.jpg";
import audioEquipment from "@/assets/audio-equipment.jpg";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addItem } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  const categories = [
    {
      id: "keyboards",
      name: "Keyboards & Pianos",
      description: "Premium weighted-key digital pianos and synthesizers"
    },
    {
      id: "guitars",
      name: "Guitars",
      description: "Acoustic, electric, and bass guitars from renowned brands"
    },
    {
      id: "drums",
      name: "Drums & Percussion",
      description: "Complete drum sets and percussion instruments"
    },
    {
      id: "violins",
      name: "Violins & Strings",
      description: "Professional violins, cellos, and string instruments"
    },
    {
      id: "audio",
      name: "Audio Equipment",
      description: "Professional recording and mixing equipment"
    },
    {
      id: "accessories",
      name: "Accessories",
      description: "Cases, stands, cables, and essential accessories"
    }
  ];

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
      },
      {
        id: 103,
        name: "Yamaha Montage M8x",
        brand: "Yamaha",
        price: 4199,
        rating: 4.9,
        reviews: 89,
        image: premiumKeyboard,
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
      },
      {
        id: 202,
        name: "Fender Stratocaster American Pro",
        brand: "Fender",
        price: 1899,
        rating: 4.8,
        reviews: 187,
        image: premiumKeyboard,
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
      },
      {
        id: 302,
        name: "DW Collector's Series",
        brand: "DW",
        price: 4599,
        rating: 4.9,
        reviews: 76,
        image: premiumKeyboard,
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
      },
      {
        id: 402,
        name: "Antonio Giuliani Violin",
        brand: "Giuliani",
        price: 1899,
        rating: 4.7,
        reviews: 43,
        image: premiumKeyboard,
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
      },
      {
        id: 502,
        name: "Yamaha HS8 Studio Monitors",
        brand: "Yamaha",
        price: 699,
        rating: 4.8,
        reviews: 189,
        image: premiumKeyboard,
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
      },
      {
        id: 602,
        name: "Professional Keyboard Stand",
        brand: "Ultimate Support",
        price: 179,
        rating: 4.7,
        reviews: 203,
        image: premiumKeyboard,
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

  if (selectedCategory) {
    const products = productsByCategory[selectedCategory as keyof typeof productsByCategory] || [];
    const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || '';

    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory(null)}
              className="mb-4"
            >
              ← Back to Categories
            </Button>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
              {categoryName}
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
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
            Explore Our Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium musical instruments and professional audio equipment from the world's finest manufacturers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover-lift animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={index % 2 === 0 ? premiumKeyboard : audioEquipment}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent group-hover:from-dark/90 transition-all duration-500"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-gold transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {category.description}
                </p>
                <Button variant="gold" size="sm" className="w-full">
                  Explore {category.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;