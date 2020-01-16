const Sequelize = require('sequelize')
const db = require('../db')
const path = require('path')
const fs = require('fs')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
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
    type: Sequelize.TEXT
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

Product.beforeCreate(product => {
  const imagePath = product.name
    .toLowerCase()
    .split(' ')
    .join('-')
  if (product.name === '') {
    product.imageUrl = 'default/main.jpg'
  } else {
    product.imageUrl = imagePath + '/main.jpg'
  }
})

module.exports = Product
