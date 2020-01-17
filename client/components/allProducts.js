import React from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromServer,
  getOneProductFromServer
} from '../store/productReducer'
import {Link, withRouter} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProductsFromServer()
  }

  render() {
    return (
      <div>
        <h2>All Products</h2>
        <div className="all_products">
          <ul className="product_list">
            {this.props.products.map(product => (
              <li key={product.id}>
                <Link
                  onClick={() => this.props.displaySingleProduct(product.id)}
                  to={`/${product.id}`}
                >
                  {product.name}
                </Link>
                <img
                  className="product_image"
                  src={`/images/${product.imageUrl}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history
  return {
    getProductsFromServer: () => dispatch(getProductsFromServer()),
    displaySingleProduct: productId => {
      getOneProductFromServer(productId, history)
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
