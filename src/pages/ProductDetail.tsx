import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/products";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : null;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
            <Link to="/purchase">
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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-tactical-dark border-b border-tactical-green-dim/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-tactical-green transition-colors">Home</Link>
            <span>/</span>
            <Link to="/purchase" className="hover:text-tactical-green transition-colors">Purchase</Link>
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
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-bold text-tactical-green">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-2xl text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="bg-tactical-green text-tactical-dark px-3 py-1 rounded text-sm font-bold">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Product Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.detailedDescription}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Key Features:</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 bg-tactical-green rounded-full flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications */}
                {product.specifications && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Specifications:</h2>
                    <div className="bg-tactical-dark/50 rounded-lg p-6 border border-tactical-green-dim/30">
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(product.specifications).map(([key, value]) => (
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
                  
                  <TacticalButton variant="primary" size="lg" className="w-full text-xl py-6">
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </TacticalButton>
                </div>

                <div className="bg-tactical-dark/50 rounded-lg p-6 border border-tactical-green-dim/30">
                  <h3 className="font-semibold text-tactical-green mb-2">Shipping & Returns</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 30-day return policy</li>
                    <li>• Ships within 1-2 business days</li>
                    <li>• Free shipping on orders over $50</li>
                    <li>• Secure packaging and tracking included</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      {product.compatibility && (
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
