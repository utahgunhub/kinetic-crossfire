const { calculateShippingCost } = require("./shipping");
const { resolveItemPrice, areCouponsAllowed } = require("./sale");
const { findActiveCoupon } = require("./catalog");

function normalizeCouponCode(code = "") {
  return String(code).trim().toUpperCase();
}

async function validateCoupon(code) {
  return findActiveCoupon(code);
}

function calculateSubtotal(items = [], priceMap) {
  return items.reduce((sum, item) => {
    const price = resolveItemPrice(item, priceMap);
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

async function calculateOrderTotals(items, couponCode = null, priceMap) {
  const subtotal = roundCurrency(calculateSubtotal(items, priceMap));
  const shipping = calculateShippingCost(subtotal);

  if (couponCode && !areCouponsAllowed()) {
    return {
      subtotal,
      shipping,
      discount: 0,
      total: roundCurrency(subtotal + shipping),
      coupon: null,
      couponBlocked: true,
    };
  }

  const coupon = couponCode ? await validateCoupon(couponCode) : null;

  let discount = 0;
  if (coupon?.type === "percent") {
    discount = roundCurrency(subtotal * (coupon.value / 100));
  } else if (coupon?.type === "fixed") {
    discount = roundCurrency(Math.min(subtotal, coupon.value));
  }

  if (coupon?.min_subtotal != null && subtotal < coupon.min_subtotal) {
    return {
      subtotal,
      shipping,
      discount: 0,
      total: roundCurrency(subtotal + shipping),
      coupon: null,
      belowMinimum: true,
    };
  }

  const total = roundCurrency(Math.max(0, subtotal + shipping - discount));

  return { subtotal, shipping, discount, total, coupon };
}

module.exports = {
  validateCoupon,
  calculateOrderTotals,
  areCouponsAllowed,
  normalizeCouponCode,
};
