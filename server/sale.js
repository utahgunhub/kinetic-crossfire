const JULY4_SALE = {
  name: '4th of July Sale',
  startDate: '2026-07-03',
  endDate: '2026-07-05',
  prices: {
    'thompson-blow-back-trigger': 250,
    'thompson-gun-mat': 25,
    'chicago-typewriter-cap': 25,
    'public-enemy-hat': 25,
  },
};

const CATALOG_PRICES = {
  'thompson-blow-back-trigger': 275,
  'thompson-charging-handle': 38,
  'thompson-top-charging-handle': 40,
  'thompson-gun-mat': 36,
  'chicago-typewriter-cap': 32,
  'public-enemy-hat': 32,
};

function getChicagoDateString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function isSaleActive(date = new Date()) {
  const today = getChicagoDateString(date);
  return today >= JULY4_SALE.startDate && today <= JULY4_SALE.endDate;
}

function getSalePrice(productId) {
  if (!isSaleActive()) return undefined;
  return JULY4_SALE.prices[productId];
}

function resolveItemPrice(item) {
  const productId = item.productId || item.id;
  const salePrice = getSalePrice(productId);
  if (salePrice !== undefined) return salePrice;

  const catalogPrice = CATALOG_PRICES[productId];
  if (catalogPrice !== undefined) return catalogPrice;

  return Number(item.price);
}

function areCouponsAllowed() {
  return !isSaleActive();
}

module.exports = {
  JULY4_SALE,
  isSaleActive,
  getSalePrice,
  resolveItemPrice,
  areCouponsAllowed,
};
