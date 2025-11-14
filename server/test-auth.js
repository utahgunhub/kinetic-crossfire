require('dotenv').config();
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;

// Set environment
if (process.env.AUTHORIZENET_ENVIRONMENT === 'production') {
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.production;
} else {
  process.env.AUTHORIZENET_ENDPOINT = SDKConstants.endpoint.sandbox;
}

console.log('🔍 Testing Authorize.net credentials...\n');
console.log('Environment:', process.env.AUTHORIZENET_ENVIRONMENT);
console.log('API Login ID:', process.env.AUTHORIZENET_API_LOGIN_ID);
console.log('Transaction Key:', process.env.AUTHORIZENET_TRANSACTION_KEY ? '***' + process.env.AUTHORIZENET_TRANSACTION_KEY.slice(-4) : 'NOT SET');
console.log('Endpoint:', process.env.AUTHORIZENET_ENDPOINT);
console.log('\n---\n');

// Test authentication
const merchantAuth = new ApiContracts.MerchantAuthenticationType();
merchantAuth.setName(process.env.AUTHORIZENET_API_LOGIN_ID);
merchantAuth.setTransactionKey(process.env.AUTHORIZENET_TRANSACTION_KEY);

const request = new ApiContracts.GetMerchantDetailsRequest();
request.setMerchantAuthentication(merchantAuth);

const ctrl = new ApiControllers.GetMerchantDetailsController(request.getJSON());

ctrl.execute(() => {
  const response = ctrl.getResponse();
  const result = new ApiContracts.GetMerchantDetailsResponse(response);

  console.log('Response received:\n');
  
  if (result.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
    console.log('✅ SUCCESS! Credentials are valid.\n');
    console.log('Merchant Name:', result.getMerchantName());
    console.log('\n🎉 You can now accept payments!\n');
  } else {
    console.log('❌ FAILED! Credentials are invalid.\n');
    const messages = result.getMessages().getMessage();
    messages.forEach(msg => {
      console.log('Error Code:', msg.getCode());
      console.log('Error Text:', msg.getText());
    });
    console.log('\n📝 See TROUBLESHOOTING.md for solutions\n');
  }
});

