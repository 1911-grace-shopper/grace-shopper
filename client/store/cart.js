import Axios from 'axios'
import {runInNewContext} from 'vm'

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

const updatedItemCount = (itemIndex, increment) => ({
  type: UPDATE_COUNT_IN_CART,
  itemIndex: itemIndex,
  increment: increment
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
      dispatch(updatedItemCount(itemIndex, 1))
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
      currentCart.push(item)
      sessionStorage.setItem('cart', JSON.stringify(currentCart))
      dispatch(addedItem(item))
    }
  }
}

const itemDeleted = itemId => ({
  type: REMOVE_ITEM_FROM_CART,
  itemId: itemId
})

export const deleteItem = id => {
  return async dispatch => {
    let currentCart = JSON.parse(sessionStorage.getItem('cart'))
    let itemtoDeleteIndex = currentCart.findIndex(
      itemInCart => itemInCart.id === id
    )
    let deletedItem = currentCart[itemtoDeleteIndex]

    try {
      //if only one in cart
      if (deletedItem.count <= 1) {
        let updatedCart = currentCart.filter(item => item.id !== id)
        sessionStorage.setItem('cart', JSON.stringify(updatedCart))

        dispatch(itemDeleted(deletedItem.id))
        await Axios.delete(
          `/api/carts/${deletedItem.orderId}/${deletedItem.id}`
        )
      } else {
        //if there is more than one in the cart
        currentCart.forEach(async itemInCart => {
          if (itemInCart.id === id) {
            itemInCart.count -= 1
            //if count needs to be updated in order details
            dispatch(updatedItemCount(itemtoDeleteIndex, -1))
            await Axios.put(
              `/api/carts/${itemInCart.orderId}/${itemInCart.id}`,
              {
                count: itemInCart.count
              }
            )
          }
        })
        sessionStorage.setItem('cart', JSON.stringify(currentCart))
      }
    } catch (error) {
      runInNewContext(error)
    }
  }
}

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
      state[action.itemIndex].count += action.increment
      return state
    case REMOVE_ITEM_FROM_CART:
      return state.filter(item => item.id !== action.itemId)
    default:
      return state
  }
}

export default cartReducer
