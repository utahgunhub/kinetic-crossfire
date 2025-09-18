import Navigation from "@/components/Navigation";
import NewHero from "@/components/NewHero";
import CategorySection from "@/components/CategorySection";
import ProductShowcase from "@/components/ProductShowcase";
import ActionSection from "@/components/ActionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <NewHero />
      <CategorySection />
      <ProductShowcase />
      <ActionSection />
      <Footer />
    </div>
  );
};

export default Index;