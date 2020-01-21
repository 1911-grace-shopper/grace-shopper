import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid, Typography} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Fragment>
    <Grid container justify="center">
      <Link to="/">
        <Typography variant="h2">MADE TINY</Typography>
      </Link>
    </Grid>
    <Grid container justify="center" alignItems="center" id="navbar">
      <Typography variant="h6">
        <Link to="/">Tiny Houses</Link>
        <Link to="urban-micro">Urban Micro Homes</Link>
        <Link to="airstream">Airstream</Link>
        <Link to="/cart">Cart</Link>
        {isLoggedIn ? (
          <Fragment>
            {/* The navbar will show these links after you log in */}
            <Link to="/profile">Profile</Link>
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
