import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const categoryArr = ['Men', 'Women']

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const product = this.state

    const id = this.props.id
    this.props.editProduct(id, product)
    this.props.history.push(`/`)
  }

  render() {
    const {handleClick, isLoggedIn, isLoggedInAdmin} = this.props

    return (
      <div>
        <nav>
          <div className="nav-wrapper black-text">
            <Link
              to="/"
              className="brand-logo center black-text v-align wrapper"
              onClick={() => location.reload()}
            >
              LUXPERFUME
            </Link>
            <div className="left hide-on-med-and-down black-text">
              <input
                name="search"
                type="text"
                value={this.state.search}
                placeholder="search"
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </div>
            <ul className="left hide-on-med-and-down black-text">
              {categoryArr.map(each => {
                return (
                  <li key={each}>
                    <Link to={`/category/${each}`}>{each}</Link>
                  </li>
                )
              })}
            </ul>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/cart">
                  <i className="material-icons">add_shopping_cart</i>
                </Link>
              </li>
              {isLoggedIn && !isLoggedInAdmin ? (
                <Fragment>
                  <li>
                    <Link to="/home">My Account</Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </li>
                </Fragment>
              ) : isLoggedInAdmin ? (
                <Fragment>
                  <li>
                    <Link to="/admin/home">My Admin Account</Link>
                    <Link to="/admin/addproduct">Add/Edit Products</Link>
                    <Link to="/admin/addcategory">Add/Edit Categories</Link>
                    <Link to="/admin/orders">Orders</Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </nav>
        <hr />
      </div>
    )
  }
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
