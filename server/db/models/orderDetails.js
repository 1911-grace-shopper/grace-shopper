const Sequelize = require('sequelize')
const db = require('../db')

const orderDetails = db.define('orderDetails', {
  priceAtPurchase: {
    type: Sequelize.INTEGER
  },
  count: {
    type: Sequelize.INTEGER
  }
})

module.exports = orderDetails
