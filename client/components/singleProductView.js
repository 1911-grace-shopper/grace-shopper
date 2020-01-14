import React from 'react'
import {getOneProductFromServer} from '../store/product'
import {connect} from 'react-redux'

class SingleProductView extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getOneProductFromServer(productId)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2> {this.props.oneProduct.name} </h2>

        <p>
          <img src={this.props.oneProduct.imageUrl} />
        </p>

        <p>Price: {this.props.oneProduct.price}</p>

        <p>
          Square Feet:{' '}
          {this.props.oneProduct.length * this.props.oneProduct.width}
        </p>

        <p>Number of Bedrooms: {this.props.oneProduct.beds}</p>

        <p>Number of Bathrooms: {this.props.oneProduct.bathrooms}</p>

        <p>Description:{this.props.oneProduct.description}</p>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    oneProduct: state.products.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOneProductFromServer: campusId =>
      dispatch(getOneProductFromServer(campusId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
