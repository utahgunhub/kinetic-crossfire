const https = require('https');
require('dotenv').config();

console.log('🔍 Testing Authorize.net Sandbox Authentication...\n');

// Your credentials
const API_LOGIN_ID = process.env.AUTHORIZENET_API_LOGIN_ID;
const TRANSACTION_KEY = process.env.AUTHORIZENET_TRANSACTION_KEY;
const ENVIRONMENT = process.env.AUTHORIZENET_ENVIRONMENT || 'sandbox';

console.log('Configuration:');
console.log('- API Login ID:', API_LOGIN_ID);
console.log('- Transaction Key:', TRANSACTION_KEY?.substring(0, 4) + '...' + TRANSACTION_KEY?.substring(TRANSACTION_KEY.length - 4));
console.log('- Environment:', ENVIRONMENT);
console.log('');

// Test endpoint
const API_ENDPOINT = ENVIRONMENT === 'production' 
  ? { hostname: 'api.authorize.net', path: '/xml/v1/request.api' }
  : { hostname: 'apitest.authorize.net', path: '/xml/v1/request.api' };

console.log('API Endpoint:', `https://${API_ENDPOINT.hostname}${API_ENDPOINT.path}\n`);

// Simple authentication test using getMerchantDetailsRequest
const testPayload = {
  getMerchantDetailsRequest: {
    merchantAuthentication: {
      name: API_LOGIN_ID,
      transactionKey: TRANSACTION_KEY
    }
  }
};

function callAPI(requestData) {
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
      timeout: 10000
    };
    
    console.log('📤 Sending authentication test request...\n');
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const cleanData = data.replace(/^\uFEFF/, '');
          const response = JSON.parse(cleanData);
          resolve(response);
        } catch (error) {
          reject(new Error('Invalid response: ' + error.message));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.write(postData);
    req.end();
  });
}

// Now let's test with a real transaction
async function testTransaction() {
  console.log('💳 Testing with sandbox test card...\n');
  
  const transactionPayload = {
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
            cardNumber: "4111111111111111", // Visa test card
            expirationDate: "1225", // MMYY format
            cardCode: "123"
          }
        },
        billTo: {
          firstName: "Test",
          lastName: "Customer",
          address: "123 Test St",
          city: "Test City",
          state: "CA",
          zip: "12345",
          country: "US"
        }
      }
    }
  };
  
  try {
    const response = await callAPI(transactionPayload);
    console.log('📥 Response received:\n');
    console.log(JSON.stringify(response, null, 2));
    console.log('\n');
    
    // Check for authentication errors
    if (response.messages) {
      const resultCode = response.messages.resultCode;
      const message = response.messages.message?.[0];
      
      console.log('Result Code:', resultCode);
      
      if (message) {
        console.log('Message Code:', message.code);
        console.log('Message Text:', message.text);
        console.log('');
      }
      
      if (message?.code === 'E00007') {
        console.log('❌ AUTHENTICATION FAILED');
        console.log('');
        console.log('This means your API credentials are INVALID.');
        console.log('');
        console.log('Common causes:');
        console.log('1. The credentials are not from a real Authorize.net sandbox account');
        console.log('2. The API Login ID or Transaction Key is incorrect');
        console.log('3. The credentials are from production but AUTHORIZENET_ENVIRONMENT=sandbox');
        console.log('');
        console.log('To get valid sandbox credentials:');
        console.log('1. Sign up for a sandbox account at: https://developer.authorize.net/hello_world/sandbox.html');
        console.log('2. Log in to sandbox at: https://sandbox.authorize.net/');
        console.log('3. Go to Account > Settings > Security Settings > API Credentials & Keys');
        console.log('4. Generate new Transaction Key');
        return;
      }
    }
    
    // Check transaction response
    if (response.transactionResponse) {
      const txn = response.transactionResponse;
      
      console.log('Transaction Response Code:', txn.responseCode);
      
      if (txn.responseCode === "1") {
        console.log('✅ SUCCESS! Transaction approved');
        console.log('Transaction ID:', txn.transId);
        console.log('Auth Code:', txn.authCode);
        console.log('');
        console.log('🎉 Your Authorize.net credentials are working correctly!');
      } else {
        console.log('❌ Transaction declined');
        console.log('Error:', txn.errors?.[0]?.errorText || 'Unknown error');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testTransaction();





