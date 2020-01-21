import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {getSingleProductFromServer} from '../store/productReducer'
import {addItemToCart} from '../store/cart'
import displayDollars from './helper'

class SingleProduct extends React.Component {
  componentDidMount() {
    if (!this.props.selectedProduct.id) {
      const productId = this.props.match.params.productId
      this.props.getSingleProductFromServer(productId)
    }
  }

  clickAdd(item, user) {
    this.props.addToCart(item, user)
  }

  render() {
    const {
      name,
      imageUrl,
      price,
      length,
      width,
      beds,
      bathrooms,
      description
    } = this.props.selectedProduct
    console.log('SINGLE PRODUCT:', this.props)
    return (
      <div>
        <h2> {name} </h2>
        <img src={`/images/${imageUrl}`} />
        <p>Price: {displayDollars(price)}</p>
        <p>
          Square Feet:
          {length * width}
        </p>
        <p>Number of Bedrooms: {beds}</p>
        <p>Number of Bathrooms: {bathrooms}</p>
        <p>Description: {description}</p>

        <button
          onClick={() => {
            this.props.addToCart(this.props.selectedProduct, this.props.user)
          }}
        >
          BUY ME!
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedProduct,
  currentCart: state.cart,
  user: state.user
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getSingleProductFromServer: productId =>
      dispatch(getSingleProductFromServer(productId)),
    addToCart: (item, user) => {
      console.log('addToCart', ownProps)
      dispatch(addItemToCart(item, user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
