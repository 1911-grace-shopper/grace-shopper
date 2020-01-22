const router = require('express').Router()
const {orderDetails, Product, Order} = require('../db/models')

//all orders
router.get('', async (req, res, next) => {
  try {
    const allOrders = await orderDetails.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

//specific order (cart)
router.get('/:orderId', async (req, res, next) => {
  const id = Number(req.params.orderId)
  console.log(id, 'ID In BackEND')

  try {
    const order = await Order.findOne({
      where: {id: id},
      include: [{model: Product}]
    })

    let cart = order.products

    res.json(cart)
  } catch (error) {
    next(error)
  }
})

//specific item in specific order
router.get('/:orderId/:itemId', async (req, res, next) => {
  const oId = Number(req.params.orderId)
  const pId = Number(req.params.itemId)
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
router.post('', async (req, res, next) => {
  try {
    let newOrder = await orderDetails.create(req.body)
    console.log(newOrder, 'NEW ORDER')
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

    res.send('delete success')
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
    res.send('count update success')
  } catch (error) {
    next(error)
  }
})

module.exports = router
