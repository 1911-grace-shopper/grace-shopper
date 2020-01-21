const router = require('express').Router()
const {Order, orderDetails} = require('../db/models')

router.get('/confirmation/:myOrder', async (req, res, next) => {
  try {
    console.log('CONFIRMATION PARAMS', req.params)
    let confirmedOrder = await Order.findById(req.match.params.myOrder, {
      include: orderDetails
    })
    res.json(confirmedOrder)
  } catch (err) {
    next(err)
  }
})

module.exports = router
