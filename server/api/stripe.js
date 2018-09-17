// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
var stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:

const token = request.body.stripeToken // Using Express

const charge = stripe.charges.create({
  amount: 999,
  currency: 'usd',
  description: 'Example charge',
  source: token
})
