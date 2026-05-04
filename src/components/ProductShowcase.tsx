import tacticalProduct from "@/assets/tactical-product.webp";
import { TacticalButton } from "@/components/TacticalButton";
import { Link } from "react-router-dom";

const ProductShowcase = () => {
  return (
    <section className="py-24 bg-tactical-surface relative overflow-hidden">
      {/* Diagonal green background element */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-tactical-green transform -skew-x-12 origin-top-left opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <div className="relative">
            <img
              src={tacticalProduct}
              alt="Kinetic Crossfire System"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="absolute -inset-4 bg-tactical-green/20 rounded-lg blur-xl"></div>
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-foreground tracking-wider mb-2">
                  SLIDE STOCK ASSIST
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-tactical-green">$19.95</span>
                  <span className="text-xl text-muted-foreground line-through">$23.00</span>
                  <span className="bg-tactical-green text-tactical-dark px-2 py-1 rounded text-sm font-bold">
                    SAVE $3.05
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  The <span className="text-tactical-green font-semibold">Slide Stock Assist</span> is a simple device that attaches to{" "}
                  <span className="text-tactical-green font-semibold">Slide Fire SSAR-15 SBS Stocks</span> for extremely rapid, consistent follow-up shots.
                </p>
                
                <p>
                  There are <span className="text-tactical-green font-semibold">no special tools or modifications</span> required for installation, and no additional parts such as full-auto bolt carrier groups or trigger modifications are necessary.
                </p>
                
                <p>
                  The Slide Assist enables <span className="text-tactical-green font-semibold">all users to operate it without special technique</span>, even one handed. It is designed to function on all{" "}
                  <span className="text-tactical-green font-semibold">mil-spec parts</span>. Made in the USA.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/product/slide-stock-assist" className="flex-1">
                <TacticalButton variant="primary" size="lg" className="text-lg w-full">
                  ADD TO CART - $19.95
                </TacticalButton>
              </Link>
              <Link to="/product/slide-stock-assist">
                <TacticalButton variant="secondary" size="lg" className="text-lg">
                  LEARN MORE
                </TacticalButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;