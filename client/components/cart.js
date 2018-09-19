import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchCart, clearAll, fetchDeleteFromCart} from '../store/cart'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.remove = this.remove.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
  }
  remove(id) {
    this.props.fetchDeleteFromCart(id)
    this.props.fetchCart()
    this.props.history.push('/cart')
  }

  render() {
    const items = this.props.cart
    // this.props.clearCart()
    console.log(items)
    if (localStorage.length === 0) return <h1> No Items In Cart</h1>
    return (
      <div className="container">
        <h4>Shopping Cart</h4>
        <div className="row">
          <div className="col s12">
            <table className="highlight">
              <thead>
                <tr className="cart">
                  <th className="col-s2">Item</th>
                  <th className="col-s2">Quantity</th>
                  <th className="col-s2">Price</th>
                  <th className="col-s2">Total</th>
                  <th className="col-s2">Button</th>
                </tr>
              </thead>
              <tbody>
                {items.length &&
                  items.map(item => (
                    <tr key={item.id} className="v-align wrapper">
                      <td>
                        <Link to={`/products/${item.id}`}>{item.name}</Link>
                        {/* <img className="img" src={item.image} /> */}
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <a className="btn-floating btn-large waves-effect waves-light red">
                          <i
                            className="material-icons"
                            onClick={() => item.quantity++}
                            // onClick={() => this.props.clearCart()}
                          >
                            add
                          </i>
                        </a>

                        {/* <button type="button" onClick={() => item.quantity++}>
                          +
                        </button> */}

                        <button type="button" onClick={() => item.quantity--}>
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            this.remove(item.id)
                          }}
                        >
                          remove
                        </button>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <button type="button" onClick={() => this.props.clearCart()}>
                    clearCart
                  </button>
                </tr>
                <tr>
                  Total:
                  {items.length &&
                    items
                      .map(each => each.price * each.quantity)
                      .reduce((a, b) => a + b)}
                </tr>
                <tr>
                  <button
                    type="button"
                    onClick={async () => {
                      await axios.post('api/order', items)
                    }}
                  >
                    <Link to="/buyingForm">Checkout</Link>
                  </button>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    clearCart: () => dispatch(clearAll()),
    fetchDeleteFromCart: id => dispatch(fetchDeleteFromCart(id))
  }
}
//thunk creator that does axios.post to api/orders to send the order information
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
