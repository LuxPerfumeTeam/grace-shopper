const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
module.exports = router

router.get('/category/:categoryName', async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {
        name: req.params.categoryName
      }
    })

    const categoryProducts = await Product.findAll({
      where: {
        categoryId: category.id
      }
    })
    res.json(categoryProducts)
  } catch (err) {
    console.log(
      'error with express route to get all products with that category name'
    )
    next(err)
  }
})
router.get('/category', async (req, res, next) => {
  try {
    const category = await Category.findAll()
    res.json(category)
  } catch (err) {
    console.log('error with express route to get all categories')
    next(err)
  }
})
router.get('/category', async (req, res, next) => {
  try {
    const category = await Category.findAll()
    res.json(category)
  } catch (err) {
    console.log('error with express route to get all perfume')
    next(err)
  }
})

router.post('/category', async (req, res, next) => {
  try {
    let category = await Category.create({
      name: req.body.name
    })
    res.json(category)
  } catch (err) {
    console.log('post route broken')
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
  } catch (err) {
    console.log('error with express route to get all perfume')
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      inventory: req.body.inventory,
      price: req.body.price,
      image: req.body.image
    })
    res.json(product)
  } catch (err) {
    console.log('post route broken')
    next(err)
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     let product = await Product.findById(req.params.id)
//     product = await product.update(req.body)
//     res.status(201).json(product)
//   } catch (err) {
//     next(err)
//   }
// })

//DELETE
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
  } catch (err) {
    next(err)
  }
})
