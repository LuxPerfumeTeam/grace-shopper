const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  quantity: {
    type: Sequelize.INTEGER
  },

  total: {

    type: Sequelize.INTEGER
  }
})

module.exports = Orders
