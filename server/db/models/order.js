const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderComplete: {
    type: Sequelize.BOOLEAN
  },
  deliveryMethod: {
    type: Sequelize.ENUM('Delivery', 'Pick-Up')
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  recipientName: {
    type: Sequelize.STRING
  },
  subtotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  }
})

module.exports = Order
