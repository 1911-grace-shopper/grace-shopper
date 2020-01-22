import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid, Typography, Badge, Icon} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'

const Navbar = ({handleClick, isLoggedIn}) => (
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
        {isLoggedIn ? (
          <Fragment>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </Fragment>
        ) : (
          <Fragment>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
          </Fragment>
        )}
        <Link to="/cart">
          <Badge badgeContent={7} color="secondary" showZero>
            <ShoppingCart />
          </Badge>
        </Link>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
