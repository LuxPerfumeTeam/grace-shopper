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
    //localStorage.clear()
    const items = this.props.cart
    // this.props.clearCart()
    console.log(items)
    if (localStorage.length === 0) return <h1> No Items In Cart</h1>
    return (
      <div className="container">
<<<<<<< HEAD
        <h4>Shopping Cart</h4>
=======
        <h4 className="center-align">Shopping Cart</h4>
>>>>>>> 7d8aaf655e40d92654612628863cd319677c634b
        <div className="row">
          <div className="col s12">
            <table className="highlight">
              <thead>
                <tr className="cart">
                  <th className="col-s2">Item</th>
                  <th className="col-s2">Quantity</th>
                  <th className="col-s2">Price</th>
<<<<<<< HEAD
                  <th className="col-s2">Total</th>
                  <th className="col-s2">Button</th>
=======
                  <th className="col-s2">Subtotal</th>
                  <th className="col-s4" />
>>>>>>> 7d8aaf655e40d92654612628863cd319677c634b
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
<<<<<<< HEAD
                        <a className="btn-floating btn-large waves-effect waves-light red">
                          <i
                            className="material-icons"
                            onClick={() => item.quantity++}
                            // onClick={() => this.props.clearCart()}
=======
                        <a className="btn-floating btn-small waves-effect waves-light ">
                          <i
                            className="material-icons"
                            onClick={() => this.add(item)}
>>>>>>> 7d8aaf655e40d92654612628863cd319677c634b
                          >
                            add
                          </i>
                        </a>
<<<<<<< HEAD

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
=======
                        <a className="btn-floating btn-small waves-effect waves-light">
                          <i
                            className="material-icons"
                            onClick={() => this.delete(item)}
                          >
                            remove
                          </i>
                        </a>
                        <a className="btn-floating btn-small waves-effect waves-light">
                          <i
                            className="material-icons"
                            onClick={() => this.remove(item.id)}
                          >
                            clear
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td>
                    <a className="btn-floating btn-small waves-effect waves-light grey lighten-3">
                      <i
                        className="material-icons"
                        onClick={() => this.props.clearCart()}
                      >
                        clear
                      </i>
                    </a>

                    {/* <button
                      type="button"
                      onClick={() => this.props.clearCart()}
                    >
                      Clear Cart
                    </button> */}
                  </td>

                  <td>
                    Total:
                    {items.length &&
                      items
                        .map(each => each.price * each.quantity)
                        .reduce((a, b) => a + b)}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={async () => {
                        await axios.post('api/order', items)
                      }}
                    >
                      <Link
                        to="/buyingForm"
                        className="btn waves-effect white grey-text darken-text-2 shop"
                      >
                        Checkout
                      </Link>
                    </button>
                  </td>
>>>>>>> 7d8aaf655e40d92654612628863cd319677c634b
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
