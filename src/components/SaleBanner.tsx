import { Link } from "react-router-dom";
import { isSaleActive } from "@/lib/sale";
import { useAuth } from "@/contexts/AuthContext";

const SaleBanner = () => {
  const { isDealer } = useAuth();

  if (!isSaleActive() || isDealer) return null;

  return (
    <div className="bg-gradient-to-r from-zinc-950 via-amber-950/90 to-zinc-950 border-b border-amber-500/40">
      <div className="container mx-auto px-6 py-2.5">
        <p className="text-center text-sm md:text-base text-amber-100">
          <span className="font-bold uppercase tracking-wider text-amber-300">
            BLACK FRIDAY SALE LIVE
          </span>
          <span className="mx-2 opacity-50">|</span>
          <Link
            to="/shop"
            className="font-semibold text-white underline underline-offset-2 hover:text-amber-300 transition-colors"
          >
            Shop Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SaleBanner;
