import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import premiumKeyboard from "@/assets/premium-keyboard.jpg";
import audioEquipment from "@/assets/audio-equipment.jpg";

const ProductCategories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: "Digital Pianos",
      description: "Premium weighted-key digital pianos",
      image: premiumKeyboard,
      buttonText: "View Pianos",
    },
    {
      title: "Synthesizers",
      description: "Professional analog & digital synthesizers",
      image: audioEquipment,
      buttonText: "View Synths",
    },
    {
      title: "Audio Interfaces",
      description: "High-resolution recording interfaces",
      image: audioEquipment,
      buttonText: "View Audio",
    },
    {
      title: "Studio Monitors",
      description: "Reference-quality studio monitors",
      image: premiumKeyboard,
      buttonText: "View Monitors",
    },
    {
      title: "Accessories",
      description: "Premium cables, stands & cases",
      image: audioEquipment,
      buttonText: "View All",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our carefully curated selection of premium musical instruments and professional audio equipment
          </p>
          <Button 
            variant="premium" 
            size="lg" 
            onClick={() => navigate('/explore')}
            className="hover-lift"
          >
            Explore Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`group relative overflow-hidden rounded-xl hover-lift animate-fade-in ${
                index < 2 ? 'lg:col-span-2 lg:row-span-2' : 'lg:col-span-1'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-square lg:aspect-auto lg:h-full">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent group-hover:from-dark/90 transition-all duration-500"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {category.description}
                  </p>
                  <Button 
                    variant="gold" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    {category.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;