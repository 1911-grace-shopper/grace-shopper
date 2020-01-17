import React from 'react'
import {connect} from 'react-redux'
import Form from './checkoutForm'

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
    this.isComplete = this.isComplete.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
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
    console.log('this is SESSIONSTORAGE', sessionStorage)

    return (
      <div>
        <div>
          {this.props.currentCart.map(item => {
            return (
              <ul key={item.id}>
                <img className="preview" src={`/images/${item.imageUrl}`} />
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

const mapStateToProps = state => ({
  currentCart: state.cart
})

export default connect(mapStateToProps)(Checkout)
