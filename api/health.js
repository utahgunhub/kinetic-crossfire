// Vercel serverless function for health check
export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({ 
    status: 'ok', 
    message: 'Vercel serverless API is running',
    environment: process.env.VERCEL_ENV || 'development',
    guntabUrl: process.env.GUNTAB_API_URL || 'https://www.guntab.com/api/v1',
    tokenConfigured: !!(process.env.GUNTAB_API_TOKEN_SIMULATED || process.env.GUNTAB_API_TOKEN_LIVE),
    timestamp: new Date().toISOString()
  });
};

