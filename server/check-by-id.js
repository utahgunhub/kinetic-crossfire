require('dotenv').config();
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;

// Get transaction ID from command line argument
const transactionId = process.argv[2];

if (!transactionId) {
  console.log('❌ Please provide a transaction ID');
  console.log('Usage: node check-by-id.js <transaction_id>');
  console.log('\nExample: node check-by-id.js 60210737461\n');
  process.exit(1);
}

// Set environment
if (process.env.AUTHORIZENET_ENVIRONMENT === 'production') {
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.production;
} else {
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.sandbox;
}

console.log('🔍 Looking up transaction...\n');
console.log('Transaction ID:', transactionId);
console.log('Environment:', process.env.AUTHORIZENET_ENVIRONMENT);
console.log('---\n');

// Create merchant authentication
const merchantAuth = new ApiContracts.MerchantAuthenticationType();
merchantAuth.setName(process.env.AUTHORIZENET_API_LOGIN_ID);
merchantAuth.setTransactionKey(process.env.AUTHORIZENET_TRANSACTION_KEY);

// Get transaction details
const request = new ApiContracts.GetTransactionDetailsRequest();
request.setMerchantAuthentication(merchantAuth);
request.setTransId(transactionId);

const ctrl = new ApiControllers.GetTransactionDetailsController(request.getJSON());

ctrl.execute(() => {
  const response = ctrl.getResponse();
  const result = new ApiContracts.GetTransactionDetailsResponse(response);

  if (result.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
    console.log('✅ Transaction Found!\n');
    
    const txn = result.getTransaction();
    
    console.log('📊 Transaction Details:');
    console.log('  Transaction ID:', txn.getTransId());
    console.log('  Amount: $' + txn.getAuthAmount());
    console.log('  Status:', txn.getTransactionStatus());
    console.log('  Type:', txn.getTransactionType());
    console.log('  Submit Time:', txn.getSubmitTimeLocal());
    console.log('  Auth Code:', txn.getAuthorizationCode() || 'N/A');
    
    const billTo = txn.getBillTo();
    if (billTo) {
      console.log('\n👤 Customer:');
      console.log('  Name:', billTo.getFirstName(), billTo.getLastName());
      console.log('  Email:', billTo.getEmail() || 'N/A');
      console.log('  City:', billTo.getCity() || 'N/A');
      console.log('  ZIP:', billTo.getZip() || 'N/A');
    }
    
    console.log('\n✅ This transaction exists in your Authorize.net account!');
    console.log('🔗 View it at: https://sandbox.authorize.net/\n');
    
  } else {
    console.log('❌ Transaction Not Found\n');
    const messages = result.getMessages().getMessage();
    messages.forEach(msg => {
      console.log('Error:', msg.getText());
    });
    console.log('\nPossible reasons:');
    console.log('  - Transaction ID is incorrect');
    console.log('  - Transaction was in a different sandbox account');
    console.log('  - Transaction failed to create\n');
  }
});

