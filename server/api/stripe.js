// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
module.exports = router
const {User, Orders} = require('../db/models')
var stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
router.get('/', async (req, res, next) => {
  try {
    console.log('hello')
  } catch (error) {
    console.error(error)
  }
})
router.put('/', async (req, res, next) => {
  try {
    const token = req.body.stripeToken // Using Express
    console.log(
      'stripe email',
      req.body.stripeToken.card.name,
      'stripe token',
      req.body.stripeToken.card.id
    )
    //did my stripe order complete?
    //Yes ? post to db order order = await Order.create({req.body.order})
    //then, res.send({status: 'order sent', order: order})
    const charge = stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: token
    })
    const updated = await User.findAll({
      where: {
        email: req.body.stripeToken.card.name
      }
    })

    const newUpdated = await updated[0].update({
      stripeToken: req.body.stripeToken.card.id
    })
    res.status(200).send(newUpdated)
    // so Order.create and User.create
    console.log('charge', charge)
  } catch (err) {
    console.log('You have an error with StripeCard')
    next(err)
  }
})
