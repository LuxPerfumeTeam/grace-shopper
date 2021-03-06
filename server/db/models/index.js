const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Orders = require('./orders')
const Category = require('./category')

Product.hasMany(Review)
User.hasMany(Review)
Review.belongsTo(User)

// User.belongsTo(Orders, {as: 'userOrders'}) //it comes up 3x user with order so don't know which is supposed to be the right one

Product.belongsTo(Category)
Category.hasMany(Product)

// Orders.belongsToMany(Products, {through: 'orderProducts'})
// Products.belongsToMany(Orders, {through: 'orderProducts'})

// User.belongsToMany(Orders, {through: 'userOrders'})
//Orders.belongsToMany(Products, {through: 'OrderProducts'})

//FROM YOU GUYS
Product.belongsToMany(Orders, {through: 'OrderProducts'})
Orders.belongsToMany(Product, {through: 'OrderProducts'})
Orders.belongsTo(User)
User.hasMany(Orders)

// Reviews.belongsTo(User)
// Reviews.belongsTo(Products)
// Products.hasMany(Reviews)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Review,
  Product,
  Category,
  Orders
}
