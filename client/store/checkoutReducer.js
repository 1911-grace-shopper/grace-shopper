const HANDLE_FORM_CHANGE = 'HANDLE_FORM_CHANGE'

export const handleFormChange = form => ({
  type: HANDLE_FORM_CHANGE,
  form
})

const initialState = {
  warningMessage: '*'
}

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_FORM_CHANGE:
      return {...state, ...action.form}
    default:
      return state
  }
}

export default checkoutReducer
