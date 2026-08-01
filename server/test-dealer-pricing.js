const assert = require('assert');
const {
  getDealerUnitPrice,
  calculateDealerOrderTotals,
  FRT_PRODUCT_ID,
} = require('./dealerPricing');

function line(productId, quantity) {
  return { productId, id: productId, quantity };
}

// FRT tier: 5 units => 16% off $275 = $231
assert.strictEqual(getDealerUnitPrice(FRT_PRODUCT_ID, 5), 231);

// FRT tier: 10 units => 20% off = $220
assert.strictEqual(getDealerUnitPrice(FRT_PRODUCT_ID, 10), 220);

// Accessory 5% off $38 handle => $36.10
assert.strictEqual(getDealerUnitPrice('thompson-charging-handle', 0), 36.1);

const mixed = calculateDealerOrderTotals([
  line(FRT_PRODUCT_ID, 2),
  line('thompson-charging-handle', 1),
]);

assert.strictEqual(mixed.subtotal, 231 * 2 + 36.1);
assert.strictEqual(mixed.shipping, 0);

const accessoryOnly = calculateDealerOrderTotals([
  line('thompson-charging-handle', 1),
]);

assert.strictEqual(accessoryOnly.subtotal, 36.1);
assert.strictEqual(accessoryOnly.shipping, 8);

console.log('✅ dealer pricing tests passed');
