# Production setup

Do this on live only: **Supabase SQL**, then **Vercel env**, then **Render env**, then **redeploy both**.

Admin is `https://www.kinetic-crossfire.com/admin`.

---

## 1. Supabase SQL (once)

Dashboard → your project → **SQL Editor**. Paste each file in full and **Run**:

1. `supabase/migrations/20260914120000_admin_cms.sql`
2. `supabase/migrations/20260914121000_seed_catalog.sql`
3. `supabase/migrations/20260914130000_product_image_size.sql` (100MB photo uploads; run this even if you already ran 1 and 2)

Check:

```sql
select id, name, price from public.products;
select code, value from public.coupons;
```

You should get 7 products and `KXFVETS2026` / `KXFCOPS2026`.

If `admin_allowlist` does not exist, run the three older files in `supabase/migrations/` first (`20260801120000`, `130000`, `140000`).

---

## 2. Vercel env vars

**Vercel → Project → Settings → Environment Variables.** Set for Production. Redeploy after saving.

| Variable | How to get it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → **Project Settings → API → Project URL** (`https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Same page → **`anon` `public`** |
| `VITE_API_URL` | Render web service URL, no trailing slash (`https://….onrender.com`) |
| `VITE_GA_MEASUREMENT_ID` | `G-C881TN39BC` (already in the app; also set this on Vercel) |

Do not add `SUPABASE_SERVICE_ROLE_KEY` on Vercel.

### GA Measurement ID

1. [analytics.google.com](https://analytics.google.com) → **Admin** (gear).
2. Create account/property if needed (name: Kinetic Crossfire, timezone Chicago, USD).
3. **Data stream → Web** → URL `https://www.kinetic-crossfire.com`.
4. Copy **Measurement ID** (`G-…`). That is `VITE_GA_MEASUREMENT_ID`.
5. **Admin → Property settings** → copy **Property ID** (numbers only). That is Render `GA_PROPERTY_ID`, not the `G-` value.

---

## 3. Render env vars

This is the existing checkout API (Authorize.net), not a new service. You are adding keys so it can read Supabase prices/coupons/stock and pull GA4 numbers for `/admin/analytics`.

Leave `AUTHORIZENET_API_LOGIN_ID`, `AUTHORIZENET_TRANSACTION_KEY`, `AUTHORIZENET_ENVIRONMENT`, and `NODE_ENV` alone.

### Open the service

1. Go to [https://dashboard.render.com](https://dashboard.render.com) and sign in.
2. Click the **web service** for this API (often named like `kinetic-crossfire-backend`). It is the one whose URL you already use as `VITE_API_URL`.
3. Left sidebar → **Environment**.
4. You should already see `AUTHORIZENET_*` and `FRONTEND_URL`. If `FRONTEND_URL` is not `https://www.kinetic-crossfire.com`, click it and set it to that, then save.

### Add each variable

On **Environment**, click **Add Environment Variable** (or **Edit** if you bulk-edit). Key = the name on the left. Value = paste with no quotes and no extra spaces. Mark it **secret** if Render shows a lock.

Do this five times:

**`SUPABASE_URL`**

1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard) → Kinetic Crossfire project.
2. Left sidebar → **Project Settings** (gear) → **API**.
3. Copy **Project URL** (`https://xxxx.supabase.co`).
4. Paste as the value of `SUPABASE_URL`.

**`SUPABASE_ANON_KEY`**

1. Same Supabase **API** page.
2. Under **Project API keys**, copy the `anon` `public` key.
3. Paste as `SUPABASE_ANON_KEY`. Same string as Vercel `VITE_SUPABASE_ANON_KEY`.

**`SUPABASE_SERVICE_ROLE_KEY`**

1. Same page → `service_role` `secret` → **Reveal** → copy.
2. Paste as `SUPABASE_SERVICE_ROLE_KEY`.
3. Never put this key on Vercel or in any `VITE_*` variable.

**`GA_PROPERTY_ID`**

1. Open [https://analytics.google.com](https://analytics.google.com).
2. Bottom-left **Admin** (gear).
3. Make sure the Kinetic Crossfire **property** is selected (not just the account).
4. **Property settings** → copy **Property ID** (digits only, like `123456789`).
5. That is **not** `G-XXXXXXXX`. `G-…` stays on Vercel as `VITE_GA_MEASUREMENT_ID`.
6. Paste the digits as `GA_PROPERTY_ID`.

**`GOOGLE_SERVICE_ACCOUNT_JSON`**

Create the key, then paste it as one line.

1. Open [https://console.cloud.google.com](https://console.cloud.google.com) and pick or create a project.
2. **APIs & Services → Library**. Search **Google Analytics Data API** → **Enable**.
3. **APIs & Services → Credentials → Create credentials → Service account**.
4. Name: `ga4-admin-reader` → **Create and continue** → skip optional roles → **Done**.
5. Click the new service account → **Keys → Add key → Create new key → JSON** → **Create**. A `.json` file downloads.
6. Open that file and copy `client_email` (looks like `ga4-admin-reader@….iam.gserviceaccount.com`).
7. Back in Analytics → **Admin → Property access management → Add users**.
8. Paste `client_email`. Role **Viewer**. Uncheck notify. **Save**.
9. On your Mac, in the folder where the JSON downloaded, run (use the real filename):

```bash
python3 -c 'import json; print(json.dumps(json.load(open("your-downloaded-key.json"))))'
```

10. Copy the single printed line (starts with `{"type":"service_account"`).
11. Paste that entire line as the value of `GOOGLE_SERVICE_ACCOUNT_JSON`. No line breaks.

Do not commit the downloaded JSON file.

### Save and wait

1. Click **Save changes** (or **Save**).
2. Render will restart/redeploy the service. Wait until the status is **Live**.
3. Open `https://YOUR-SERVICE.onrender.com/api/health` in a browser. You should get a JSON health response. That URL must match Vercel `VITE_API_URL`.

---

## 4. After deploy

1. Sign in at `/admin`.
2. **Products** lists the catalog. Edits show on `/shop`.
3. **Discount codes** lists the two seeded codes. Checkout uses them only if Render has the service role key.
4. **Dealer map**: add address → **Lookup coordinates** → **Published on map** → pin shows on `/dealers`.
5. **Analytics**: 7d / 28d / 90d. Zeros until GA has traffic (can take a few hours).

Map pins and wholesale invites are separate lists.

---

## If something fails

| Problem | Fix |
|---|---|
| Admin cannot load products | SQL in step 1 not run, or email not in `admin_allowlist` |
| Shop price ignores admin | Redeploy Vercel; confirm SQL seed |
| Checkout ignores admin price/coupon | Render missing `SUPABASE_SERVICE_ROLE_KEY`; restart Render |
| `/dealers` empty | Need published row with lat/lng |
| Image upload fails | Bucket `product-images` from first SQL file; signed in as admin |
| Analytics blank / setup error | Wrong `GA_PROPERTY_ID`, JSON not one line, or service account not a Viewer |
| Analytics 401 | Not signed in as admin, or `VITE_API_URL` is not the Render URL |
