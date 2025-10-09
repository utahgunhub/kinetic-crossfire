import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

declare global {
  interface Window {
    GunTab: any;
  }
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const subtotal = getTotalPrice();
  const shipping = 8.00; // Standard shipping
  const total = subtotal + shipping;


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Replace with actual API call to generate GunTab transaction ID
      // This is a placeholder - you'll need to implement a backend endpoint
      // that calls the GunTab REST API to create a transaction
      
      const response = await fetch('/api/create-guntab-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
          shippingInfo,
          subtotal,
          shipping,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      const data = await response.json();
      const transactionId = data.transactionId;
      const responseUrl = data.transaction?.response_url;

      if (!responseUrl) {
        throw new Error('No payment URL received from GunTab');
      }

      // Clear cart before redirect
      clearCart();

      // Redirect to GunTab payment page
      window.location.href = responseUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-24 bg-tactical-dark">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before checking out.
            </p>
            <Link to="/purchase">
              <TacticalButton variant="primary">
                Browse Products
              </TacticalButton>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-tactical-dark border-b border-tactical-green-dim/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-tactical-green transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-tactical-green transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-foreground">Checkout</span>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground tracking-wider mb-12 text-center">
              Secure Checkout
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shipping Information Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Shipping Information */}
                  <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Shipping Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                      >
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <TacticalButton 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full text-xl py-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Payment with GunTab'}
                  </TacticalButton>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30 sticky top-24">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>
                  
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-4">
                        <img 
                          src={item.product.images[0].src} 
                          alt={item.product.images[0].alt}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-foreground">{item.product.name}</h3>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm text-tactical-green font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-tactical-green-dim/30 pt-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-tactical-green-dim/30">
                      <span>Total</span>
                      <span className="text-tactical-green">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Secure Payment Notice */}
                  <div className="mt-6 p-4 bg-tactical-surface rounded border border-tactical-green-dim/30">
                    <p className="text-xs text-muted-foreground text-center">
                      🔒 Secure payment processed by GunTab escrow service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;

