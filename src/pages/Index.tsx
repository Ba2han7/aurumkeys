import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandShowcase from "@/components/BrandShowcase";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

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
    </div>
  );
};

export default Index;
