const router = require('express').Router()
const {Order, Product, orderDetails} = require('../db/models')
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
    let newOrder = await Order.create({
      userId: userId,
      orderComplete: false
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

//get all incomplete carts
router.get('/active', async (req, res, next) => {
  try {
    const allActive = await Order.findAll({
      where: {orderComplete: false}
    })
    res.json(allActive)
  } catch (error) {
    next(error)
  }
})

//gets all incomplete carts by user
router.get('/active/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const active = await Order.findOne({
      where: {
        orderComplete: false,
        userId: userId
      }
    })
    res.json(active)
  } catch (error) {
    next(error)
  }
})

router.get('/complete', async (req, res, next) => {
  try {
    const allComplete = await Order.findAll({
      where: {orderComplete: true}
    })
    res.json(allComplete)
  } catch (error) {
    next(error)
  }
})

//get all complete orders assoc with user - order history
router.get('/complete/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const complete = await Order.findAll({
      where: {
        orderComplete: true,
        userId: userId
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'imageUrl'],
          through: {attributes: ['priceAtPurchase', 'count']}
        }
      ]
    })
    res.json(complete)
  } catch (error) {
    next(error)
  }
})

// router.get('/complete/:userId', async (req, res, next) => {
//   const userId = req.params.userId
//   try {
//     const complete = await Order.findAll({
//       where: {
//         orderComplete: true,
//         userId: userId
//       },
//       attributes:['id', 'products'], include: [{model: Product,
//         attributes: ['id', 'orderDetails'],
//         through: {attributes: ['priceAtPurchase', 'count']}
//       }]
//     })
//     res.json(complete)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
