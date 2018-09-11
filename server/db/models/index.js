const User = require('./user')
const Reviews = require('./reviews')
const Products = require('./products')
const Orders = require('./orders')

//reviews belongs to product
//product has many reviews
//user needs order id
Products.belongsTo(Reviews, {as: 'productReviews'})
User.belongsTo(Reviews, {as: 'userReviews'})

User.belongsTo(Orders, {as: 'userOrders'})
Orders.belongsToMany(Products, {through: 'orderProducts'})
Products.belongsToMany(Orders, {through: 'orderProducts'})
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
  Reviews,
  Products,
  Orders
}
