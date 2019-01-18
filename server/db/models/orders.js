const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  stripe: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Orders
