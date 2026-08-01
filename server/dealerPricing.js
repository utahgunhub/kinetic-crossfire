const catalog = require('../shared/dealerCatalog.json');
const { calculateShippingCost } = require('./shipping');

const FRT_PRODUCT_ID = catalog.FRT_PRODUCT_ID;
const OTHER_DISCOUNT = catalog.OTHER_DEALER_DISCOUNT_PERCENT;
const CATALOG_PRICES = catalog.CATALOG_PRICES;
const FRT_TIERS = catalog.FRT_VOLUME_TIERS;

function getCatalogMsrp(productId) {
  return CATALOG_PRICES[productId];
}

function countFrtQuantity(items = []) {
  return items.reduce((sum, item) => {
    const id = item.productId || item.id;
    if (id !== FRT_PRODUCT_ID) return sum;
    return sum + Number(item.quantity || 0);
  }, 0);
}

function getFrtDiscountPercent(totalFrtQty) {
  if (totalFrtQty <= 0) return FRT_TIERS[FRT_TIERS.length - 1].discountPercent;
  for (const tier of FRT_TIERS) {
    if (totalFrtQty >= tier.minQty) return tier.discountPercent;
  }
  return FRT_TIERS[FRT_TIERS.length - 1].discountPercent;
}

function roundCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

function getDealerUnitPrice(productId, totalFrtQtyInOrder) {
  const msrp = getCatalogMsrp(productId);
  if (msrp === undefined) {
    return null;
  }

  if (productId === FRT_PRODUCT_ID) {
    const discount = getFrtDiscountPercent(totalFrtQtyInOrder);
    return roundCurrency(msrp * (1 - discount / 100));
  }

  return roundCurrency(msrp * (1 - OTHER_DISCOUNT / 100));
}

function resolveDealerItemPrice(item, totalFrtQty) {
  const productId = item.productId || item.id;
  const price = getDealerUnitPrice(productId, totalFrtQty);
  if (price === null) return null;
  return price;
}

function cartHasFrt(items = []) {
  return countFrtQuantity(items) > 0;
}

function calculateDealerShippingCost(subtotal, items = []) {
  if (cartHasFrt(items)) return 0;
  return calculateShippingCost(subtotal);
}

function calculateDealerOrderTotals(items = []) {
  const frtQty = countFrtQuantity(items);
  const subtotal = roundCurrency(
    items.reduce((sum, item) => {
      const price = resolveDealerItemPrice(item, frtQty);
      const quantity = Number(item.quantity);
      if (price === null || !Number.isFinite(quantity) || quantity <= 0) {
        return sum;
      }
      return sum + price * quantity;
    }, 0)
  );

  const shipping = calculateDealerShippingCost(subtotal, items);
  const total = roundCurrency(subtotal + shipping);

  return { subtotal, shipping, discount: 0, total, frtQty };
}

module.exports = {
  FRT_PRODUCT_ID,
  getCatalogMsrp,
  getDealerUnitPrice,
  calculateDealerOrderTotals,
  countFrtQuantity,
  cartHasFrt,
};
