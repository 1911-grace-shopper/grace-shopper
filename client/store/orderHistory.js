import Axios from 'axios'

const GET_PAST_ORDERS = 'GET_PAST_ORDERS'

const getPastOrders = orders => ({
  type: GET_PAST_ORDERS,
  orders
})

export const getPastOrdersFromServer = userId => async dispatch => {
  try {
    const res = await Axios.get(`/api/checkout/complete/${userId}`)
    dispatch(getPastOrders(res.data))
    console.log(res.data[0])
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  orders: []
}

const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAST_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}

export default orderHistoryReducer
