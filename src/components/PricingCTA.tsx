import { TacticalButton } from "@/components/TacticalButton";
import { Link } from "react-router-dom";

const PricingCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-tactical-dark to-tactical-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider text-foreground">Own The Rhythm</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your shooting experience with our precision accessory. Get just the Slide Stock Assist 
            or the complete setup with the SSAR-15 SBS stock.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Just the Accessory */}
            <div className="bg-tactical-surface/60 rounded-lg p-6 border border-tactical-green-dim/30">
              <h3 className="text-xl font-bold text-foreground mb-2">Slide Stock Assist Only</h3>
              <p className="text-sm text-muted-foreground mb-4">Perfect if you already have the SSAR-15 SBS stock</p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-3xl font-bold text-tactical-green">$19.95</span>
                <span className="text-lg line-through text-muted-foreground">$23.00</span>
                <span className="bg-tactical-green text-tactical-dark px-2 py-1 rounded text-xs font-bold">Save $3.05</span>
              </div>
              <Link to="/product/slide-stock-assist">
                <TacticalButton variant="primary" size="lg" className="w-full">Get the Accessory</TacticalButton>
              </Link>
            </div>

            {/* Complete Setup */}
            <div className="bg-tactical-green/10 rounded-lg p-6 border border-tactical-green relative">
              <div className="absolute -top-2 -right-2 bg-tactical-green text-tactical-dark px-2 py-1 rounded text-xs font-bold">
                Popular
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Complete Setup</h3>
              <p className="text-sm text-muted-foreground mb-4">SSAR-15 SBS stock + Slide Stock Assist accessory</p>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-tactical-green">$218.95</span>
                <p className="text-xs text-muted-foreground">Everything you need</p>
              </div>
              <Link to="/purchase">
                <TacticalButton variant="primary" size="lg" className="w-full">View Complete Setup</TacticalButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;


