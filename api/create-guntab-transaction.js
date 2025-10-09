import axios from 'axios';

// Vercel serverless function for creating GunTab transactions
export default async (req, res) => {
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

    // Prepare GunTab invoice data (using their Invoice API)
    const invoiceData = {
      buyer_email: shippingInfo.email,
      merchandise_amount_cents: Math.round(subtotal * 100),
      shipping_amount_cents: Math.round(shipping * 100),
      listings: items.map(item => ({
        listing_type_id: 'other_non_regulated',
        quantity: item.quantity,
        title: item.name,
        description: `${item.name}. High-quality firearm accessory manufactured by Kinetic Crossfire. Made in USA with precision engineering for reliable performance.`
      })),
      receiving_address: {
        line1: shippingInfo.address,
        city: shippingInfo.city,
        state_code: shippingInfo.state,
        zip: shippingInfo.zipCode
      }
    };

    console.log('📤 Sending to GunTab...');

    // Create invoice with GunTab
    const response = await axios.post(
      `${GUNTAB_API_URL}/invoices`,
      invoiceData,
      {
        headers: {
          'Authorization': `Token ${GUNTAB_API_TOKEN}`,
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

