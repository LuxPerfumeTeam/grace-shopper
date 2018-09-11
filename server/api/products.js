const router = require('express').Router()
const {Products, Reviews} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Products.findAll()
    // {
    //     include: [{model: Reviews}]
    //   } no associations yet made

    res.json(users)
  } catch (err) {
    console.log('error with express route to get all perfume')
    next(err)
  }
}) // it is also eager loading a non-existing reviews model currently

router.get('/:id/reviews', (req, res, next) => {
  return Reviews.findAll({
    where: {
      productId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  return Products.findById(req.params.id, {
    include: [{model: Reviews, as: 'review'}]
  })
    .then(product => res.json(product))
    .catch(next)
})
