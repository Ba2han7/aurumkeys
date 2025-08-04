import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandShowcase from "@/components/BrandShowcase";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ChatbotAdvisor from "@/components/ChatbotAdvisor";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <FeaturedProducts />
        <BrandShowcase />
        <Newsletter />
      </main>
      <Footer />
      <ChatbotAdvisor />
    </div>
  );
};

export default Index;
