import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const footerSections = [
    {
      title: t("footerProducts"),
      links: [
        t("digitalPianos"),
        t("footerSynthesizers"),
        t("audioEquipment"),
        t("footerAccessories"),
        t("newArrivals"),
      ],
    },
    {
      title: t("footerSupport"),
      links: [
        t("footerCustomerService"),
        t("shippingInfo"),
        t("returnsExchanges"),
        t("warranty"),
        t("faq"),
      ],
    },
    {
      title: t("footerCompany"),
      links: [
        t("aboutUs"),
        t("careers"),
        t("press"),
        t("partnerships"),
        t("contact"),
      ],
    },
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-serif font-bold mb-4">
              AURUM
              <span className="block text-lg font-normal tracking-wider text-gold">KEYS & SOUND</span>
            </h3>
            <p className="text-white/80 mb-6 max-w-md">
              {t("companySlogan")}
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-gold" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="h-5 w-5 text-gold" />
                <span>{t("phone")}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="h-5 w-5 text-gold" />
                <span>{t("footerEmail")}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 hover-lift"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-gold">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white hover:text-gold transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              {t("allRightsReserved")}
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
                {t("privacyPolicy")}
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
                {t("termsOfService")}
              </a>
              <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
                {t("cookies")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;