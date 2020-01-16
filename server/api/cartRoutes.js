const router = require('express').Router()
const {orderDetails} = require('../db/models')

//all orders
router.get('', async (req, res, next) => {
  try {
    const allOrders = await orderDetails.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

//specific order
router.get('/:orderId', async (req, res, next) => {
  const id = req.params.orderId
  try {
    const order = await orderDetails.findOne({
      where: {orderId: id}
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//add a new order
router.post('/', async (req, res, next) => {
  try {
    let newOrder = await orderDetails.create(req.body)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
