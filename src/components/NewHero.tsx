import { TacticalButton } from "@/components/TacticalButton";
import heroBackground from "@/assets/hero-background.jpg";

const NewHero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Tactical Operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-tactical-dark/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-8 px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-wider">
            CROSSFIRE IS BACK
          </h1>
          
          <TacticalButton variant="secondary" size="lg" className="text-xl px-12 py-6">
            SHOP NOW
          </TacticalButton>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-tactical-dark to-transparent"></div>
    </section>
  );
};

export default NewHero;