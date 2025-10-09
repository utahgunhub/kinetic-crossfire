import axios from 'axios';

// Vercel serverless function for verifying GunTab transactions
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

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { transactionId } = req.query;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        error: 'Transaction ID is required'
      });
    }

    console.log('🔍 Verifying transaction:', transactionId);

    // Get configuration from environment variables
    const GUNTAB_API_URL = process.env.GUNTAB_API_URL || 'https://www.guntab.com/api/v1';
    const GUNTAB_API_TOKEN = process.env.VERCEL_ENV === 'production' 
      ? process.env.GUNTAB_API_TOKEN_LIVE 
      : process.env.GUNTAB_API_TOKEN_SIMULATED;

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
    const isSuccessful = response.data.status === 'accepted';

    res.status(200).json({
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
};

