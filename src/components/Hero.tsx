import { Button } from "@/components/ui/button";
import heroStudio from "@/assets/hero-studio.jpg";

const Hero = () => {
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
            EXCLUSIVE
            <span className="block text-gold">COLLECTION</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Discover our hand-selected premium keyboards, pianos, and professional audio equipment. 
            <span className="block mt-2 text-gold font-medium">Elevate your sound to perfection.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="premium" size="lg" className="hover-lift animate-scale-in">
              Explore Collection
            </Button>
            <Button variant="hero" size="lg" className="hover-lift animate-scale-in">
              Watch Demo
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-3 text-white font-medium">
              Professional Grade
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-3 text-white font-medium">
              Premium Brands
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-gold/20 rounded-full px-6 py-3 text-white font-medium">
              Expert Support
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