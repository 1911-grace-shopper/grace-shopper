import React from 'react'
import {connect} from 'react-redux'
import {getProductsFromServer} from '../store/productReducer'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProductsFromServer()
  }

  render() {
    console.log('THIS IS ALL', this.props)
    return (
      <div>
        <h2>All Products</h2>
        <div className="all_products">
          <ul className="product_list">
            {this.props.products.map(product => (
              <li key={product.id}>
                <Link
                  onClick={() => this.props.goToProductDetail(product.id)}
                  to={'/products/' + product.id}
                >
                  {product.name}
                </Link>
                <img className="product_image" src={product.imageUrl} />
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
  return {
    getProductsFromServer: () => dispatch(getProductsFromServer()),
    goToProductDetail: productId =>
      ownProps.history.push(`products/${productId}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
