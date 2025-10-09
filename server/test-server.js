const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

console.log('🧪 Testing GunTab Backend Server\n');

// Test data
const testOrder = {
  items: [
    {
      productId: 'slide-stock-assist',
      name: 'Slide Stock Assist',
      price: 19.95,
      quantity: 2
    }
  ],
  shippingInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
    address: '123 Test Street',
    city: 'Test City',
    state: 'CA',
    zipCode: '12345',
    country: 'United States'
  },
  subtotal: 39.90,
  shipping: 8.00,
  total: 47.90
};

async function runTests() {
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check passed');
    console.log('   Response:', healthResponse.data);
    console.log('');

    // Test 2: Create Transaction
    console.log('2️⃣ Testing transaction creation...');
    const createResponse = await axios.post(
      `${API_URL}/create-guntab-transaction`,
      testOrder
    );
    
    if (createResponse.data.success) {
      console.log('✅ Transaction created successfully');
      console.log('   Transaction ID:', createResponse.data.transactionId);
      console.log('');

      const transactionId = createResponse.data.transactionId;

      // Test 3: Verify Transaction
      console.log('3️⃣ Testing transaction verification...');
      const verifyResponse = await axios.get(
        `${API_URL}/verify-guntab-transaction/${transactionId}`
      );
      
      console.log('✅ Transaction verified');
      console.log('   Status:', verifyResponse.data.status);
      console.log('   Success:', verifyResponse.data.success);
      console.log('');

      // Test 4: Get Transaction Details
      console.log('4️⃣ Testing transaction details...');
      const detailsResponse = await axios.get(
        `${API_URL}/transaction/${transactionId}`
      );
      
      console.log('✅ Transaction details retrieved');
      console.log('   Transaction:', JSON.stringify(detailsResponse.data.transaction, null, 2));
      console.log('');

    } else {
      console.error('❌ Transaction creation failed:', createResponse.data.error);
    }

    console.log('🎉 All tests completed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    console.log('');
    console.log('💡 Make sure the server is running: npm run dev');
    console.log('💡 Make sure your .env file has valid GunTab API tokens');
  }
}

// Run tests
runTests();

