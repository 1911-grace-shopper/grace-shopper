import React from 'react'
import {connect} from 'react-redux'
import {getOneProductFromServer} from '../store/productReducer'

class SingleProductView extends React.Component {
  componentDidMount() {
    if (!this.props.selectedProduct.id) {
      const productId = this.props.match.params.productId
      this.props.getOneProductFromServer(productId)
    }
  }

  addToCart(item) {
    let currentCart = JSON.parse(sessionStorage.cart)

    currentCart.push(item)
    console.log(currentCart, 'Current CART')

    sessionStorage.setItem('cart', JSON.stringify(currentCart))
  }

  render() {
    return (
      <div>
        <h2> {this.props.selectedProduct.name} </h2>

        <p>
          <img src={this.props.selectedProduct.imageUrl} />
        </p>

        <p>Price: {this.props.selectedProduct.price}</p>

        <p>
          Square Feet:
          {this.props.selectedProduct.length * this.props.selectedProduct.width}
        </p>

        <p>Number of Bedrooms: {this.props.selectedProduct.beds}</p>

        <p>Number of Bathrooms: {this.props.selectedProduct.bathrooms}</p>

        <p>Description: {this.props.selectedProduct.description}</p>

        <button
          onClick={() => {
            this.addToCart(this.props.oneProduct)
          }}
        >
          BUY ME!
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.products.selectedProduct
})

const mapDispatchToProps = dispatch => {
  return {
    getOneProductFromServer: productId =>
      dispatch(getOneProductFromServer(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
