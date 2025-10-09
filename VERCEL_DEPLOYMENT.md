# 🚀 Vercel Deployment Guide

Complete guide to deploy your Kinetic Crossfire e-commerce site with GunTab integration to Vercel.

## ✅ What's Been Set Up

I've configured your project to work with Vercel's serverless functions:

- ✅ `api/create-guntab-transaction.js` - Create GunTab transactions
- ✅ `api/verify-guntab-transaction.js` - Verify transaction status
- ✅ `api/health.js` - Health check endpoint
- ✅ `vercel.json` - Vercel configuration
- ✅ Frontend updated to use `/api/` endpoints
- ✅ `axios` installed for API calls

## 🚀 Deploy to Vercel (5 Minutes!)

### Option 1: Deploy via Vercel Dashboard (Easiest)

#### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Add shopping cart and GunTab integration"

# Create GitHub repo and push
# (Follow GitHub instructions to create repo)
git remote add origin https://github.com/YOUR_USERNAME/kinetic-crossfire.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Sign in (or create account)
3. Click **"Add New Project"**
4. Click **"Import Git Repository"**
5. Select your `kinetic-crossfire` repository
6. Click **"Import"**

#### Step 3: Configure Build Settings

Vercel should auto-detect these settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Click **"Deploy"** (don't worry about environment variables yet)

#### Step 4: Add Environment Variables

After initial deployment:

1. Go to your project dashboard
2. Click **"Settings"**
3. Click **"Environment Variables"**
4. Add these variables:

```
GUNTAB_API_TOKEN_SIMULATED=your_simulated_token_here
GUNTAB_API_TOKEN_LIVE=your_live_token_here
GUNTAB_API_URL=https://www.guntab.com/api/v1
SELLER_EMAIL=dallansilver@gmail.com
```

**Important**: 
- Add to **all environments** (Production, Preview, Development)
- Get tokens from: https://www.guntab.com/account/api

#### Step 5: Redeploy

1. Go to **"Deployments"** tab
2. Click the 3 dots on latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"**
5. Click **"Redeploy"**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: kinetic-crossfire
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add GUNTAB_API_TOKEN_SIMULATED
# Paste your simulated token

vercel env add GUNTAB_API_TOKEN_LIVE
# Paste your live token

vercel env add GUNTAB_API_URL
# Enter: https://www.guntab.com/api/v1

vercel env add SELLER_EMAIL
# Enter: dallansilver@gmail.com

# Deploy to production
vercel --prod
```

## ✅ Verify Deployment

### Test API Endpoints

Once deployed, test your API:

```bash
# Replace YOUR_DOMAIN with your Vercel domain
# (e.g., kinetic-crossfire.vercel.app)

# Health check
curl https://YOUR_DOMAIN.vercel.app/api/health

# Should return:
# {"status":"ok","message":"Vercel serverless API is running",...}
```

### Test Full Checkout Flow

1. Go to your Vercel URL: `https://YOUR_DOMAIN.vercel.app`
2. Add products to cart
3. Go to checkout
4. Fill shipping information
5. Click "Proceed to Payment with GunTab"
6. GunTab popup should open! 🎉

## 📁 Project Structure for Vercel

```
kinetic-crossfire/
├── api/                              # Vercel Serverless Functions
│   ├── create-guntab-transaction.js  # Create transaction
│   ├── verify-guntab-transaction.js  # Verify transaction
│   └── health.js                     # Health check
├── src/                              # React frontend
│   └── pages/
│       └── Checkout.tsx              # Uses /api/ endpoints
├── dist/                             # Build output (auto-generated)
├── vercel.json                       # Vercel configuration
├── vite.config.ts                    # Vite build config
└── package.json                      # Dependencies
```

## 🔧 How It Works

### Vercel Serverless Functions

Each file in `api/` becomes an API endpoint:

- `api/health.js` → `https://YOUR_DOMAIN.vercel.app/api/health`
- `api/create-guntab-transaction.js` → `https://YOUR_DOMAIN.vercel.app/api/create-guntab-transaction`
- `api/verify-guntab-transaction.js` → `https://YOUR_DOMAIN.vercel.app/api/verify-guntab-transaction`

### Environment Variables

Vercel automatically injects environment variables into your serverless functions:

```javascript
// In production
process.env.VERCEL_ENV === 'production'
process.env.GUNTAB_API_TOKEN_LIVE // Used

// In preview/dev
process.env.VERCEL_ENV === 'preview'
process.env.GUNTAB_API_TOKEN_SIMULATED // Used
```

### Request Flow

1. User submits checkout form
2. Frontend calls `/api/create-guntab-transaction`
3. Vercel routes to serverless function
4. Function creates GunTab transaction
5. Function returns transaction ID
6. Frontend opens GunTab popup
7. User completes payment
8. Frontend verifies via `/api/verify-guntab-transaction`

## 🎯 Domain Configuration

### Custom Domain

1. Go to project settings
2. Click **"Domains"**
3. Click **"Add"**
4. Enter your domain: `kineticcrossfire.com`
5. Follow DNS configuration instructions
6. Wait for SSL certificate (automatic)

### Update CORS (if needed)

If using a custom domain, update CORS in API functions:

```javascript
// In api/*.js files
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com');
```

## 🔒 Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use different tokens for preview/production
- ✅ Rotate tokens periodically
- ✅ Store tokens only in Vercel dashboard

### API Security

- ✅ CORS configured
- ✅ Input validation
- ✅ Error messages don't leak secrets
- ✅ HTTPS enforced by default

## 🐛 Troubleshooting

### API Functions Return 500

**Check Function Logs:**
1. Go to Vercel dashboard
2. Click your project
3. Go to **"Deployments"**
4. Click on a deployment
5. Go to **"Functions"** tab
6. Click on a function to see logs

**Common Issues:**
- Environment variables not set
- Missing `axios` dependency
- Invalid GunTab token

### "Module not found: axios"

```bash
# Install axios
npm install axios

# Commit and push
git add package.json package-lock.json
git commit -m "Add axios dependency"
git push

# Vercel will auto-deploy
```

### CORS Errors

Add your domain to allowed origins in `api/*.js`:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all (dev)
// or
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com'); // Specific domain
```

### GunTab Token Not Working

1. Verify token is correct in Vercel dashboard
2. Check you're using the right token type (simulated vs live)
3. Test token with GunTab API directly:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://www.guntab.com/api/v1/purchases
```

### Build Fails

Check build logs:
1. Vercel dashboard → Deployments
2. Click failed deployment
3. View build logs
4. Fix errors and push again

Common build issues:
- TypeScript errors
- Missing dependencies
- Incorrect build command

## 📊 Monitoring

### View Function Logs

```bash
# Using Vercel CLI
vercel logs YOUR_DOMAIN.vercel.app

# Or in dashboard
Project → Deployments → [deployment] → Functions → [function] → Logs
```

### Monitor Performance

1. Vercel dashboard
2. Click **"Analytics"**
3. View:
   - Page views
   - Function invocations
   - Response times
   - Error rates

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to Git:

```bash
# Make changes
git add .
git commit -m "Update checkout flow"
git push

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to preview URL
# 4. (If main branch) Deploys to production
```

### Preview Deployments

Every branch/PR gets a preview URL:
- `feature-branch` → `kinetic-crossfire-git-feature-branch.vercel.app`
- Test before merging to main
- Share with team for review

## 💰 Pricing

### Free Tier Includes:
- ✅ 100GB bandwidth/month
- ✅ 100GB-hrs serverless function execution
- ✅ Unlimited deployments
- ✅ Automatic SSL
- ✅ DDoS protection

**Perfect for small to medium e-commerce sites!**

### When to Upgrade:
- High traffic (>100GB bandwidth)
- Many API calls (>100GB-hrs function time)
- Team collaboration features
- Advanced analytics

See: https://vercel.com/pricing

## 🚀 Going Live Checklist

- [ ] Deploy to Vercel
- [ ] Add environment variables
- [ ] Test health check endpoint
- [ ] Test create transaction
- [ ] Test verify transaction
- [ ] Test full checkout flow
- [ ] Switch to production token (live)
- [ ] Configure custom domain
- [ ] Test with real payment
- [ ] Set up monitoring
- [ ] Enable error alerts
- [ ] Update GunTab seller profile
- [ ] Test order fulfillment workflow

## 🔧 Advanced Configuration

### Custom Build Command

Edit `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Function Configuration

```json
{
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### Environment-Specific Builds

```bash
# Build for production
vercel --prod

# Build for preview
vercel

# Build with specific environment
vercel --env CUSTOM_VAR=value
```

## 📞 Support

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: https://vercel.com/support

### GunTab Support
- API Docs: https://www.guntab.com/docs/api
- Email: support@guntab.com

## ✅ Quick Reference

### Deploy Commands
```bash
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel env ls            # List environment variables
vercel env add KEY       # Add environment variable
vercel logs              # View logs
vercel domains           # Manage domains
```

### Useful URLs
```
Project Dashboard: https://vercel.com/dashboard
Your API: https://YOUR_DOMAIN.vercel.app/api/health
Deployment Logs: Dashboard → Deployments → [deployment]
Function Logs: Dashboard → Functions → [function]
```

## 🎉 You're Done!

Your e-commerce site is now deployed on Vercel with:
- ✅ Frontend hosted on global CDN
- ✅ Serverless API functions
- ✅ GunTab payment integration
- ✅ Automatic SSL
- ✅ Continuous deployment
- ✅ Free hosting!

Enjoy your new e-commerce platform! 🚀

