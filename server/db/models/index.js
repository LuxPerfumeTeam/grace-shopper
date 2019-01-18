const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Orders = require('./orders')
const Category = require('./category')
const UsersOrder = require('./OrderItems')

Product.hasMany(Review)
User.hasMany(Review)
Review.belongsTo(User)

Product.belongsTo(Category)
Category.hasMany(Product)
Orders.belongsTo(User)

Product.belongsToMany(Orders, {through: 'OrderItems'})
Orders.belongsToMany(Product, {through: 'OrderItems'})

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
  Orders,
  UsersOrder
}
