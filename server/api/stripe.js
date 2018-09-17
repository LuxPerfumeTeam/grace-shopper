// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
const secrets = require('../../stripe')
var stripe = require('stripe')('sk_test_6uatd7ZABDvXkMp8d4ODbC63')
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:

router.post('/payment', async (req, res, next) => {
  try {
    const token = req.body.stripeToken // Using Express
    //did my stripe order complete?
    //Yes ? post to db order order = await Order.create({req.body.order})
    //then, res.send({status: 'order sent', order: order})
    const charge = await stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: token
    })
    // so Order.create and User.create
    console.log('charge', charge)
  } catch (err) {
    console.log('You have an error with StripeCard')
    next(err)
  }
})
