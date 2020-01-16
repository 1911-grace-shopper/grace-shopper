import Axios from 'axios'

const COMPLETE_CHECKOUT = 'COMPLETE_CHECKOUT'

const initialState = {
  updateOrder: []
}

const completeCheckout = updateOrder => ({
  type: COMPLETE_CHECKOUT,
  updateOrder
})

export const completeAnOrder = updateOrder => async dispatch => {
  try {
    const res = await Axios.put(`/api/checkout/${orderId}`, updateOrder)
    console.log(res)
    const info = res.data
    dispatch(completeCheckout(info))
  } catch (err) {
    console.log('This is from the completeOrder thunk', err)
  }
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_CHECKOUT:
      return {
        ...state,
        updateOrder: [action.updateOrder]
      }
    default:
      return state
  }
}

export default checkoutReducer
