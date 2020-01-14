const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  length: {
    type: Sequelize.FLOAT
  },
  width: {
    type: Sequelize.FLOAT
  },
  beds: {
    type: Sequelize.INTEGER
  },
  bathrooms: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true
    },
    defaultValue:
      'https://cnet2.cbsistatic.com/img/Itk9r30E-trslBillYFr3fXJOQM=/2011/08/31/b2a0ba6d-fdbb-11e2-8c7c-d4ae52e62bcc/UP_house_front_wballoons2.jpg'
  },
  description: {
    type: Sequelize.TEXT
  },
  style: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
