var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
const app = express()
const Cart = require('../db')
app.use(
  session({
    secret: 'Shh, its a secret!',
    resave: false,
    saveUninitialized: true
  })
)
app.use(cookieParser())
const router = app.Router()
module.exports = router

router.get('/', async (req, res, next) => {
  // console.log('req.session', req.session)
  try {
    const cart = await Cart.findAll()
    if (cart.length) {
      res.json(cart)
    } else {
      res.send('The cart is empty')
    }
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Cart.create(req.body)
    res.json(product)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  const product = await Cart.findById(req.params.productId)
  if (!product) return res.sendStatus(404)
  try {
    await Cart.destroy({
      where: {
        id: req.params.id
      }
    })
  } catch (error) {
    console.error(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {}
    })
  } catch (error) {
    console.error(error)
  }
})
