const router = require('express').Router()
const {Products, Reviews} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll({
      include: [{model: Reviews, as: 'productReviews'}]
    })
    res.json(products)
  } catch (err) {
    console.log('error with express route to get all perfume')
    next(err)
  }
})
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Products.findAll({
      where: {
        id: req.params.productId
      }
    })
    res.json(product)
  } catch (err) {
    console.log('error with express route to get single perfume')
    next(err)
  }
})
