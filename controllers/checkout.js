var braintree = require('braintree')

module.exports = {
    checkout,
}

function checkout(req, res, next) {
    console.log(req.body)
    var gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        // Use your own credentials from the sandbox Control Panel here
        merchantId: process.env.MERCHANT_ID,
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY
      });
    
      // Use the payment method nonce here
      var nonceFromTheClient = req.body.paymentMethodNonce;
      // Create a new transaction for $10
      var newTransaction = gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
        options: {
          // This option requests the funds from the transaction
          // once it has been authorized successfully
          submitForSettlement: true
        }
      }, function(error, result) {
          if (result) {
            res.send(result);
          } else {
            res.status(500).send(error);
          }
      });
}

