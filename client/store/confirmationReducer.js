import Axios from 'axios'

const GET_CONFIRMED_ORDER = 'GET_CONFIRMED_ORDER'

const gotConfirmedOrder = order => ({
  type: GET_CONFIRMED_ORDER,
  order: order
})

export const getConfirmedOrder = orderId => async dispatch => {
  try {
    const res = await Axios.get(`/api/confirmation/${orderId}`)
    const action = gotConfirmedOrder(res.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  order: []
}

const confirmationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIRMED_ORDER:
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}

export default confirmationReducer
