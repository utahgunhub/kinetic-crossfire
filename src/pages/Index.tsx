import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Link } from "react-router-dom";
import { getProductById } from "@/data/products";

const Index = () => {
  const thompsonProduct = getProductById("thompson-blow-back-trigger");
  const arProduct = getProductById("ssar-15-sbs");

  if (!thompsonProduct || !arProduct) {
    return null;
  }

  const homepageThompsonFeatures = thompsonProduct.features.filter(
    (feature) => feature !== "Made in the USA" && feature !== "Free shipping included"
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/thompson-frt/thompson-frt-demo-1.mp4"
            poster="/thompson-frt/product-picture.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-tactical-dark via-transparent to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 min-h-[calc(100vh-64px)] flex items-center">
          <div className="w-full">
            <div className="max-w-3xl">
              <p className="text-tactical-green text-sm md:text-base font-semibold uppercase tracking-[0.4em] mb-4">
                New Product Release
              </p>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
                Thompson Blow-Back Trigger
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                An FRT for Auto Ordnance and Kahr Arms Thompson carbines and pistols, built to deliver
                blistering follow-up shots with a feel true to the original Thompson platform.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 rounded-full border border-tactical-green/30 bg-tactical-green/10 text-tactical-green font-semibold">
                  $275
                </span>
                <span className="px-4 py-2 rounded-full border border-tactical-green/30 bg-black/20 text-foreground font-semibold">
                  Free Shipping
                </span>
                <span className="px-4 py-2 rounded-full border border-tactical-green/30 bg-black/20 text-foreground font-semibold">
                  Made in USA
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/product/${thompsonProduct.id}`}>
                  <TacticalButton variant="primary" size="lg" className="w-full sm:w-auto text-lg px-10">
                    Buy Now
                  </TacticalButton>
                </Link>
                <a href="#thompson-details">
                  <TacticalButton variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-10">
                    Learn More
                  </TacticalButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Shop By Platform</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Thompson Leads, AR Still Available
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                The homepage now centers the Thompson FRT while keeping the AR lineup easy to find for returning customers.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden border border-tactical-green-dim/30 bg-tactical-surface/70 flex flex-col h-full">
                <img
                  src="/thompson-frt/thompson-gun-4.JPG"
                  alt="Thompson platform"
                  className="w-full h-72 object-cover"
                />
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-tactical-green mb-3">Thompson Platform</p>
                  <h3 className="text-3xl font-bold text-foreground mb-3">{thompsonProduct.name}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    Designed for Auto Ordnance and Kahr Arms Thompson carbines and pistols, with durable
                    steel construction and installation that stays straightforward.
                  </p>
                  <Link to={`/product/${thompsonProduct.id}`}>
                    <TacticalButton variant="primary" size="lg" className="w-full">
                      Shop Thompson
                    </TacticalButton>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-tactical-green-dim/30 bg-tactical-surface/70 flex flex-col h-full">
                <img
                  src={arProduct.images[0].src}
                  alt={arProduct.images[0].alt}
                  className="w-full h-72 object-cover bg-white"
                />
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-tactical-green mb-3">AR Platform</p>
                  <h3 className="text-3xl font-bold text-foreground mb-3">Slide Fire SSAR-15 SBS</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    Premium bump stock by Slide Fire Solutions for AR-15 platforms. Works perfectly
                    with our Slide Stock Assist accessory.
                  </p>
                  <Link to="/shop/ar">
                    <TacticalButton variant="secondary" size="lg" className="w-full">
                      Shop AR
                    </TacticalButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="thompson-details" className="py-20 bg-tactical-surface scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Thompson Details</p>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Built for Speed, Heat, and Simplicity
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {thompsonProduct.detailedDescription}
                </p>
                <p>
                  Installation only requires a flathead screwdriver plus a punch and hammer or similar tool,
                  making the product approachable even for customers without prior firearm assembly experience.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-tactical-green-dim/30 bg-tactical-dark p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Platform Fit</h3>
                <p className="text-muted-foreground text-sm">
                  Works across Auto Ordnance and Kahr Arms Thompson carbines and pistols.
                </p>
              </div>
              <div className="rounded-xl border border-tactical-green-dim/30 bg-tactical-dark p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Durable Build</h3>
                <p className="text-muted-foreground text-sm">
                  Machined from an extremely robust steel alloy for rapid fire and high heat use.
                </p>
              </div>
              <div className="rounded-xl border border-tactical-green-dim/30 bg-tactical-dark p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Simple Install</h3>
                <p className="text-muted-foreground text-sm">
                  Minimal tools, straightforward installation, and no deep prior experience required.
                </p>
              </div>
              <div className="rounded-xl border border-tactical-green-dim/30 bg-tactical-dark p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Free Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Thompson orders are priced at $275 with free shipping already included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-tactical-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(102,204,230,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(102,204,230,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-tactical-green tracking-wider mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch the Thompson Blow-Back Trigger deliver the fast, authentic feel it was built for.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-tactical-green-dim/30 shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/7VWUIwBz-4o?si=Wg_EWjsqsfOb_7MO"
                title="Thompson Blow-Back Trigger Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-lg mb-4">
                See the Thompson FRT running live before you head to the product page.
              </p>
              <Link
                to={`/product/${thompsonProduct.id}`}
                className="inline-flex items-center text-tactical-green hover:text-tactical-green-glow transition-colors font-semibold"
              >
                View Product Details
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="bg-tactical-surface rounded-2xl border border-tactical-green-dim/30 overflow-hidden">
              <img
                src={thompsonProduct.images[0].src}
                alt={thompsonProduct.images[0].alt}
                className="w-full h-[28rem] object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <h2 className="text-3xl font-bold text-foreground">{thompsonProduct.name}</h2>
                  <span className="bg-tactical-green text-tactical-dark px-3 py-1 rounded text-sm font-bold">
                    ${thompsonProduct.price.toFixed(2)} with free shipping
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {thompsonProduct.description}
                </p>

                <div className="space-y-2 mb-8">
                  <h3 className="text-sm font-semibold text-tactical-green uppercase tracking-wider">
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {homepageThompsonFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={`/product/${thompsonProduct.id}`}>
                  <TacticalButton variant="primary" size="lg" className="w-full text-lg py-4">
                    View Product Details
                  </TacticalButton>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-tactical-green-dim/30 bg-tactical-surface p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Tools Required</h3>
                <p className="text-muted-foreground">
                  Flathead screwdriver, punch and hammer or similar.
                </p>
              </div>

              <div className="rounded-2xl border border-tactical-green-dim/30 bg-tactical-surface p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Compatibility</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {thompsonProduct.compatibility?.compatibleWith.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-tactical-green-dim/30 bg-tactical-surface p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Included Benefits</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Made in the USA</li>
                  <li>• Free shipping included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-tactical-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Attention</p>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Best-Use Considerations
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                These recommendations are important for the ideal Thompson Blow-Back Trigger experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {thompsonProduct.compatibility?.usageNotes.map((note) => (
                <div key={note} className="rounded-xl border border-tactical-green-dim/30 bg-tactical-surface/80 p-6">
                  <p className="text-muted-foreground leading-relaxed">{note}</p>
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

export default Index;