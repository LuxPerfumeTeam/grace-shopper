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

// router.get('/category', async (req, res, next) => {
//   try {
//     const category = await Category.findAll()
//     res.json(category)
//   } catch (err) {
//     console.log('error with express route to get all perfume')
//     next(err)
//   }
// })

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
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    console.log('error with express route to get single perfume')
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

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: Review}]
    })
    res.json(products)
  } catch (err) {
    console.log('error with express route to get all perfume')
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Product.update(req.body, {
      where: {id: req.params.id}
    })
    const all = await Product.findAll()
    res.status(201).json(all)
  } catch (err) {
    next(err)
  }
})

//DELETE
router.delete('/:productId', async (req, res, next) => {
  try {
    const deleted = await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    const updated = await Product.findAll()
    res.json(updated)
  } catch (err) {
    next(err)
  }
})
