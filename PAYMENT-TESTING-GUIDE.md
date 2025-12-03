# Payment Testing Guide - Authorize.net Sandbox

## ✅ Your Credentials Are Working!

I tested your credentials and they're **100% functional**. The test shows:
- Authentication: ✅ Successful
- Transaction: ✅ Approved
- Connection: ✅ Working

## 🎯 How to Test Your Checkout

### Step 1: Make Sure Both Servers Are Running

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
Should show: `✅ Authorize.net Backend Server Running!`

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```
Should show: `Local: http://localhost:5173/`

### Step 2: Use Valid Test Card Numbers

Authorize.net sandbox requires **specific test card numbers**. Regular fake numbers won't work!

#### ✅ Test Card Numbers That Work:

**Visa (Approved):**
- Card Number: `4111111111111111`
- Expiration: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)

**Mastercard (Approved):**
- Card Number: `5424000000000015`
- Expiration: Any future date
- CVV: Any 3 digits

**American Express (Approved):**
- Card Number: `370000000000002`
- Expiration: Any future date
- CVV: Any 4 digits (e.g., `1234`)

**Discover (Approved):**
- Card Number: `6011000000000012`
- Expiration: Any future date
- CVV: Any 3 digits

#### ❌ Test Declined Cards (for testing error handling):

**Card Declined:**
- Card Number: `4000300011112220`
- This will simulate a declined transaction

### Step 3: Test Checkout Flow

1. Go to: http://localhost:5173/
2. Add items to cart
3. Go to checkout
4. Fill in shipping information:
   - Use any name, email, phone
   - Use a real-looking address (doesn't have to be real)
5. Use one of the test card numbers above
6. Submit payment

### Step 4: Check for Errors

If you get an error, check:

**Frontend Browser Console (F12):**
- Look for error messages
- Check network tab for failed requests

**Backend Terminal:**
- Look for error messages in the server logs
- Should show "Processing payment..." and "Transaction approved"

## Common Issues & Solutions

### ❌ "Failed to fetch" Error
**Problem:** Frontend can't reach backend
**Solution:**
- Make sure backend is running on port 3001
- Check VITE_API_URL in frontend .env
- Make sure there's no firewall blocking port 3001

### ❌ "Transaction Declined" 
**Problem:** Using wrong test card number
**Solution:**
- Use ONLY the test card numbers listed above
- Don't use random numbers like `1234...`

### ❌ CORS Error
**Problem:** Frontend and backend can't communicate
**Solution:**
- Backend should show your frontend URL in allowed origins
- Check server logs for "CORS blocked origin" messages

### ❌ "Invalid credentials"
**Problem:** .env file not loaded
**Solution:**
```bash
cd server
# Make sure .env file exists with your credentials
cat .env
# Restart the server
npm start
```

## Testing Email Confirmation

After a successful payment:
1. Check browser console for email sending logs
2. Look for: `📧 Sending order confirmation email...`
3. Check the customer email inbox (and spam folder)

## Need More Help?

### Check Backend Health:
Visit: http://localhost:3001/api/health

Should return:
```json
{
  "status": "ok",
  "environment": "sandbox",
  "apiConfigured": true
}
```

### Test Backend Directly:
```bash
cd server
node test-sandbox-auth.js
```

Should show: `🎉 Your Authorize.net credentials are working correctly!`

## 🔧 Your Current Configuration

```
Backend: http://localhost:3001
Frontend: http://localhost:5173
Environment: sandbox
Endpoint: https://apitest.authorize.net/xml/v1/request.api
```

## What to Expect in Sandbox Mode

- Transaction IDs will be `0` (test mode)
- Auth codes will be `000000` (test mode)
- No real money is charged
- Email confirmations should still send
- All order data is stored normally

## Ready for Production?

When you're ready to go live:
1. Change `AUTHORIZENET_ENVIRONMENT=production` in `.env`
2. Replace API credentials with production credentials
3. Test with a real card (will charge real money!)
4. Update frontend `VITE_API_URL` to your production backend URL

---

**Your sandbox is working perfectly!** 🎉

If you're still having issues, let me know what error message you're seeing exactly.


