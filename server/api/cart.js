// var express = require('express')
// var cookieParser = require('cookie-parser')
// var session = require('express-session')
// const app = express()
// //const Cart = require('../db')
// app.use(
//   session({
//     secret: 'Shh, its a secret!',
//     resave: false,
//     saveUninitialized: true
//   })
// )
// app.use(cookieParser())
const Orders = require('../db/models/orders')
const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  // console.log('req.session', req.session)
  //order.findBy(currentuserid)
  //passport sets a current user; find their open order
  //front end: localStorage - store JS objects in browser
  //also can store data in session
  //add data to req.session
  //upon login: is there an open order? if so, merge with req.session. if not, create it.
  //shop on amazon incognito and nonincognito. then log in - compare carts
  try {
    const orderId = await Orders.findById(req.id)

    if (orderId) {
      res.json(orderId)
    } else {
      res.send('The order is empty')
    }
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body', req.body)

    const productExist = await Orders.findOne({
      where: {
        userOrderId: req.body.userOrderId,
        orderProductsId: req.body.orderProductsId
      }
    })
    if (productExist.userOrderId) {
      let quantity = productExist.quantity + 1
      productExist.update({quantity: quantity})
    } else {
      const product = await Orders.create(req.body)

      res.json(product)
    }
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  const product = await Orders.findById(req.params.productId)
  if (!product) return res.sendStatus(404)
  try {
    await Orders.destroy({
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
    await Orders.destroy({
      where: {}
    })
  } catch (error) {
    console.error(error)
  }
})
