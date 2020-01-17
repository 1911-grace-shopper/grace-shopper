import Axios from 'axios'

const COMPLETE_CHECKOUT = 'COMPLETE_CHECKOUT'

const completeCheckout = updateOrder => ({
  type: COMPLETE_CHECKOUT,
  updateOrder
})

export const completeAnOrder = form => async dispatch => {
  try {
    console.log('COMPLETE ORDER THUNK', form.orderId)
    const res = await Axios.put(`/api/carts/${form.orderId}`, form)

    // console.log(
    //   'this is from the complete an order thunk',
    //   res.data,
    //   form
    // )

    const info = res.data
    dispatch(completeCheckout(info))
  } catch (err) {
    console.log('This is from the completeOrder thunk', err)
  }
}

const initialState = {
  updateOrder: []
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_CHECKOUT:
      return {
        ...state,
        updateOrder: action.updateOrder
      }
    default:
      return state
  }
}

export default checkoutReducer
