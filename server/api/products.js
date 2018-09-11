const router = require('express').Router()
const {Products, Reviews} = require('../db/models')
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
