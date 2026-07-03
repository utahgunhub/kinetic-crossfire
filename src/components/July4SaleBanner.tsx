import { Link } from "react-router-dom";
import { isSaleActive } from "@/lib/sale";

const July4SaleBanner = () => {
  if (!isSaleActive()) return null;

  return (
    <div className="bg-gradient-to-r from-red-950/90 via-red-900/80 to-red-950/90 border-b border-red-500/30">
      <div className="container mx-auto px-6 py-3">
        <p className="text-center text-sm md:text-base text-red-100">
          <span className="font-bold uppercase tracking-wider text-white mr-2">
            4th of July Sale
          </span>
          FRT <span className="line-through opacity-70">$275</span>{" "}
          <span className="font-bold text-white">$250</span>
          <span className="mx-2 opacity-50">|</span>
          Hats &amp; Gun Mats <span className="line-through opacity-70">$32–36</span>{" "}
          <span className="font-bold text-white">$25</span>
          <span className="mx-2 opacity-50 hidden sm:inline">|</span>
          <span className="hidden sm:inline">Ends July 5</span>
          <Link
            to="/product/thompson-blow-back-trigger"
            className="ml-2 font-semibold text-white underline underline-offset-2 hover:text-red-200 transition-colors"
          >
            Shop Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default July4SaleBanner;
