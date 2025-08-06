import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    keyboards: "Keyboards",
    guitars: "Guitars", 
    drums: "Drums",
    violins: "Violins",
    audioEquipment: "Audio Equipment",
    accessories: "Accessories",
    contact: "Contact",
    signOut: "Sign Out",
    adminPanel: "Admin Panel",
    
    // Hero
    exclusiveCollection: "EXCLUSIVE COLLECTION",
    heroDescription: "Discover our hand-selected premium keyboards, pianos, and professional audio equipment.",
    heroSubtext: "Elevate your sound to perfection.",
    exploreCollection: "Explore Collection",
    watchDemo: "Watch Demo",
    professionalGrade: "Professional Grade",
    premiumBrands: "Premium Brands", 
    expertSupport: "Expert Support",
    
    // Search
    searchProducts: "Search products...",
    search: "Search",
    noResults: "No results found",
    searching: "Searching...",
    addToCart: "Add to Cart",
    
    // General
    loading: "Loading...",
    price: "Price",
    category: "Category",
    description: "Description",
    quantity: "Quantity",
    total: "Total",
    cart: "Cart",
    checkout: "Checkout",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    name: "Name",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    close: "Close",
    yes: "Yes",
    no: "No",
    
    // Footer
    aboutUs: "About Us",
    customerService: "Customer Service",
    policies: "Policies",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    subscribeNewsletter: "Subscribe to our newsletter",
    emailAddress: "Email address",
    subscribe: "Subscribe",
    
    // Product Categories
    shopByCategory: "Shop by Category",
    viewAll: "View All",
    
    // Featured Products
    featuredProducts: "Featured Products",
    bestsellers: "Bestsellers",
    
    // Brand Showcase
    trustedBrands: "Trusted Brands",
    worldClassBrands: "World-Class Brands",
    
    // Cart
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    removeItem: "Remove Item",
    
    // Auth
    signIn: "Sign In", 
    signUp: "Sign Up",
    forgotPassword: "Forgot Password?",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    
    // Product Detail
    productDetails: "Product Details",
    specifications: "Specifications",
    reviews: "Reviews",
    relatedProducts: "Related Products",
    
    // Demo
    productDemo: "Product Demo",
    
    // Contact
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    message: "Message",
    sendMessage: "Send Message",
    
    // Admin
    adminDashboard: "Admin Dashboard",
    manageProducts: "Manage Products",
    manageUsers: "Manage Users",
    analytics: "Analytics",
    
    // Explore
    allProducts: "All Products",
    filterBy: "Filter By",
    sortBy: "Sort By",
    priceRange: "Price Range",
    brand: "Brand",
    
    // Favorites
    favorites: "Favorites",
    noFavorites: "No favorites yet",
    
    // Notifications
    itemAddedToCart: "Item added to cart",
    itemRemovedFromCart: "Item removed from cart",
    orderPlaced: "Order placed successfully",
    loginRequired: "Please login to continue",
    
    // Chatbot
    chatbotAdvisor: "Music Equipment Advisor",
    askQuestion: "Ask a question about our products...",
    send: "Send",
    chatbotGreeting: "Hi! I'm here to help you find the perfect musical equipment. What are you looking for?",
  },
  tr: {
    // Header
    keyboards: "Klavyeler",
    guitars: "Gitarlar",
    drums: "Davullar", 
    violins: "Kemanlar",
    audioEquipment: "Ses Ekipmanları",
    accessories: "Aksesuarlar",
    contact: "İletişim",
    signOut: "Çıkış Yap",
    adminPanel: "Yönetici Paneli",
    
    // Hero
    exclusiveCollection: "ÖZEL KOLEKSİYON",
    heroDescription: "Özenle seçilmiş premium klavyeler, piyanolar ve profesyonel ses ekipmanlarını keşfedin.",
    heroSubtext: "Sesinizi mükemmelliğe taşıyın.",
    exploreCollection: "Koleksiyonu Keşfet",
    watchDemo: "Demo İzle",
    professionalGrade: "Profesyonel Kalite",
    premiumBrands: "Premium Markalar",
    expertSupport: "Uzman Destek",
    
    // Search
    searchProducts: "Ürün ara...",
    search: "Ara",
    noResults: "Sonuç bulunamadı",
    searching: "Aranıyor...",
    addToCart: "Sepete Ekle",
    
    // General
    loading: "Yükleniyor...",
    price: "Fiyat",
    category: "Kategori",
    description: "Açıklama",
    quantity: "Adet",
    total: "Toplam",
    cart: "Sepet",
    checkout: "Ödeme",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    email: "E-posta",
    password: "Şifre",
    name: "İsim",
    submit: "Gönder",
    cancel: "İptal",
    save: "Kaydet",
    edit: "Düzenle",
    delete: "Sil",
    close: "Kapat",
    yes: "Evet",
    no: "Hayır",
    
    // Footer
    aboutUs: "Hakkımızda",
    customerService: "Müşteri Hizmetleri",
    policies: "Politikalar",
    followUs: "Bizi Takip Edin",
    newsletter: "Haber Bülteni",
    subscribeNewsletter: "Haber bültenimize abone olun",
    emailAddress: "E-posta adresi",
    subscribe: "Abone Ol",
    
    // Product Categories
    shopByCategory: "Kategoriye Göre Alışveriş",
    viewAll: "Tümünü Gör",
    
    // Featured Products
    featuredProducts: "Öne Çıkan Ürünler",
    bestsellers: "Çok Satanlar",
    
    // Brand Showcase
    trustedBrands: "Güvenilir Markalar",
    worldClassBrands: "Dünya Standartında Markalar",
    
    // Cart
    yourCart: "Sepetiniz",
    emptyCart: "Sepetiniz boş",
    continueShopping: "Alışverişe Devam Et",
    removeItem: "Ürünü Kaldır",
    
    // Auth
    signIn: "Giriş Yap",
    signUp: "Kayıt Ol",
    forgotPassword: "Şifremi Unuttum?",
    createAccount: "Hesap Oluştur",
    alreadyHaveAccount: "Zaten hesabınız var mı?",
    dontHaveAccount: "Hesabınız yok mu?",
    
    // Product Detail
    productDetails: "Ürün Detayları",
    specifications: "Özellikler",
    reviews: "Yorumlar",
    relatedProducts: "İlgili Ürünler",
    
    // Demo
    productDemo: "Ürün Demosu",
    
    // Contact
    contactUs: "İletişime Geç",
    getInTouch: "Bizimle İletişime Geçin",
    message: "Mesaj",
    sendMessage: "Mesaj Gönder",
    
    // Admin
    adminDashboard: "Yönetici Paneli",
    manageProducts: "Ürünleri Yönet",
    manageUsers: "Kullanıcıları Yönet",
    analytics: "Analitik",
    
    // Explore
    allProducts: "Tüm Ürünler",
    filterBy: "Filtrele",
    sortBy: "Sırala",
    priceRange: "Fiyat Aralığı",
    brand: "Marka",
    
    // Favorites
    favorites: "Favoriler",
    noFavorites: "Henüz favori yok",
    
    // Notifications
    itemAddedToCart: "Ürün sepete eklendi",
    itemRemovedFromCart: "Ürün sepetten kaldırıldı",
    orderPlaced: "Siparişiniz başarıyla oluşturuldu",
    loginRequired: "Devam etmek için giriş yapın",
    
    // Chatbot
    chatbotAdvisor: "Müzik Ekipmanı Danışmanı",
    askQuestion: "Ürünlerimiz hakkında soru sorun...",
    send: "Gönder",
    chatbotGreeting: "Merhaba! Mükemmel müzik ekipmanını bulmanızda size yardım etmek için buradayım. Ne arıyorsunuz?",
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};