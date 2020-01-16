import React from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import {Link} from 'react-router-dom'

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
      total: this.props.location.state.total,
      warningMessage: 'required'
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log('this is checkout props', this.props)
    this.setState({
      [event.target.name]: event.target.value
    })
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
    console.log('this is checkout state', this.state)

    return (
      <form id="checkout_form" onSubmit={this.handleSubmit}>
        <label>
          Recipient Name:
          {!this.state.recipientName &&
            this.state.warningMessage && (
              <span className="warning">{this.state.warningMessage}</span>
            )}
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
        <label>Total: {this.state.total}</label>
        {this.isComplete() ? (
          <span>Please Enter Required Fields</span>
        ) : (
          <Link
            type="submit"
            disabled={!this.state.recipientName}
            to={{pathname: '/confirmation'}}
            onClick={this.handleSubmit}
          >
            Submit Order
          </Link>
        )}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  currentCart: state.cart
})

export default connect(mapStateToProps)(Checkout)
