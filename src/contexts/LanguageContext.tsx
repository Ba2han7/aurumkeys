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
    
     // Footer Extended
    companySlogan: "Your premier destination for professional musical instruments and audio equipment. Elevating musicians and producers worldwide since 2009.",
    address: "123 Music Boulevard, Harmony City, HC 12345",
    phone: "+1 (555) 123-KEYS",
    footerEmail: "hello@aurumkeysound.com",
    digitalPianos: "Digital Pianos",
    footerSynthesizers: "Synthesizers",
    footerAccessories: "Accessories",
    newArrivals: "New Arrivals",
    footerProducts: "Products",
    footerSupport: "Support",
    footerCustomerService: "Customer Service",
    shippingInfo: "Shipping Info",
    returnsExchanges: "Returns & Exchanges",
    warranty: "Warranty",
    faq: "FAQ",
    footerCompany: "Company",
    careers: "Careers",
    press: "Press",
    partnerships: "Partnerships",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookies: "Cookies",
    allRightsReserved: "© 2024 Aurum Keys & Sound. All rights reserved.",
    
    // Featured Products Extended
    featuredProductsExtended: "Featured Products",
    handPickedInstruments: "Hand-picked instruments from the world's finest manufacturers",
    viewAllProducts: "View All Products",
    featured: "Featured",
    viewDetails: "View Details",
    off: "OFF",
    
    // Product Categories Extended
    shopByCategoryExtended: "Shop by Category",
    exploreCarefully: "Explore our carefully curated selection of premium musical instruments and professional audio equipment",
    exploreCollectionExtended: "Explore Collection",
    
    // Brand Showcase Extended
    premiumBrandsExtended: "Premium Brands",
    worldRespectedManufacturers: "We partner with the world's most respected musical instrument manufacturers",
    premiumBrandsCount: "Premium Brands",
    professionalProducts: "Professional Products",
    yearsOfExcellence: "Years of Excellence",
    
    // Newsletter
    stayInHarmony: "Stay in Harmony",
    newsletterDescription: "Be the first to know about new arrivals, exclusive deals, and professional insights from the world of premium musical instruments.",
    enterEmailAddress: "Enter your email address",
    exclusiveProductPreviews: "Exclusive product previews",
    professionalTips: "Professional tips & tutorials",
    vipDiscounts: "VIP member discounts",
    
    // Search Extended
    searchProductsExtended: "Search Products",
    searchForInstruments: "Search for instruments, brands, models...",
    noProductsFound: "No products found for",
    enterSearchTerm: "Enter a search term to find products",
    
    // Chatbot specific
    melodyAI: "Melody AI",
    yourMusicalGuide: "Your Musical Guide",
    chooseOption: "Choose an option:",
    showPianos: "Show me pianos and keyboards",
    lookingForGuitars: "I'm looking for guitars",
    whatDrums: "What drums do you have?",
    showAllInstruments: "Show me all instruments",
    beginnerAdvice: "I'm a beginner, what should I start with?",
    featuredProductsQuestion: "What are your featured products?",
    beginnerResponse: "For beginners, I recommend starting with: 🎹 Keyboard/Piano (great for music theory), 🎸 Acoustic Guitar (versatile and portable), or 🥁 Electronic Drums (volume control for practice). Each offers a solid foundation for musical learning!",
    hello: "Hello! I'm Melody, your musical companion! 🎵 Choose from the options below to explore our amazing instruments:",
    
    // Explore Extended
    exploreOurCollection: "Explore Our Collection",
    discoverPremium: "Discover premium musical instruments and professional audio equipment from the world's finest manufacturers",
    backToCategories: "Back to Categories",
    keyboardsPianos: "Keyboards & Pianos",
    premiumWeightedKey: "Premium weighted-key digital pianos and synthesizers",
    guitarsExtended: "Guitars",
    acousticElectric: "Acoustic, electric, and bass guitars from renowned brands",
    drumsPercussion: "Drums & Percussion",
    completeDrumSets: "Complete drum sets and percussion instruments",
    professionalRecording: "Professional recording and mixing equipment",
    casesStands: "Cases, stands, cables, and essential accessories",
    
    // Cart Extended
    yourCartExtended: "Your Cart",
    cartEmpty: "Your cart is empty",
    backToShop: "Back to Shop",
    shoppingCart: "Shopping Cart",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    itemsCount: "items",
    shippingCost: "Shipping",
    free: "Free",
    proceedToCheckout: "Proceed to Checkout",
    clearCart: "Clear Cart",
    
    // Back Button
    goBack: "Go Back",
    
    // Auth Page
    error: "Error",
    pleaseFileAllFields: "Please fill in all fields",
    signInFailed: "Sign In Failed",
    welcomeBack: "Welcome back!",
    signInSuccessfully: "You have been signed in successfully.",
    passwordMustBe6: "Password must be at least 6 characters long",
    accountExists: "Account exists",
    accountAlreadyExists: "An account with this email already exists. Please sign in instead.",
    signUpFailed: "Sign Up Failed",
    accountCreated: "Account created!",
    checkEmailToVerify: "Please check your email to verify your account.",
    welcomeToAurum: "Welcome to Aurum Keys & Sound",
    displayName: "Display Name",
    enterYourName: "Enter your name",
    enterYourEmail: "Enter your email",
    enterYourPassword: "Enter your password",
    createPassword: "Create a password (min. 6 characters)",
    signingIn: "Signing In...",
    creatingAccount: "Creating Account...",
    
    // Contact Page Extended
    getInTouchContact: "Get in touch with our team for any questions or support",
    sendUsMessage: "Send us a Message",
    fullName: "Full Name",
    yourFullName: "Your full name",
    yourEmailExample: "your.email@example.com",
    whatIsThisRegarding: "What is this regarding?",
    tellUsHowWeCanHelp: "Tell us how we can help you...",
    getInTouchTitle: "Get in Touch",
    infoEmail: "info@aurum.com",
    phoneNumber: "+1 (555) 123-4567",
    businessAddress: "123 Music Street\nHarmony City, HC 12345",
    teamContact: "Team Contact",
    reachOutToSpecific: "Reach out to specific departments for faster assistance",
    salesTeam: "Sales Team",
    productInquiriesOrders: "Product inquiries and orders",
    salesEmail: "sales@aurum.com",
    supportTeam: "Support Team",
    technicalSupportAssistance: "Technical support and assistance",
    supportEmail: "support@aurum.com",
    management: "Management",
    generalInquiriesPartnerships: "General inquiries and partnerships",
    adminEmail: "admin@aurum.com",
    productReturnsExchanges: "Product returns and exchanges",
    returnsEmail: "returns@aurum.com",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday",
    nineSix: "9:00 AM - 6:00 PM",
    saturday: "Saturday",
    tenFour: "10:00 AM - 4:00 PM",
    sunday: "Sunday",
    closed: "Closed",
    messageSentSuccessfully: "Message sent successfully! We'll get back to you soon.",
    
    // Favorites Page
    favoritesFeatureDisabled: "Favorites Feature Disabled",
    favoritesTemporarilyDisabled: "The favorites feature has been temporarily disabled. Please explore our amazing collection of instruments instead.",
    exploreProducts: "Explore Products",
    
    // Product names - English
    productMidiKeyboard: "Professional MIDI Keyboard",
    productYamahaPiano: "Yamaha Digital Piano",
    productElectricGuitar: "Electric Guitar",
    productDrumKit: "Electronic Drum Kit",
    productSynthesizer: "Professional Synthesizer",
    productStudioMic: "Studio Microphone",
    productAcousticViolin: "Acoustic Violin",
    productAudioEquipment: "Professional Audio Equipment",
    productPremiumKeyboard: "Premium Keyboard",
    
    // Categories - English  
    categoryKeyboards: "Keyboards & Pianos",
    categoryGuitars: "Guitars",
    categoryDrums: "Drums & Percussion", 
    categoryViolins: "Violins",
    categoryAudio: "Audio Equipment",
    categoryAccessories: "Accessories",
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
    
    // Footer Extended
    companySlogan: "Profesyonel müzik aletleri ve ses ekipmanları için premier destinasyonunuz. 2009'dan beri dünya çapında müzisyenleri ve yapımcıları yükseltiyor.",
    address: "123 Müzik Bulvarı, Harmony Şehri, HC 12345",
    phone: "+1 (555) 123-KEYS",
    footerEmail: "hello@aurumkeysound.com",
    digitalPianos: "Dijital Piyanolar",
    footerSynthesizers: "Synthesizer'lar",
    footerAccessories: "Aksesuarlar",
    newArrivals: "Yeni Gelenler",
    footerProducts: "Ürünler",
    footerSupport: "Destek",
    footerCustomerService: "Müşteri Hizmetleri",
    shippingInfo: "Kargo Bilgisi",
    returnsExchanges: "İade ve Değişim",
    warranty: "Garanti",
    faq: "Sık Sorulan Sorular",
    footerCompany: "Şirket",
    careers: "Kariyer",
    press: "Basın",
    partnerships: "Ortaklıklar",
    privacyPolicy: "Gizlilik Politikası",
    termsOfService: "Hizmet Şartları",
    cookies: "Çerezler",
    allRightsReserved: "© 2024 Aurum Keys & Sound. Tüm hakları saklıdır.",
    
    // Featured Products Extended
    featuredProductsExtended: "Öne Çıkan Ürünler",
    handPickedInstruments: "Dünyanın en iyi üreticilerinden özenle seçilmiş enstrümanlar",
    viewAllProducts: "Tüm Ürünleri Gör",
    featured: "Öne Çıkan",
    viewDetails: "Detayları Gör",
    off: "İNDİRİM",
    
    // Product Categories Extended
    shopByCategoryExtended: "Kategoriye Göre Alışveriş",
    exploreCarefully: "Özenle seçilmiş premium müzik aletleri ve profesyonel ses ekipmanları koleksiyonumuzu keşfedin",
    exploreCollectionExtended: "Koleksiyonu Keşfet",
    
    // Brand Showcase Extended
    premiumBrandsExtended: "Premium Markalar",
    worldRespectedManufacturers: "Dünyanın en saygın müzik aleti üreticileriyle ortaklık kuruyoruz",
    premiumBrandsCount: "Premium Marka",
    professionalProducts: "Profesyonel Ürün",
    yearsOfExcellence: "Yıllık Mükemmellik",
    
    // Newsletter
    stayInHarmony: "Harmoni İçinde Kalın",
    newsletterDescription: "Yeni varışlar, özel fırsatlar ve premium müzik aletleri dünyasından profesyonel içgörüler hakkında ilk siz haberdar olun.",
    enterEmailAddress: "E-posta adresinizi girin",
    exclusiveProductPreviews: "Özel ürün önizlemeleri",
    professionalTips: "Profesyonel ipuçları ve eğitimler",
    vipDiscounts: "VIP üye indirimleri",
    
    // Search Extended
    searchProductsExtended: "Ürün Ara",
    searchForInstruments: "Enstrüman, marka, model ara...",
    noProductsFound: "için ürün bulunamadı",
    enterSearchTerm: "Ürün aramak için bir terim girin",
    
    // Chatbot specific
    melodyAI: "Melody AI",
    yourMusicalGuide: "Müzikal Rehberiniz",
    chooseOption: "Bir seçenek seçin:",
    showPianos: "Piyano ve klavyeleri göster",
    lookingForGuitars: "Gitar arıyorum",
    whatDrums: "Hangi davullarınız var?",
    showAllInstruments: "Tüm enstrümanları göster",
    beginnerAdvice: "Yeni başlayıcıyım, neyle başlamalıyım?",
    featuredProductsQuestion: "Öne çıkan ürünleriniz neler?",
    beginnerResponse: "Yeni başlayanlar için şunları öneriyorum: 🎹 Klavye/Piyano (müzik teorisi için harika), 🎸 Akustik Gitar (çok yönlü ve taşınabilir), veya 🥁 Elektronik Davul (pratik için ses kontrolü). Her biri müzik öğrenimi için sağlam bir temel sunar!",
    hello: "Merhaba! Ben Melody, müzikal arkadaşınız! 🎵 Harika enstrümanlarımızı keşfetmek için aşağıdaki seçeneklerden birini seçin:",
    
    // Explore Extended
    exploreOurCollection: "Koleksiyonumuzu Keşfedin",
    discoverPremium: "Dünyanın en iyi üreticilerinden premium müzik aletleri ve profesyonel ses ekipmanları keşfedin",
    backToCategories: "Kategorilere Geri Dön",
    keyboardsPianos: "Klavyeler ve Piyanolar",
    premiumWeightedKey: "Premium ağırlıklı tuşlu dijital piyanolar ve synthesizer'lar",
    guitarsExtended: "Gitarlar",
    acousticElectric: "Ünlü markalardan akustik, elektrik ve bas gitarlar",
    drumsPercussion: "Davul ve Perküsyon",
    completeDrumSets: "Komple davul setleri ve perküsyon enstrümanları",
    professionalRecording: "Profesyonel kayıt ve miksleme ekipmanları",
    casesStands: "Kılıflar, standlar, kablolar ve temel aksesuarlar",
    
    // Cart Extended
    yourCartExtended: "Sepetiniz",
    cartEmpty: "Sepetiniz boş",
    backToShop: "Mağazaya Dön",
    shoppingCart: "Alışveriş Sepeti",
    orderSummary: "Sipariş Özeti",
    subtotal: "Ara Toplam",
    itemsCount: "ürün",
    shippingCost: "Kargo",
    free: "Ücretsiz",
    proceedToCheckout: "Ödemeye Geç",
    clearCart: "Sepeti Temizle",
    
    // Back Button
    goBack: "Geri Git",
    
    // Auth Page
    error: "Hata",
    pleaseFileAllFields: "Lütfen tüm alanları doldurun",
    signInFailed: "Giriş Başarısız",
    welcomeBack: "Tekrar hoş geldiniz!",
    signInSuccessfully: "Başarıyla giriş yaptınız.",
    passwordMustBe6: "Şifre en az 6 karakter olmalıdır",
    accountExists: "Hesap mevcut",
    accountAlreadyExists: "Bu e-posta ile bir hesap zaten mevcut. Lütfen giriş yapın.",
    signUpFailed: "Kayıt Başarısız",
    accountCreated: "Hesap oluşturuldu!",
    checkEmailToVerify: "Hesabınızı doğrulamak için lütfen e-postanızı kontrol edin.",
    welcomeToAurum: "Aurum Keys & Sound'a Hoş Geldiniz",
    displayName: "Görünen Ad",
    enterYourName: "Adınızı girin",
    enterYourEmail: "E-postanızı girin",
    enterYourPassword: "Şifrenizi girin",
    createPassword: "Şifre oluşturun (en az 6 karakter)",
    signingIn: "Giriş yapılıyor...",
    creatingAccount: "Hesap oluşturuluyor...",
    
    // Contact Page Extended
    getInTouchContact: "Herhangi bir soru veya destek için ekibimizle iletişime geçin",
    sendUsMessage: "Bize Mesaj Gönderin",
    fullName: "Ad Soyad",
    yourFullName: "Ad ve soyadınız",
    yourEmailExample: "sizin.email@ornek.com",
    whatIsThisRegarding: "Bu konu hakkında nedir?",
    tellUsHowWeCanHelp: "Size nasıl yardımcı olabileceğimizi söyleyin...",
    getInTouchTitle: "İletişime Geçin",
    infoEmail: "info@aurum.com",
    phoneNumber: "+1 (555) 123-4567",
    businessAddress: "123 Müzik Caddesi\nHarmoni Şehri, HC 12345",
    teamContact: "Ekip İletişimi",
    reachOutToSpecific: "Daha hızlı yardım için belirli departmanlara ulaşın",
    salesTeam: "Satış Ekibi",
    productInquiriesOrders: "Ürün sorguları ve siparişler",
    salesEmail: "sales@aurum.com",
    supportTeam: "Destek Ekibi",
    technicalSupportAssistance: "Teknik destek ve yardım",
    supportEmail: "support@aurum.com",
    management: "Yönetim",
    generalInquiriesPartnerships: "Genel sorular ve ortaklıklar",
    adminEmail: "admin@aurum.com",
    productReturnsExchanges: "Ürün iade ve değişimleri",
    returnsEmail: "returns@aurum.com",
    businessHours: "Çalışma Saatleri",
    mondayFriday: "Pazartesi - Cuma",
    nineSix: "09:00 - 18:00",
    saturday: "Cumartesi",
    tenFour: "10:00 - 16:00",
    sunday: "Pazar",
    closed: "Kapalı",
    messageSentSuccessfully: "Mesaj başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
    
    // Favorites Page
    favoritesFeatureDisabled: "Favoriler Özelliği Devre Dışı",
    favoritesTemporarilyDisabled: "Favoriler özelliği geçici olarak devre dışı bırakılmıştır. Lütfen harika enstrüman koleksiyonumuzu keşfedin.",
    exploreProducts: "Ürünleri Keşfet",
    
    // Product names - Turkish
    productMidiKeyboard: "Profesyonel MIDI Klavye",
    productYamahaPiano: "Yamaha Dijital Piyano",
    productElectricGuitar: "Elektrik Gitar",
    productDrumKit: "Elektronik Davul Seti",
    productSynthesizer: "Profesyonel Synthesizer",
    productStudioMic: "Stüdyo Mikrofonu",
    productAcousticViolin: "Akustik Keman",
    productAudioEquipment: "Profesyonel Ses Ekipmanı",
    productPremiumKeyboard: "Premium Klavye",
    
    // Categories - Turkish
    categoryKeyboards: "Klavyeler ve Piyanolar",
    categoryGuitars: "Gitarlar",
    categoryDrums: "Davul ve Perküsyon",
    categoryViolins: "Kemanlar", 
    categoryAudio: "Ses Ekipmanları",
    categoryAccessories: "Aksesuarlar",
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