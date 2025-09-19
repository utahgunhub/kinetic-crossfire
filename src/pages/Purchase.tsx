import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useState } from "react";

const Purchase = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productImages = [
    { src: "/product-1.png", alt: "Slide Stock Assist - Main View" },
    { src: "/product-2.png", alt: "Slide Stock Assist - Detail View" },
    { src: "/product-3.png", alt: "Slide Stock Assist - Side View" },
    { src: "/product-4.png", alt: "Slide Stock Assist - Installation View" }
  ];

  const openModal = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

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
              Get your Slide Stock Assist today. Made in USA with precision engineering 
              for rapid, consistent follow-up shots.
            </p>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Images */}
              <div className="space-y-6">
                {/* Main Product Image */}
                <div className="relative">
                  <img 
                    src={productImages[0].src} 
                    alt={productImages[0].alt} 
                    className="w-full aspect-square object-cover rounded-lg border-2 border-tactical-green cursor-pointer hover:border-tactical-green/80 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => openModal(0)}
                  />
                </div>
                
                {/* Product Image Gallery */}
                <div className="grid grid-cols-3 gap-4">
                  {productImages.slice(1).map((image, index) => (
                    <img 
                      key={index + 1}
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full aspect-square object-cover rounded-lg border-2 border-tactical-green cursor-pointer hover:border-tactical-green/80 transition-all duration-300 hover:scale-[1.05]"
                      onClick={() => openModal(index + 1)}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-foreground tracking-wider mb-4">
                    Slide Stock Assist
                  </h2>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-bold text-tactical-green">$19.95</span>
                    <span className="text-2xl text-muted-foreground line-through">$23.00</span>
                    <span className="bg-tactical-green text-tactical-dark px-3 py-1 rounded text-sm font-bold">
                      Save $3.05
                    </span>
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The Slide Stock Assist is a simple device that attaches to bump stocks for extremely rapid, 
                    consistent follow up shots. There are no special tools or modifications required for installation, 
                    and no additional parts such as full-auto bolt carrier groups or trigger modifications are necessary. 
                    The Slide Assist enables all users to operate it without special technique, even one handed. 
                    It is designed to function on all mil-spec parts. Made in the USA.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Key Features:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                      <span>No tools required for installation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                      <span>Rapid, consistent follow-up shots</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                      <span>Mil-spec AR-15 compatibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                      <span>One-handed operation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                      <span>Made in USA</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <TacticalButton variant="primary" size="lg" className="w-full text-xl py-6">
                    Add to Cart - $19.95
                  </TacticalButton>
                </div>

                <div className="bg-tactical-dark/50 rounded-lg p-6 border border-tactical-green-dim/30">
                  <h4 className="font-semibold text-tactical-green mb-2">Shipping & Returns</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 30-day return policy</li>
                    <li>• Ships within 1-2 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
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
                  <li>• Slide Fire Solutions SSAR-15 SBS Stock</li>
                  <li>• AR-15 rifle platform</li>
                  <li>• .556 ammunition (recommended)</li>
                  <li>• Mil-spec triggers and parts</li>
                </ul>
              </div>
              <div className="bg-tactical-surface rounded-lg p-8 border border-tactical-green-dim/30">
                <h3 className="text-xl font-semibold text-foreground mb-4">Usage Notes:</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Run with more oil than usual</li>
                  <li>• Clean frequently under high rates of fire</li>
                  <li>• Monitor trigger retaining pins</li>
                  <li>• Gas block adjustment may be necessary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-tactical-green transition-colors text-4xl font-bold z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ‹
            </button>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-tactical-green transition-colors text-4xl font-bold z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ›
            </button>

            {/* Image */}
            <img 
              src={productImages[selectedImageIndex].src} 
              alt={productImages[selectedImageIndex].alt} 
              className="max-w-full max-h-full object-contain rounded-lg border-2 border-tactical-green"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {productImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
