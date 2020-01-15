const GET_CART = 'GET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

const getCart = cart => ({
  type: GET_CART,
  cart: cart
})

const addToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item: item
})

const removeFromCart = id => ({
  type: REMOVE_ITEM_FROM_CART,
  id: id
})

//initial state is the current status of the cart-- if a cart doesn't exist make it an empty array
initialState = sessionStore.getItem('cart')
  ? JSON.parse(sessionStorage.getItem('cart'))
  : []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return state
    case ADD_ITEM_TO_CART:
      return state.concat([action.item])
    default:
      return state
  }
}

export default cartReducer
