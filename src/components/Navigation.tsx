import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { TacticalButton } from "@/components/TacticalButton";
import { useCart } from "@/contexts/CartContext";

const Navigation = () => {
  const { getTotalPrice, getTotalItems } = useCart();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <>
      {/* Top banner */}
      {/* <div className="bg-tactical-green text-tactical-dark text-center py-2 text-sm font-semibold tracking-wide">
        USE CODE SAVE20 FOR 20% OFF AT CHECKOUT
      </div> */}
      
      {/* Main navigation */}
      <nav className="bg-tactical-darker border-b border-tactical-green-dim/30 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/kf-logo.png" 
                alt="Kinetic Crossfire" 
                className="h-10 w-auto"
              />
            </div>
            
            {/* Navigation Links - Absolutely Centered */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="text-foreground hover:text-tactical-green transition-colors font-medium uppercase tracking-wide text-sm">
                Home
              </Link>
              <Link to="/videos" className="text-foreground hover:text-tactical-green transition-colors font-medium uppercase tracking-wide text-sm">
                Videos
              </Link>
              <Link to="/purchase" className="text-foreground hover:text-tactical-green transition-colors font-medium uppercase tracking-wide text-sm">
                Purchase
              </Link>
              <Link to="/contact" className="text-foreground hover:text-tactical-green transition-colors font-medium uppercase tracking-wide text-sm">
                Contact
              </Link>
            </div>
            
            {/* Cart */}
            <div className="flex items-center space-x-4">
              <Link to="/cart">
                <div className="flex items-center space-x-2 bg-tactical-surface px-3 py-2 rounded hover:bg-tactical-surface/80 transition-colors cursor-pointer relative">
                  <ShoppingCart className="w-4 h-4 text-tactical-green" />
                  <span className="text-foreground font-medium">CART</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-tactical-green text-tactical-dark w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="bg-tactical-green text-tactical-dark px-2 py-1 rounded text-xs font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;