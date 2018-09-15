import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchCart, clearAll} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
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
    console.log('HELLO props', this.props.cart)
    return (
      <div>
        <h3>Shopping Cart HELLO</h3>
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
