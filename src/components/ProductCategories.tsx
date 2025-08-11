import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import premiumKeyboard from "@/assets/premium-keyboard.jpg";
import audioEquipment from "@/assets/audio-equipment.jpg";

const ProductCategories = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: dbCategories = [], isLoading } = useCategories();
  
  // Fallback categories if no data from DB
  const fallbackCategories = [
    {
      id: "keyboards",
      name: "Digital Pianos", 
      slug: "keyboards",
      description: "Premium weighted-key digital pianos",
      image_url: premiumKeyboard,
    },
    {
      id: "synthesizers",
      name: "Synthesizers",
      slug: "synthesizers", 
      description: "Professional analog & digital synthesizers",
      image_url: audioEquipment,
    },
    {
      id: "audio",
      name: "Audio Equipment",
      slug: "audio",
      description: "High-resolution recording interfaces",
      image_url: audioEquipment,
    },
    {
      id: "accessories", 
      name: "Accessories",
      slug: "accessories",
      description: "Premium cables, stands & cases",
      image_url: premiumKeyboard,
    },
  ];

  const displayCategories = dbCategories.length > 0 ? dbCategories.slice(0, 5) : fallbackCategories;

  const handleCategoryClick = (slug: string) => {
    navigate('/explore', { state: { category: slug } });
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
            {t("shopByCategoryExtended")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("exploreCarefully")}
          </p>
          <Button 
            variant="premium" 
            size="lg" 
            onClick={() => navigate('/explore')}
            className="hover-lift"
          >
            {t("exploreCollectionExtended")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {displayCategories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-xl hover-lift animate-fade-in cursor-pointer ${
                index < 2 ? 'lg:col-span-2 lg:row-span-2' : 'lg:col-span-1'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="aspect-square lg:aspect-auto lg:h-full">
                <img
                  src={category.image_url || (index % 2 === 0 ? premiumKeyboard : audioEquipment)}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent group-hover:from-dark/90 transition-all duration-500"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {category.description || `Explore our ${category.name.toLowerCase()} collection`}
                  </p>
                  <Button 
                    variant="gold" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    {t("viewAll")} {category.name}
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