const Sequelize = require('sequelize')
const db = require('../db')

const Catagories = db.define('catagories', {
  name: {type: Sequelize.STRING}
})

module.exports = Catagories
