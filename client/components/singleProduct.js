import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {getSingleProductFromServer} from '../store/productReducer'
import {addItemToCart} from '../store/cart'
import ImageSlides from './imageSlides'
import {Grid, Typography, Button, Paper} from '@material-ui/core'
import displayDollars from './helper'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getSingleProduct(productId)
  }

  clickAdd(item, user) {
    this.props.addToCart(item, user)
  }

  render() {
    const {
      name,
      imageFilePath,
      images,
      price,
      length,
      width,
      beds,
      description
    } = this.props.selectedProduct

    return (
      <Grid
        container
        justify="center"
        alignItems="stretch"
        spacing={4}
        className="main"
        id="single-product"
      >
        {images && (
          <Grid item sm={6}>
            <ImageSlides images={images} imageFilePath={imageFilePath} />
          </Grid>
        )}
        <Grid item sm={6}>
          <Paper elevation={3} className="description">
            <Typography variant="h4"> {name} </Typography>
            <Typography variant="h6">Price: {displayDollars(price)}</Typography>
            <Typography variant="body2">Width: {width} ft</Typography>
            <Typography variant="body2">Length: {length} ft</Typography>
            <Typography variant="body2">Sleeps: {beds}</Typography>
            <Typography variant="body2">Description: {description}</Typography>
            <Button
              variant="contained"
              onClick={() => {
                this.props.addToCart(
                  this.props.selectedProduct,
                  this.props.user
                )
              }}
            >
              Purchase this Home
            </Button>
          </Paper>
        </Grid>
      </Grid>
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
    getSingleProduct: productId => {
      dispatch(getSingleProductFromServer(productId))
    },
    addToCart: (item, user) => {
      dispatch(addItemToCart(item, user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
