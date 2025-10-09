const axios = require('axios');

// Vercel serverless function for creating GunTab transactions
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('📦 Creating GunTab transaction...');
    const { items, shippingInfo, subtotal, shipping, total } = req.body;

    // Validate required fields
    if (!items || !shippingInfo || !subtotal) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Get configuration from environment variables
    const GUNTAB_API_URL = process.env.GUNTAB_API_URL || 'https://www.guntab.com/api/v1';
    const GUNTAB_API_TOKEN = process.env.VERCEL_ENV === 'production' 
      ? process.env.GUNTAB_API_TOKEN_LIVE 
      : process.env.GUNTAB_API_TOKEN_SIMULATED;
    const SELLER_EMAIL = process.env.SELLER_EMAIL || 'dallansilver@gmail.com';

    if (!GUNTAB_API_TOKEN) {
      console.error('❌ GunTab API token not configured');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API token not set'
      });
    }

    // Build merchandise description
    const merchandiseTitle = items.length === 1 
      ? items[0].name 
      : `${items.length} Items from Kinetic Crossfire`;
    
    const merchandiseDescription = items
      .map(item => `${item.quantity}x ${item.name} ($${item.price.toFixed(2)} each)`)
      .join(', ');

    // Prepare GunTab transaction data
    const transactionData = {
      seller: {
        email: SELLER_EMAIL
      },
      buyer: {
        email: shippingInfo.email,
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        phone: shippingInfo.phone
      },
      merchandise: {
        title: merchandiseTitle,
        description: merchandiseDescription,
        category: 'other',
        price: subtotal,
        shipping_price: shipping
      },
      shipping_address: {
        street: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zipCode,
        country: shippingInfo.country || 'United States'
      }
    };

    console.log('📤 Sending to GunTab...');

    // Create transaction with GunTab
    const response = await axios.post(
      `${GUNTAB_API_URL}/purchases`,
      transactionData,
      {
        headers: {
          'Authorization': `Bearer ${GUNTAB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('✅ GunTab transaction created:', response.data.id);

    // Return transaction ID to frontend
    res.status(200).json({
      success: true,
      transactionId: response.data.id,
      transaction: response.data
    });

  } catch (error) {
    console.error('❌ GunTab API Error:', error.response?.data || error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }

    res.status(500).json({
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to create transaction',
      details: error.response?.data
    });
  }
};

