import { TacticalButton } from "@/components/TacticalButton";
import tacticalProduct from "@/assets/tactical-product.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-tactical flex items-center justify-center relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-tactical-surface border border-tactical-green-dim rounded-sm">
                <span className="text-tactical-green text-sm font-mono tracking-wider uppercase">
                  Military Grade
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                KINETIC
                <br />
                <span className="text-tactical-green">CROSSFIRE</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Precision-engineered tactical equipment designed for professionals 
                who demand excellence. Built to perform when it matters most.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <TacticalButton variant="primary" size="lg">
                Order Now - $299
              </TacticalButton>
              <TacticalButton variant="secondary" size="lg">
                View Specs
              </TacticalButton>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-tactical-green rounded-full animate-pulse"></div>
                <span>In Stock</span>
              </div>
              <div>Free Shipping Worldwide</div>
              <div>30-Day Guarantee</div>
            </div>
          </div>
          
          {/* Product Image */}
          <div className="relative animate-fade-in-up [animation-delay:0.3s]">
            <div className="relative">
              <img
                src={tacticalProduct}
                alt="Kinetic Crossfire Tactical Device"
                className="w-full h-auto max-w-md mx-auto rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tactical-green/20 to-transparent rounded-lg"></div>
              <div className="absolute -inset-4 bg-tactical-green/10 rounded-lg blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;