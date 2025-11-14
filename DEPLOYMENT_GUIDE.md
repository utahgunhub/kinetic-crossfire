# 🚀 Deployment Guide - Kinetic Crossfire

Complete guide to deploy your e-commerce site to production.

## 📋 Prerequisites

- ✅ Payment integration working locally
- ✅ Authorize.net sandbox credentials tested
- ✅ GitHub account
- ✅ Render.com account (free tier works!)
- ✅ Vercel account (for frontend)

---

## Part 1: Deploy Backend to Render.com

### Step 1: Prepare Backend for Deployment

Your backend is already configured! Files ready:
- ✅ `server/server.js` - Main server file
- ✅ `server/package.json` - Dependencies
- ✅ `server/render.yaml` - Render configuration
- ✅ `.env` file (don't commit this!)

### Step 2: Push Code to GitHub

1. **Create a new GitHub repository** (or use existing one)

2. **Make sure .gitignore is set up:**
   ```bash
   echo "node_modules
   .env
   .DS_Store
   *.log" > server/.gitignore
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add backend server with Authorize.net"
   git push origin main
   ```

### Step 3: Deploy to Render.com

1. **Go to:** https://dashboard.render.com/

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository:**
   - Click "Connect account" if needed
   - Select your repository

4. **Configure the service:**
   - **Name:** `kinetic-crossfire-backend`
   - **Region:** Choose closest to you (e.g., Oregon)
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Starter for better performance)

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable" for each:

   ```env
   NODE_ENV=production
   PORT=3001
   AUTHORIZENET_API_LOGIN_ID=2fR2j4vRPVBR
   AUTHORIZENET_TRANSACTION_KEY=8yH6d8nW4GD2r997
   AUTHORIZENET_ENVIRONMENT=sandbox
   FRONTEND_URL=https://your-site.vercel.app
   ```

   **Important:** Keep these as "Secret" (not visible in logs)

6. **Click "Create Web Service"**

7. **Wait for deployment** (takes 2-3 minutes)

8. **Get your backend URL:**
   - It will be something like: `https://kinetic-crossfire-backend.onrender.com`
   - Copy this URL!

9. **Test your backend:**
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

---

## Part 2: Update Frontend to Use Production Backend

### Step 1: Create Environment Variable File

Create `/.env` (in the ROOT of your project, not in server):

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 2: Update Checkout.tsx

We need to change the hardcoded `localhost:3001` URLs to use the environment variable.

I'll do this for you in a moment!

### Step 3: Deploy Frontend to Vercel

1. **Go to:** https://vercel.com/

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**

4. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (leave as root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Add Environment Variable:**
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com`

6. **Click "Deploy"**

7. **Wait for deployment** (takes 1-2 minutes)

8. **Get your frontend URL:**
   - Will be something like: `https://kinetic-crossfire.vercel.app`

---

## Part 3: Update CORS Settings

### Update Backend CORS

Once you have your Vercel URL, update Render environment variables:

1. Go to Render dashboard → Your service
2. Environment → Edit `FRONTEND_URL`
3. Set to: `https://your-site.vercel.app`
4. Click "Save Changes" (will auto-redeploy)

---

## Part 4: Going Live with Real Payments

### When Ready for Production (Real Payments):

1. **Enable Transaction Processing in Authorize.net:**
   - Log into https://account.authorize.net/
   - Go to Account → Settings → General Security Settings
   - Enable "Transaction Processing Mode"

2. **Update Render Environment Variables:**
   ```env
   AUTHORIZENET_API_LOGIN_ID=your_production_api_login_id
   AUTHORIZENET_TRANSACTION_KEY=your_production_transaction_key
   AUTHORIZENET_ENVIRONMENT=production
   ```

3. **Save and redeploy**

---

## 🎯 Quick Deployment Checklist

### Backend (Render.com)
- [ ] Code pushed to GitHub
- [ ] Render service created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Health endpoint working
- [ ] Backend URL copied

### Frontend (Vercel)
- [ ] Code updated with environment variables
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Site loads properly

### Final Steps
- [ ] Backend CORS updated with Vercel URL
- [ ] Test payment on live site
- [ ] Verify transaction in Authorize.net

---

## 🔍 Troubleshooting

### Backend Issues

**Error: "Cannot find module"**
- Check that `server/package.json` lists all dependencies
- Re-deploy and check build logs

**Error: "Port already in use"**
- Render assigns the port automatically via `process.env.PORT`
- Make sure server.js uses: `const PORT = process.env.PORT || 3001;`

**Error: "API authentication failed"**
- Double-check environment variables in Render dashboard
- Make sure no extra spaces in API credentials

### Frontend Issues

**Error: "Failed to fetch"**
- Check CORS settings on backend
- Verify `VITE_API_URL` is set correctly
- Check browser console for exact error

**Payments not working**
- Verify backend URL is correct
- Check backend logs in Render dashboard
- Test backend health endpoint

---

## 💰 Costs

### Free Tier Limits:
- **Render.com Free:**
  - Spins down after 15 minutes of inactivity
  - 750 hours/month free
  - Slower cold starts (~30 seconds)

- **Render.com Starter ($7/month):**
  - Always on (no spin down)
  - Faster performance
  - Better for production

- **Vercel (Hobby - Free):**
  - Unlimited bandwidth
  - Perfect for frontend
  - Fast global CDN

### Authorize.net Costs:
- Monthly gateway fee: ~$25/month
- Transaction fees: ~2.9% + $0.30 per transaction

---

## 📞 Support Links

- **Render Documentation:** https://render.com/docs
- **Vercel Documentation:** https://vercel.com/docs
- **Authorize.net Support:** https://support.authorize.net/

---

## ✅ Next Steps After Deployment

1. **Test a real purchase** on your live site
2. **Monitor transactions** in Authorize.net dashboard
3. **Set up email notifications** for orders
4. **Add order tracking** system
5. **Set up analytics** (Google Analytics, etc.)
6. **Configure custom domain** on Vercel

---

🎉 **You're ready to deploy!** Let's start with the backend on Render.com!

