const { createClient } = require("@supabase/supabase-js");
const catalogJson = require("../shared/dealerCatalog.json");

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
}

function getServiceClient() {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getUserClient(accessToken) {
  const url = getSupabaseUrl();
  const anon = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon || !accessToken) return null;
  return createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return res.status(401).json({ success: false, error: "Sign in required" });
  }
  const client = getUserClient(token);
  if (!client) {
    return res.status(500).json({ success: false, error: "Supabase is not configured on the server" });
  }
  const { data, error } = await client.rpc("check_is_admin");
  if (error || !data) {
    return res.status(403).json({ success: false, error: "Admin access required" });
  }
  req.adminToken = token;
  next();
}

async function loadPublishedProducts() {
  const supabase = getServiceClient();
  if (!supabase) {
    return Object.entries(catalogJson.CATALOG_PRICES).map(([id, price]) => ({
      id,
      name: "",
      price,
      quantity_on_hand: 999,
      contact_only: false,
      is_published: true,
    }));
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, quantity_on_hand, contact_only, is_published")
    .eq("is_published", true);

  if (error) {
    console.error("Failed to load products from Supabase:", error.message);
    throw error;
  }
  return data || [];
}

function buildPriceMap(productRows) {
  const map = { ...catalogJson.CATALOG_PRICES };
  for (const row of productRows) {
    map[row.id] = Number(row.price);
  }
  return map;
}

function buildProductMetaMap(productRows) {
  const map = {};
  for (const row of productRows) {
    map[row.id] = {
      name: row.name || "",
      contact_only: row.contact_only === true,
    };
  }
  return map;
}

const FALLBACK_COUPONS = {
  KXFVETS2026: { type: "percent", value: 15 },
  KXFCOPS2026: { type: "percent", value: 15 },
};

async function findActiveCoupon(code) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!normalized) return null;

  const supabase = getServiceClient();
  if (!supabase) {
    const coupon = FALLBACK_COUPONS[normalized];
    return coupon ? { code: normalized, ...coupon, min_subtotal: null } : null;
  }

  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", normalized)
    .maybeSingle();

  if (error) {
    console.error("Coupon lookup failed:", error.message);
    throw error;
  }
  if (!data || !data.is_active) return null;

  const now = Date.now();
  if (data.starts_at && new Date(data.starts_at).getTime() > now) return null;
  if (data.ends_at && new Date(data.ends_at).getTime() < now) return null;
  if (
    data.max_redemptions != null &&
    Number(data.redemption_count) >= Number(data.max_redemptions)
  ) {
    return null;
  }

  return {
    code: data.code,
    type: data.type,
    value: Number(data.value),
    min_subtotal: data.min_subtotal != null ? Number(data.min_subtotal) : null,
  };
}

async function incrementCouponRedemption(code) {
  const supabase = getServiceClient();
  if (!supabase || !code) return;
  const normalized = String(code).trim().toUpperCase();
  const { data } = await supabase
    .from("coupons")
    .select("redemption_count")
    .eq("code", normalized)
    .maybeSingle();
  if (!data) return;
  await supabase
    .from("coupons")
    .update({ redemption_count: Number(data.redemption_count || 0) + 1 })
    .eq("code", normalized);
}

async function assertInventory(items) {
  const supabase = getServiceClient();
  if (!supabase) return;

  const rows = await loadPublishedProducts();
  const byId = Object.fromEntries(rows.map((row) => [row.id, row]));

  for (const item of items) {
    const productId = item.productId || item.id;
    const quantity = Number(item.quantity);
    const row = byId[productId];
    if (!row) {
      throw new Error(`Unknown product: ${productId}`);
    }
    if (row.contact_only) {
      throw new Error(`${productId} cannot be purchased online`);
    }
    if (Number(row.quantity_on_hand) < quantity) {
      throw new Error(`Insufficient stock for ${productId}`);
    }
  }
}

async function decrementInventory(items) {
  const supabase = getServiceClient();
  if (!supabase) return;

  const rows = await loadPublishedProducts();
  const byId = Object.fromEntries(rows.map((row) => [row.id, row]));

  for (const item of items) {
    const productId = item.productId || item.id;
    const quantity = Number(item.quantity);
    const row = byId[productId];
    if (!row || row.contact_only) continue;
    const { error } = await supabase
      .from("products")
      .update({ quantity_on_hand: Math.max(0, Number(row.quantity_on_hand) - quantity) })
      .eq("id", productId);
    if (error) {
      console.error(`Could not decrement stock for ${productId}:`, error.message);
    }
  }
}

module.exports = {
  getServiceClient,
  getUserClient,
  requireAdmin,
  loadPublishedProducts,
  buildPriceMap,
  buildProductMetaMap,
  findActiveCoupon,
  incrementCouponRedemption,
  assertInventory,
  decrementInventory,
};
