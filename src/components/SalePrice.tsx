import { ACTIVE_SALE } from "@/lib/sale";

interface SalePriceProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  showSaveBadge?: boolean;
}

const sizeClasses = {
  sm: { price: "text-xl", original: "text-base", badge: "text-xs px-2 py-0.5" },
  md: { price: "text-3xl", original: "text-xl", badge: "text-xs px-2 py-1" },
  lg: { price: "text-4xl", original: "text-2xl", badge: "text-sm px-3 py-1" },
};

export function SalePrice({
  price,
  originalPrice,
  size = "md",
  showSaveBadge = true,
}: SalePriceProps) {
  const classes = sizeClasses[size];
  const onSale = originalPrice !== undefined && originalPrice > price;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className={`${classes.price} font-bold text-tactical-green`}>
        ${price.toFixed(2)}
      </span>
      {onSale && (
        <>
          <span className={`${classes.original} text-muted-foreground line-through`}>
            ${originalPrice.toFixed(2)}
          </span>
          {showSaveBadge && (
            <span className={`bg-tactical-green text-tactical-dark ${classes.badge} rounded font-bold`}>
              Save ${(originalPrice - price).toFixed(2)}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export function SaleBadge() {
  return (
    <span className="inline-block px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-300 text-xs font-bold uppercase tracking-wider">
      {ACTIVE_SALE.name} · {ACTIVE_SALE.discountPercent}% Off
    </span>
  );
}
