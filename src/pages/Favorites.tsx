import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Favorites = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="text-center py-24">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
            {t("favoritesFeatureDisabled")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t("favoritesTemporarilyDisabled")}
          </p>
          <Button onClick={() => navigate('/explore')} variant="premium">
            {t("exploreProducts")}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;