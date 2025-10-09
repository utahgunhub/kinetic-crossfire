import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TacticalButton } from "@/components/TacticalButton";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 8.00;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-24 bg-tactical-dark">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
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
            <span className="text-foreground">Cart</span>
          </div>
        </div>
      </section>

      {/* Cart Section */}
      <section className="py-16 bg-tactical-surface">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground tracking-wider mb-12">
              Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div 
                    key={item.product.id}
                    className="bg-tactical-dark rounded-lg p-6 border border-tactical-green-dim/30 flex gap-6"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${item.product.id}`}>
                      <img 
                        src={item.product.images[0].src} 
                        alt={item.product.images[0].alt}
                        className="w-32 h-32 object-cover rounded border border-tactical-green-dim/30 hover:border-tactical-green transition-colors"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="text-xl font-semibold text-foreground hover:text-tactical-green transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                          {item.product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <div className="flex items-center border border-tactical-green-dim/30 rounded">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-tactical-green/20 transition-colors"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-foreground min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-tactical-green/20 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-tactical-green">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-tactical-dark rounded-lg p-8 border border-tactical-green-dim/30 sticky top-24">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        💡 Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    )}
                    
                    <div className="border-t border-tactical-green-dim/30 pt-4">
                      <div className="flex justify-between text-2xl font-bold">
                        <span className="text-foreground">Total</span>
                        <span className="text-tactical-green">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Link to="/checkout" className="block">
                      <TacticalButton variant="primary" size="lg" className="w-full text-lg py-4">
                        Proceed to Checkout
                      </TacticalButton>
                    </Link>

                    <Link to="/purchase" className="block">
                      <TacticalButton variant="secondary" size="lg" className="w-full">
                        Continue Shopping
                      </TacticalButton>
                    </Link>
                  </div>

                  {/* Secure Payment Notice */}
                  <div className="mt-6 p-4 bg-tactical-surface rounded border border-tactical-green-dim/30">
                    <p className="text-xs text-muted-foreground text-center">
                      🔒 Secure payment with GunTab escrow
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

export default Cart;

