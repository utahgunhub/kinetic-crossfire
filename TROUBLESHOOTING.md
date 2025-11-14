# Payment Integration Troubleshooting

## Error: "User authentication failed due to invalid authentication values"

This error means Authorize.net is rejecting your API credentials. Here's how to fix it:

### Step 1: Verify Your Account Type

1. **Log into your Authorize.net account** at https://account.authorize.net/
2. Look at the top of the page - is it showing:
   - **"Sandbox Account"** - Good for testing
   - **"Production Account"** - Requires activation

### Step 2: Check Transaction Processing Mode

In your Authorize.net dashboard:
1. Go to **Account** → **Settings** → **General Security Settings**
2. Find **"Transaction Processing Mode"**
3. Current status: **DISABLED** (as shown in your screenshot)

**This is the problem!** Your API credentials won't work until you either:
- Enable Transaction Processing Mode (for live payments), OR
- Use a Sandbox account (for testing)

### Option A: Use Sandbox for Testing (Recommended)

If you want to test without processing real payments:

1. **Create a Sandbox Account** at https://developer.authorize.net/hello_world/sandbox/
2. Sign up for a free sandbox account
3. Once logged in, go to **Account** → **Settings** → **API Credentials & Keys**
4. Generate new **Sandbox** API credentials
5. Update your `.env` file with the NEW credentials:

```env
AUTHORIZENET_API_LOGIN_ID=your_sandbox_api_login_id
AUTHORIZENET_TRANSACTION_KEY=your_sandbox_transaction_key
AUTHORIZENET_ENVIRONMENT=sandbox
```

### Option B: Enable Live Transaction Processing

If you're ready to accept real payments:

1. Log into your Authorize.net account
2. Go to **Account** → **Settings** → **General Security Settings**
3. Enable **"Transaction Processing Mode"**
4. You may need to complete additional verification steps
5. Update your `.env` file:

```env
AUTHORIZENET_API_LOGIN_ID=2NH9Xe9sfRF
AUTHORIZENET_TRANSACTION_KEY=78FM74q624rkNcp5
AUTHORIZENET_ENVIRONMENT=production
```

### Step 3: Verify Your Credentials

After getting the correct credentials:

1. Update `server/.env` with the new credentials
2. Restart your backend server:
   ```bash
   cd server
   npm start
   ```
3. Test the connection:
   ```bash
   curl http://localhost:3001/api/health
   ```

### Step 4: Test Card Numbers

**For Sandbox:**
- Card: 4111111111111111
- Exp: Any future date (e.g., 12/25)
- CVV: 123

**For Production:**
- Use real credit cards
- Real charges will be made

---

## Common Issues

### Issue: "This account does not have access to the API"

**Solution:** 
1. Log into Authorize.net
2. Go to **Account** → **Settings** → **API Credentials & Keys**
3. Make sure API access is enabled
4. Generate new credentials if needed

### Issue: Credentials work in dashboard but not in API

**Solution:**
Your account might be in "Test Mode" which requires sandbox credentials:
1. Check if you're using the right environment (sandbox vs production)
2. Match your credentials to your environment setting

### Issue: "Gateway Response: Connection refused"

**Solution:**
1. Check your internet connection
2. Verify the API endpoint in server.js
3. Make sure you're not behind a firewall blocking API calls

---

## Need Help?

1. **Authorize.net Support:** https://support.authorize.net/
2. **Developer Documentation:** https://developer.authorize.net/
3. **Create Sandbox Account:** https://developer.authorize.net/hello_world/sandbox/

---

## Quick Test Script

Save this as `test-auth.js` in your server folder:

```javascript
require('dotenv').config();
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;

// Set environment
if (process.env.AUTHORIZENET_ENVIRONMENT === 'production') {
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.production;
} else {
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.sandbox;
}

console.log('Testing Authorize.net credentials...');
console.log('Environment:', process.env.AUTHORIZENET_ENVIRONMENT);
console.log('API Login ID:', process.env.AUTHORIZENET_API_LOGIN_ID);
console.log('Transaction Key:', process.env.AUTHORIZENET_TRANSACTION_KEY ? '***' + process.env.AUTHORIZENET_TRANSACTION_KEY.slice(-4) : 'NOT SET');

// Test authentication
const merchantAuth = new ApiContracts.MerchantAuthenticationType();
merchantAuth.setName(process.env.AUTHORIZENET_API_LOGIN_ID);
merchantAuth.setTransactionKey(process.env.AUTHORIZENET_TRANSACTION_KEY);

const request = new ApiContracts.GetMerchantDetailsRequest();
request.setMerchantAuthentication(merchantAuth);

const ctrl = new ApiControllers.GetMerchantDetailsController(request.getJSON());

ctrl.execute(() => {
  const response = ctrl.getResponse();
  const result = new ApiContracts.GetMerchantDetailsResponse(response);

  if (result.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
    console.log('✅ SUCCESS! Credentials are valid.');
    console.log('Merchant Name:', result.getMerchantName());
  } else {
    console.log('❌ FAILED! Credentials are invalid.');
    console.log('Error:', result.getMessages().getMessage()[0].getText());
  }
});
```

Run it with:
```bash
cd server
node test-auth.js
```

