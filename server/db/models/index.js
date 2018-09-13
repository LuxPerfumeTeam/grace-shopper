const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Orders = require('./orders')
const Cart = require('./cart')

Product.hasMany(Review, {as: 'productReviews'})
User.belongsTo(Review, {as: 'userReview'})

User.belongsTo(Orders, {as: 'userOrders'})
// Orders.belongsToMany(Products, {through: 'orderProducts'})
// Products.belongsToMany(Orders, {through: 'orderProducts'})

// Create the orderProduct model with quantity
//Order needs userid, status(open order could be your cart),

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

  Orders
}
