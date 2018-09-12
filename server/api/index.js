const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/cart', require('./cart'))

router.use('/perfumes', require('./perfumes'))
router.use((req, res, next) => {
  const error = new Error('Not Found You did it WRONG with URL')
  error.status = 404
  next(error)
})
