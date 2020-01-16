import React from 'react'
import {connect} from 'react-redux'
import {completeAnOrder} from '../store/checkout'

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
      deliveryMethod: ''
      // total: {this.props.location.state.total}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.completeAnOrder(this.state.updateOrder)
    //this.props.functioname(this.state)
    //this.setstate
    //mapdispatchtoprops - pass in order DONE
    //mapstatetoprops - pass in state
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

const mapStateToProps = function(state) {
  return {
    updateOrder: state.updateOrder.updateOrder,
    currentCart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    completeAnOrder: updateOrder => dispatch(completeAnOrder(updateOrder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
