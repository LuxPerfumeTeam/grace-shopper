import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {
  fetchCart,
  fetchAddToCart,
  clearAll,
  fetchDeleteFromCart,
  fetchDeleteOneFromCart
} from '../store/cart'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.remove = this.remove.bind(this)
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
  }
  componentDidMount() {
    // this.props.fetchCart()
  }
  remove(id) {
    this.props.fetchDeleteFromCart(id)
    this.props.fetchCart()
    this.props.history.push('/cart')
  }
  async add(product) {
    await this.props.fetchAddToCart(product)
    this.props.history.push('/cart')
  }

  delete(product) {
    this.props.fetchDeleteOneFromCart(product)
    this.props.history.push('/cart')
  }
  render() {
    const items = this.props.cart
    if (items.length === 0) return <h1> No Items In Cart</h1>
    return (
      <div>
        <h4>Shopping Cart</h4>

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
                  <button type="button" onClick={() => this.delete(item)}>
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
    fetchDeleteOneFromCart: product =>
      dispatch(fetchDeleteOneFromCart(product)),
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
