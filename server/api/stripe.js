// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
const secrets = require('../../stripe')
var stripe = require('stripe')('sk_test_6uatd7ZABDvXkMp8d4ODbC63')
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:

router.post('/payment', (req, res, next) => {
  try {
    const token = req.body.stripeToken // Using Express

    const charge = stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: token
    })
  } catch (err) {
    console.log('You have an error with StripeCard')
    next(err)
  }
})
