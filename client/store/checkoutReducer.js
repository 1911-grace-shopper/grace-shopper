const UPDATE_TOTAL = 'UPDATE_TOTAL'

export const updateTotal = total => ({
  type: UPDATE_TOTAL,
  total
})

const initialState = {
  total: 0
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOTAL:
      return {
        ...state,
        total: action.total
      }
    default:
      return state
  }
}

export default checkoutReducer
