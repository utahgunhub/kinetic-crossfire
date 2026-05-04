import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { getProductById } from "@/data/products";
import { Link } from "react-router-dom";

const Purchase = () => {
  const thompsonProduct = getProductById("thompson-blow-back-trigger");
  const arProduct = getProductById("slide-stock-assist");

  if (!thompsonProduct || !arProduct) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative py-24 bg-tactical-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,204,230,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(102,204,230,0.06),transparent_35%)]" />
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Choose Your Platform</p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wider mb-6">
              Shop Thompson or AR
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Thompson and AR products now live on separate pages so each platform has its own dedicated
              buying experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-tactical-dark rounded-2xl border border-tactical-green-dim/30 overflow-hidden flex flex-col">
                <img
                  src="/thompson-frt/new-product-image.webp"
                  alt="Thompson Blow-Back Trigger"
                  className="w-full h-80 object-cover"
                />
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Thompson Platform</p>
                  <h2 className="text-3xl font-bold text-foreground mb-3">{thompsonProduct.name}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Go straight to the Thompson product page for pricing, compatibility, usage details,
                    and checkout.
                  </p>
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-3xl font-bold text-tactical-green">
                      ${thompsonProduct.price.toFixed(2)}
                    </span>
                    <span className="bg-tactical-green/15 text-tactical-green px-2 py-1 rounded text-xs font-bold border border-tactical-green/30">
                      Free Shipping
                    </span>
                  </div>
                  <Link to={`/product/${thompsonProduct.id}`} className="mt-auto">
                    <TacticalButton variant="primary" size="lg" className="w-full text-lg py-4">
                      View Thompson Product
                    </TacticalButton>
                  </Link>
                </div>
              </div>

              <div className="bg-tactical-dark rounded-2xl border border-tactical-green-dim/30 overflow-hidden flex flex-col">
                <img
                  src={arProduct.images[0].src}
                  alt={arProduct.images[0].alt}
                  className="w-full h-80 object-cover bg-white"
                />
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">AR Platform</p>
                  <h2 className="text-3xl font-bold text-foreground mb-3">AR Product Line</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    All of the original AR-focused homepage content now lives on its own page, alongside
                    the Slide Stock Assist and the compatible SSAR-15 SBS setup.
                  </p>
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-3xl font-bold text-tactical-green">
                      ${arProduct.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">plus full AR setup options</span>
                  </div>
                  <Link to="/shop/ar" className="mt-auto">
                    <TacticalButton variant="secondary" size="lg" className="w-full text-lg py-4">
                      Shop AR
                    </TacticalButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center tracking-wider">
              Why Customers Choose Kinetic Crossfire
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Whether you are shopping Thompson or AR products, the focus stays on durable parts,
              straightforward installation, and fast fulfillment.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30 text-center">
                <div className="w-12 h-12 bg-tactical-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-tactical-dark font-bold text-xl">🇺🇸</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Made in USA</h3>
                <p className="text-muted-foreground text-sm">
                  Kinetic Crossfire products are engineered and manufactured in the United States with a focus on durability and performance.
                </p>
              </div>
              <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30 text-center">
                <div className="w-12 h-12 bg-tactical-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-tactical-dark font-bold text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Dedicated Product Pages</h3>
                <p className="text-muted-foreground text-sm">
                  Thompson and AR shoppers each get a cleaner path with platform-specific messaging and product discovery.
                </p>
              </div>
              <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30 text-center">
                <div className="w-12 h-12 bg-tactical-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-tactical-dark font-bold text-xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">No Returns</h3>
                <p className="text-muted-foreground text-sm">
                  All sales are final. We do not accept returns or offer refunds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Purchase;
