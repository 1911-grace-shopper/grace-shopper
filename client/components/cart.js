import React from 'react'
import {getCart} from '../store/cart'
import {connect} from 'react-redux'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCurrentCart()
  }

  render() {
    const itemsInCart = this.props.currentCart
    let total = Number(0)

    return (
      <div>
        {itemsInCart.map(item => {
          total += Number(item.price * item.count)
          return (
            <ul key={item.id}>
              <li>{item.name}</li>
              <li>Unit Price: ${item.price}</li>
              <li>Total: {item.price * item.count}</li>
              <li>Quantity: {item.count}</li>
            </ul>
          )
        })}
        <div>Total: $ {Number(total)}</div>
        <button>Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentCart: state.cart
})

const mapDispatchToProps = dispatch => {
  return {
    getCurrentCart: () => {
      dispatch(getCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
