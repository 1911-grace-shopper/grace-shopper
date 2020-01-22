import React from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromServer,
  getSingleProductFromServer
} from '../store/productReducer'
import {Link, withRouter} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box
} from '@material-ui/core'
import {Icon} from '@material-ui/icons'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <Grid container spacing={4} className="main all-products">
        {this.props.products.map(product => (
          <Grid item xs={4} key={product.id}>
            <Card className="card">
              <CardActionArea>
                <Link
                  to={`/${product.id}`}
                  onClick={() => this.props.getSingleProduct(product.id)}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={`/images/${product.imageUrl}`}
                  />
                  <CardContent className="card-content">
                    <Box component="div">
                      <Typography variant="h5" gutterBottom>
                        {product.name}
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography variant="subtitle2">
                        size: {product.width} x {product.length}
                      </Typography>
                      <Typography variant="subtitle2">
                        sleeps: {product.beds}
                      </Typography>
                      <Typography variant="subtitle2">
                        style: {product.style}
                      </Typography>
                    </Box>
                  </CardContent>
                </Link>
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

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProductsFromServer()),
    getSingleProduct: productId => {
      getSingleProductFromServer(productId)
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
