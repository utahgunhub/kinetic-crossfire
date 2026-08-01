# Dealer portal — what to add (only)

Retail checkout is unchanged: same Render app, same Authorize.net env vars, same `VITE_API_URL`.

Dealer **login / admin / signup** = Supabase in the browser only (`VITE_SUPABASE_*`).

Dealer **checkout math** = same payment API you already use. When checkout sends `dealerCheckout: true`, the server totals the order with [`shared/dealerCatalog.json`](shared/dealerCatalog.json) rules (FRT tiers, 5%, shipping). **No Supabase on Render. No new env vars on Render.**

---

## Checklist

### 1. Supabase (one time)

Run SQL (in order if fresh):

1. [`supabase/migrations/20260801120000_dealer_portal.sql`](supabase/migrations/20260801120000_dealer_portal.sql) — set your admin email in `admin_allowlist`
2. [`supabase/migrations/20260801130000_complete_dealer_registration_rpc.sql`](supabase/migrations/20260801130000_complete_dealer_registration_rpc.sql)

Then: Email auth on, Site URL (`http://localhost:8080` or prod), create **Authentication → Users** admin matching `admin_allowlist`.

### 2. Frontend env (`.env` / Vercel)

| Variable | Notes |
|----------|--------|
| `VITE_SUPABASE_URL` | Already on your machine |
| `VITE_SUPABASE_ANON_KEY` | Anon key only |
| `VITE_API_URL` | Unchanged |

### 3. Render backend

**Nothing new.** Keep existing `AUTHORIZENET_*` and `FRONTEND_URL`. Deploy latest `server/` code so dealer totals run on `process-payment`.

### 4. EmailJS (only `/dealership`)

New template ID in [`src/lib/emailService.ts`](src/lib/emailService.ts) — see [`DEALER_APPLICATION_EMAILJS.txt`](DEALER_APPLICATION_EMAILJS.txt).

---

## Flow

1. `/dealership` → EmailJS  
2. `/admin` → invite email (Supabase)  
3. `/dealer/signup` → RPC `complete_dealer_registration()` (Supabase)  
4. Logged-in dealer checks out → frontend sends `dealerCheckout: true` + line items → **same** `POST /api/process-payment` recalculates dealer total and charges Authorize.net  

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Signup fails | Run RPC migration; invite email in `/admin` |
| Dealer UI prices ≠ charge | Redeploy Render with current `server/` (dealerPricing on payment route) |
| Retail broken | Unrelated to dealer — see [`PAYMENT-TESTING-GUIDE.md`](PAYMENT-TESTING-GUIDE.md) |

**Note:** `dealerCheckout` is set by your logged-in dealer UI. Someone could spoof that flag against the API and get dealer totals without an account. If that matters later, add signed dealer sessions; for many small dealer programs the invite gate is enough.
