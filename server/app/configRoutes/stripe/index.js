// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
var mongoose = require('mongoose');
// var Campaign = mongoose.model('Campaign');


// stripe.accounts.createCard(
//     "acct_16YR07J0q6DpFP6w", {
//         external_account: "tok_16Z9jUJ0q6DpFP6wsOsUCr1E"
//     },
//     function(err, card) {
//         // asynchronously called
//     }
// );

// stripe.tokens.create({
//   bank_account: {
//     country: 'CA',
//     currency: 'cad',
//     routing_number: '110000000',
//     account_number: '000123456789'
//   }
// }, function(err, token) {
//   // asynchronously called
// });

// var charge = stripe.charges.create({
//     amount: 1000, // amount in cents, again
//     currency: "usd",
//     source: req.token,
//     description: "Example charge"
// }, function(err, charge) {
//     if (err && err.type === 'StripeCardError') {
//         next(err);
//     } else if (err) {
//         console.log('server-side error with payment');
//         next(err);
//     }
// });

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form
module.exports = function(app) {

    var stripe = require("stripe")(app.getValue('env').STRIPE.STRIPE_KEY);

    app.post('/card', function(req, res, next) {
        stripe.charges.create({
            amount: req.body.amount,
            currency: "usd",
            source: req.body.tokenID, // obtained with Stripe.js
            description: "Charge for test@example.com"
        }, function(err, charge) {
            if(err) {
                next(err);
            } else {
                // Campaign.addPayment(req.body.amount, req.body.campaignId, req.body.userId, function(err, updatedCampaign){
                //     console.log('getting here');
                //     if(err) next(err);
                //     else {
                //         console.log(updatedCampaign);
                //         res.send(updatedCampaign);
                //     }
                // });
            }
        });
    });

    // app.post('/bank', function(req, res) {
    //     console.log(req);
    //     var stripeToken = req.body.stripeToken;

    //     stripe.tokens.create({
    //         bank_account: {
    //             country: 'CA',
    //             currency: 'cad',
    //             routing_number: '110000000',
    //             account_number: '000123456789'
    //         }
    //     }, function(err, token) {
    //         stripe.charges.create({
    //             amount: 400,
    //             currency: "usd",
    //             source: token.id, // obtained with Stripe.js
    //             description: "Charge for test@example.com"
    //         }, function(err, charge) {
    //             console.log(err);
    //             console.log(charge);
    //         });
    //     });

    //     res.send('all went well :)');
    // });

};
