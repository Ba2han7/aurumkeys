import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import heroStudio from "@/assets/hero-studio.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroStudio}
          alt="Premium music studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            {t("exclusiveCollection").split(' ')[0]}
            <span className="block text-gold">{t("exclusiveCollection").split(' ')[1]}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            {t("heroDescription")}
            <span className="block mt-2 text-gold font-medium">{t("heroSubtext")}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="premium" 
              size="lg" 
              className="hover-lift animate-scale-in"
              onClick={() => navigate('/explore')}
            >
              {t("exploreCollection")}
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              className="hover-lift animate-scale-in"
              onClick={() => navigate('/demo')}
            >
              {t("watchDemo")}
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-3 text-white font-medium">
              {t("professionalGrade")}
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-3 text-white font-medium">
              {t("premiumBrands")}
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-3 text-white font-medium">
              {t("expertSupport")}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;