import Navigation from "@/components/Navigation";
import EpicHero from "@/components/EpicHero";
import FeatureGrid from "@/components/FeatureGrid";
import VideoDemo from "@/components/VideoDemo";
import HowItWorks from "@/components/HowItWorks";
import SpecsCompatibility from "@/components/SpecsCompatibility";
import Gallery from "@/components/Gallery";
import PricingCTA from "@/components/PricingCTA";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const ARPlatform = () => {
  const arProducts = products.filter((product) => product.category === "ar");

  return (
    <div className="min-h-screen">
      <Navigation />
      <EpicHero />
      <FeatureGrid />
      <VideoDemo />
      <HowItWorks />
      <SpecsCompatibility />

      <section id="products" className="py-16 bg-tactical-surface scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">AR Products</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-wider mb-4">
                Shop the AR Setup
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Everything that used to lead the homepage now lives here, along with the AR products
                themselves so customers can browse and buy from one dedicated page.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {arProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 overflow-hidden hover:border-tactical-green/50 transition-all duration-300 hover:scale-[1.02] flex flex-col"
                >
                  <div className="relative h-80">
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      className="w-full h-full object-cover bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tactical-dark/80 to-transparent"></div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2 gap-4">
                      <h3 className="text-2xl font-bold text-foreground tracking-wider">
                        {product.name}
                      </h3>
                      {product.manufacturer && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                            product.isKineticCrossfireProduct
                              ? "bg-tactical-green text-tactical-dark"
                              : "bg-gray-600 text-gray-200"
                          }`}
                        >
                          {product.manufacturer}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      <span className="text-3xl font-bold text-tactical-green">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-xl text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                          <span className="bg-tactical-green text-tactical-dark px-2 py-1 rounded text-xs font-bold">
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </span>
                        </>
                      )}
                      {product.isKineticCrossfireProduct && (
                        <span className="bg-tactical-green/15 text-tactical-green px-2 py-1 rounded text-xs font-bold border border-tactical-green/30">
                          Free Shipping
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-6 flex-grow">
                      <h4 className="text-sm font-semibold text-tactical-green uppercase tracking-wider">
                        Key Features:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {product.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tactical-green rounded-full flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link to={`/product/${product.id}`} className="mt-auto">
                      <TacticalButton variant="primary" size="lg" className="w-full text-lg py-4">
                        View Details & Purchase
                      </TacticalButton>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PricingCTA />
      <Gallery />
      <Footer />
    </div>
  );
};

export default ARPlatform;
