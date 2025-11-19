const express = require('express');
const cors = require('cors');
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration - allow multiple origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL?.replace(/\/$/, ''), // Without trailing slash
  'http://localhost:5173',
  'http://localhost:8080',
  'https://www.kinetic-crossfire.com',
  'https://kinetic-crossfire.com', // Without www
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Configuration
const API_LOGIN_ID = process.env.AUTHORIZENET_API_LOGIN_ID;
const TRANSACTION_KEY = process.env.AUTHORIZENET_TRANSACTION_KEY;
const ENVIRONMENT = process.env.AUTHORIZENET_ENVIRONMENT || 'sandbox';

// Set the API endpoint based on environment
if (ENVIRONMENT === 'production') {
  // This sets the endpoint to production
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.production;
} else {
  // This sets the endpoint to sandbox (default)
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.sandbox;
}

console.log('🚀 Server starting...');
console.log('Environment:', ENVIRONMENT);
console.log('API Login ID configured:', !!API_LOGIN_ID);
console.log('Transaction Key configured:', !!TRANSACTION_KEY);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Authorize.net server is running',
    environment: ENVIRONMENT,
    apiConfigured: !!(API_LOGIN_ID && TRANSACTION_KEY)
  });
});

// Get public client key for Accept.js
app.get('/api/payment/client-key', (req, res) => {
  res.json({
    apiLoginId: API_LOGIN_ID,
    // Accept.js needs the API Login ID on the frontend
    // The client key is generated client-side by Accept.js
  });
});

// Process payment with Authorize.net
app.post('/api/process-payment', async (req, res) => {
  try {
    console.log('💳 Processing payment...');
    const { cardData, billingInfo, shippingInfo, items, subtotal, shipping, total } = req.body;

    // Validate required fields
    if (!cardData || !billingInfo || !shippingInfo || !items || !total) {
      console.error('❌ Missing required fields:', { 
        hasCardData: !!cardData, 
        hasBillingInfo: !!billingInfo, 
        hasShippingInfo: !!shippingInfo, 
        hasItems: !!items, 
        hasTotal: !!total 
      });
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }

    if (!API_LOGIN_ID || !TRANSACTION_KEY) {
      console.error('❌ Authorize.net credentials not configured');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API credentials not set'
      });
    }

    // Log credentials (masked) for debugging
    console.log('🔑 Using API Login ID:', API_LOGIN_ID);
    console.log('🔑 Transaction Key length:', TRANSACTION_KEY?.length, 'chars');
    console.log('🔑 Transaction Key (first 4):', TRANSACTION_KEY?.substring(0, 4) + '...');
    console.log('🔑 Transaction Key (last 4):', '...' + TRANSACTION_KEY?.substring(TRANSACTION_KEY.length - 4));
    console.log('🌍 Environment:', ENVIRONMENT);
    console.log('🎯 API Endpoint:', process.env.AUTHORIZENET_ENDPOINT);

    // Create merchant authentication
    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(TRANSACTION_KEY);

    // Set the payment data (direct card data)
    const creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(cardData.cardNumber);
    creditCard.setExpirationDate(cardData.expirationDate); // Format: MMYY
    creditCard.setCardCode(cardData.cardCode);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    // Build order description
    const orderDescription = items
      .map(item => `${item.quantity}x ${item.name}`)
      .join(', ');

    // Set order information
    const orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber(`KC-${Date.now()}`);
    orderDetails.setDescription(orderDescription.substring(0, 255)); // Max 255 chars

    // Add line items (creating array properly)
    const lineItemList = [];
    items.forEach(item => {
      const lineItem = new ApiContracts.LineItemType();
      lineItem.setItemId((item.productId || item.id).toString().substring(0, 31));
      lineItem.setName(item.name.substring(0, 31)); // Max 31 chars
      lineItem.setDescription((item.description || item.name).substring(0, 255));
      lineItem.setQuantity(item.quantity);
      lineItem.setUnitPrice(item.price.toFixed(2));
      lineItemList.push(lineItem);
    });

    // Add shipping as a line item
    if (shipping > 0) {
      const shippingLineItem = new ApiContracts.LineItemType();
      shippingLineItem.setItemId('SHIPPING');
      shippingLineItem.setName('Shipping');
      shippingLineItem.setDescription('Standard Shipping');
      shippingLineItem.setQuantity(1);
      shippingLineItem.setUnitPrice(shipping.toFixed(2));
      lineItemList.push(shippingLineItem);
    }

    // Create line items container
    const lineItems = new ApiContracts.ArrayOfLineItem();
    lineItems.setLineItem(lineItemList);

    // Set billing/shipping information
    const billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(billingInfo.firstName);
    billTo.setLastName(billingInfo.lastName);
    billTo.setAddress(billingInfo.address);
    billTo.setCity(billingInfo.city);
    billTo.setState(billingInfo.state);
    billTo.setZip(billingInfo.zipCode);
    billTo.setCountry(billingInfo.country);
    billTo.setEmail(shippingInfo.email);
    billTo.setPhoneNumber(shippingInfo.phone);

    const shipTo = new ApiContracts.CustomerAddressType();
    shipTo.setFirstName(shippingInfo.firstName);
    shipTo.setLastName(shippingInfo.lastName);
    shipTo.setAddress(shippingInfo.address);
    shipTo.setCity(shippingInfo.city);
    shipTo.setState(shippingInfo.state);
    shipTo.setZip(shippingInfo.zipCode);
    shipTo.setCountry(shippingInfo.country);

    // Create transaction request
    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(total.toFixed(2));
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setLineItems(lineItems);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);

    // Create the API request
    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    console.log('📤 Sending transaction to Authorize.net...');

    // Execute the transaction
    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

    await new Promise((resolve, reject) => {
      ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new ApiContracts.CreateTransactionResponse(apiResponse);

        console.log('📥 Response received from Authorize.net');

        if (response !== null) {
          if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
            const transactionResponse = response.getTransactionResponse();
            
            if (transactionResponse.getMessages() !== null) {
              console.log('✅ Transaction approved');
              console.log('Transaction ID:', transactionResponse.getTransId());
              console.log('Response Code:', transactionResponse.getResponseCode());
              console.log('Auth Code:', transactionResponse.getAuthCode());

              resolve({
                success: true,
                transactionId: transactionResponse.getTransId(),
                authCode: transactionResponse.getAuthCode(),
                accountNumber: transactionResponse.getAccountNumber(),
                accountType: transactionResponse.getAccountType(),
                message: transactionResponse.getMessages().getMessage()[0].getDescription(),
                orderInfo: {
                  items,
                  shippingInfo,
                  subtotal,
                  shipping,
                  total,
                  invoiceNumber: orderDetails.getInvoiceNumber()
                }
              });
          } else {
            console.error('❌ Transaction failed');
            if (transactionResponse.getErrors() !== null) {
              const errorCode = transactionResponse.getErrors().getError()[0].getErrorCode();
              const errorText = transactionResponse.getErrors().getError()[0].getErrorText();
              console.error('Error Code:', errorCode);
              console.error('Error Text:', errorText);
              console.error('💡 If E00007: Check API Login ID and Transaction Key are correct');
              console.error('💡 If E00027: Transaction Key might be expired or invalid');
              
              reject({
                success: false,
                error: errorText,
                errorCode: errorCode
              });
            } else {
              reject({
                success: false,
                error: 'Transaction failed'
              });
            }
          }
          } else {
            console.error('❌ Transaction failed - response code not OK');
            if (response.getTransactionResponse() && response.getTransactionResponse().getErrors()) {
              const errorCode = response.getTransactionResponse().getErrors().getError()[0].getErrorCode();
              const errorText = response.getTransactionResponse().getErrors().getError()[0].getErrorText();
              console.error('Error Code:', errorCode);
              console.error('Error Text:', errorText);
              console.error('💡 Tip: Check error code at https://developer.authorize.net/api/reference/responseCodes.html');
              
              reject({
                success: false,
                error: errorText,
                errorCode: errorCode
              });
            } else if (response.getMessages()) {
              const errorCode = response.getMessages().getMessage()[0].getCode();
              const errorText = response.getMessages().getMessage()[0].getText();
              console.error('Error Code:', errorCode);
              console.error('Error Text:', errorText);
              
              // Extra debugging for authentication errors
              if (errorCode === 'E00007') {
                console.error('🔍 AUTHENTICATION ERROR DEBUG:');
                console.error('   API Login ID being used:', API_LOGIN_ID);
                console.error('   Transaction Key length:', TRANSACTION_KEY?.length);
                console.error('   Environment:', ENVIRONMENT);
                console.error('   Expected: production credentials from account.authorize.net');
                console.error('   ⚠️  Check: Did you generate a NEW transaction key recently?');
                console.error('   ⚠️  Check: Is Transaction Processing Mode ENABLED in your account?');
              }
              
              reject({
                success: false,
                error: errorText,
                errorCode: errorCode
              });
            } else {
              reject({
                success: false,
                error: 'Transaction failed'
              });
            }
          }
        } else {
          console.error('❌ Null response from Authorize.net');
          reject({
            success: false,
            error: 'No response from payment gateway'
          });
        }
      });
    })
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });

  } catch (error) {
    console.error('❌ Payment Processing Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process payment'
    });
  }
});

// Get transaction details (for order confirmation)
app.get('/api/transaction/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!API_LOGIN_ID || !TRANSACTION_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: API credentials not set'
      });
    }

    // Create merchant authentication
    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(TRANSACTION_KEY);

    // Create the request
    const getRequest = new ApiContracts.GetTransactionDetailsRequest();
    getRequest.setMerchantAuthentication(merchantAuthenticationType);
    getRequest.setTransId(transactionId);

    console.log('🔍 Fetching transaction details for:', transactionId);

    const ctrl = new ApiControllers.GetTransactionDetailsController(getRequest.getJSON());

    await new Promise((resolve, reject) => {
      ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new ApiContracts.GetTransactionDetailsResponse(apiResponse);

        if (response !== null) {
          if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
            console.log('✅ Transaction details retrieved');
            const transaction = response.getTransaction();
            
            resolve({
              success: true,
              transaction: {
                transactionId: transaction.getTransId(),
                status: transaction.getTransactionStatus(),
                amount: transaction.getAuthAmount(),
                customer: {
                  email: transaction.getBillTo()?.getEmail(),
                  firstName: transaction.getBillTo()?.getFirstName(),
                  lastName: transaction.getBillTo()?.getLastName()
                }
              }
            });
          } else {
            console.error('❌ Failed to get transaction details');
            reject({
              success: false,
              error: response.getMessages().getMessage()[0].getText()
            });
          }
        } else {
          reject({
            success: false,
            error: 'No response from payment gateway'
          });
        }
      });
    })
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(400).json(error);
    });

  } catch (error) {
    console.error('❌ Error fetching transaction:', error);
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
const server = app.listen(PORT, '0.0.0.0', () => {
  const host = process.env.RENDER ? 'Render.com' : `localhost:${PORT}`;
  console.log('');
  console.log('✅ Authorize.net Backend Server Running!');
  console.log(`🌐 Host: ${host}`);
  console.log(`🏥 Health check: /api/health`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET    http://localhost:${PORT}/api/health`);
  console.log(`  GET    http://localhost:${PORT}/api/payment/client-key`);
  console.log(`  POST   http://localhost:${PORT}/api/process-payment`);
  console.log(`  GET    http://localhost:${PORT}/api/transaction/:id`);
  console.log('');
  console.log('💳 Payment Gateway: Authorize.net');
  console.log(`🔧 Environment: ${ENVIRONMENT}`);
  console.log('');
});

module.exports = app;
