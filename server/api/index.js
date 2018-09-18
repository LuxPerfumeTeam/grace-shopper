const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
<<<<<<< HEAD
router.use('/orders', require('./orders'))

=======
router.use('/stripe', require('./stripe'))
>>>>>>> dev
router.use('/order', require('./order'))

router.use((req, res, next) => {
  const error = new Error('Not Found You did it WRONG with URL')
  error.status = 404
  next(error)
})
