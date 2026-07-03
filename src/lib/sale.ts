export const JULY4_SALE = {
  name: "4th of July Sale",
  startDate: "2026-07-03",
  endDate: "2026-07-05",
  prices: {
    "thompson-blow-back-trigger": 250,
    "thompson-gun-mat": 25,
    "chicago-typewriter-cap": 25,
    "public-enemy-hat": 25,
  } as Record<string, number>,
} as const;

function getChicagoDateString(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function isSaleActive(date = new Date()): boolean {
  const today = getChicagoDateString(date);
  return today >= JULY4_SALE.startDate && today <= JULY4_SALE.endDate;
}

export function getSalePrice(productId: string): number | undefined {
  if (!isSaleActive()) return undefined;
  return JULY4_SALE.prices[productId];
}

export function isProductOnSale(productId: string): boolean {
  return getSalePrice(productId) !== undefined;
}

export function applySalePricing<T extends { id: string; price: number; originalPrice?: number }>(
  product: T
): T {
  const salePrice = getSalePrice(product.id);
  if (salePrice === undefined) return product;

  return {
    ...product,
    originalPrice: product.price,
    price: salePrice,
  };
}

export function areCouponsAllowed(): boolean {
  return !isSaleActive();
}
