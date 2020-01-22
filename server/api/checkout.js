const router = require('express').Router()
const {Order} = require('../db/models')
const adminsOnly = require('./security')

router.put('/:orderId', async (req, res, next) => {
  try {
    let findOrder = await Order.update(
      {
        deliveryMethod: req.sanitize(req.body.deliveryMethod),
        shippingAddressLineOne: req.sanitize(req.body.shippingAddressLineOne),
        shippingAddressLineTwo: req.sanitize(req.body.shippingAddressLineTwo),
        shippingCity: req.sanitize(req.body.shippingCity),
        shippingState: req.sanitize(req.body.shippingState),
        shippingAddressZipCode: req.sanitize(req.body.shippingAddressZipCode),
        recipientName: req.sanitize(req.body.recipientName),
        total: req.sanitize(req.body.total),
        orderComplete: true
      },
      {
        where: {
          id: req.params.orderId
        }
      }
    )
    res.json(findOrder)
  } catch (err) {
    next(err)
  }
})

router.get('', adminsOnly, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userId = req.sanitize(req.body.userId)
    const orderComplete = req.sanitize(req.body.orderComplete)
    let newOrder = await Order.create({
      userId: userId,
      orderComplete: orderComplete
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
