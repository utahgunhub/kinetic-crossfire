import { TacticalButton } from "@/components/TacticalButton";

const PricingCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-tactical-dark to-tactical-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider text-foreground">Own The Rhythm</h2>
          <p className="text-muted-foreground text-lg">
            Slide Stock Assist — No tools. No hassle. All control.
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-4xl font-bold text-tactical-green">$19.95</span>
            <span className="text-xl line-through text-muted-foreground">$23.00</span>
            <span className="bg-tactical-green text-tactical-dark px-2 py-1 rounded text-sm font-bold">Save $3.05</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TacticalButton variant="primary" size="lg" className="text-lg px-10 py-6">Add to Cart</TacticalButton>
            <TacticalButton variant="secondary" size="lg" className="text-lg px-8 py-6">Learn More</TacticalButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;


