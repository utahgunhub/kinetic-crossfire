import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { TacticalButton } from "@/components/TacticalButton";

const Navigation = () => {
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
                src="/kinetic-crossfire-logo-letters.png" 
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
              <div className="flex items-center space-x-2 bg-tactical-surface px-3 py-2 rounded">
                <ShoppingCart className="w-4 h-4 text-tactical-green" />
                <span className="text-foreground font-medium">CART</span>
                <span className="bg-tactical-green text-tactical-dark px-2 py-1 rounded text-xs font-bold">
                  $0.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;