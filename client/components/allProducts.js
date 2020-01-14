import React from 'react'
import {connect} from 'react-redux'
import {getProductsFromServer} from '../store/product'
import {BrowserRouter as Router, Link} from 'react-router-dom'

class AllProducts extends React.Component {
  // constructor(props){
  //   super(props)
  // }

  componentDidMount() {
    this.props.getProductsFromServer()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Router>
          <h2>All Products</h2>
          <div className="all_products">
            <ul className="product_list">
              {this.props.products.map(product => (
                <li key={product.id}>
                  <Link to={'/products/' + product.id}>{product.name}</Link>
                  <img className="product_image" src={product.imageUrl} />
                </li>
              ))}
            </ul>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  getProductsFromServer: () => dispatch(getProductsFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
