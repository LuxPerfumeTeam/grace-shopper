const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  description: {type: Sequelize.TEXT}
})

module.exports = Reviews
