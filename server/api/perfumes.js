const router = require('express').Router()
const {Products} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const perfumes = await Products.findAll()
    res.json(perfumes)
  } catch (error) {
    console.error(error)
  }
})
router.get('/:category', async (req, res, next) => {
  try {
    const womensPerfume = Products.findAll({
      where: {
        category: req.params.category
      }
    })
    res.json(womensPerfume.data)
  } catch (error) {
    console.error(error)
  }
})
