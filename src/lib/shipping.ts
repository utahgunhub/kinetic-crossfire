export const FREE_SHIPPING_MINIMUM = 50;
export const STANDARD_SHIPPING_COST = 8;

export const SHIPPING_POLICY_TEXT = `Free shipping on orders of $${FREE_SHIPPING_MINIMUM} or more. Orders under $${FREE_SHIPPING_MINIMUM} include a $${STANDARD_SHIPPING_COST} shipping fee.`;

export function calculateShippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_MINIMUM ? 0 : STANDARD_SHIPPING_COST;
}

export function formatShippingCost(shipping: number): string {
  return shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
}

export function getAmountUntilFreeShipping(subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_MINIMUM) {
    return 0;
  }

  return FREE_SHIPPING_MINIMUM - subtotal;
}
