import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {
  fetchCart,
  fetchAddToCart,
  clearAll,
  fetchDeleteFromCart
} from '../store/cart'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.remove = this.remove.bind(this)
    this.add = this.add.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
  }
  remove(id) {
    this.props.fetchDeleteFromCart(id)
    this.props.fetchCart()
    this.props.history.push('/cart')
  }
  add(product) {
    this.props.fetchAddToCart(product)
  }
  render() {
    const items = this.props.cart
    // this.props.clearCart()
    console.log(items)
    if (localStorage.length === 0) return <h1> No Items In Cart</h1>
    return (
      <div>
        <h3>Cart</h3>
        <ul>
          {items.length &&
            items.map(item => (
              <div key={item.id}>
                <li>
                  <Link to={`/products/${item.id}`}>Name: {item.name}</Link>
                </li>
                <li>
                  <img src={item.image} />
                </li>
                <li>Price: {item.price}</li>

                <div>
                  <button type="button" onClick={() => this.add(item)}>
                    +
                  </button>
                  <li>{item.quantity}</li>
                  <button type="button" onClick={() => item.quantity--}>
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.remove(item.id)
                      //make thunk creator like the rest to update the delete in the store
                    }}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
        </ul>

        <button type="button" onClick={() => this.props.clearCart()}>
          clearCart
        </button>
        <div>
          Total:
          {items.length &&
            items
              .map(each => each.price * each.quantity)
              .reduce((a, b) => a + b)}
        </div>
        <button
          type="button"
          onClick={async () => {
            await axios.post('api/order', items)
          }}
        >
          <Link to="/buyingForm">Checkout</Link>
        </button>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    clearCart: () => dispatch(clearAll()),
    fetchDeleteFromCart: id => dispatch(fetchDeleteFromCart(id)),
    fetchAddToCart: product => dispatch(fetchAddToCart(product))
  }
}
//thunk creator that does axios.post to api/orders to send the order information
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
