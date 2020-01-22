import React from 'react'
import {connect} from 'react-redux'
import Form from './checkoutForm'
import {completeAnOrder} from '../store/cart'
import displayDollars from './helper'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      orderId: this.props.currentCart[0].orderId,
      recipientName: '',
      shippingAddressLineOne: '',
      shippingAddressLineTwo: '',
      shippingCity: '',
      shippingState: '',
      shippingAddressZipCode: '',
      deliveryMethod: '',
      total: this.props.total,
      warningMessage: '*'
    }
    this.handleChange = this.handleChange.bind(this)
    this.isComplete = this.isComplete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.completeAnOrder(this.state)
  }

  isComplete() {
    if (
      !this.state.recipientName ||
      !this.state.shippingAddressLineOne ||
      !this.state.shippingCity ||
      !this.state.shippingState ||
      !this.state.shippingAddressZipCode ||
      !this.state.deliveryMethod
    )
      return false
    else return true
  }
  //mapping to list items

  render() {
    console.log('checkout', this.props.currentCart)
    // if (this.props.currentCart.length) {
    //   this.setState ({
    //     orderId: this.props.currentCart[0].orderId,
    //     total: this.props.total
    //   })
    // }
    return (
      <div>
        <div>
          {this.props.currentCart.map(item => {
            return (
              <ul key={item.id}>
                <img className="preview" src={`/images/${item.imageUrl}`} />
                <li>{item.name}</li>
                <li>Unit Price:{displayDollars(item.price)}</li>
                <li>Quantity: {item.count}</li>
              </ul>
            )
          })}
        </div>
        <div />
        <Form
          {...this.state}
          handleChange={this.handleChange}
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
    total: state.checkout.total,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    completeAnOrder: form => dispatch(completeAnOrder(form, ownProps.history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
