const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  try {
    let findOrder = await Order.update(
      {
        deliveryMethod: req.body.deliveryMethod,
        shippingAddressLineOne: req.body.shippingAddressLineOne,
        shippingAddressLineTwo: req.body.shippingAddressLineTwo,
        shippingCity: req.body.shippingCity,
        shippingState: req.body.shippingState,
        shippingAddressZipCode: req.body.shippingAddressZipCode,
        recipientName: req.body.recipientName,
        total: req.body.total,
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
