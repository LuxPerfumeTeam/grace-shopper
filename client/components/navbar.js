import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const categoryArr = ['Men', 'Women']

const Navbar = props => {
  const {handleClick, isLoggedIn, isLoggedInAdmin} = props
  return (
    <div>
      <Link to="/">
        <h1>LuxPerfume</h1>
      </Link>

      <nav>
        {categoryArr.map(each => {
          return (
            <Link key={each} to={`/category/${each}`}>
              {each}
            </Link>
          )
        })}
        <Link to="/">
          <p>All Products</p>
        </Link>
      </nav>
      <nav>
        {isLoggedIn && !isLoggedInAdmin ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : isLoggedInAdmin ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/admin/home">My Admin Account</Link>
            <Link to="/admin/addproduct">Add/Edit Products</Link>
            <Link to="/admin/addcategory">Add/Edit Categories</Link>
            <Link to="/admin/orders">Orders</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id && !state.user.admin,
    isLoggedInAdmin: !!state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggedInAdmin: PropTypes.bool.isRequired
}
