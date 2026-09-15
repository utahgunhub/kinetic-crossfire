import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useProductCatalog } from "@/contexts/ProductCatalogContext";
import { Link } from "react-router-dom";
import { isProductOnSale } from "@/lib/sale";
import { SaleBadge, SalePrice } from "@/components/SalePrice";

const Apparel = () => {
  const { getProductsByCategory } = useProductCatalog();
  const apparelProducts = getProductsByCategory("apparel");

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative py-24 bg-tactical-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(102,204,230,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(102,204,230,0.06),transparent_35%)]" />
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Apparel & Accessories</p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-wider mb-6">
              Shop Apparel
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Gun mats, caps, and other Kinetic Crossfire gear live here—separate from the Thompson
              and AR parts lineup, with more designs on the way.
            </p>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 bg-tactical-surface scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {apparelProducts.map((product) => (
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
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isProductOnSale(product.id) && <SaleBadge />}
                        {product.manufacturer && (
                        <span className="text-xs px-2 py-1 rounded-full whitespace-nowrap bg-tactical-green text-tactical-dark">
                          {product.manufacturer}
                        </span>
                      )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <SalePrice
                        price={product.price}
                        originalPrice={product.originalPrice}
                        size="md"
                      />
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

      <Footer />
    </div>
  );
};

export default Apparel;
