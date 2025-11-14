# Authorize.net Payment Integration - Quick Start Guide

## ✅ What's Been Done

Your website now has **full Authorize.net payment processing** integrated:

1. ✅ Backend server configured with your API credentials
2. ✅ Accept.js payment form on checkout page (customers stay on your site)
3. ✅ Secure card tokenization (PCI compliant)
4. ✅ Order confirmation page
5. ✅ Transaction management
6. ✅ Sandbox testing environment ready

## 🚀 How to Start Accepting Payments

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd server
npm start
```

You should see:
```
✅ Authorize.net Backend Server Running!
🌐 URL: http://localhost:3001
💳 Payment Gateway: Authorize.net
🔧 Environment: sandbox
```

### Step 2: Start Your Website

In a **separate terminal**, run:

```bash
npm run dev
```

Your website will open at `http://localhost:5173`

### Step 3: Test a Purchase

1. Browse to your website
2. Add products to cart
3. Go to checkout
4. Fill in shipping information
5. Use a **test card** (see below)
6. Complete the purchase!

## 💳 Test Credit Cards (Sandbox Mode)

Your account is currently in **sandbox mode** - perfect for testing!

| Card Type  | Card Number         | CVV  | Expiration |
|------------|---------------------|------|------------|
| **Visa**   | 4111111111111111    | 123  | Any future (e.g., 12/25) |
| Mastercard | 5424000000000015    | 123  | Any future |
| Amex       | 378282246310005     | 1234 | Any future |
| Discover   | 6011000000000012    | 123  | Any future |

**Important:** These only work in sandbox mode. Real cards will be declined!

## 📊 Viewing Your Test Transactions

1. Log into your Authorize.net dashboard
2. Go to **Search** → **Search Transactions**
3. You'll see all test transactions there
4. They'll be marked as "Test Mode"

## 🔴 Going Live (When Ready)

When you're ready to accept real payments:

### 1. Enable Transaction Processing in Authorize.net
   - Log into your Authorize.net account
   - Go to **Account** → **Settings**
   - Enable **Transaction Processing Mode**

### 2. Update Server Configuration
   Edit `server/.env` file:
   ```env
   AUTHORIZENET_ENVIRONMENT=production
   NODE_ENV=production
   ```

### 3. Restart the Server
   ```bash
   cd server
   npm start
   ```

### 4. Deploy to Production
   - Deploy your frontend to Vercel/Netlify
   - Deploy your backend to Heroku/Railway/Render
   - Update `FRONTEND_URL` in `.env` to your live domain

## 🛠 Server Configuration

Your backend server configuration is in `server/.env`:

```env
# Your Authorize.net credentials
AUTHORIZENET_API_LOGIN_ID=2NH9Xe9sfRF
AUTHORIZENET_TRANSACTION_KEY=78FM74q624rkNcp5

# Current mode: sandbox (testing)
AUTHORIZENET_ENVIRONMENT=sandbox

# Server runs on port 3001
PORT=3001
```

## 📁 What Changed in Your Codebase

### New Files:
- `server/server.js` - Authorize.net payment backend
- `server/.env` - API credentials (never commit this!)
- `server/README.md` - Detailed backend documentation
- `PAYMENT_SETUP.md` - This file

### Updated Files:
- `src/pages/Checkout.tsx` - Now has Accept.js payment form
- `src/pages/OrderConfirmation.tsx` - Shows Authorize.net transaction details
- `server/package.json` - Added authorizenet SDK

### Removed (old GunTab files):
- `api/create-guntab-transaction.js`
- `api/verify-guntab-transaction.js`

## 🎯 Payment Flow

Here's how customers buy from you now:

1. **Customer adds items to cart** → Cart Context manages items
2. **Customer goes to checkout** → Enters shipping + payment info
3. **Accept.js tokenizes card** → Card data never touches your server (PCI compliant!)
4. **Your server processes payment** → Calls Authorize.net API
5. **Transaction approved** → Customer sees confirmation page
6. **You get paid** → Funds deposited to your bank account

## 💰 Fees & Pricing

Check your Authorize.net account for fee structure. Typical fees:
- Transaction fees: ~2.9% + $0.30 per transaction
- Monthly gateway fee: ~$25/month
- No setup fees

## 🆘 Troubleshooting

### "Server configuration error"
- Make sure `server/.env` file exists
- Verify API credentials are correct
- Restart the backend server

### "Payment validation failed"
- Use test card numbers exactly as shown
- Make sure expiration date is in the future (MM/YY format)
- CVV must be 3 digits (4 for Amex)

### "Transaction declined"
- In sandbox mode, only test cards work
- Real cards will be declined in sandbox
- Make sure all required fields are filled

### CORS errors
- Make sure backend is running on port 3001
- Frontend should be on port 5173
- Check `FRONTEND_URL` in `server/.env`

## 📞 Support

- **Authorize.net Support:** https://support.authorize.net/
- **Developer Docs:** https://developer.authorize.net/
- **Your Implementation:** dallansilver@proton.me

## 🔒 Security Reminders

1. ✅ Never commit `.env` file to git
2. ✅ Use HTTPS in production
3. ✅ Keep Transaction Key secret
4. ✅ Accept.js handles PCI compliance
5. ✅ Test thoroughly before going live

---

## ✨ You're All Set!

Start the servers and test your first transaction! 🎉

```bash
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend  
npm run dev
```

Then visit `http://localhost:5173` and make a test purchase with card `4111111111111111`


