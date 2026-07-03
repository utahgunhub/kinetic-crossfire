import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, hasRestrictedShipping } from "@/data/products";
import { thompsonProductPageVideos } from "@/data/thompsonVideos";
import VimeoEmbed from "@/components/VimeoEmbed";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { restrictedShippingStatesText } from "@/lib/shippingRestrictions";
import { SHIPPING_POLICY_TEXT } from "@/lib/shipping";
import { isProductOnSale } from "@/lib/sale";
import { SaleBadge, SalePrice } from "@/components/SalePrice";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const shopPath =
    product?.category === "apparel"
      ? "/shop/apparel"
      : product?.category === "thompson"
        ? "/shop"
        : "/shop/ar";
  const shopLabel =
    product?.category === "apparel"
      ? "Shop Apparel"
      : product?.category === "thompson"
        ? "Shop"
        : "Shop AR";
  const isThompsonProduct = product?.id === "thompson-blow-back-trigger";
  const isApparelProduct = product?.category === "apparel";
  const isMadeInUSA = product?.features.some((feature) =>
    feature.toLowerCase().includes("made in usa")
  );
  const isOutOfStock = product?.inStock === false;
  const showShippingRestriction = product ? hasRestrictedShipping(product) : false;
  const productDescription = isThompsonProduct
    ? "Forced reset trigger system for Thompson carbines and pistols. Built from durable steel alloy for fast follow-up shots and straightforward installation with minimal tools, though fitment may require a gunsmith."
    : product.detailedDescription;
  const displayFeatures = isThompsonProduct
    ? [
        "Smooth forced reset operation with a fast, authentic Thompson feel",
        "Durable steel alloy construction for rapid fire and high heat use",
        "Straightforward installation with minimal tools, though fitment may require a gunsmith",
      ]
    : product.features;
  const specificationEntries = product.specifications
    ? Object.entries(product.specifications).filter(([key]) =>
        isThompsonProduct ? !["Compatibility", "Shipping"].includes(key) : true
      )
    : [];

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-24 bg-tactical-dark">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link to="/shop">
              <TacticalButton variant="primary">
                Back to Products
              </TacticalButton>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const openModal = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock.");
      return;
    }

    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-tactical-dark border-b border-tactical-green-dim/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-tactical-green transition-colors">Home</Link>
            <span>/</span>
            <Link to={shopPath} className="hover:text-tactical-green transition-colors">{shopLabel}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-6">
                {/* Main Product Image */}
                <div className="relative">
                  <img 
                    src={product.images[selectedImageIndex]?.src || product.images[0].src} 
                    alt={product.images[selectedImageIndex]?.alt || product.images[0].alt} 
                    className="w-full aspect-square object-cover rounded-lg border-2 border-tactical-green cursor-pointer hover:border-tactical-green/80 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => openModal(selectedImageIndex)}
                  />
                </div>
                
                {/* Product Image Gallery */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image.src} 
                        alt={image.alt} 
                        className={`w-full aspect-square object-cover rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-[1.05] ${
                          selectedImageIndex === index 
                            ? 'border-tactical-green' 
                            : 'border-tactical-green-dim/50 hover:border-tactical-green/80'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground tracking-wider mb-4">
                    {product.name}
                  </h1>
                  {isProductOnSale(product.id) && (
                    <div className="mb-3">
                      <SaleBadge />
                    </div>
                  )}
                  <div className="mb-6">
                    <SalePrice
                      price={product.price}
                      originalPrice={product.originalPrice}
                      size="lg"
                    />
                  </div>
                  {isOutOfStock && (
                    <div className="mb-4">
                      <span className="px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold uppercase tracking-wider">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {(product.isKineticCrossfireProduct || isMadeInUSA) && (
                    <div className="flex flex-wrap gap-3 mb-2">
                      {product.isKineticCrossfireProduct && !isApparelProduct && (
                        <span className="px-3 py-1 rounded-full border border-tactical-green/30 bg-tactical-green/10 text-tactical-green text-sm font-semibold">
                          Free Shipping
                        </span>
                      )}
                      {isThompsonProduct && (
                        <span className="px-3 py-1 rounded-full border border-tactical-green/30 bg-tactical-dark/60 text-foreground text-sm font-semibold">
                          Patent Pending
                        </span>
                      )}
                      {isMadeInUSA && (
                        <span className="px-3 py-1 rounded-full border border-tactical-green/30 bg-tactical-dark/60 text-foreground text-sm font-semibold">
                          Made in USA
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Description */}
                <div className="space-y-4">
                  {product.importantNotice && (
                    <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-6">
                      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                        {product.importantNotice.split("\n\n").map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  <h2 className="text-xl font-semibold text-foreground">Product Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {productDescription}
                  </p>
                  {isThompsonProduct && product.compatibility?.usageNotes && (
                    <div className="pt-2">
                      <h3 className="text-sm font-semibold text-tactical-green uppercase tracking-wider mb-3">
                        Usage Notes
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {product.compatibility.usageNotes.map((note, index) => (
                          <li key={index} className="flex items-start gap-3">
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
                  )}
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Key Features:</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    {displayFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications */}
                {specificationEntries.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Specifications:</h2>
                    <div className="bg-tactical-dark/50 rounded-lg p-6 border border-tactical-green-dim/30">
                      <div className="grid grid-cols-1 gap-3">
                        {specificationEntries.map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="text-foreground font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  {!isOutOfStock && (
                    <div className="flex items-center gap-4">
                      <label className="text-foreground font-medium">Quantity:</label>
                      <div className="flex items-center border border-tactical-green-dim/30 rounded">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 hover:bg-tactical-green/20 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-foreground min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 hover:bg-tactical-green/20 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <TacticalButton 
                    variant="primary" 
                    size="lg" 
                    className="w-full text-xl py-6 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                  >
                    {isOutOfStock ? "Out of Stock" : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
                  </TacticalButton>
                  {isOutOfStock && (
                    <p className="text-sm text-muted-foreground">
                      This item is currently unavailable and cannot be ordered online right now.
                    </p>
                  )}
                </div>

                <div className="bg-tactical-dark/50 rounded-lg p-6 border border-tactical-green-dim/30">
                  <h3 className="font-semibold text-tactical-green mb-2">Shipping & Returns</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All sales final—no returns</li>
                    <li>
                      •{" "}
                      {isThompsonProduct
                        ? "Shipping times are 3-5 days, but due to the current high volume of orders this may be longer"
                        : "Ships within 1-2 business days"}
                    </li>
                    {isApparelProduct ? (
                      <li>• {SHIPPING_POLICY_TEXT}</li>
                    ) : (
                      product.isKineticCrossfireProduct && <li>• Free shipping included</li>
                    )}
                    <li>• Secure packaging and tracking included</li>
                  </ul>
                </div>

                {showShippingRestriction && (
                <div className="bg-tactical-dark/50 rounded-lg p-6 border border-red-500/30">
                  <h3 className="font-semibold text-red-400 mb-2">Shipping Restriction</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This product cannot be shipped to {restrictedShippingStatesText}.
                  </p>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      {product.compatibility && !isThompsonProduct && (
        <section className="py-16 bg-tactical-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center tracking-wider">
                Compatibility
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Compatible With:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {product.compatibility.compatibleWith.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Usage Notes:</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {product.compatibility.usageNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {isThompsonProduct && (
        <section className="py-16 bg-tactical-surface">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-sm uppercase tracking-[0.35em] text-tactical-green mb-3">Video Guides</p>
                <h2 className="text-3xl font-bold text-foreground mb-4">Watch the Install, Demos, and Guides</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Install walkthroughs, live demos, and the Trigger Lifter guide for solving semi-auto fire.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {thompsonProductPageVideos.map((video) => (
                  <div key={video.id} className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">{video.title}</h3>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-tactical-green-dim/30 bg-black shadow-2xl">
                      <VimeoEmbed src={video.embedUrl} title={video.title} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-tactical-green transition-colors text-2xl font-bold z-10"
            >
              ✕
            </button>

            {/* Previous Arrow */}
            {product.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-tactical-green transition-colors text-4xl font-bold z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ‹
              </button>
            )}

            {/* Next Arrow */}
            {product.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-tactical-green transition-colors text-4xl font-bold z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ›
              </button>
            )}

            {/* Image */}
            <img 
              src={product.images[selectedImageIndex].src} 
              alt={product.images[selectedImageIndex].alt} 
              className="max-w-full max-h-full object-contain rounded-lg border-2 border-tactical-green"
            />

            {/* Image Counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
