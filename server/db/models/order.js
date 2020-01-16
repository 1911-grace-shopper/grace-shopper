const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  deliveryMethod: {
    type: Sequelize.ENUM('Delivery', 'Pick-Up')
  },
  shippingAddressLineOne: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingAddressLineTwo: {
    type: Sequelize.STRING
  },
  shippingCity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingState: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: 2
    }
  },
  shippingAddressZipCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: 5
    }
  },
  recipientName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
