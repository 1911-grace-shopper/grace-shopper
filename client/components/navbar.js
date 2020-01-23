import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getCart} from '../store/cart'
import {Grid, Typography, Badge, Icon} from '@material-ui/core'
import {ShoppingCart, AccountBox} from '@material-ui/icons'

const Navbar = ({handleClick, isLoggedIn, cart}) => (
  <Fragment>
    <Grid container justify="center">
      <Link to="/">
        <Typography variant="h2">MADE TINY</Typography>
      </Link>
    </Grid>
    <Grid container justify="center" alignItems="center" id="navbar">
      <Typography variant="button">
        <Link to="/">Tiny Houses</Link>
        <Link to="/">Urban Micro Homes</Link>
        <Link to="/">Airstream</Link>
        <Link to="/cart">
          Cart
          <Badge badgeContent={cart.length > 0 ? ' ' : 0} color="secondary">
            <ShoppingCart style={{fontSize: 28}} />
          </Badge>
        </Link>
        {isLoggedIn ? (
          <Fragment>
            {/* The navbar will show these links after you log in */}
            <Link to="/profile">
              Profile
              <Badge>
                <AccountBox style={{fontSize: 28}} />
              </Badge>
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </Fragment>
        ) : (
          <Fragment>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <Badge>
                Login<AccountBox style={{fontSize: 28}} />
              </Badge>
            </Link>
          </Fragment>
        )}
      </Typography>
    </Grid>
    <hr />
  </Fragment>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getCurrentCart: () => {
      dispatch(getCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
