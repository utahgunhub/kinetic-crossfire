# 🚀 Quick Deploy to Render.com

## Step-by-Step Instructions

### 1️⃣ Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2️⃣ Create Render Service

1. Go to: https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the details:

**Basic Settings:**
```
Name: kinetic-crossfire-backend
Region: Oregon (or closest to you)
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
```

**Choose Plan:**
- **Free** - Good for testing (spins down after 15 min)
- **Starter ($7/mo)** - Always on, better for production

### 3️⃣ Add Environment Variables

Click **"Advanced"** → Add these variables:

**Choose ONE option:**

**Option A - Testing (Sandbox):**
```env
NODE_ENV=production
AUTHORIZENET_API_LOGIN_ID=2fR2j4vRPVBR
AUTHORIZENET_TRANSACTION_KEY=8yH6d8nW4GD2r997
AUTHORIZENET_ENVIRONMENT=sandbox
FRONTEND_URL=http://localhost:5173
```

**Option B - Live Payments (Production):**
```env
NODE_ENV=production
AUTHORIZENET_API_LOGIN_ID=your_production_api_login_id
AUTHORIZENET_TRANSACTION_KEY=your_production_transaction_key
AUTHORIZENET_ENVIRONMENT=production
FRONTEND_URL=http://localhost:5173
```

**Important:** 
- Click the 🔒 icon to keep credentials secret!
- Do NOT add PORT - Render sets this automatically
- Update FRONTEND_URL after deploying frontend

### 4️⃣ Deploy!

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. ✅ You'll see "Live" when ready

### 5️⃣ Test Your Backend

Your URL will be something like:
`https://kinetic-crossfire-backend.onrender.com`

Test it:
```bash
curl https://your-backend-url.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Authorize.net server is running",
  "environment": "sandbox",
  "apiConfigured": true
}
```

### 6️⃣ Update Frontend

1. **Create `.env` file in project root:**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

2. **Push to GitHub:**
```bash
git add .env
git commit -m "Add production API URL"
git push origin main
```

### 7️⃣ Deploy Frontend to Vercel

1. Go to: https://vercel.com/
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repo
4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com`
6. Click **"Deploy"**

### 8️⃣ Update Backend CORS

Once you have your Vercel URL:

1. Go to Render dashboard → Your service
2. Click **"Environment"**
3. Edit `FRONTEND_URL`
4. Set to: `https://your-site.vercel.app`
5. Click **"Save Changes"**

---

## ✅ Done!

Your site is now live! Test a payment with:
- Card: 4111111111111111
- Exp: 12/25
- CVV: 123

---

## 🔄 Making Updates

**Backend changes:**
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render auto-deploys!

**Frontend changes:**
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel auto-deploys!

---

## 💰 When Ready for Real Payments

1. Enable Transaction Processing in Authorize.net
2. Update Render environment variables:
   - `AUTHORIZENET_ENVIRONMENT=production`
   - Update API credentials to production keys
3. Save and redeploy

---

## 🆘 Troubleshooting

**"Application failed to respond"**
- Check logs in Render dashboard
- Verify environment variables are set
- Make sure PORT is set to 3001

**"CORS error"**
- Update `FRONTEND_URL` in Render
- Match your exact Vercel URL (with https://)
- Redeploy backend after changing

**"Payment failed"**
- Check backend logs
- Verify Authorize.net credentials
- Test /api/health endpoint

---

## 📊 Monitor Your Site

- **Render logs:** https://dashboard.render.com/
- **Vercel logs:** https://vercel.com/dashboard
- **Transactions:** https://sandbox.authorize.net/

🎉 **You're live!**

