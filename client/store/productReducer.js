import Axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  selectedProduct: product
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

export const getSingleProductFromServer = productId => async dispatch => {
  try {
    let product = await Axios.get(`/api/products/${productId}`)
    const images = await Axios.get(`/images/${product.data.imageFilePath}`)
    product.data.images = images.data
    dispatch(getSingleProduct(product.data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  products: [],
  selectedProduct: {}
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, selectedProduct: action.selectedProduct}
    default:
      return state
  }
}

export default productsReducer
