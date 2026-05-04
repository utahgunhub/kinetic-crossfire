import { TacticalButton } from "@/components/TacticalButton";
import { Link } from "react-router-dom";

const NewHero = () => {
  return (
    <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-image.webp"
          alt="Tactical Operations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-tactical-dark/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center space-y-8 px-6">
          <p className="text-tactical-green text-2xl md:text-3xl font-semibold tracking-wider uppercase">
            Kinetic Crossfire
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-foreground tracking-wider">
            SLIDE STOCK ASSIST
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your Slide Fire SSAR-15 SBS Stock with rapid, consistent follow-up shots. 
              No modifications required - Made in USA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/product/slide-stock-assist">
                <TacticalButton variant="primary" size="lg" className="text-xl px-12 py-6">
                  ORDER NOW - $19.95
                </TacticalButton>
              </Link>
              <p className="text-tactical-green font-semibold">
                <span className="line-through text-muted-foreground">$23.00</span> Save $3.05
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-tactical-dark to-transparent"></div>
    </section>
  );
};

export default NewHero;