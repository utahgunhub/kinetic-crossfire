import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Link } from "react-router-dom";
import { getStockStatusLabel } from "@/data/products";
import { useProductCatalog } from "@/contexts/ProductCatalogContext";
import {
  thompsonFiringPinFitmentVideo,
  thompsonFrtDemoVideos,
  thompsonFrtInstallVideo,
} from "@/data/thompsonVideos";
import VimeoEmbed from "@/components/VimeoEmbed";
import { Star, Quote } from "lucide-react";
import { isProductOnSale } from "@/lib/sale";

const Index = () => {
  const { getProductById } = useProductCatalog();
  const thompsonProduct = getProductById("thompson-blow-back-trigger");
  const thompsonChargingHandle = getProductById("thompson-charging-handle");
  const thompsonTopChargingHandle = getProductById("thompson-top-charging-handle");
  const publicEnemyHat = getProductById("public-enemy-hat");
  const annihilatorProduct = getProductById("annihilator");
  const homepageThompsonTitle = "Thompson FRT";

  if (!thompsonProduct || !thompsonChargingHandle || !thompsonTopChargingHandle || !publicEnemyHat || !annihilatorProduct) {
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
            src="/thompson-frt/new-hero-video.mp4"
            poster="/thompson-frt/new-hero-image.webp"
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
                {isProductOnSale(thompsonProduct.id) ? "4th of July Sale" : "New Product Release"}
              </p>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
                {homepageThompsonTitle}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                A two position forced reset trigger for Thompson carbines and pistols, built to deliver blistering follow-up shots
                with a feel true to the original Thompson platform.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 rounded-full border border-tactical-green/30 bg-tactical-green/10 text-tactical-green font-semibold">
                  ${thompsonProduct.price.toFixed(0)}
                  {thompsonProduct.originalPrice && (
                    <span className="ml-2 line-through opacity-60 text-red-300">
                      ${thompsonProduct.originalPrice.toFixed(0)}
                    </span>
                  )}
                </span>
                {isProductOnSale(thompsonProduct.id) && (
                  <span className="px-4 py-2 rounded-full border border-red-500/40 bg-red-500/15 text-red-300 font-semibold uppercase text-sm tracking-wider">
                    On Sale
                  </span>
                )}
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
              <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Shop the Lineup</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Built for Thompsons
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Forced reset triggers, charging handles, and apparel made for the Thompson platform.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden border border-tactical-green-dim/30 bg-tactical-surface/70 flex flex-col h-full">
                <img
                  src="/Coverpic.webp"
                  alt="Thompson carbine"
                  className="w-full h-72 object-cover"
                />
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-tactical-green mb-3">Thompson Platform</p>
                  <h3 className="text-3xl font-bold text-foreground mb-3">{homepageThompsonTitle}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    Designed for Thompson carbines and pistols, with durable steel construction and installation
                    that stays straightforward, though fitment may require a gunsmith.
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
                  src={thompsonChargingHandle.images[0].src}
                  alt={thompsonChargingHandle.images[0].alt}
                  className="w-full h-72 object-cover bg-white"
                  style={{ objectPosition: thompsonChargingHandle.images[0].objectPosition ?? "center" }}
                />
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-tactical-green mb-3">Thompson Platform</p>
                  <h3 className="text-3xl font-bold text-foreground mb-3">{thompsonChargingHandle.name}</h3>
                  {thompsonChargingHandle.inStock === false && (
                    <span className="inline-block mb-3 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider">
                      {getStockStatusLabel(thompsonChargingHandle)}
                    </span>
                  )}
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    {thompsonChargingHandle.description}
                  </p>
                  <Link to={`/product/${thompsonChargingHandle.id}`}>
                    <TacticalButton
                      variant={thompsonChargingHandle.inStock === false ? "secondary" : "primary"}
                      size="lg"
                      className="w-full"
                    >
                      {thompsonChargingHandle.inStock === false ? "View Product" : "Shop Charging Handle"}
                    </TacticalButton>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-tactical-green-dim/30 bg-tactical-surface/70 flex flex-col h-full">
                <img
                  src={thompsonTopChargingHandle.images[0].src}
                  alt={thompsonTopChargingHandle.images[0].alt}
                  className="w-full h-72 object-cover bg-white"
                />
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-tactical-green mb-3">Thompson Platform</p>
                  <h3 className="text-3xl font-bold text-foreground mb-3">{thompsonTopChargingHandle.name}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    {thompsonTopChargingHandle.description}
                  </p>
                  <Link to={`/product/${thompsonTopChargingHandle.id}`}>
                    <TacticalButton variant="primary" size="lg" className="w-full">
                      Shop Top Charging Handle
                    </TacticalButton>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-tactical-green-dim/30 bg-tactical-surface/70 flex flex-col h-full">
                <img
                  src={publicEnemyHat.images[0].src}
                  alt={publicEnemyHat.images[0].alt}
                  className="w-full h-72 object-cover bg-white"
                />
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-sm uppercase tracking-[0.3em] text-tactical-green mb-3">Apparel & Accessories</p>
                  <h3 className="text-3xl font-bold text-foreground mb-3">Gun Mats & Apparel</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    Thompson gun mats, caps, and other gear—including the Public Enemy ball cap and
                    Chicago Typewriter cap.
                  </p>
                  <Link to="/shop/apparel">
                    <TacticalButton variant="secondary" size="lg" className="w-full">
                      Shop Apparel
                    </TacticalButton>
                  </Link>
                </div>
              </div>
            </div>

            {annihilatorProduct && (
              <div className="mt-16">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-tactical-dark/80 rounded-2xl border border-tactical-green-dim/20 overflow-hidden flex flex-col md:flex-row">
                    <img
                      src={annihilatorProduct.images[0].src}
                      alt={annihilatorProduct.images[0].alt}
                      className="w-full md:w-72 h-64 md:h-auto object-cover object-top grayscale-[30%]"
                      style={{
                        objectPosition: annihilatorProduct.images[0].objectPosition ?? "center",
                      }}
                    />
                    <div className="p-8 flex flex-col flex-grow">
                      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2">
                        Custom Build
                      </p>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        {annihilatorProduct.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-grow">
                        John Thompson&apos;s original design, custom built to order. Contact us for
                        pricing and details.
                      </p>
                      <Link to={`/product/${annihilatorProduct.id}`} className="mt-auto">
                        <TacticalButton variant="secondary" size="lg" className="w-full text-lg py-4">
                          View Annihilator
                        </TacticalButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-20 pt-16 border-t border-tactical-green-dim/30">
              <div className="text-center mb-14">
                <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Customer Reviews</p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  What Customers Say
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Real feedback from customers who run our products.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="group relative rounded-2xl border border-tactical-green-dim/40 bg-gradient-to-b from-tactical-surface/90 to-tactical-dark/80 p-8 flex flex-col shadow-lg hover:shadow-[0_0_30px_-5px_hsl(var(--tactical-green)_/_0.15)] hover:border-tactical-green/40 transition-all duration-300">
                  <div className="absolute top-6 right-6 text-tactical-green/20 group-hover:text-tactical-green/35 transition-colors">
                    <Quote className="w-12 h-12" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-tactical-green text-tactical-green shrink-0" aria-hidden />
                    ))}
                  </div>
                  <p className="text-foreground/95 leading-relaxed flex-1 mb-6 text-[15px]">
                    The Thompson FRT runs incredibly smooth! I love that thing. It doesn't require any special technique, just a regular trigger press and you hardly can tell its not a full auto! I was surprised at how much control I still had. I would definitely recommend!
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-tactical-green-dim/30">
                    <span className="font-semibold text-foreground uppercase tracking-wider text-sm">J. Nelson</span>
                    <span className="text-xs uppercase tracking-wider text-tactical-green/80 bg-tactical-green/10 px-2.5 py-1 rounded-full">Thompson FRT</span>
                  </div>
                </div>

                <div className="group relative rounded-2xl border border-tactical-green-dim/40 bg-gradient-to-b from-tactical-surface/90 to-tactical-dark/80 p-8 flex flex-col shadow-lg hover:shadow-[0_0_30px_-5px_hsl(var(--tactical-green)_/_0.15)] hover:border-tactical-green/40 transition-all duration-300">
                  <div className="absolute top-6 right-6 text-tactical-green/20 group-hover:text-tactical-green/35 transition-colors">
                    <Quote className="w-12 h-12" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-tactical-green text-tactical-green shrink-0" aria-hidden />
                    ))}
                  </div>
                  <p className="text-foreground/95 leading-relaxed flex-1 mb-6 text-[15px]">
                    My name is Larry and I would like to say a couple of things about kinetic crossfire. First you need to know that ALL of their equipment is top notch manufacturing. They also stand behind their product with 110% after sales... I will definitely purchase from them again.
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-tactical-green-dim/30">
                    <span className="font-semibold text-foreground uppercase tracking-wider text-sm">Larry</span>
                    <span className="text-xs uppercase tracking-wider text-tactical-green/80 bg-tactical-green/10 px-2.5 py-1 rounded-full">Thompson</span>
                  </div>
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
                  Installation only requires a flathead screwdriver plus a punch and hammer or similar tool, but
                  fitment may require a gunsmith depending on the gun.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-tactical-green-dim/30 bg-tactical-dark p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Platform Fit</h3>
                <p className="text-muted-foreground text-sm">
                  Built for Thompson carbines and pistols.
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
                  Minimal tools and straightforward installation, though fitment may require a gunsmith.
                </p>
              </div>
              <div className="rounded-xl border border-tactical-green-dim/30 bg-tactical-dark p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Thompson orders are priced at ${thompsonProduct.price.toFixed(0)}
                  {thompsonProduct.originalPrice ? (
                    <> (<span className="line-through">${thompsonProduct.originalPrice.toFixed(0)}</span> during our 4th of July sale)</>
                  ) : null}{" "}
                  with free shipping included. Shipping times are 3-5 days,
                  but due to the current high volume of orders this may be longer.
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
              Watch the Thompson FRT demos and see the fast, authentic feel it was built for.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {[
              thompsonFiringPinFitmentVideo,
              thompsonFrtInstallVideo,
              ...thompsonFrtDemoVideos,
            ].map((video) => (
              <div key={video.id}>
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-tactical-green-dim/30 shadow-2xl">
                  <VimeoEmbed src={video.embedUrl} title={video.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-foreground">{video.title}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-8">
            <div className="text-center">
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
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div className="bg-tactical-surface rounded-2xl border border-tactical-green-dim/30 overflow-hidden">
              <img
                src={thompsonProduct.images[0].src}
                alt={thompsonProduct.images[0].alt}
                className="w-full h-[28rem] object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <h2 className="text-3xl font-bold text-foreground">{homepageThompsonTitle}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    {isProductOnSale(thompsonProduct.id) && (
                      <span className="px-3 py-1 rounded-full border border-red-500/40 bg-red-500/15 text-red-400 text-xs font-bold uppercase tracking-wider">
                        On Sale
                      </span>
                    )}
                    <span className="bg-tactical-green text-tactical-dark px-3 py-1 rounded text-sm font-bold">
                      ${thompsonProduct.price.toFixed(2)}
                      {thompsonProduct.originalPrice && (
                        <span className="ml-2 line-through opacity-70">
                          ${thompsonProduct.originalPrice.toFixed(2)}
                        </span>
                      )}{" "}
                      with free shipping
                    </span>
                  </div>
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
                <h3 className="text-2xl font-bold text-foreground mb-4">Usage Notes</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {thompsonProduct.compatibility?.usageNotes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Read the User&apos;s Guide before installing and operating this product.
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Download the{" "}
                  <a
                    href="/user-guide.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-tactical-green hover:text-tactical-green-glow underline underline-offset-4"
                  >
                    Thompson FRT User&apos;s Guide
                  </a>
                  {" "}for additional setup and troubleshooting help.
                </p>
              </div>

              <div className="rounded-2xl border border-tactical-green-dim/30 bg-tactical-surface p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Tools Required</h3>
                <p className="text-muted-foreground">
                  Flathead screwdriver, punch and hammer or similar.
                </p>
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

      <Footer />
    </div>
  );
};

export default Index;