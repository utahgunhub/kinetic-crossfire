const assert = require('assert');
const {
  ACTIVE_SALE,
  isSaleActive,
  isExcludedFromSale,
  getSalePrice,
  resolveItemPrice,
  areCouponsAllowed,
} = require('./sale');
const { calculateOrderTotals } = require('./coupons');
const {
  FRT_PRODUCT_ID,
  getDealerUnitPrice,
  calculateDealerOrderTotals,
} = require('./dealerPricing');
const catalog = require('../shared/dealerCatalog.json');

async function run() {
  // 1. Sale configuration is active and 15% off
  assert.strictEqual(isSaleActive(), true);
  assert.strictEqual(ACTIVE_SALE.discountPercent, 15);
  assert.strictEqual(areCouponsAllowed(), false);

  // 2. Retail sale prices (15% off everything except charging handles)
  assert.strictEqual(resolveItemPrice({ productId: 'thompson-blow-back-trigger', quantity: 1 }), 233.75);
  assert.strictEqual(resolveItemPrice({ productId: 'thompson-gun-mat', quantity: 1 }), 30.6);
  assert.strictEqual(resolveItemPrice({ productId: 'chicago-typewriter-cap', quantity: 1 }), 27.2);
  assert.strictEqual(resolveItemPrice({ productId: 'public-enemy-hat', quantity: 1 }), 27.2);

  // Dynamic CMS product gets 15% off
  const customPriceMap = {
    ...catalog.CATALOG_PRICES,
    'thompson-shirt': 40,
    'custom-billet-handle': 50,
  };
  const customMetaMap = {
    'thompson-shirt': { name: 'Thompson T-Shirt', contact_only: false },
    'custom-billet-handle': { name: 'Billet Charging Handle', contact_only: false },
    annihilator: { name: 'The Annihilator', contact_only: true },
  };
  assert.strictEqual(
    resolveItemPrice({ productId: 'thompson-shirt', quantity: 1 }, customPriceMap, customMetaMap),
    34
  );

  // 3. Charging handles & contact-only excluded
  assert.strictEqual(isExcludedFromSale('thompson-charging-handle'), true);
  assert.strictEqual(isExcludedFromSale('thompson-top-charging-handle'), true);
  assert.strictEqual(isExcludedFromSale('annihilator'), true);
  assert.strictEqual(resolveItemPrice({ productId: 'thompson-charging-handle', quantity: 1 }), 38);
  assert.strictEqual(resolveItemPrice({ productId: 'thompson-top-charging-handle', quantity: 1 }), 40);
  assert.strictEqual(
    resolveItemPrice({ productId: 'custom-billet-handle', quantity: 1 }, customPriceMap, customMetaMap),
    50
  );
  assert.strictEqual(getSalePrice(38, 'thompson-charging-handle'), undefined);
  assert.strictEqual(getSalePrice(40, 'thompson-top-charging-handle'), undefined);

  // 4. Mixed retail cart totals (FRT + Top Charging Handle + Hat)
  const mixedRetail = await calculateOrderTotals(
    [
      { productId: 'thompson-blow-back-trigger', quantity: 1 },
      { productId: 'thompson-top-charging-handle', quantity: 1 },
      { productId: 'public-enemy-hat', quantity: 1 },
    ],
    null,
    catalog.CATALOG_PRICES
  );
  assert.strictEqual(mixedRetail.subtotal, 300.95); // 233.75 + 40 + 27.20
  assert.strictEqual(mixedRetail.shipping, 0);
  assert.strictEqual(mixedRetail.discount, 0);
  assert.strictEqual(mixedRetail.total, 300.95);

  // 5. Coupon stacking is blocked on both eligible and excluded carts
  const stackedRetail = await calculateOrderTotals(
    [{ productId: 'thompson-blow-back-trigger', quantity: 1 }],
    'KXFVETS2026',
    catalog.CATALOG_PRICES
  );
  assert.strictEqual(stackedRetail.couponBlocked, true);
  assert.strictEqual(stackedRetail.discount, 0);
  assert.strictEqual(stackedRetail.coupon, null);
  assert.strictEqual(stackedRetail.total, 233.75);

  const handleWithCoupon = await calculateOrderTotals(
    [{ productId: 'thompson-top-charging-handle', quantity: 1 }],
    'KXFVETS2026',
    catalog.CATALOG_PRICES
  );
  assert.strictEqual(handleWithCoupon.couponBlocked, true);
  assert.strictEqual(handleWithCoupon.discount, 0);
  assert.strictEqual(handleWithCoupon.subtotal, 40);
  assert.strictEqual(handleWithCoupon.shipping, 8);
  assert.strictEqual(handleWithCoupon.total, 48);

  // 6. Dealer pricing is completely unchanged (still based on MSRP, not Black Friday prices)
  assert.strictEqual(getDealerUnitPrice(FRT_PRODUCT_ID, 1), 231); // 16% off $275
  assert.strictEqual(getDealerUnitPrice(FRT_PRODUCT_ID, 10), 220); // 20% off $275
  assert.strictEqual(getDealerUnitPrice(FRT_PRODUCT_ID, 20), 203.5); // 26% off $275
  assert.strictEqual(getDealerUnitPrice(FRT_PRODUCT_ID, 30), 187); // 32% off $275
  assert.strictEqual(getDealerUnitPrice('thompson-gun-mat', 0), 34.2); // 5% off $36
  assert.strictEqual(getDealerUnitPrice('public-enemy-hat', 0), 30.4); // 5% off $32
  assert.strictEqual(getDealerUnitPrice('thompson-charging-handle', 0), 36.1); // 5% off $38
  assert.strictEqual(getDealerUnitPrice('thompson-top-charging-handle', 0), 38); // 5% off $40

  const dealerOrder = calculateDealerOrderTotals([
    { productId: FRT_PRODUCT_ID, quantity: 2 },
    { productId: 'thompson-gun-mat', quantity: 1 },
    { productId: 'thompson-top-charging-handle', quantity: 1 },
  ]);
  assert.strictEqual(dealerOrder.subtotal, 231 * 2 + 34.2 + 38);
  assert.strictEqual(dealerOrder.shipping, 0);
  assert.strictEqual(dealerOrder.discount, 0);
  assert.strictEqual(dealerOrder.total, 534.2);

  console.log('✅ Black Friday sale tests passed');
}

run().catch((err) => {
  console.error('❌ Black Friday sale tests failed:', err);
  process.exit(1);
});
