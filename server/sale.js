const ACTIVE_SALE = require('../shared/saleConfig.json');
const dealerCatalog = require('../shared/dealerCatalog.json');

const CATALOG_PRICES = dealerCatalog.CATALOG_PRICES;
const CHARGING_HANDLE_PATTERN = /charging[\s_-]*handle/i;

function roundCurrency(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

function isSaleActive() {
  return Boolean(ACTIVE_SALE.active);
}

function isExcludedFromSale(productId, productName = '', contactOnly = false) {
  if (contactOnly === true) return true;
  if (Array.isArray(ACTIVE_SALE.excludedProductIds) && ACTIVE_SALE.excludedProductIds.includes(productId)) {
    return true;
  }
  if (productId && CHARGING_HANDLE_PATTERN.test(String(productId))) return true;
  if (productName && CHARGING_HANDLE_PATTERN.test(String(productName))) return true;
  return false;
}

function getSalePrice(basePrice, productId, productName = '', contactOnly = false) {
  if (!isSaleActive()) return undefined;
  if (isExcludedFromSale(productId, productName, contactOnly)) return undefined;

  const numericPrice = Number(basePrice);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) return undefined;

  const discounted = roundCurrency(
    numericPrice * (1 - Number(ACTIVE_SALE.discountPercent || 0) / 100)
  );
  return discounted < numericPrice ? discounted : undefined;
}

function resolveItemPrice(item, priceMap = CATALOG_PRICES, productMetaMap = {}) {
  const productId = item.productId || item.id;
  const meta = productMetaMap[productId] || {};
  const catalogPrice = priceMap[productId];
  const basePrice = catalogPrice !== undefined ? Number(catalogPrice) : Number(item.price);

  const productName = meta.name || item.name || '';
  const contactOnly = Boolean(meta.contact_only);

  const salePrice = getSalePrice(basePrice, productId, productName, contactOnly);
  if (salePrice !== undefined) return salePrice;

  return basePrice;
}

function areCouponsAllowed() {
  return !isSaleActive() || Boolean(ACTIVE_SALE.allowCoupons);
}

function getCouponBlockedMessage() {
  return `Discount codes cannot be stacked with ${ACTIVE_SALE.name} pricing.`;
}

module.exports = {
  ACTIVE_SALE,
  isSaleActive,
  isExcludedFromSale,
  getSalePrice,
  resolveItemPrice,
  areCouponsAllowed,
  getCouponBlockedMessage,
};
