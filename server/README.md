# Kinetic Crossfire Backend Server

Backend server for processing payments through Authorize.net payment gateway.

## Features

- ✅ Authorize.net payment processing
- ✅ Accept.js integration for secure tokenization
- ✅ Transaction management
- ✅ Order processing
- ✅ CORS-enabled API
- ✅ Sandbox and production environment support

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Authorize.net account (with API credentials)

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp env.example .env
```

Edit `.env` and add your Authorize.net credentials:

```env
# Authorize.net API Configuration
AUTHORIZENET_API_LOGIN_ID=2NH9Xe9sfRF
AUTHORIZENET_TRANSACTION_KEY=78FM74q624rkNcp5

# Environment (sandbox for testing, production for live)
AUTHORIZENET_ENVIRONMENT=sandbox

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Start the Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and configuration info.

### Get Client Key
```
GET /api/payment/client-key
```
Returns the API Login ID for Accept.js frontend integration.

### Process Payment
```
POST /api/process-payment
```
Processes a payment transaction.

**Request Body:**
```json
{
  "opaqueData": {
    "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
    "dataValue": "encrypted_payment_token"
  },
  "shippingInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "address": "123 Main St",
    "city": "City",
    "state": "CA",
    "zipCode": "12345",
    "country": "United States"
  },
  "items": [
    {
      "id": "product-id",
      "name": "Product Name",
      "price": 19.95,
      "quantity": 1
    }
  ],
  "subtotal": 19.95,
  "shipping": 8.00,
  "total": 27.95
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "123456789",
  "authCode": "ABC123",
  "message": "This transaction has been approved."
}
```

### Get Transaction Details
```
GET /api/transaction/:transactionId
```
Retrieves details for a specific transaction.

## Testing

### Test Credit Card Numbers (Sandbox Mode)

Use these test cards in sandbox environment:

| Card Type    | Card Number      | CVV | Expiration |
|--------------|------------------|-----|------------|
| Visa         | 4111111111111111 | 123 | Any future |
| Mastercard   | 5424000000000015 | 123 | Any future |
| Amex         | 378282246310005  | 1234| Any future |
| Discover     | 6011000000000012 | 123 | Any future |

### Testing the Server

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. Start the frontend (in a separate terminal):
   ```bash
   cd ..
   npm run dev
   ```

3. Navigate to `http://localhost:5173`
4. Add items to cart and proceed to checkout
5. Use test card numbers above
6. Complete the purchase

## Environment Configuration

### Sandbox Mode (Testing)
- Set `AUTHORIZENET_ENVIRONMENT=sandbox`
- Use test credit card numbers
- Transactions are simulated (no real charges)
- Best for development and testing

### Production Mode (Live)
- Set `AUTHORIZENET_ENVIRONMENT=production`
- Enable "Transaction Processing Mode" in your Authorize.net account
- Real credit cards and real charges
- Use only when ready to accept live payments

## Security Notes

1. **Never commit `.env` file** - It contains sensitive API credentials
2. **Use HTTPS in production** - Always use SSL/TLS for live transactions
3. **PCI Compliance** - Accept.js tokenization helps maintain PCI compliance
4. **API Credentials** - Keep your Transaction Key secret and secure

## Troubleshooting

### Server won't start
- Check if port 3001 is already in use
- Verify `.env` file exists and has correct credentials
- Run `npm install` to ensure all dependencies are installed

### Payment fails with "API credentials not set"
- Verify your `.env` file has the correct API Login ID and Transaction Key
- Ensure the `.env` file is in the `server` directory
- Restart the server after modifying `.env`

### Transaction declined
- Verify you're using valid test card numbers in sandbox mode
- Check that the expiration date is in the future
- Ensure CVV is correct (3 digits for most cards, 4 for Amex)

### CORS errors
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check that the frontend is running on the specified port
- Restart the server after changing CORS settings

## Support

For issues specific to Authorize.net:
- Documentation: https://developer.authorize.net/
- Support: https://support.authorize.net/

For questions about this implementation:
- Contact: dallansilver@proton.me

## License

ISC
