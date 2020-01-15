const GET_CART = 'GET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

const gotCart = cart => ({
  type: GET_CART,
  cart: cart
})

export const getCart = () => {
  return dispatch => {
    let cart = []

    if (sessionStorage.getItem('cart')) {
      cart = JSON.parse(sessionStorage.getItem('cart'))
    }

    dispatch(gotCart(cart))
  }
}

const addedItem = item => ({
  type: ADD_ITEM_TO_CART,
  item: item
})

export const addItemToCart = item => {
  return dispatch => {
    let currentCart = []

    if (sessionStorage.getItem('cart')) {
      currentCart = JSON.parse(sessionStorage.getItem('cart'))
    }

    currentCart.push(item)
    console.log(currentCart, 'Current CART')

    sessionStorage.setItem('cart', JSON.stringify(currentCart))
    dispatch(addedItem(item))
  }
}

const removeFromCart = id => ({
  type: REMOVE_ITEM_FROM_CART,
  id: id
})

//initial state is the current status of the cart-- if a cart doesn't exist make it an empty array
const initialState = sessionStorage.getItem('cart')
  ? JSON.parse(sessionStorage.getItem('cart'))
  : []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM_TO_CART:
      return state.concat([action.item])
    default:
      return state
  }
}

export default cartReducer
