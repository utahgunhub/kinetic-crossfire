const FREE_SHIPPING_MINIMUM = 50;
const STANDARD_SHIPPING_COST = 8;

function calculateShippingCost(subtotal) {
  return subtotal >= FREE_SHIPPING_MINIMUM ? 0 : STANDARD_SHIPPING_COST;
}

module.exports = {
  FREE_SHIPPING_MINIMUM,
  STANDARD_SHIPPING_COST,
  calculateShippingCost,
};
