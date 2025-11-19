// Test calling Authorize.net API directly without SDK
require('dotenv').config();
const https = require('https');

const API_LOGIN_ID = process.env.AUTHORIZENET_API_LOGIN_ID;
const TRANSACTION_KEY = process.env.AUTHORIZENET_TRANSACTION_KEY;

const requestData = JSON.stringify({
  createTransactionRequest: {
    merchantAuthentication: {
      name: API_LOGIN_ID,
      transactionKey: TRANSACTION_KEY
    },
    transactionRequest: {
      transactionType: "authCaptureTransaction",
      amount: "1.00",
      payment: {
        creditCard: {
          cardNumber: "4111111111111111",
          expirationDate: "1225",
          cardCode: "123"
        }
      }
    }
  }
});

const options = {
  hostname: 'api.authorize.net',
  port: 443,
  path: '/xml/v1/request.api',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(requestData)
  },
  timeout: 30000
};

console.log('🧪 Testing direct HTTPS call to Authorize.net production...');
console.log('🔑 Using API Login ID:', API_LOGIN_ID);
console.log('📤 Sending request...');

const req = https.request(options, (res) => {
  console.log('✅ Got response! Status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📥 Response:', data.substring(0, 500));
    try {
      const json = JSON.parse(data);
      console.log('✅ Parsed JSON successfully');
      console.log('Result:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('Response is not JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.on('timeout', () => {
  console.error('❌ Request timed out after 30 seconds');
  req.destroy();
});

req.write(requestData);
req.end();

console.log('⏳ Waiting for response...');

