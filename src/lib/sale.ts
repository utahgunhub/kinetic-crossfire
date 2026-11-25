import saleConfig from "../../shared/saleConfig.json";

export interface SaleConfig {
  active: boolean;
  name: string;
  discountPercent: number;
  excludedProductIds: string[];
  allowCoupons: boolean;
}

export const ACTIVE_SALE: SaleConfig = saleConfig;

const CHARGING_HANDLE_PATTERN = /charging[\s_-]*handle/i;

function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function isSaleActive(): boolean {
  return Boolean(ACTIVE_SALE.active);
}

export function isExcludedFromSale(
  productId: string,
  productName?: string,
  contactOnly?: boolean
): boolean {
  if (contactOnly === true) return true;
  if (ACTIVE_SALE.excludedProductIds.includes(productId)) return true;
  if (CHARGING_HANDLE_PATTERN.test(productId)) return true;
  if (productName && CHARGING_HANDLE_PATTERN.test(productName)) return true;
  return false;
}

export function getSalePrice(
  basePrice: number,
  productId: string,
  productName?: string,
  contactOnly?: boolean
): number | undefined {
  if (!isSaleActive()) return undefined;
  if (isExcludedFromSale(productId, productName, contactOnly)) return undefined;
  if (!Number.isFinite(basePrice) || basePrice <= 0) return undefined;

  const discounted = roundCurrency(
    basePrice * (1 - ACTIVE_SALE.discountPercent / 100)
  );
  return discounted < basePrice ? discounted : undefined;
}

export function isProductOnSale(
  productOrId:
    | string
    | { id: string; name?: string; price?: number; originalPrice?: number; contactOnly?: boolean }
): boolean {
  if (!isSaleActive()) return false;

  if (typeof productOrId === "string") {
    return !isExcludedFromSale(productOrId);
  }

  if (isExcludedFromSale(productOrId.id, productOrId.name, productOrId.contactOnly)) {
    return false;
  }

  const referencePrice = productOrId.originalPrice ?? productOrId.price;
  return referencePrice === undefined || referencePrice > 0;
}

export function applySalePricing<
  T extends {
    id: string;
    name?: string;
    price: number;
    originalPrice?: number;
    contactOnly?: boolean;
  }
>(product: T): T {
  const salePrice = getSalePrice(
    product.price,
    product.id,
    product.name,
    product.contactOnly
  );
  if (salePrice === undefined) return product;

  return {
    ...product,
    originalPrice: product.price,
    price: salePrice,
  };
}

export function areCouponsAllowed(): boolean {
  return !isSaleActive() || Boolean(ACTIVE_SALE.allowCoupons);
}

export function formatDisplayPrice(price: number): string {
  return Number.isInteger(price) ? price.toFixed(0) : price.toFixed(2);
}
