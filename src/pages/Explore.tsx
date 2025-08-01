import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useProducts, useCategories } from "@/hooks/useProducts";
import BackButton from "@/components/BackButton";
import premiumKeyboard from "@/assets/premium-keyboard.jpg";
import audioEquipment from "@/assets/audio-equipment.jpg";
import yamahaPiano from "@/assets/yamaha-piano.jpg";
import electricGuitar from "@/assets/electric-guitar.jpg";
import drumKit from "@/assets/drum-kit.jpg";
import violin from "@/assets/violin.jpg";
import studioMic from "@/assets/studio-mic.jpg";
import synthesizer from "@/assets/synthesizer.jpg";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addItem } = useCart();
  const location = useLocation();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts(selectedCategory || undefined);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  // Fallback categories
  const fallbackCategories = [
    {
      id: "keyboards",
      name: "Keyboards & Pianos", 
      slug: "keyboards",
      description: "Premium weighted-key digital pianos and synthesizers",
      image_url: premiumKeyboard
    },
    {
      id: "guitars",
      name: "Guitars",
      slug: "guitars", 
      description: "Acoustic, electric, and bass guitars from renowned brands",
      image_url: audioEquipment
    },
    {
      id: "drums",
      name: "Drums & Percussion",
      slug: "drums",
      description: "Complete drum sets and percussion instruments",
      image_url: premiumKeyboard
    },
    {
      id: "audio",
      name: "Audio Equipment",
      slug: "audio",
      description: "Professional recording and mixing equipment",
      image_url: audioEquipment
    },
    {
      id: "accessories",
      name: "Accessories", 
      slug: "accessories",
      description: "Cases, stands, cables, and essential accessories",
      image_url: premiumKeyboard
    }
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  // Fallback products if no data from DB  
  const fallbackProducts = [
    {
      id: "101",
      name: "Steinway & Sons Digital Grand",
      price: 12999,
      image_url: premiumKeyboard,
      categories: { name: "Keyboards", slug: "keyboards" }
    },
    {
      id: "102", 
      name: "Roland Fantom-8 Workstation",
      price: 3499,
      image_url: audioEquipment,
      categories: { name: "Keyboards", slug: "keyboards" }
    },
    {
      id: "103",
      name: "Yamaha Montage M8x",
      price: 4199,
      image_url: premiumKeyboard,
      categories: { name: "Keyboards", slug: "keyboards" }
    }
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.categories?.name || "Premium Brand",
      price: product.price,
      image: product.image_url || premiumKeyboard,
    });
  };

  if (selectedCategory) {
    const displayProducts = products.length > 0 ? products : fallbackProducts;
    const categoryName = displayCategories.find(cat => cat.slug === selectedCategory)?.name || '';

    if (productsLoading) {
      return (
        <div className="min-h-screen bg-background pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <BackButton 
              label="Back to Categories"
              onClick={() => setSelectedCategory(null)}
              className="mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
              {categoryName}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover-lift"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url || premiumKeyboard}
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
                    <span className="text-sm text-muted-foreground font-medium">
                      {product.categories?.name || "Premium"}
                    </span>
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
                            i < 4 ? 'fill-gold text-gold' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      4.8 (120+)
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

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
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
          {displayCategories.map((category, index) => (
            <div
              key={category.id}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-premium transition-all duration-500 hover-lift animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedCategory(category.slug)}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={category.image_url || (index % 2 === 0 ? premiumKeyboard : audioEquipment)}
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
                  {category.description || `Explore our ${category.name.toLowerCase()} collection`}
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