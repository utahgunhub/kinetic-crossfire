import catalog from "../../shared/dealerCatalog.json";
import type { Product } from "@/data/products";
import {
  calculateShippingCost as retailCalculateShippingCost,
  FREE_SHIPPING_MINIMUM,
  STANDARD_SHIPPING_COST,
} from "@/lib/shipping";

export const FRT_PRODUCT_ID = catalog.FRT_PRODUCT_ID;
export const FRT_MSRP = catalog.FRT_MSRP;
const OTHER_DISCOUNT = catalog.OTHER_DEALER_DISCOUNT_PERCENT;
const CATALOG_PRICES = catalog.CATALOG_PRICES as Record<string, number>;
const FRT_TIERS = catalog.FRT_VOLUME_TIERS as Array<{
  minQty: number;
  discountPercent: number;
}>;

export function getCatalogMsrp(productId: string): number {
  return CATALOG_PRICES[productId] ?? 0;
}

export function countFrtQuantityInCart(
  items: Array<{ product: { id: string }; quantity: number }>
): number {
  return items.reduce((sum, item) => {
    if (item.product.id !== FRT_PRODUCT_ID) return sum;
    return sum + item.quantity;
  }, 0);
}

export function getFrtDiscountPercent(totalFrtQty: number): number {
  if (totalFrtQty <= 0) return FRT_TIERS[FRT_TIERS.length - 1].discountPercent;
  for (const tier of FRT_TIERS) {
    if (totalFrtQty >= tier.minQty) return tier.discountPercent;
  }
  return FRT_TIERS[FRT_TIERS.length - 1].discountPercent;
}

export function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function getDealerUnitPrice(
  productId: string,
  totalFrtQtyInOrder: number
): number {
  const msrp = getCatalogMsrp(productId);
  if (!msrp) return 0;

  if (productId === FRT_PRODUCT_ID) {
    const discount = getFrtDiscountPercent(totalFrtQtyInOrder);
    return roundCurrency(msrp * (1 - discount / 100));
  }

  return roundCurrency(msrp * (1 - OTHER_DISCOUNT / 100));
}

export function applyDealerPricingToProduct(
  product: Product,
  totalFrtQtyInOrder: number
): Product {
  const msrp = getCatalogMsrp(product.id) || product.price;
  const dealerPrice = getDealerUnitPrice(product.id, totalFrtQtyInOrder);
  return {
    ...product,
    originalPrice: msrp,
    price: dealerPrice,
  };
}

export function cartHasFrt(
  items: Array<{ product: { id: string }; quantity: number }>
): boolean {
  return countFrtQuantityInCart(items) > 0;
}

export function calculateDealerShippingCost(
  subtotal: number,
  items: Array<{ product: { id: string }; quantity: number }>
): number {
  if (cartHasFrt(items)) return 0;
  return retailCalculateShippingCost(subtotal);
}

export function calculateDealerCartSubtotal(
  items: Array<{ product: Product; quantity: number }>
): number {
  const frtQty = countFrtQuantityInCart(items);
  return items.reduce((sum, item) => {
    const unit = getDealerUnitPrice(item.product.id, frtQty);
    return sum + unit * item.quantity;
  }, 0);
}

export const DEALER_LARGE_ORDER_FRT_QTY = 50;

export {
  FREE_SHIPPING_MINIMUM,
  STANDARD_SHIPPING_COST,
};
