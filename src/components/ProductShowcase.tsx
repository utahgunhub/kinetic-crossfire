import tacticalProduct from "@/assets/tactical-product.jpg";
import { TacticalButton } from "@/components/TacticalButton";

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
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-foreground tracking-wider">
                OUR PRODUCTS
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Upgrade your <span className="text-tactical-green font-semibold">AR-15</span> or{" "}
                  <span className="text-tactical-green font-semibold">AK-47</span> / AKM rifle with precision-engineered{" "}
                  <span className="text-tactical-green font-semibold">crossfire systems</span> from Kinetic Crossfire Solutions.
                </p>
                
                <p>
                  Our products are designed for smooth, reliable{" "}
                  <span className="text-tactical-green font-semibold">bump-fire operation</span>, combining high-strength polymer construction with safety and performance in mind.
                </p>
                
                <p>
                  Whether you're customizing your <span className="text-tactical-green font-semibold">AR-15</span> for{" "}
                  <span className="text-tactical-green font-semibold">tactical enhancements</span> or adding{" "}
                  <span className="text-tactical-green font-semibold">modular upgrades</span> to your{" "}
                  <span className="text-tactical-green font-semibold">AK-47</span>, Slide Fire bump stocks offer easy installation and allow you to switch between{" "}
                  <span className="text-tactical-green font-semibold">semi-auto and bump fire modes</span> with a simple turn.
                </p>
                
                <p>
                  From single-ready builds to compliant customizations, Kinetic Crossfire Solutions delivers trusted{" "}
                  <span className="text-tactical-green font-semibold">AR and AK accessories</span> that give you control, comfort, and unmatched fun.
                </p>
              </div>
            </div>
            
            <TacticalButton variant="primary" size="lg" className="text-lg">
              VIEW PRODUCTS
            </TacticalButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;