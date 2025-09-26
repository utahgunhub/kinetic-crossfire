import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

const Purchase = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wider mb-6">
              Purchase
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get the complete setup: Our precision-engineered Slide Stock Assist accessory 
              and the Slide Fire SSAR-15 SBS stock it enhances. Made in USA quality.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-tactical-dark rounded-lg border border-tactical-green-dim/30 overflow-hidden hover:border-tactical-green/50 transition-all duration-300 hover:scale-[1.02] flex flex-col">
                  {/* Product Image */}
                  <div className="relative h-80">
                    <img 
                      src={product.images[0].src} 
                      alt={product.images[0].alt} 
                      className="w-full h-full object-contain bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tactical-dark/80 to-transparent"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-foreground tracking-wider">
                          {product.name}
                        </h3>
                        {product.manufacturer && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            product.isKineticCrossfireProduct 
                              ? 'bg-tactical-green text-tactical-dark' 
                              : 'bg-gray-600 text-gray-200'
                          }`}>
                            {product.manufacturer}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mb-4">
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
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Key Features Preview */}
                    <div className="space-y-2 mb-6 flex-grow">
                      <h4 className="text-sm font-semibold text-tactical-green uppercase tracking-wider">
                        Key Features:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-tactical-green rounded-full flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                        {product.features.length > 3 && (
                          <li className="text-tactical-green text-xs">
                            +{product.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Button aligned to bottom */}
                    <div className="mt-auto">
                      <Link to={`/product/${product.id}`}>
                        <TacticalButton variant="primary" size="lg" className="w-full text-lg py-4">
                          View Details & Purchase
                        </TacticalButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center tracking-wider">
              Complete Your Setup
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our Slide Stock Assist accessory is specifically designed to enhance the performance of 
              Slide Fire Solutions SSAR-15 SBS stocks. Get both for the ultimate shooting experience.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30 text-center">
                <div className="w-12 h-12 bg-tactical-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-tactical-dark font-bold text-xl">🇺🇸</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Made in USA</h3>
                <p className="text-muted-foreground text-sm">
                  Our Slide Stock Assist is precision engineered and manufactured in the United States with the highest quality standards.
                </p>
              </div>
              <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30 text-center">
                <div className="w-12 h-12 bg-tactical-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-tactical-dark font-bold text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Fast Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Ships within 1-2 business days with secure packaging and tracking included.
                </p>
              </div>
              <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30 text-center">
                <div className="w-12 h-12 bg-tactical-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-tactical-dark font-bold text-xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">30-Day Returns</h3>
                <p className="text-muted-foreground text-sm">
                  Not satisfied? Return your purchase within 30 days for a full refund.
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
