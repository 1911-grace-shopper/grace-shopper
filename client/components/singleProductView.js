import React from 'react'
import {connect} from 'react-redux'
import {getOneProductFromServer} from '../store/productReducer'
import {addItemToCart} from '../store/cart'

class SingleProductView extends React.Component {
  componentDidMount() {
    if (!this.props.selectedProduct.id) {
      const productId = this.props.match.params.productId
      this.props.getOneProductFromServer(productId)
    }
  }

  clickAdd(item, user) {
    this.props.addToCart(item, user)
  }

  render() {
    console.log(this.props, 'PROPS')
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
            this.clickAdd(this.props.selectedProduct, this.props.user)
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

const mapDispatchToProps = dispatch => {
  return {
    getOneProductFromServer: productId =>
      dispatch(getOneProductFromServer(productId)),
    addToCart: (item, user) => {
      console.log(user, 'USER')
      dispatch(addItemToCart(item, user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
