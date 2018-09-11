const router = require('express').Router()
const {Perfumes} = require('../db/models')
module.exports = router
router.get('/:category', async (req, res, next) => {
  try {
    const womensPerfume = Perfumes.findAll({
      where: {
        category: req.params.category
      }
    })
    res.json(womensPerfume.data)
  } catch (error) {
    console.error(error)
  }
})
