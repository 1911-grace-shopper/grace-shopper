import React from 'react'
import {connect} from 'react-redux'
import Form from './checkoutForm'
import {completeAnOrder} from '../store/checkout'
import Axios from 'axios'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderId: this.props.currentCart[0].orderId,
      recipientName: '',
      shippingAddressLineOne: '',
      shippingAddressLineTwo: '',
      shippingCity: '',
      shippingState: '',
      shippingAddressZipCode: '',
      deliveryMethod: '',
      total: this.props.location.state.total,
      warningMessage: 'required'
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
    console.log('this is handle submit', this.state)
    event.preventDefault()
    this.props.completeAnOrder(this.state)
    // try {
    //   const {data}= await Axios.put(`/api/checkout/${this.props.cart[0].orderId}`, this.state)
    // }
    // catch (error) {
    //   console.log(error)
    // }
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
    console.log('this is from just checkout', this.props)
    return (
      <div>
        <div>
          {this.props.currentCart.map(item => {
            return (
              <ul key={item.id}>
                <li>{item.imageUrl}</li>
                <li>{item.name}</li>
                <li>Unit Price: ${item.price}</li>
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
    updateOrder: state.updateOrder.updateOrder,
    currentCart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeAnOrder: form => dispatch(completeAnOrder(form)),
    handleSubmit: () => dispatch(completeAnOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
