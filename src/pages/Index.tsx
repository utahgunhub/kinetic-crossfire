import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Specifications from "@/components/Specifications";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Specifications />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;