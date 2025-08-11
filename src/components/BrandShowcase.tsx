import { useLanguage } from "@/contexts/LanguageContext";

const BrandShowcase = () => {
  const { t } = useLanguage();
  const brands = [
    { name: "Arsenberg", logo: "ARSENBERG" },
    { name: "Upcoming Brand", logo: "COMING SOON" },
  ];

  return (
    <section className="py-24 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {t("premiumBrandsExtended")} <span className="text-gold">{t("premiumBrands")}</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("worldRespectedManufacturers")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group flex items-center justify-center p-8 bg-white/5 rounded-xl border border-white/10 hover:border-gold/50 hover:bg-white/10 transition-all duration-500 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-xl font-bold text-white/70 group-hover:text-gold transition-colors duration-300 font-sans tracking-wider">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in" style={{ animationDelay: "800ms" }}>
            <div className="text-4xl font-bold text-gold mb-2">50+</div>
            <div className="text-white/80">{t("premiumBrandsCount")}</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "900ms" }}>
            <div className="text-4xl font-bold text-gold mb-2">1000+</div>
            <div className="text-white/80">{t("professionalProducts")}</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "1000ms" }}>
            <div className="text-4xl font-bold text-gold mb-2">15+</div>
            <div className="text-white/80">{t("yearsOfExcellence")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;