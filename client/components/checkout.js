import React from 'react'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipientName: '',
      shippingAddressLineOne: '',
      shippingAddressLineTwo: '',
      shippingCity: '',
      shippingState: '',
      shippingZipCode: '',
      deliveryMethod: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log('this is handleChange', event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewOrder(this.state)
    this.setState({
      recipientName: '',
      shippingAddress: '',
      deliveryMethod: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Recipient Name:
          <input
            type="text"
            name="recipientName"
            onChange={this.handleChange}
            value={this.state.recipientName}
          />
        </label>
        <h3>Shipping Address</h3>
        <label>
          Line 1:
          <input
            type="text"
            name="shippingAddressLineOne"
            onChange={this.handleChange}
            value={this.state.shippingAddressLineOne}
          />
        </label>
        <label>
          Line 2:
          <input
            type="text"
            name="shippingAddressLineTwo"
            onChange={this.handleChange}
            value={this.state.shippingAddressLineTwo}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="shippingCity"
            onChange={this.handleChange}
            value={this.state.shippingCity}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="shippingState"
            onChange={this.handleChange}
            value={this.state.shippingState}
          />
        </label>
        <label>
          Zip:
          <input
            type="number"
            name="shippingZipCode"
            onChange={this.handleChange}
            value={this.state.shippingZipCode}
          />
        </label>
        <label>
          Delivery Method:
          <select
            name="deliveryMethod"
            value={this.state.deliveryMethod}
            onChange={this.handleChange}
          >
            <option value="Delivery">Delivery</option>
            <option value="Pick-Up">Pick-Up</option>
          </select>
        </label>
        <label>Subtotal:</label>
      </form>
    )
  }
}

export default Checkout
