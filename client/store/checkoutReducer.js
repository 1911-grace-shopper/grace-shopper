// import Axios from 'axios'

// const COMPLETE_CHECKOUT = 'COMPLETE_CHECKOUT'

// const completeCheckout = updateOrder => ({
//   type: COMPLETE_CHECKOUT,
//   updateOrder
// })

// export const completeAnOrder = (form, history) => async dispatch => {
//   try {
//     console.log('COMPLETE ORDER THUNK', form.orderId)
//     const res = await Axios.put(`/api/checkout/${form.orderId}`, form)
//     const info = res.data
//     sessionStorage.clear()
//     history.push('/confirmation')
//     dispatch(completeCheckout(info))
//   } catch (err) {
//     console.log('This is from the completeOrder thunk', err)
//   }
// }

// const initialState = {
//   updateOrder: []
// }

// const checkoutReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case COMPLETE_CHECKOUT:
//       return {
//         ...state,
//         updateOrder: action.updateOrder
//       }
//     default:
//       return state
//   }
// }

// export default checkoutReducer
