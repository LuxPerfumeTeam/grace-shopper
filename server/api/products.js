const router = require('express').Router()
const {Products, Reviews, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Products
      .findAll
      // {
      //     include: [{model: Reviews}]
      //   } no associations yet made
      ()
    res.json(users)
  } catch (err) {
    console.log('error with express route to get all perfume')
    next(err)
  }
}) // it is also eager loading a non-existing reviews model currently

router.get('/:categoryName', async (req, res, next) => {
  try {
    const category = await Products.findAll({
      where: {
        categories: req.params.categoryName
      }
    })
    res.json(category)
  } catch (err) {
    console.log('error with express route to get category name')
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    const cart = await Orders.findAll()
    res.json(cart)
  } catch (err) {
    console.log('error with express route to get category name')
    next(err)
  }
})
