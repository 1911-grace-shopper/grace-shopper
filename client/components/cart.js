import React from 'react'
import {getCart} from '../store/cart'
import {connect} from 'react-redux'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCurrentCart()
  }

  render() {
    const itemsInCart = this.props.currentCart
    let total = Number(0)

    return (
      <div>
        {itemsInCart.map(item => {
          total += Number(item.price)
          return (
            <ul key={item.id} className="cartItem">
              <li>{item.name}</li>
              <li>$ {item.price}</li>
              <li>Quantity:</li>
              <button type="button">Remove</button>
            </ul>
          )
        })}
        <div>Total: $ {Number(total)}</div>
        <button type="button">Checkout</button>
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
