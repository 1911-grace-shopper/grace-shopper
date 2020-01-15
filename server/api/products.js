const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    let productId = req.params.productId
    let findOneProduct = await Product.findOne({
      where: {
        id: productId
      }
    })
    console.log('products', findOneProduct)
    console.log('products price', findOneProduct.price)
    res.json(findOneProduct)
  } catch (err) {
    next(err)
  }
})

module.exports = router
