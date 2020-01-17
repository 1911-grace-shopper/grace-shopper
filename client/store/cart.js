import Axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_COUNT_IN_CART = 'UPDATE_COUNT_IN_CART'

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

const updatedItemCount = itemIndex => ({
  type: UPDATE_COUNT_IN_CART,
  itemIndex: itemIndex
})

export const addItemToCart = (item, user) => {
  return async dispatch => {
    let currentCart = []

    //if the cart already exists, carry through current cart
    if (sessionStorage.getItem('cart')) {
      currentCart = JSON.parse(sessionStorage.getItem('cart'))
      console.log(currentCart, 'CURRENT CART')
    } else {
      //if the cart does not exist
      const newOrder = {
        orderComplete: false,
        userId: user.id
      }
      //creates new pending order if cart was previously empty
      const {data} = await Axios.post('/api/checkout', newOrder)

      //gives the new cart item an order Id
      item.orderId = data.id
    }

    //cart now exists (empty if nothing has been added before)
    //if the item is already in the cart
    if (currentCart.some(itemInCart => itemInCart.id === item.id)) {
      //increases the count of that item
      currentCart.forEach(async itemInCart => {
        if (itemInCart.id === item.id) {
          itemInCart.count += 1
          //if count needs to be updated in order details
          await Axios.put(`/api/carts/${itemInCart.orderId}/${itemInCart.id}`, {
            count: itemInCart.count
          })
        }
      })

      sessionStorage.setItem('cart', JSON.stringify(currentCart))
      let itemIndex = currentCart.findIndex(
        itemInCart => itemInCart.id === item.id
      )
      console.log(itemIndex)
      dispatch(updatedItemCount(itemIndex))
    } else {
      item.count = 1

      if (!item.orderId) {
        item.orderId = currentCart[0].orderId
      }

      let newCart = {
        priceAtPurchase: item.price,
        count: item.count,
        orderId: item.orderId,
        productId: item.id
      }
      await Axios.post('/api/carts', newCart)
      console.log('Pushing!')
      currentCart.push(item)
      sessionStorage.setItem('cart', JSON.stringify(currentCart))
      dispatch(addedItem(item))
    }
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
    case UPDATE_COUNT_IN_CART:
      state[action.itemIndex].count += 1
      return state
    default:
      return state
  }
}

function findItem(id, cart) {}

export default cartReducer
