import Axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getProductsFromServer = () => async dispatch => {
  try {
    const res = await Axios.get('/api/products')
    const action = getProducts(res.data)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  products: []
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}

export default productsReducer
