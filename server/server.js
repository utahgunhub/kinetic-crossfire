require('dotenv').config();
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const https = require('https');
const { validateCoupon, calculateOrderTotals, areCouponsAllowed } = require('./coupons');
const { calculateDealerOrderTotals } = require('./dealerPricing');
const {
  loadPublishedProducts,
  buildPriceMap,
  requireAdmin,
  assertInventory,
  decrementInventory,
  incrementCouponRedemption,
} = require('./catalog');
const { fetchAnalyticsSummary } = require('./analytics');

const app = express();

// Middleware
app.use(express.json());

// CORS configuration - allow multiple origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL?.replace(/\/$/, ''), // Without trailing slash
  'http://localhost:5173',
  'http://localhost:8080',
  'https://www.kinetic-crossfire.com',
  'https://kinetic-crossfire.com', // Without www
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Configuration
const API_LOGIN_ID = process.env.AUTHORIZENET_API_LOGIN_ID;
const TRANSACTION_KEY = process.env.AUTHORIZENET_TRANSACTION_KEY;
const ENVIRONMENT = process.env.AUTHORIZENET_ENVIRONMENT || 'sandbox';

const API_ENDPOINT = ENVIRONMENT === 'production' 
  ? { hostname: 'api.authorize.net', path: '/xml/v1/request.api' }
  : { hostname: 'apitest.authorize.net', path: '/xml/v1/request.api' };

const restrictedShippingStateAliases = {
  ca: 'California',
  california: 'California',
  co: 'Colorado',
  colorado: 'Colorado',
  ct: 'Connecticut',
  connecticut: 'Connecticut',
  de: 'Delaware',
  delaware: 'Delaware',
  hi: 'Hawaii',
  hawaii: 'Hawaii',
  il: 'Illinois',
  illinois: 'Illinois',
  md: 'Maryland',
  maryland: 'Maryland',
  ma: 'Massachusetts',
  massachusetts: 'Massachusetts',
  nj: 'New Jersey',
  'new jersey': 'New Jersey',
  ny: 'New York',
  'new york': 'New York',
  or: 'Oregon',
  oregon: 'Oregon',
  wa: 'Washington',
  washington: 'Washington',
};

function getRestrictedShippingState(value = '') {
  const normalizedValue = String(value).trim().toLowerCase();
  return restrictedShippingStateAliases[normalizedValue] || null;
}

function orderRequiresShippingRestriction(items = []) {
  return items.some((item) => item.productId === 'thompson-blow-back-trigger');
}

console.log('🚀 Server starting...');
console.log('Environment:', ENVIRONMENT);
console.log('API Endpoint:', `https://${API_ENDPOINT.hostname}${API_ENDPOINT.path}`);
console.log('API Login ID configured:', !!API_LOGIN_ID);
console.log('Transaction Key configured:', !!TRANSACTION_KEY);

// Direct API call function
function callAuthorizeNetAPI(requestData) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(requestData);
    
    const options = {
      hostname: API_ENDPOINT.hostname,
      port: 443,
      path: API_ENDPOINT.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 30000
    };
    
    console.log(`📤 Direct HTTPS POST to: https://${API_ENDPOINT.hostname}${API_ENDPOINT.path}`);
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // Remove BOM if present
          const cleanData = data.replace(/^\uFEFF/, '');
          const response = JSON.parse(cleanData);
          console.log('✅ Got response from Authorize.net');
          resolve(response);
        } catch (error) {
          console.error('❌ Failed to parse response:', error.message);
          reject(new Error('Invalid response from payment gateway'));
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });
    
    req.on('timeout', () => {
      console.error('❌ Request timed out');
      req.destroy();
      reject(new Error('Payment gateway timeout'));
    });
    
    req.write(postData);
    req.end();
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Authorize.net server is running',
    environment: ENVIRONMENT,
    endpoint: `https://${API_ENDPOINT.hostname}${API_ENDPOINT.path}`,
    apiConfigured: !!(API_LOGIN_ID && TRANSACTION_KEY)
  });
});

// Get public client key for Accept.js
app.get('/api/payment/client-key', (req, res) => {
  res.json({
    apiLoginId: API_LOGIN_ID,
  });
});

// Validate a coupon code and return the calculated discount
app.post('/api/validate-coupon', async (req, res) => {
  try {
    if (req.body.dealerCheckout === true) {
      return res.status(400).json({
        success: false,
        error: 'Coupon codes are not available on dealer orders.',
      });
    }

    const { couponCode, items } = req.body;

    if (!couponCode || !items?.length) {
      return res.status(400).json({
        success: false,
        error: 'Coupon code and cart items are required',
      });
    }

    if (!areCouponsAllowed()) {
      return res.status(400).json({
        success: false,
        error: 'Coupon codes cannot be combined with sale pricing during the 4th of July sale.',
      });
    }

    const coupon = await validateCoupon(couponCode);
    if (!coupon) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coupon code',
      });
    }

    const productRows = await loadPublishedProducts();
    const priceMap = buildPriceMap(productRows);
    const totals = await calculateOrderTotals(items, coupon.code, priceMap);

    if (totals.belowMinimum) {
      return res.status(400).json({
        success: false,
        error: `This code requires a minimum subtotal of $${coupon.min_subtotal.toFixed(2)}.`,
      });
    }

    res.json({
      success: true,
      discount: totals.discount,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
    });
  } catch (error) {
    console.error('❌ Coupon validation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate coupon code',
    });
  }
});

// Process payment with Authorize.net
app.post('/api/process-payment', async (req, res) => {
  try {
    console.log('💳 Processing payment...');
    const { cardData, billingInfo, shippingInfo, items, couponCode, dealerCheckout } = req.body;

    // Validate required fields
    if (!cardData || !billingInfo || !shippingInfo || !items?.length) {
      console.error('❌ Missing required fields:', { 
        hasCardData: !!cardData, 
        hasBillingInfo: !!billingInfo, 
        hasShippingInfo: !!shippingInfo, 
        hasItems: !!items?.length,
      });
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }

    const normalizedCouponCode = couponCode ? String(couponCode).trim() : null;

    const isDealerOrder = dealerCheckout === true;

    if (isDealerOrder && normalizedCouponCode) {
      return res.status(400).json({
        success: false,
        error: 'Coupon codes are not available on dealer orders.',
      });
    }

    if (normalizedCouponCode && !areCouponsAllowed()) {
      return res.status(400).json({
        success: false,
        error: 'Coupon codes cannot be combined with sale pricing during the 4th of July sale.',
      });
    }

    if (normalizedCouponCode && !(await validateCoupon(normalizedCouponCode))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coupon code',
      });
    }

    const productRows = await loadPublishedProducts();
    const priceMap = buildPriceMap(productRows);

    try {
      await assertInventory(items);
    } catch (stockError) {
      return res.status(400).json({
        success: false,
        error: stockError.message || 'One or more items are out of stock',
      });
    }

    const orderTotals = isDealerOrder
      ? calculateDealerOrderTotals(items, priceMap)
      : await calculateOrderTotals(items, normalizedCouponCode, priceMap);

    if (orderTotals.belowMinimum) {
      return res.status(400).json({
        success: false,
        error: 'This coupon requires a higher cart subtotal.',
      });
    }

    const { subtotal, shipping: shippingCost, discount, total } = orderTotals;

    if (total <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Order total must be greater than zero',
      });
    }

    if (!API_LOGIN_ID || !TRANSACTION_KEY) {
      console.error('❌ Authorize.net credentials not configured');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API credentials not set'
      });
    }

    const shippingCountry = String(shippingInfo.country || '').trim().toLowerCase();
    const restrictedShippingState = getRestrictedShippingState(shippingInfo.state);
    if (
      orderRequiresShippingRestriction(items) &&
      shippingCountry === 'united states' &&
      restrictedShippingState
    ) {
      console.warn(`🚫 Blocked restricted shipping state: ${restrictedShippingState}`);
      return res.status(400).json({
        success: false,
        error: `We cannot ship orders to ${restrictedShippingState}. Please use a different shipping state.`
      });
    }

    // Log credentials (masked) for debugging
    console.log('🔑 Using API Login ID:', API_LOGIN_ID);
    console.log('🔑 Transaction Key length:', TRANSACTION_KEY?.length, 'chars');
    console.log('🔑 Transaction Key (first 4):', TRANSACTION_KEY?.substring(0, 4) + '...');
    console.log('🔑 Transaction Key (last 4):', '...' + TRANSACTION_KEY?.substring(TRANSACTION_KEY.length - 4));
    console.log('🌍 Environment:', ENVIRONMENT);

    // Build order description
    const orderDescription = items
      .map(item => `${item.quantity}x ${item.name}`)
      .join(', ');

    console.log('💰 Order totals:', { subtotal, shipping: shippingCost, discount, total });
    if (normalizedCouponCode) {
      console.log('🎟️ Coupon applied:', normalizedCouponCode.toUpperCase());
    }

    // Build request payload for direct API call
    const requestPayload = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: API_LOGIN_ID,
          transactionKey: TRANSACTION_KEY
        },
        transactionRequest: {
          transactionType: "authCaptureTransaction",
          amount: total.toFixed(2),
          payment: {
            creditCard: {
              cardNumber: cardData.cardNumber,
              expirationDate: cardData.expirationDate,
              cardCode: cardData.cardCode
            }
          },
          billTo: {
            firstName: billingInfo.firstName,
            lastName: billingInfo.lastName,
            address: billingInfo.address,
            city: billingInfo.city,
            state: billingInfo.state,
            zip: billingInfo.zipCode,
            country: billingInfo.country
          },
          shipTo: {
            firstName: shippingInfo.firstName,
            lastName: shippingInfo.lastName,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zip: shippingInfo.zipCode,
            country: shippingInfo.country
          }
        }
      }
    };

    console.log('✅ Request payload created, calling API...');

    try {
      const apiResponse = await callAuthorizeNetAPI(requestPayload);
      
      if (apiResponse.transactionResponse) {
        const txn = apiResponse.transactionResponse;
        
        if (txn.responseCode === "1") {
          // Approved
          console.log('✅ Transaction approved');
          console.log('Transaction ID:', txn.transId);
          console.log('Auth Code:', txn.authCode);

          try {
            await decrementInventory(items);
            if (normalizedCouponCode) {
              await incrementCouponRedemption(normalizedCouponCode);
            }
          } catch (postError) {
            console.error('Post-payment catalog update failed:', postError);
          }
          
          res.json({
            success: true,
            transactionId: txn.transId,
            authCode: txn.authCode,
            accountNumber: txn.accountNumber,
            accountType: txn.accountType,
            message: txn.messages?.[0]?.description || 'Transaction approved',
            subtotal,
            shipping: shippingCost,
            discount,
            total,
          });
        } else {
          // Declined or error
          console.error('❌ Transaction declined or failed');
          console.error('Response Code:', txn.responseCode);
          const errorMsg = txn.errors?.[0]?.errorText || 'Transaction declined';
          const errorCode = txn.errors?.[0]?.errorCode;
          console.error('Error Code:', errorCode);
          console.error('Error:', errorMsg);
          
          res.status(400).json({
            success: false,
            error: errorMsg,
            errorCode: errorCode
          });
        }
      } else if (apiResponse.messages) {
        // API-level error (like authentication error)
        console.error('❌ API Error');
        const errorCode = apiResponse.messages.message?.[0]?.code;
        const errorMsg = apiResponse.messages.message?.[0]?.text || 'API error';
        console.error('Error Code:', errorCode);
        console.error('Error:', errorMsg);
        
        if (errorCode === 'E00007') {
          console.error('🔍 AUTHENTICATION ERROR - Check your credentials!');
        }
        
        res.status(400).json({
          success: false,
          error: errorMsg,
          errorCode: errorCode
        });
      } else {
        console.error('❌ Unexpected response format');
        res.status(500).json({
          success: false,
          error: 'Unexpected response from payment gateway'
        });
      }
    } catch (error) {
      console.error('❌ API call failed:', error.message);
      res.status(500).json({
        success: false,
        error: error.message || 'Payment gateway error'
      });
    }
  } catch (error) {
    console.error('❌ Payment Processing Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process payment'
    });
  }
});

app.get('/api/admin/analytics', requireAdmin, async (req, res) => {
  try {
    const summary = await fetchAnalyticsSummary(req.query.range);
    res.json({ success: true, ...summary });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to load analytics',
    });
  }
});
app.get('/api/transaction/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!API_LOGIN_ID || !TRANSACTION_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API credentials not set'
      });
    }

    const requestPayload = {
      getTransactionDetailsRequest: {
        merchantAuthentication: {
          name: API_LOGIN_ID,
          transactionKey: TRANSACTION_KEY
        },
        transId: transactionId
      }
    };

    console.log('🔍 Fetching transaction details for:', transactionId);

    const apiResponse = await callAuthorizeNetAPI(requestPayload);
    
    if (apiResponse.transaction) {
      console.log('✅ Transaction details retrieved');
      res.json({
        success: true,
        transaction: {
          transactionId: apiResponse.transaction.transId,
          status: apiResponse.transaction.transactionStatus,
          amount: apiResponse.transaction.authAmount,
          customer: {
            email: apiResponse.transaction.billTo?.email,
            firstName: apiResponse.transaction.billTo?.firstName,
            lastName: apiResponse.transaction.billTo?.lastName
          }
        }
      });
    } else {
      console.error('❌ Failed to get transaction details');
      res.status(400).json({
        success: false,
        error: apiResponse.messages?.message?.[0]?.text || 'Failed to fetch transaction'
      });
    }
  } catch (error) {
    console.error('❌ Error fetching transaction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transaction details'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  const host = process.env.RENDER ? 'Render.com' : `localhost:${PORT}`;
  console.log('');
  console.log('✅ Authorize.net Backend Server Running!');
  console.log(`🌐 Host: ${host}`);
  console.log(`🏥 Health check: /api/health`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET    /api/health`);
  console.log(`  GET    /api/payment/client-key`);
  console.log(`  POST   /api/validate-coupon`);
  console.log(`  POST   /api/process-payment`);
  console.log(`  GET    /api/admin/analytics`);
  console.log(`  GET    /api/transaction/:id`);
  console.log('');
  console.log('💳 Payment Gateway: Authorize.net (Direct API)');
  console.log(`🔧 Environment: ${ENVIRONMENT}`);
  console.log('');
});

module.exports = app;
