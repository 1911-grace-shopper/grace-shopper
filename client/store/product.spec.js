import {expect} from 'chai'
import {
  getProductsFromServer,
  getSingleProductFromServer
} from './productReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {product: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getting a product', () => {
    it('eventually dispatches the GET_PRODUCTS action', async () => {
      const fakeProduct = {name: 'Product1'}
      mockAxios.onGet('/api/products').replyOnce(200, fakProduct)
      await store.dispatch(getProductsFromServer())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].user).to.be.deep.equal(fakeProduct)
    })
  })

  describe('getting a single product', () => {
    it('eventually dispatches the GET_SINGLE_RODUCT action', async () => {
      mockAxios.onPost('api/products/1')
      await store.dispatch(getSingleProductFromServer())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_SINGLE_PRODUCT')
      expect(history.location.pathname).to.be.equal('/1')
    })
  })
})
