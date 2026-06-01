import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);

  // Load order data from sessionStorage
  useEffect(() => {
    const lastOrderStr = sessionStorage.getItem('lastOrder');
    if (!lastOrderStr) {
      console.log('No order data found, redirecting to home');
      navigate('/');
      return;
    }
    
    try {
      const lastOrder = JSON.parse(lastOrderStr);
      console.log('✅ Order data loaded:', lastOrder);
      setOrderData(lastOrder);
    } catch (error) {
      console.error('Failed to parse order data:', error);
      navigate('/');
    }
  }, [navigate]);

  if (!orderData) {
    return null;
  }

  const { transactionId, authCode, shippingInfo, items, subtotal, shipping, total } = orderData;
  const includesThompsonFRT = items?.some(
    (item: any) => item.product?.id === "thompson-blow-back-trigger"
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Confirmation Section */}
      <section className="py-24 bg-tactical-surface relative overflow-hidden">
        {/* Success Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-tactical-green/10 via-transparent to-tactical-green/5 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Badge */}
            <div className="mb-6 inline-block px-6 py-3 bg-tactical-green/20 border-2 border-tactical-green rounded-full">
              <p className="text-tactical-green font-bold text-lg tracking-wider">
                ✓ PAYMENT SUCCESSFUL
              </p>
            </div>

            {/* Success Icon */}
            <div className="mb-8 flex justify-center animate-in zoom-in duration-500">
              <div className="relative">
                <CheckCircle2 className="w-32 h-32 text-tactical-green drop-shadow-[0_0_25px_rgba(0,255,65,0.5)]" />
                <div className="absolute inset-0 bg-tactical-green/20 rounded-full blur-2xl animate-pulse" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-5xl font-bold text-foreground tracking-wider mb-4 animate-in slide-in-from-bottom-4 duration-700">
              Order Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-in fade-in duration-700 delay-150">
              Thank you for your purchase. Your order has been successfully placed and payment confirmed.
            </p>

            {/* Transaction Details */}
            <div className="bg-tactical-dark rounded-lg p-6 border border-tactical-green-dim/30 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Transaction ID</p>
                  <p className="text-lg font-mono text-tactical-green break-all">
                    {transactionId}
                  </p>
                </div>
                {authCode && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Authorization Code</p>
                    <p className="text-lg font-mono text-tactical-green">
                      {authCode}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30 mb-8 text-left">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                What happens next?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-tactical-green text-tactical-dark rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">✅ Payment Confirmed</h3>
                    <p className="text-sm text-muted-foreground">
                      Your payment has been successfully processed through Authorize.net.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-tactical-green text-tactical-dark rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Order Preparation</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll prepare your order and ship it within 1-2 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-tactical-green text-tactical-dark rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email Confirmation</h3>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email confirmation{includesThompsonFRT ? " and User's Guide access" : " with tracking information"} at{' '}
                      <span className="text-tactical-green">{shippingInfo?.email}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-tactical-green text-tactical-dark rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered to your specified address.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            {items && items.length > 0 && (
              <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30 mb-8 text-left">
                <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item: any) => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <img 
                        src={item.product.images[0].src} 
                        alt={item.product.images[0].alt}
                        className="w-16 h-16 object-cover rounded border border-tactical-green-dim/30"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm text-tactical-green font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-tactical-green-dim/30 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-foreground">Total Paid</span>
                    <span className="text-tactical-green">${total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Address */}
            {shippingInfo && (
              <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30 mb-8 text-left">
                <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
                  Shipping Address
                </h2>
                <div className="text-muted-foreground space-y-1">
                  <p className="text-foreground font-medium">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </p>
                  <p>{shippingInfo.address}</p>
                  <p>
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                  </p>
                  <p>{shippingInfo.country}</p>
                  <p className="pt-2">{shippingInfo.email}</p>
                  <p>{shippingInfo.phone}</p>
                </div>
              </div>
            )}

            {includesThompsonFRT && (
              <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30 mb-8 text-left">
                <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
                  Thompson FRT User&apos;s Guide
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Read the User&apos;s Guide before installing or operating your Thompson FRT.
                </p>
                <div className="mt-6 flex justify-center">
                  <a
                    href="/user-guide.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TacticalButton variant="secondary" size="lg">
                      Open User&apos;s Guide
                    </TacticalButton>
                  </a>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <TacticalButton variant="primary" size="lg">
                  Continue Shopping
                </TacticalButton>
              </Link>
              
              <Link to="/">
                <TacticalButton variant="secondary" size="lg">
                  Back to Home
                </TacticalButton>
              </Link>
            </div>

            {/* Support */}
            <div className="mt-12 p-6 bg-tactical-surface/50 rounded-lg border border-tactical-green-dim/30">
              <p className="text-sm text-muted-foreground">
                Questions about your order? <Link to="/contact" className="text-tactical-green hover:underline">Contact us</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;

