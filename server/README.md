# Kinetic Crossfire Backend Server

Backend API server for GunTab payment integration.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file from example
cp env.example .env

# 3. Add your GunTab API tokens to .env
# Get tokens from: https://www.guntab.com/account/api

# 4. Start development server
npm run dev

# 5. Test the server
npm test
```

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- GunTab account with API tokens

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
GUNTAB_API_TOKEN_SIMULATED=your_simulated_token
GUNTAB_API_TOKEN_LIVE=your_live_token
GUNTAB_API_URL=https://www.guntab.com/api/v1
PORT=3001
NODE_ENV=development
```

### Token Types

- **Simulated Token**: For testing, no real payments
- **Live Token**: For production, real payments

The server automatically uses:
- Simulated token when `NODE_ENV=development`
- Live token when `NODE_ENV=production`

## 🎯 API Endpoints

### Health Check
```bash
GET /api/health
```

### Create Transaction
```bash
POST /api/create-guntab-transaction
Content-Type: application/json

{
  "items": [...],
  "shippingInfo": {...},
  "subtotal": 19.95,
  "shipping": 8.00,
  "total": 27.95
}
```

### Verify Transaction
```bash
GET /api/verify-guntab-transaction/:transactionId
```

### Get Transaction Details
```bash
GET /api/transaction/:transactionId
```

## 🧪 Testing

```bash
# Run automated tests
npm test

# Manual test with curl
curl http://localhost:3001/api/health
```

## 📜 Scripts

```bash
npm start       # Production server
npm run dev     # Development with auto-reload
npm test        # Run test suite
```

## 🚢 Deployment

See `../BACKEND_SETUP.md` for full deployment instructions.

Quick deploy:
1. Set production environment variables
2. Set `NODE_ENV=production`
3. Run `npm start`

## 🔒 Security

- Never commit `.env` file
- Use environment variables for secrets
- Enable CORS for your domain only
- Verify transactions server-side
- Use HTTPS in production

## 📞 Support

- Full setup guide: `../BACKEND_SETUP.md`
- GunTab API: https://www.guntab.com/docs/api
- Issues: Contact support@guntab.com

## ✅ Verification

Server is working when:
- Health check returns 200
- Test script passes
- Frontend can create transactions
- GunTab popup opens in checkout

## 📝 Notes

- Simulated tokens cannot be used with Checkout.js SDK
- Always test with simulated mode first
- Switch to live mode only when ready for production
- Monitor GunTab dashboard for transactions

