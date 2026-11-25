import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOrderConfirmationEmail } from "@/lib/emailService";
import { useToast } from "@/hooks/use-toast";
import {
  allowedShippingStates,
  getRestrictedShippingState,
  restrictedShippingStatesText,
  usStates,
} from "@/lib/shippingRestrictions";
import { hasRestrictedShipping } from "@/data/products";
import { ACTIVE_SALE, areCouponsAllowed } from "@/lib/sale";
import { useAuth } from "@/contexts/AuthContext";
import {
  calculateDealerShippingCost,
  countFrtQuantityInCart,
  DEALER_LARGE_ORDER_FRT_QTY,
} from "@/lib/dealerPricing";
import {
  calculateShippingCost,
  formatShippingCost,
  SHIPPING_POLICY_TEXT,
} from "@/lib/shipping";

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

interface CardInfo {
  cardNumber: string;
  expirationDate: string;
  cardCode: string;
}

interface BillingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { isDealer } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
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
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: "",
    expirationDate: "",
    cardCode: "",
  });

  const subtotal = getTotalPrice();
  const shipping = isDealer
    ? calculateDealerShippingCost(subtotal, items)
    : calculateShippingCost(subtotal);
  const total = subtotal + shipping - discount;
  const dealerFrtQty = countFrtQuantityInCart(items);
  const showDealerLargeOrderNotice =
    isDealer && dealerFrtQty >= DEALER_LARGE_ORDER_FRT_QTY;
  const cartRequiresShippingRestriction = items.some((item) =>
    hasRestrictedShipping(item.product)
  );
  const couponsAllowed = areCouponsAllowed() && !isDealer;
  const shippingStateOptions = cartRequiresShippingRestriction
    ? allowedShippingStates
    : usStates;
  const restrictedShippingState = getRestrictedShippingState(shippingInfo.state);
  const hasRestrictedShippingState =
    cartRequiresShippingRestriction &&
    shippingInfo.country === "United States" &&
    restrictedShippingState !== null;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const orderItems = items.map(item => ({
    id: item.product.id,
    productId: item.product.id,
    category: item.product.category,
    name: item.product.name,
    description: item.product.description,
    price: item.product.price,
    quantity: item.quantity,
  }));

  const handleApplyCoupon = async () => {
    if (!couponsAllowed) {
      toast({
        title: "Coupons Unavailable",
        description: `Discount codes cannot be stacked with ${ACTIVE_SALE.name} pricing.`,
        variant: "destructive",
      });
      return;
    }

    const trimmedCode = couponInput.trim();
    if (!trimmedCode) {
      toast({
        title: "Coupon Required",
        description: "Please enter a coupon code.",
        variant: "destructive",
      });
      return;
    }

    setIsApplyingCoupon(true);

    try {
      const response = await fetch(`${API_URL}/api/validate-coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode: trimmedCode,
          items: orderItems,
          dealerCheckout: isDealer,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Invalid coupon code');
      }

      setAppliedCouponCode(trimmedCode);
      setDiscount(data.discount);
      toast({
        title: "Coupon Applied",
        description: `You saved $${data.discount.toFixed(2)} on this order.`,
      });
    } catch (error: any) {
      setAppliedCouponCode(null);
      setDiscount(0);
      toast({
        title: "Invalid Coupon",
        description: error.message || 'That coupon code is not valid.',
        variant: "destructive",
      });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCouponCode(null);
    setDiscount(0);
    setCouponInput("");
  };

  // For local development without HTTPS, we'll send card data to backend
  // In production with HTTPS, you can use Accept.js for additional security
  useEffect(() => {
    // Check if we're in a secure context (HTTPS or localhost)
    console.log('🔒 Secure context:', window.isSecureContext);
  }, []);

  useEffect(() => {
    if (!couponsAllowed && appliedCouponCode) {
      setAppliedCouponCode(null);
      setDiscount(0);
      setCouponInput("");
    }
  }, [couponsAllowed, appliedCouponCode]);

  const handleShippingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    // If same as shipping is checked, update billing too
    if (sameAsShipping && name !== 'email' && name !== 'phone') {
      setBillingInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\s/g, '');
      const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
      setCardInfo(prev => ({ ...prev, [name]: formatted }));
    } 
    // Format expiration date as MM/YY
    else if (name === 'expirationDate') {
      let cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      }
      setCardInfo(prev => ({ ...prev, [name]: cleaned }));
    } 
    else {
      setCardInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      console.log('💳 Processing payment...');

      // Validate card info
      if (!cardInfo.cardNumber || !cardInfo.expirationDate || !cardInfo.cardCode) {
        throw new Error('Please fill in all card information');
      }

      if (hasRestrictedShippingState) {
        throw new Error(`We cannot ship orders to ${restrictedShippingState}. Please use a different shipping state.`);
      }

      // Use billing info (same as shipping if checkbox is checked)
      const finalBillingInfo = sameAsShipping ? {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country,
      } : billingInfo;

      // Send payment data directly to our backend
      // The backend will securely process it with Authorize.net
      console.log('🌐 Sending payment to:', `${API_URL}/api/process-payment`);
      
      const paymentResponse = await fetch(`${API_URL}/api/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardData: {
            cardNumber: cardInfo.cardNumber.replace(/\s/g, ''),
            expirationDate: cardInfo.expirationDate.replace('/', ''),
            cardCode: cardInfo.cardCode,
          },
          billingInfo: finalBillingInfo,
          shippingInfo,
          items: orderItems,
          couponCode: appliedCouponCode,
          dealerCheckout: isDealer,
        }),
      });

      const paymentData = await paymentResponse.json();

      // Check for both HTTP errors and API-level errors
      if (!paymentResponse.ok || !paymentData.success) {
        const errorMsg = paymentData.error || paymentData.message || 'Payment failed';
        console.error('Payment failed:', errorMsg);
        throw new Error(errorMsg);
      }

      console.log('✅ Payment successful!');
      console.log('Transaction ID:', paymentData.transactionId);
      console.log('Auth Code:', paymentData.authCode);

      // Store order info in sessionStorage for confirmation page
      const orderData = {
        transactionId: paymentData.transactionId,
        authCode: paymentData.authCode,
        accountNumber: paymentData.accountNumber,
        items: items,
        shippingInfo,
        subtotal: paymentData.subtotal ?? subtotal,
        shipping: paymentData.shipping ?? shipping,
        discount: paymentData.discount ?? discount,
        total: paymentData.total ?? total,
        orderDate: new Date().toISOString()
      };
      
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
      console.log('💾 Order data saved to sessionStorage');

      // Send order confirmation email
      const customerName = `${shippingInfo.firstName} ${shippingInfo.lastName}`;
      const shippingAddressFormatted = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`;
      
      await sendOrderConfirmationEmail({
        transactionId: paymentData.transactionId,
        customerName,
        customerEmail: shippingInfo.email,
        customerPhone: shippingInfo.phone,
        shippingAddress: shippingAddressFormatted,
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          pricePerItem: item.product.price,
          totalForItem: item.product.price * item.quantity,
        })),
        subtotal: paymentData.subtotal ?? subtotal,
        shipping: paymentData.shipping ?? shipping,
        discount: paymentData.discount ?? discount,
        total: paymentData.total ?? total,
      });

      // Clear cart
      clearCart();

      // Small delay to ensure sessionStorage is saved
      setTimeout(() => {
        console.log('🚀 Navigating to order confirmation...');
        navigate('/order-confirmation');
      }, 100);
    } catch (error: any) {
      console.error('❌ Payment error:', error);
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Payment failed: ';
      if (error.message === 'Failed to fetch') {
        errorMessage += 'Unable to connect to payment server. Please check your internet connection and try again.';
      } else {
        errorMessage += (error.message || 'Please try again. Make sure all information is correct.');
      }
      
      alert(errorMessage);
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
            <Link to="/shop">
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
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Shipping Information */}
                  <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Shipping Information</h2>

                    {cartRequiresShippingRestriction && (
                    <div className="mb-6 rounded-lg border border-red-500/30 bg-tactical-surface p-4">
                      <p className="text-sm font-semibold text-red-400 mb-2">Shipping Restriction</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We cannot ship orders to {restrictedShippingStatesText}.
                      </p>
                    </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInputChange}
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
                          onChange={handleShippingInputChange}
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
                        onChange={handleShippingInputChange}
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
                        onChange={handleShippingInputChange}
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
                        onChange={handleShippingInputChange}
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
                          onChange={handleShippingInputChange}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          State *
                        </label>
                        <select
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingInputChange}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        >
                          <option value="">Select a state</option>
                          {shippingStateOptions.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingInputChange}
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
                        onChange={handleShippingInputChange}
                        required
                        className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                      >
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30">
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Payment Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={handleCardInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                          className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Expiration Date *
                          </label>
                          <input
                            type="text"
                            name="expirationDate"
                            value={cardInfo.expirationDate}
                            onChange={handleCardInputChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cardCode"
                            value={cardInfo.cardCode}
                            onChange={handleCardInputChange}
                            placeholder="123"
                            maxLength={4}
                            required
                            className="w-full px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="mt-6">
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="sameAsShipping"
                          checked={sameAsShipping}
                          onChange={(e) => {
                            setSameAsShipping(e.target.checked);
                            if (e.target.checked) {
                              // Copy shipping to billing
                              setBillingInfo({
                                firstName: shippingInfo.firstName,
                                lastName: shippingInfo.lastName,
                                address: shippingInfo.address,
                                city: shippingInfo.city,
                                state: shippingInfo.state,
                                zipCode: shippingInfo.zipCode,
                                country: shippingInfo.country,
                              });
                            }
                          }}
                          className="w-4 h-4 text-tactical-green bg-tactical-surface border-tactical-green-dim/30 rounded focus:ring-tactical-green focus:ring-2"
                        />
                        <label htmlFor="sameAsShipping" className="ml-2 text-sm font-medium text-foreground">
                          Billing address is same as shipping address
                        </label>
                      </div>

                      {!sameAsShipping && (
                        <div className="space-y-4 p-4 bg-tactical-surface rounded border border-tactical-green-dim/30">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Billing Address</h3>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                First Name *
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={billingInfo.firstName}
                                onChange={handleBillingInputChange}
                                required={!sameAsShipping}
                                className="w-full px-4 py-2 bg-tactical-dark border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={billingInfo.lastName}
                                onChange={handleBillingInputChange}
                                required={!sameAsShipping}
                                className="w-full px-4 py-2 bg-tactical-dark border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Street Address *
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={billingInfo.address}
                              onChange={handleBillingInputChange}
                              required={!sameAsShipping}
                              className="w-full px-4 py-2 bg-tactical-dark border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                            />
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                City *
                              </label>
                              <input
                                type="text"
                                name="city"
                                value={billingInfo.city}
                                onChange={handleBillingInputChange}
                                required={!sameAsShipping}
                                className="w-full px-4 py-2 bg-tactical-dark border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                State *
                              </label>
                              <select
                                name="state"
                                value={billingInfo.state}
                                onChange={handleBillingInputChange}
                                required={!sameAsShipping}
                                className="w-full px-4 py-2 bg-tactical-dark border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                              >
                                <option value="">Select a state</option>
                                {usStates.map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                ZIP Code *
                              </label>
                              <input
                                type="text"
                                name="zipCode"
                                value={billingInfo.zipCode}
                                onChange={handleBillingInputChange}
                                required={!sameAsShipping}
                                className="w-full px-4 py-2 bg-tactical-dark border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 p-4 bg-tactical-surface rounded border border-tactical-green-dim/30">
                      <p className="text-xs text-muted-foreground">
                        🔒 Your payment information is encrypted and secure. We use Authorize.net for payment processing.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <TacticalButton 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full text-xl py-6"
                    disabled={isProcessing || !shippingInfo.state}
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
                  </TacticalButton>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our terms and conditions.
                  </p>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30 sticky top-24">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>

                  {isDealer && (
                    <div className="mb-4 rounded border border-tactical-green/40 bg-tactical-green/10 p-3 text-xs text-foreground">
                      Dealer pricing is applied to this order. Coupon codes are not
                      available on dealer checkout.
                    </div>
                  )}

                  {showDealerLargeOrderNotice && (
                    <div className="mb-4 rounded border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-foreground">
                      Orders of 50 or more FRT kits may require shipping time
                      greater than one week.
                    </div>
                  )}
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
                    <div className="rounded border border-tactical-green-dim/30 bg-tactical-surface p-3 mb-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {isDealer
                          ? dealerFrtQty > 0
                            ? "This order includes an FRT kit — shipping is free. Other dealer items ship with the FRT."
                            : "Dealer accessory orders: free shipping on $50+ subtotal; otherwise $8 shipping applies."
                          : SHIPPING_POLICY_TEXT}
                      </p>
                    </div>

                    {cartRequiresShippingRestriction && (
                    <div className="rounded border border-red-500/30 bg-tactical-surface p-3 mb-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Cannot ship to {restrictedShippingStatesText}.
                      </p>
                    </div>
                    )}

                    {couponsAllowed ? (
                      <div className="mb-4 pb-4 border-b border-tactical-green-dim/30">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Coupon Code
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            disabled={!!appliedCouponCode || isApplyingCoupon}
                            placeholder="Enter code"
                            className="flex-1 px-3 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded focus:outline-none focus:border-tactical-green text-foreground text-sm disabled:opacity-60"
                          />
                          {appliedCouponCode ? (
                            <button
                              type="button"
                              onClick={handleRemoveCoupon}
                              className="px-3 py-2 text-sm text-muted-foreground hover:text-red-400 transition-colors"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleApplyCoupon}
                              disabled={isApplyingCoupon || !couponInput.trim()}
                              className="px-4 py-2 bg-tactical-surface border border-tactical-green-dim/30 rounded text-sm text-foreground hover:border-tactical-green transition-colors disabled:opacity-60"
                            >
                              {isApplyingCoupon ? 'Applying...' : 'Apply'}
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 pb-4 border-b border-tactical-green-dim/30">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {isDealer
                            ? "Coupon codes are not used on dealer orders."
                            : `Discount codes cannot be stacked during the ${ACTIVE_SALE.name}. Eligible items already reflect ${ACTIVE_SALE.discountPercent}% off.`}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{formatShippingCost(shipping)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-tactical-green">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-tactical-green-dim/30">
                      <span>Total</span>
                      <span className="text-tactical-green">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Accepted Cards */}
                  <div className="mt-6 pt-6 border-t border-tactical-green-dim/30">
                    <p className="text-xs text-muted-foreground mb-3">We Accept:</p>
                    <div className="flex gap-2">
                      <div className="px-3 py-2 bg-tactical-surface rounded border border-tactical-green-dim/30 text-xs text-foreground">
                        Visa
                      </div>
                      <div className="px-3 py-2 bg-tactical-surface rounded border border-tactical-green-dim/30 text-xs text-foreground">
                        Mastercard
                      </div>
                      <div className="px-3 py-2 bg-tactical-surface rounded border border-tactical-green-dim/30 text-xs text-foreground">
                        Amex
                      </div>
                      <div className="px-3 py-2 bg-tactical-surface rounded border border-tactical-green-dim/30 text-xs text-foreground">
                        Discover
                      </div>
                    </div>
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
