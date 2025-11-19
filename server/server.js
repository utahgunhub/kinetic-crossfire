const express = require('express');
const cors = require('cors');
const https = require('https');
require('dotenv').config();

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

// Process payment with Authorize.net
app.post('/api/process-payment', async (req, res) => {
  try {
    console.log('💳 Processing payment...');
    const { cardData, billingInfo, shippingInfo, items, subtotal, shipping, total } = req.body;

    // Validate required fields
    if (!cardData || !billingInfo || !shippingInfo || !items || !total) {
      console.error('❌ Missing required fields:', { 
        hasCardData: !!cardData, 
        hasBillingInfo: !!billingInfo, 
        hasShippingInfo: !!shippingInfo, 
        hasItems: !!items, 
        hasTotal: !!total 
      });
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }

    if (!API_LOGIN_ID || !TRANSACTION_KEY) {
      console.error('❌ Authorize.net credentials not configured');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API credentials not set'
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
          order: {
            invoiceNumber: `KC-${Date.now()}`,
            description: orderDescription.substring(0, 255)
          },
          customer: {
            email: shippingInfo.email
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
          
          res.json({
            success: true,
            transactionId: txn.transId,
            authCode: txn.authCode,
            accountNumber: txn.accountNumber,
            accountType: txn.accountType,
            message: txn.messages?.[0]?.description || 'Transaction approved'
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

// Get transaction details (for order confirmation)
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
  console.log(`  POST   /api/process-payment`);
  console.log(`  GET    /api/transaction/:id`);
  console.log('');
  console.log('💳 Payment Gateway: Authorize.net (Direct API)');
  console.log(`🔧 Environment: ${ENVIRONMENT}`);
  console.log('');
});

module.exports = app;
