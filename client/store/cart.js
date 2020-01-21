import Axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const UPDATE_COUNT_IN_CART = 'UPDATE_COUNT_IN_CART'
const COMPLETE_CHECKOUT = 'COMPLETE_CHECKOUT'

const completeCheckout = updateOrder => ({
  type: COMPLETE_CHECKOUT,
  updateOrder
})

const gotCart = cart => ({
  type: GET_CART,
  cart: cart
})

export const getCart = () => {
  return async dispatch => {
    let cartId
    //if user logged in ->set cartId to their cart

    if (sessionStorage.getItem('cartId')) {
      cartId = JSON.parse(sessionStorage.getItem('cartId'))
      const {data} = await Axios.get(`/api/carts/${cartId}`)
      let cart = data
      cart.forEach(item => {
        item.count = item.orderDetails.count
        item.orderId = cartId
      })
      dispatch(gotCart(cart))
    }
  }
}

const addedItem = item => ({
  type: ADD_ITEM_TO_CART,
  item: item
})

const updatedItemCount = (itemId, increment) => ({
  type: UPDATE_COUNT_IN_CART,
  itemId: itemId,
  increment: increment
})

export const addItemToCart = (item, user) => {
  return async dispatch => {
    let cartId
    //if the cart already exists, carry through current cart
    if (sessionStorage.getItem('cartId')) {
      cartId = JSON.parse(sessionStorage.getItem('cartId'))
    } else {
      //if the cart does not exist
      const newOrder = {
        orderComplete: false,
        userId: user.id
      }
      //creates new pending order if cart was previously empty
      const {data} = await Axios.post('/api/checkout', newOrder)

      //gives the new cart item an order Id
      cartId = data.id
    }

    //retrieve cart
    let currentCart = await Axios.get(`/api/carts/${cartId}`)

    //cart now exists (empty if nothing has been added before)
    //if the item is already in the cart
    if (currentCart.data.some(itemInCart => itemInCart.id === item.id)) {
      //increases the count of that item
      currentCart.data.forEach(async itemInCart => {
        if (itemInCart.id === item.id) {
          //update count in order details
          await Axios.put(`/api/carts/${cartId}/${itemInCart.id}`, {
            count: itemInCart.orderDetails.count + 1
          })
        }
      })

      sessionStorage.setItem('cartId', JSON.stringify(cartId))

      dispatch(updatedItemCount(item.id, 1))
    } else {
      let newCart = {
        priceAtPurchase: item.price,
        count: 1,
        orderId: cartId,
        productId: item.id
      }
      await Axios.post('/api/carts', newCart)
      sessionStorage.setItem('cartId', JSON.stringify(cartId))

      item.count = 1
      item.orderId = cartId
      dispatch(addedItem(item))
    }
  }
}

export const completeAnOrder = (form, history) => async dispatch => {
  try {
    console.log('COMPLETE ORDER THUNK', form.orderId)
    const res = await Axios.put(`/api/checkout/${form.orderId}`, form)
    const info = res.data
    sessionStorage.clear()
    history.push('/confirmation')
    dispatch(completeCheckout(info))
  } catch (err) {
    console.log('This is from the completeOrder thunk', err)
  }
}

const itemDeleted = itemId => ({
  type: REMOVE_ITEM_FROM_CART,
  itemId: itemId
})

export const deleteItem = item => {
  return async dispatch => {
    try {
      let cartId = JSON.parse(sessionStorage.getItem('cartId'))
      let currentCart = await Axios.get(`/api/carts/${cartId}`)
      let itemtoDelete = currentCart.data.filter(
        itemInCart => itemInCart.id === item.id
      )

      let deletedItem = itemtoDelete[0]
      //if only one in cart
      if (deletedItem.orderDetails.count <= 1) {
        //let updatedCart = currentCart.filter(item => item.id !== id)

        dispatch(itemDeleted(item.id))
        await Axios.delete(`/api/carts/${cartId}/${item.id}`)
      } else {
        //if there is more than one in the cart
        // currentCart.forEach(async itemInCart => {
        //   if (itemInCart.id === id) {

        //if count needs to be updated in order details
        dispatch(updatedItemCount(item.id, -1))
        await Axios.put(`/api/carts/${cartId}/${item.id}`, {
          count: deletedItem.orderDetails.count - 1
        })
      }
    } catch (error) {
      console.log('Delete Error')
    }
  }
}

//initial state is an empty cart
const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM_TO_CART:
      return state.concat([action.item])
    case UPDATE_COUNT_IN_CART:
      state.forEach(item => {
        if (item.id === action.itemId) {
          item.count += action.increment
        }
      })
      return state
    case REMOVE_ITEM_FROM_CART:
      return state.filter(item => item.id !== action.itemId)

    case COMPLETE_CHECKOUT:
      return []
    default:
      return state
  }
}

export default cartReducer
