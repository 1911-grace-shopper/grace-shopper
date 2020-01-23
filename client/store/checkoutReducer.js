const HANDLE_FORM_CHANGE = 'HANDLE_FORM_CHANGE'
const CLEAR_FORM = 'CLEAR_FORM'

export const handleFormChange = form => ({
  type: HANDLE_FORM_CHANGE,
  form
})

export const clearFormChange = () => ({
  type: CLEAR_FORM
})
const initialState = {
  warningMessage: '*'
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_FORM_CHANGE:
      return {...state, ...action.form}
    case CLEAR_FORM:
      return initialState
    default:
      return state
  }
}

export default checkoutReducer
