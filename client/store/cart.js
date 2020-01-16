import Axios from 'axios'

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

export const addItemToCart = (item, user) => {
  return async dispatch => {
    let currentCart = []

    //if the cart already exists, carrythrough current cart
    if (sessionStorage.getItem('cart')) {
      currentCart = JSON.parse(sessionStorage.getItem('cart'))
    } else {
      //if the cart does not exist
      const newOrder = {
        orderComplete: false,
        userId: user.id
      }
      //creates new pending order if cart was previously empty
      const {data} = await Axios.post('/api/checkout', newOrder)

      let newCart = {
        priceAtPurchase: item.price,
        count: item.count,
        orderId: data.id,
        productId: item.id
      }
      await Axios.post('/api/carts', newCart)

      //gives the new cart an order Id
      currentCart.orderId = data.id
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
    }
    currentCart.push(item)
    sessionStorage.setItem('cart', JSON.stringify(currentCart))
    dispatch(addedItem(item))
  }
}

export const deletedItem = id => {
  return dispatch => {
    currentCart = JSON.parse(sessionStorage.getItem('cart'))

    //checks if there is more than 1 in the cart

    //removes item from cart if it has the deleted item id
    // updatedCart = currentCart.filter(itemInCart => itemInCart.id !== id)
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

function findItem(id, cart) {}

export default cartReducer
