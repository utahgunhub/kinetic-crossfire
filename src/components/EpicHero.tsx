import { TacticalButton } from "@/components/TacticalButton";
import { Link } from "react-router-dom";

const EpicHero = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background video with vignette */}
      <div className="absolute inset-0">
        <video
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex items-center min-h-[calc(100vh-80px)]">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <span className="inline-block text-tactical-green text-lg tracking-[0.35em] font-semibold uppercase">
              Kinetic Crossfire
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
              Slide Stock Assist
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A precision-weighted accessory that enhances your Slide Fire SSAR-15 SBS stock for
            blazingly fast, consistent follow-up shots. Simple Install. No mods. All control.
            Built in the USA.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Link to="/product/slide-stock-assist">
              <TacticalButton variant="primary" size="lg" className="text-lg px-10 py-6">
                Buy Now — $19.95
              </TacticalButton>
            </Link>
            <Link to="/shop/ar#products">
              <TacticalButton variant="secondary" size="lg" className="text-lg px-8 py-6">
                Complete Setup
              </TacticalButton>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center">
            <div className="rounded border border-tactical-green-dim/30 p-4 bg-black/20">
              <p className="text-foreground font-semibold">Patent Pending</p>
              <p className="text-xs text-muted-foreground">Innovation protected</p>
            </div>
            <div className="rounded border border-tactical-green-dim/30 p-4 bg-black/20">
              <p className="text-foreground font-semibold">NFA Compliant</p>
              <p className="text-xs text-muted-foreground">Legal compliance</p>
            </div>
            <div className="rounded border border-tactical-green-dim/30 p-4 bg-black/20">
              <p className="text-foreground font-semibold">Garland v. Cargill</p>
              <p className="text-xs text-muted-foreground">602 U.S. (2024)</p>
            </div>
            <div className="rounded border border-tactical-green-dim/30 p-4 bg-black/20">
              <p className="text-foreground font-semibold">NAGR v. Garland</p>
              <p className="text-xs text-muted-foreground">(2024)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient tie-in */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-tactical-dark to-transparent"></div>
    </section>
  );
};

export default EpicHero;


