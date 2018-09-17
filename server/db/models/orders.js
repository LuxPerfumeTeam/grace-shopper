const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  total: {
    type: Sequelize.INTEGER
  },
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Orders
