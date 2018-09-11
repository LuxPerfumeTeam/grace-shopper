const router = require('express').Router()
const Product = require('../db/models')
const Review = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  return Product.findAll()
    .then(product => {
      res.json(product)
    })
    .catch(next)
})

router.get('/products/:id/reviews', (req, res, next) => {
  return Review.findAll({
    where: {
      productId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  return Product.findById(req.params.id, {
    include: [{model: Review, as: 'review'}]
  })
    .then(product => res.json(product))
    .catch(next)
})
