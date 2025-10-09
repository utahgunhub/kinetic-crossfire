const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'], // Add your frontend URLs
  credentials: true
}));

// Configuration
const GUNTAB_API_URL = process.env.GUNTAB_API_URL || 'https://api.guntab.com/v1';
// Use simulated token for testing, switch to live for production
const GUNTAB_API_TOKEN = process.env.NODE_ENV === 'production' 
  ? process.env.GUNTAB_API_TOKEN_LIVE 
  : process.env.GUNTAB_API_TOKEN_SIMULATED;

const SELLER_EMAIL = 'dallansilver@gmail.com'; // Your seller email

console.log('🚀 Server starting...');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Using API:', GUNTAB_API_URL);
console.log('Token type:', process.env.NODE_ENV === 'production' ? 'LIVE' : 'SIMULATED');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    guntabUrl: GUNTAB_API_URL,
    tokenConfigured: !!GUNTAB_API_TOKEN
  });
});

// Create GunTab Transaction
app.post('/api/create-guntab-transaction', async (req, res) => {
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
        listing_type_id: 'other_non_regulated', // Non-regulated parts/accessories
        quantity: item.quantity,
        title: item.name,
        description: `${item.name}. High-quality firearm accessory manufactured by Kinetic Crossfire. Made in USA with precision engineering for reliable performance.` // GunTab requires min 50 chars
      })),
      receiving_address: {
        line1: shippingInfo.address,
        city: shippingInfo.city,
        state_code: shippingInfo.state,
        zip: shippingInfo.zipCode
      }
    };

    console.log('📤 Sending to GunTab:', JSON.stringify(invoiceData, null, 2));

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
    res.json({
      success: true,
      transactionId: response.data.id,
      transaction: response.data
    });

  } catch (error) {
    console.error('❌ GunTab API Error:', error.response?.data || error.message);
    
    // Log full error for debugging
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
});

// Verify GunTab Transaction
app.get('/api/verify-guntab-transaction/:transactionId', async (req, res) => {
  try {
    console.log('🔍 Verifying transaction:', req.params.transactionId);
    const { transactionId } = req.params;

    if (!GUNTAB_API_TOKEN) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API token not set'
      });
    }

    // Get invoice status from GunTab
    const response = await axios.get(
      `${GUNTAB_API_URL}/invoices/${transactionId}`,
      {
        headers: {
          'Authorization': `Token ${GUNTAB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('📊 Transaction status:', response.data.status);

    // Determine if payment is successful
    // GunTab statuses: pending, accepted, rejected, expired
    const isSuccessful = response.data.status === 'accepted';

    res.json({
      success: isSuccessful,
      status: response.data.status,
      transaction: response.data
    });

  } catch (error) {
    console.error('❌ GunTab Verification Error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || 'Failed to verify transaction',
      details: error.response?.data
    });
  }
});

// Get transaction details (optional - for order history)
app.get('/api/transaction/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!GUNTAB_API_TOKEN) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API token not set'
      });
    }

    const response = await axios.get(
      `${GUNTAB_API_URL}/invoices/${transactionId}`,
      {
        headers: {
          'Authorization': `Token ${GUNTAB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      transaction: response.data
    });

  } catch (error) {
    console.error('❌ Error fetching transaction:', error.response?.data || error.message);
    
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
app.listen(PORT, () => {
  console.log('');
  console.log('✅ Backend server running!');
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  POST   http://localhost:${PORT}/api/create-guntab-transaction`);
  console.log(`  GET    http://localhost:${PORT}/api/verify-guntab-transaction/:id`);
  console.log(`  GET    http://localhost:${PORT}/api/transaction/:id`);
  console.log(`  GET    http://localhost:${PORT}/api/health`);
  console.log('');
});

module.exports = app;

