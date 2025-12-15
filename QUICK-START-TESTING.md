# 🚀 Quick Start Testing Guide

## ✅ GOOD NEWS: Your Authorize.net Credentials Work!

I tested them and confirmed they're working perfectly in sandbox mode.

## 🎯 To Test Your Checkout (3 Steps)

### Step 1: Start Both Servers

**Terminal 1:**
```bash
cd server
npm start
```
Wait for: `✅ Authorize.net Backend Server Running!`

**Terminal 2:**
```bash
npm run dev
```
Wait for: `Local: http://localhost:5173/`

### Step 2: Test the Checkout

1. Open: http://localhost:5173/
2. Add products to cart
3. Go to checkout
4. Fill in any test information:
   - Name: Test Customer
   - Email: test@test.com
   - Phone: 555-1234
   - Address: 123 Test St
   - City: Test City
   - State: CA
   - ZIP: 12345

### Step 3: Use a Test Card

**Copy and paste this EXACT card number:**

```
Card Number:  4111111111111111
Expiration:   12/25
CVV:          123
```

Click "Pay" and it should work! ✅

## ❌ If It's Still Not Working

Tell me:
1. What error message do you see?
2. Check the backend terminal - what does it say?
3. Check browser console (F12) - any errors?

## 📝 Important Files Created

- `TEST-CARDS.txt` - All test card numbers
- `PAYMENT-TESTING-GUIDE.md` - Full testing guide
- `test-sandbox-auth.js` - Credential testing script

## 🧪 Test Your Credentials Directly

```bash
cd server
node test-sandbox-auth.js
```

Should show: `🎉 Your Authorize.net credentials are working correctly!`

## 💡 Common Issues

### "Failed to fetch"
- Backend not running → Run `npm start` in server folder

### "Transaction declined"  
- Wrong card number → Use `4111111111111111`

### CORS error
- Check backend terminal shows `localhost:5173` in allowed origins

---

**Your sandbox is fully functional!** 

The issue is likely:
1. Not using the correct test card numbers
2. Backend not running
3. A typo in the card information

Try the test card above and let me know what happens!






