const router = require('express').Router()
const {Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Orders.findAll()
    res.json(order)
  } catch (err) {
    console.log('error with order route')
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let order = await Orders.create({
      quantity: req.body.quantity,
      total: req.body.total,
      open: req.body.open
    })
    res.json(order)
  } catch (err) {
    console.log('post route broken')
    next(err)
  }
})
