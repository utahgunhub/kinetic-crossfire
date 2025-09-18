import { TacticalButton } from "@/components/TacticalButton";

const CallToAction = () => {
  return (
    <section className="py-24 bg-gradient-tactical relative overflow-hidden">
      {/* Tactical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-foreground">
              Ready for <span className="text-tactical-green">Mission Critical</span> Performance?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who trust Kinetic Crossfire for their most demanding operations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <TacticalButton variant="primary" size="lg" className="text-lg">
              Order Now - $299
            </TacticalButton>
            <TacticalButton variant="ghost" size="lg">
              Contact Sales Team
            </TacticalButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-tactical-green-dim/30">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-tactical-green">5000+</div>
              <div className="text-muted-foreground">Units Deployed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-tactical-green">99.9%</div>
              <div className="text-muted-foreground">Mission Success Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-tactical-green">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;