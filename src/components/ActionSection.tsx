import { TacticalButton } from "@/components/TacticalButton";

const ActionSection = () => {
  return (
    <section className="py-24 bg-tactical-darker relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <p className="text-tactical-green text-lg font-semibold tracking-wider uppercase">
              Product Specifications
            </p>
            <h2 className="text-4xl font-bold text-foreground tracking-wider">
              COMPATIBILITY & USAGE
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Compatibility */}
            <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30">
              <h3 className="text-2xl font-bold text-foreground mb-6 tracking-wider">
                COMPATIBLE WITH
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tactical-green rounded-full"></div>
                  <span className="text-muted-foreground">Slide Fire Solutions SSAR-15 SBS Stock</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tactical-green rounded-full"></div>
                  <span className="text-muted-foreground">AR-15 rifle platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tactical-green rounded-full"></div>
                  <span className="text-muted-foreground">.556 Ammunition (recommended)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tactical-green rounded-full"></div>
                  <span className="text-muted-foreground">All mil-spec triggers and parts</span>
                </div>
              </div>
            </div>
            
            {/* Usage Notes */}
            <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30">
              <h3 className="text-2xl font-bold text-foreground mb-6 tracking-wider">
                USAGE NOTES
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Higher rate of follow-up shots means your firearm needs <span className="text-tactical-green">more oil than usual</span> and <span className="text-tactical-green">frequent cleaning</span>.
                </p>
                <p>
                  Trigger retaining pins may work out under high rate of fire. Monitor and maintain accordingly.
                </p>
                <p>
                  <span className="text-tactical-green">Gas block adjustment</span> may be necessary. Designed for .556 ammunition - .223 may not function optimally.
                </p>
                <p>
                  Best results with: <span className="text-tactical-green">clean, well-lubricated gun, lighter trigger weights, higher pressure loads</span>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <TacticalButton variant="primary" size="lg" className="text-xl px-12 py-6">
              ORDER NOW - $19.95
            </TacticalButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;