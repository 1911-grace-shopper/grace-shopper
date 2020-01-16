const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderComplete: {
    type: Sequelize.BOOLEAN
    // defaultValue: false
  },
  deliveryMethod: {
    type: Sequelize.ENUM('Delivery', 'Pick-Up')
  },
  shippingAddressLineOne: {
    type: Sequelize.STRING
  },
  shippingAddressLineTwo: {
    type: Sequelize.STRING
  },
  shippingCity: {
    type: Sequelize.STRING
  },
  shippingState: {
    type: Sequelize.STRING
  },
  shippingAddressZipCode: {
    type: Sequelize.STRING
  },
  recipientName: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
