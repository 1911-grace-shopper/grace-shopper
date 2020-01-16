import React from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipientName: '',
      shippingAddressLineOne: '',
      shippingAddressLineTwo: '',
      shippingCity: '',
      shippingState: '',
      shippingAddressZipCode: '',
      deliveryMethod: '',
      total: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log('this is delic=verymethod state', this.state.deliveryMethod)
    console.log('event name', event.target.name)
    console.log('value', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    // this.props.addNewOrder(this.state)
    try {
      const res = await Axios.post('/api/checkout', this.state)
      this.setState({
        state: [res.data]
      })
    } catch (error) {
      console.log(
        'this is a temporary error handle from components.checkout.js',
        error
      )
    }

    // this.setState({
    //   recipientName: '',
    //   shippingAddress: '',
    //   deliveryMethod: ''
    // })
  }

  render() {
    console.log('from checkout', this.props)
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
            name="shippingAddressZipCode"
            onChange={this.handleChange}
            value={this.state.shippingAddressZipCode}
          />
        </label>
        <label>
          Delivery Method:
          <select
            name="deliveryMethod"
            value={this.state.deliveryMethod}
            onChange={this.handleChange}
          >
            <option>Please Select</option>
            <option value="Delivery">Delivery</option>
            <option value="Pick-Up">Pick-Up</option>
          </select>
        </label>
        <label>Total: {this.props.location.state.total}</label>
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default Checkout
