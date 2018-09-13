const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

router.get('/category/:categoryName', async (req, res, next) => {
  try {
    const category = await Product.findAll({
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

// categories api use query in REPLACEMENT please do it in the homepage of products and need the front end to adjst with the ?
// /api/products?category=men
// req.query.category would equal men
// let where = {
//   id: req.params.productId
// }
// console.log(req.query.category)
// if (req.query.category) {
//   where.category = req.query.category
// }
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.productId
      }
    })
    res.json(product)
  } catch (err) {
    console.log('error with express route to get single perfume')
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: Review, as: 'productReviews'}]
    })
    res.json(products)
  } catch (err) {
    console.log('error with express route to get all perfume')
    next(err)
  }
})
