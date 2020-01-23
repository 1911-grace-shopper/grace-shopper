import React from 'react'
import {connect} from 'react-redux'
import Form from './checkoutForm'
import {getCart, submitOrder} from '../store/cart'
import {handleFormChange} from '../store/checkoutReducer'
import displayDollars from './helper'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.total = 0
    this.isComplete = this.isComplete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentCart()
  }

  handleSubmit(event) {
    event.preventDefault()

    const mainInfo = {
      userId: this.props.user.id || null,
      orderId: this.props.currentCart[0].orderId,
      total: this.calculateTotal()
    }
    const orderForm = {...this.props.checkoutForm, ...mainInfo}
    this.props.submitOrder(orderForm)
  }

  calculateTotal() {
    return this.props.currentCart.reduce((total, item) => {
      return (total += Number(item.price * item.count))
    }, 0)
  }

  isComplete() {
    if (
      !this.props.checkoutForm.recipientName ||
      !this.props.checkoutForm.shippingAddressLineOne ||
      !this.props.checkoutForm.shippingCity ||
      !this.props.checkoutForm.shippingState ||
      !this.props.checkoutForm.shippingAddressZipCode ||
      !this.props.checkoutForm.deliveryMethod
    )
      return false
    else return true
  }

  render() {
    let total = 0
    return (
      <div>
        <div>
          {this.props.currentCart.map(item => {
            total += Number(item.price * item.count)
            return (
              <ul key={item.id}>
                <img className="preview" src={`/images/${item.imageUrl}`} />
                <li>{item.name}</li>
                <li>Unit Price:{displayDollars(item.price)}</li>
                <li>Quantity: {item.count}</li>
                <li>
                  subtotal:{' '}
                  {displayDollars(Number(item.price) * Number(item.count))}
                </li>
              </ul>
            )
          })}
        </div>
        <div>Total: {displayDollars(Number(total))}</div>
        <div />
        <Form
          {...this.props.checkoutForm}
          handleChange={this.props.handleFormChange}
          handleSubmit={this.handleSubmit}
          isComplete={this.isComplete}
        />
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    currentCart: state.cart,
    checkoutForm: state.checkoutForm,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCurrentCart: () => dispatch(getCart()),
    handleFormChange: event => {
      const form = {[event.target.name]: event.target.value}
      dispatch(handleFormChange(form))
    },
    submitOrder: orderForm => dispatch(submitOrder(orderForm, ownProps.history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
