import Navigation from "@/components/Navigation";
import EpicHero from "@/components/EpicHero";
import FeatureGrid from "@/components/FeatureGrid";
import VideoDemo from "@/components/VideoDemo";
import HowItWorks from "@/components/HowItWorks";
import SpecsCompatibility from "@/components/SpecsCompatibility";
import Gallery from "@/components/Gallery";
import PricingCTA from "@/components/PricingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <EpicHero />
      <FeatureGrid />
      <VideoDemo />
      <HowItWorks />
      <SpecsCompatibility />
      <Gallery />
      <PricingCTA />
      <Footer />
    </div>
  );
};

export default Index;