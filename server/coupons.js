// Coupon codes are server-side only — never expose these in frontend source.
const { calculateShippingCost } = require('./shipping');
const { resolveItemPrice, areCouponsAllowed } = require('./sale');
const COUPONS = {
  KXFVETS2026: {
    type: 'percent',
    value: 15,
  },
  KXFCOPS2026: {
    type: 'percent',
    value: 15,
  },
};

function normalizeCouponCode(code = '') {
  return String(code).trim().toUpperCase();
}

function validateCoupon(code) {
  const normalized = normalizeCouponCode(code);
  if (!normalized) return null;

  const coupon = COUPONS[normalized];
  if (!coupon) return null;

  return { code: normalized, ...coupon };
}

function calculateSubtotal(items = []) {
  return items.reduce((sum, item) => {
    const price = resolveItemPrice(item);
    const quantity = Number(item.quantity);
    if (!Number.isFinite(price) || !Number.isFinite(quantity) || quantity <= 0) {
      return sum;
    }
    return sum + price * quantity;
  }, 0);
}

function roundCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

function calculateOrderTotals(items, couponCode = null) {
  const subtotal = roundCurrency(calculateSubtotal(items));
  const shipping = calculateShippingCost(subtotal);

  if (couponCode && !areCouponsAllowed()) {
    return { subtotal, shipping, discount: 0, total: roundCurrency(subtotal + shipping), coupon: null, couponBlocked: true };
  }

  const coupon = couponCode ? validateCoupon(couponCode) : null;

  let discount = 0;
  if (coupon?.type === 'percent') {
    discount = roundCurrency(subtotal * (coupon.value / 100));
  }

  const total = roundCurrency(subtotal + shipping - discount);

  return { subtotal, shipping, discount, total, coupon };
}

module.exports = {
  validateCoupon,
  calculateOrderTotals,
  areCouponsAllowed,
};
