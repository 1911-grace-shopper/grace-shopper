import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))

    //if the user is logged in
    if (res.data.id) {
      let userId = res.data.id
      let incompleteOrder = await axios.get(`/api/checkout/active/${userId}`)
      // let completeOrders = await axios.get(`api/checkout/complete/${userId}`)

      if (incompleteOrder.data !== null && incompleteOrder.data.id) {
        sessionStorage.setItem(
          'cartId',
          JSON.stringify(incompleteOrder.data.id)
        )
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    sessionStorage.clear()
    if (res.data) {
      let userId = res.data.id
      let incompleteOrder = await axios.get(`/api/checkout/active/${userId}`)

      if (incompleteOrder.data !== null && incompleteOrder.data.id) {
        sessionStorage.setItem(
          'cartId',
          JSON.stringify(incompleteOrder.data.id)
        )
      }
    }

    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    sessionStorage.clear()
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
