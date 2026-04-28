import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const { getTotalPrice, getTotalItems } = useCart();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const [isBackorderModalOpen, setIsBackorderModalOpen] = useState(false);

  useEffect(() => {
    const popupDelayMs = 8000;
    const popupTimer = window.setTimeout(() => {
      setIsBackorderModalOpen(true);
    }, popupDelayMs);

    return () => {
      window.clearTimeout(popupTimer);
    };
  }, []);

  return (
    <>
      {/* Top alert bar + main navigation */}
      <nav className="bg-tactical-darker border-b border-tactical-green-dim/30 sticky top-0 z-50">
        <button
          type="button"
          onClick={() => setIsBackorderModalOpen(true)}
          className="w-full bg-tactical-green hover:bg-tactical-green-glow text-tactical-dark text-xs md:text-sm font-semibold tracking-wide px-4 py-2 transition-colors"
          aria-label="Open full backorder notice"
        >
          Backorder notice: shipping may take 1-2 weeks.{" "}
          <span className="underline underline-offset-2">Click for full details.</span>
        </button>

        <div className="container mx-auto px-6">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/new-logo.png" 
                alt="Kinetic Crossfire" 
                className="h-10 w-auto"
              />
              <span className="text-foreground font-semibold tracking-wide uppercase">
                KINETIC CROSSFIRE
              </span>
            </Link>
            
            {/* Navigation Links - Absolutely Centered */}
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="text-foreground hover:text-tactical-green transition-colors font-medium uppercase tracking-wide text-sm">
                Home
              </Link>
              <Link to="/videos" className="text-foreground hover:text-tactical-green transition-colors font-medium uppercase tracking-wide text-sm">
                Videos
              </Link>
              <Link to="/shop" className="text-foreground hover:text-tactical-green transition-colors font-medium uppercase tracking-wide text-sm">
                Shop
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

      <Dialog open={isBackorderModalOpen} onOpenChange={setIsBackorderModalOpen}>
        <DialogContent className="max-w-xl border-tactical-green-dim/30 bg-tactical-dark">
          <DialogHeader>
            <DialogTitle className="text-xl text-foreground">Backorder Notice</DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              We are back ordered, but moving quickly. Wolff springs are being added to kits,
              which is also causing some delay. Please wait at least 1-2 weeks before asking
              about your order. Thank you for being patient.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsBackorderModalOpen(false)}
              className="bg-tactical-green text-tactical-dark hover:bg-tactical-green-glow"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;