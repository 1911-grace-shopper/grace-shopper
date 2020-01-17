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

//specific item in specific order
router.get('/:orderId/:itemId', async (req, res, next) => {
  const oId = req.params.orderId
  const pId = req.params.itemId
  try {
    const order = await orderDetails.findOne({
      where: {orderId: oId, productId: pId}
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

//delete item from cart
router.delete('/:orderId/:itemId', async (req, res, next) => {
  const oId = req.params.orderId
  const pId = req.params.itemId
  try {
    orderDetails.destroy({
      where: {orderId: oId, productId: pId}
    })
  } catch (error) {
    next(error)
  }
})

//update order count (quantity)
router.put('/:orderId/:itemId', async function(req, res, next) {
  const oId = req.params.orderId
  const pId = req.params.itemId
  try {
    const [numAffectedRows, affectedRows] = await orderDetails.update(
      {
        count: req.body.count
      },
      {
        where: {orderId: oId, productId: pId},
        returning: true
      }
    )
  } catch (error) {
    next(error)
  }
})

module.exports = router
