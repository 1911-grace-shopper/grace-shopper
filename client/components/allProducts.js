import React from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromServer,
  getSingleProductFromServer
} from '../store/productReducer'
import {Link, withRouter} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log('ALL PRODUCTS', this.props)
    return (
      <div>
        <h2>All Products</h2>
        <div className="all_products">
          {this.props.products.map(product => (
            <div key={product.id} className="product_list">
              <img
                className="product_image"
                src={`/images/${product.imageUrl}`}
              />
              <Link
                to={`/${product.id}`}
                onClick={() => this.props.getSingleProduct(product.id)}
              >
                <h3>{product.name}</h3>
              </Link>
            </div>
          ))}
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
    getProducts: () => dispatch(getProductsFromServer()),
    getSingleProduct: productId => {
      getSingleProductFromServer(productId)
      //history.push(`/${productId}`)
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
