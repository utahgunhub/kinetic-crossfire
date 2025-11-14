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

console.log('🔍 Checking recent transactions...\n');
console.log('Environment:', process.env.AUTHORIZENET_ENVIRONMENT);
console.log('---\n');

// Create merchant authentication
const merchantAuth = new ApiContracts.MerchantAuthenticationType();
merchantAuth.setName(process.env.AUTHORIZENET_API_LOGIN_ID);
merchantAuth.setTransactionKey(process.env.AUTHORIZENET_TRANSACTION_KEY);

// Set up batch request to get unsettled transactions
const request = new ApiContracts.GetUnsettledTransactionListRequest();
request.setMerchantAuthentication(merchantAuth);

const ctrl = new ApiControllers.GetUnsettledTransactionListController(request.getJSON());

ctrl.execute(() => {
  const response = ctrl.getResponse();
  const result = new ApiContracts.GetUnsettledTransactionListResponse(response);

  if (result.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
    console.log('✅ Successfully retrieved transactions\n');
    
    const transactions = result.getTransactions();
    
    if (!transactions || transactions.length === 0) {
      console.log('📝 No unsettled transactions found.');
      console.log('\nThis is normal if:');
      console.log('  - Transactions haven\'t been processed yet (wait a few minutes)');
      console.log('  - Transactions were already settled');
      console.log('  - This is a brand new sandbox account\n');
    } else {
      console.log(`Found ${transactions.length} unsettled transaction(s):\n`);
      
      transactions.forEach((txn, index) => {
        console.log(`Transaction #${index + 1}:`);
        console.log(`  ID: ${txn.getTransId()}`);
        console.log(`  Amount: $${txn.getSettleAmount()}`);
        console.log(`  Status: ${txn.getTransactionStatus()}`);
        console.log(`  Submit Time: ${txn.getSubmitTimeLocal()}`);
        console.log(`  Customer: ${txn.getFirstName()} ${txn.getLastName()}`);
        console.log('');
      });
    }
  } else {
    console.log('❌ Failed to retrieve transactions\n');
    const messages = result.getMessages().getMessage();
    messages.forEach(msg => {
      console.log('Error:', msg.getText());
    });
  }
  
  console.log('\n💡 Tip: Transactions may take 1-2 minutes to appear in the sandbox.');
  console.log('📊 You can also view them at: https://sandbox.authorize.net/\n');
});

