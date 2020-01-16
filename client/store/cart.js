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

    //if the item is already in the cart
    if (
      currentCart.some(itemInCart => {
        if (itemInCart.id === item.id) {
          return true
        }
      })
    ) {
      currentCart.forEach(itemInCart => {
        if (itemInCart.id === item.id) {
          itemInCart.count += 1
        }
      })
    } else {
      item.count = 1
      currentCart.push(item)
    }

    sessionStorage.setItem('cart', JSON.stringify(currentCart))
    dispatch(addedItem(item))
  }
}

export const deletedItem = id => {
  return dispatch => {
    currentCart = JSON.parse(sessionStorage.getItem('cart'))

    let itemToDeleteIndex = currentCart.indexOf()

    //checks if there is more than 1 in the cart

    //removes item from cart if it has the deleted item id
    updatedCart = currentCart.filter(itemInCart => itemInCart.id !== id)
  }
}

const removedFromCart = id => ({
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
