import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const Newsletter = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
              {t("stayInHarmony")} <span className="text-gold">{t("stayInHarmony").split(' ')[2]}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("newsletterDescription")}
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12 animate-scale-in">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={t("enterEmailAddress")}
                className="flex-1 h-12 px-4 bg-background border-2 border-border focus:border-gold"
              />
              <Button variant="premium" size="lg" className="px-8">
                {t("subscribe")}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground animate-slide-up">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>{t("exclusiveProductPreviews")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>{t("professionalTips")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>{t("vipDiscounts")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;