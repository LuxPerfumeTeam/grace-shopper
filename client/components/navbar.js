// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
// import {logout} from '../store'

// const categoryArr = ['Men', 'Women']

// const Navbar = props => {
//   const {handleClick, isLoggedIn, isLoggedInAdmin} = props
//   return (
//     <div className="navbar-fixed">
//       <nav>
//         {categoryArr.map(each => {
//           return (
//             <Link key={each} to={`/category/${each}`}>
//               {each}
//             </Link>
//           )
//         })}
//         {isLoggedIn && !isLoggedInAdmin ? (
//           <div>
//             {/* The navbar will show these links after you log in */}
//             <Link to="/home">My Account</Link>
//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//           </div>
//         ) : isLoggedInAdmin ? (
//           <div>
//             {/* The navbar will show these links after you log in */}
//             <Link to="/admin/home">My Admin Account</Link>
//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//           </div>
//         ) : (
//           <div>
//             {/* The navbar will show these links before you log in */}
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//             <Link to="/cart">Cart</Link>
//           </div>
//         )}
//       </nav>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id && !state.user.admin,
//     isLoggedInAdmin: !!state.user.admin
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default withRouter(connect(mapState, mapDispatch)(Navbar))

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
//   isLoggedInAdmin: PropTypes.bool.isRequired
// }
import React, {Fragment} from 'react'
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
        <div className="nav-wrapper black-text">
          <Link to="/" className="brand-logo center black-text">
            LuxPerfume
          </Link>
          <ul className="left hide-on-med-and-down black-text">
            {categoryArr.map(each => {
              return (
                <li>
                  <Link key={each} to={`/category/${each}`}>
                    {each}
                  </Link>
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
