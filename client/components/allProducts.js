import React from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromServer,
  getSingleProductFromServer
} from '../store/productReducer'
import {Link, withRouter} from 'react-router-dom'
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log('ALL PRODUCTS', this.props)
    return (
      <Grid container spacing={4} className="main">
        {this.props.products.map(product => (
          <Grid item xs={4} key={product.id}>
            <Card>
              <CardActionArea>
                <Link
                  to={`/${product.id}`}
                  onClick={() => this.props.getSingleProduct(product.id)}
                >
                  <CardMedia
                    component="img"
                    image={`/images/${product.imageUrl}`}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
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
