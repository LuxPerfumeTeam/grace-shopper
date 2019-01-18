const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('OrderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  total: {
    type: Sequelize.INTEGER
  }
})

module.exports = {
  OrderItems
}
