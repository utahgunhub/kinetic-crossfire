import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { getProductById } from "@/data/products";
import { Link } from "react-router-dom";

const Purchase = () => {
  const thompsonProduct = getProductById("thompson-blow-back-trigger");
  const thompsonChargingHandle = getProductById("thompson-charging-handle");
  const thompsonTopChargingHandle = getProductById("thompson-top-charging-handle");
  const gunMat = getProductById("thompson-gun-mat");
  const publicEnemyHat = getProductById("public-enemy-hat");

  if (!thompsonProduct || !thompsonChargingHandle || !thompsonTopChargingHandle || !gunMat || !publicEnemyHat) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative py-24 bg-tactical-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,204,230,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(102,204,230,0.06),transparent_35%)]" />
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Shop Thompson</p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wider mb-6">
              Thompson Parts & Apparel
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Forced reset triggers, charging handles, gun mats, and caps built for the Thompson platform.
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
                  alt={thompsonProduct.name}
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
                  src={thompsonChargingHandle.images[0].src}
                  alt={thompsonChargingHandle.images[0].alt}
                  className="w-full h-80 object-cover bg-white"
                  style={{ objectPosition: thompsonChargingHandle.images[0].objectPosition ?? "center" }}
                />
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Thompson Platform</p>
                  <h2 className="text-3xl font-bold text-foreground mb-3">{thompsonChargingHandle.name}</h2>
                  {thompsonChargingHandle.inStock === false && (
                    <span className="inline-block mb-3 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider">
                      Out of Stock
                    </span>
                  )}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Steel charging handle with black oxide finish for easier M1 Thompson charging handle operation.
                  </p>
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-3xl font-bold text-tactical-green">
                      ${thompsonChargingHandle.price.toFixed(2)}
                    </span>
                  </div>
                  <Link to={`/product/${thompsonChargingHandle.id}`} className="mt-auto">
                    <TacticalButton
                      variant={thompsonChargingHandle.inStock === false ? "secondary" : "primary"}
                      size="lg"
                      className="w-full text-lg py-4"
                    >
                      {thompsonChargingHandle.inStock === false ? "View Product" : "View Charging Handle"}
                    </TacticalButton>
                  </Link>
                </div>
              </div>

              <div className="bg-tactical-dark rounded-2xl border border-tactical-green-dim/30 overflow-hidden flex flex-col">
                <img
                  src={thompsonTopChargingHandle.images[0].src}
                  alt={thompsonTopChargingHandle.images[0].alt}
                  className="w-full h-80 object-cover bg-white"
                />
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Thompson Platform</p>
                  <h2 className="text-3xl font-bold text-foreground mb-3">{thompsonTopChargingHandle.name}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Contoured steel top charging handle with rounded, chamfered edges for the 1927A Thompson.
                  </p>
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-3xl font-bold text-tactical-green">
                      ${thompsonTopChargingHandle.price.toFixed(2)}
                    </span>
                  </div>
                  <Link to={`/product/${thompsonTopChargingHandle.id}`} className="mt-auto">
                    <TacticalButton variant="primary" size="lg" className="w-full text-lg py-4">
                      View Top Charging Handle
                    </TacticalButton>
                  </Link>
                </div>
              </div>

              <div className="bg-tactical-dark rounded-2xl border border-tactical-green-dim/30 overflow-hidden flex flex-col">
                <img
                  src={publicEnemyHat.images[0].src}
                  alt={publicEnemyHat.images[0].alt}
                  className="w-full h-80 object-cover bg-white"
                />
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Apparel & Accessories</p>
                  <h2 className="text-3xl font-bold text-foreground mb-3">Gun Mats & Apparel</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Thompson gun mats, caps, and other gear—including the Public Enemy ball cap and
                    Chicago Typewriter cap.
                  </p>
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="text-3xl font-bold text-tactical-green">
                      From ${gunMat.price.toFixed(2)}
                    </span>
                  </div>
                  <Link to="/shop/apparel" className="mt-auto">
                    <TacticalButton variant="secondary" size="lg" className="w-full text-lg py-4">
                      Shop Apparel
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
              Durable Thompson parts, straightforward installation, and fast fulfillment.
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
                  Clear product pages with platform-specific messaging, compatibility details, and easy checkout.
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
