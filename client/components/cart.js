import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchCart, clearAll} from '../store/cart'
import axios from 'axios'

class Cart extends Component {
  constructor() {
    super()

    this.refresh = this.refresh.bind(this)
  }
  componentDidMount() {
    this.props.fetchCart()
  }
  refresh() {
    location.reload()
  }

  render() {
    const items = this.props.cart

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
                  <button type="button" onClick={() => item.quantity++}>
                    +
                  </button>
                  <li>{item.quantity}</li>
                  <button type="button" onClick={() => item.quantity--}>
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem(`${item.id}`)
                      this.refresh()
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
    clearCart: () => dispatch(clearAll())
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
