import React from 'react'
import {getCart, deleteItem} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCurrentCart()
  }

  clickDelete(item) {
    this.props.deleteItem(item)
    // this.props.getCurrentCart()
  }

  render() {
    const itemsInCart = this.props.currentCart
    let total = Number(0)
    console.log(this.props.currentCart, 'CART PROPS')

    return (
      <div>
        {itemsInCart.map(item => {
          total += Number(item.price * item.count)
          return (
            <ul key={item.id} className="cartItem">
              <img className="preview" src={`/images/${item.imageUrl}`} />
              <li>{item.name}</li>
              <li>Unit Price: ${item.price}</li>
              <li>Total: ${Number(item.price) * Number(item.count)}</li>
              <li>Quantity: {item.count}</li>
              <button
                onClick={() => {
                  this.clickDelete(item)
                }}
              >
                Remove (1) From Cart
              </button>
            </ul>
          )
        })}
        <div>Total: $ {Number(total)}</div>
        <Link to={{pathname: '/checkout', state: {total: total}}}>
          Checkout
        </Link>
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
    },
    deleteItem: item => {
      dispatch(deleteItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
