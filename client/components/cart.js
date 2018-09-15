import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchCart, fetchDeleteProduct, clearAll} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const items = this.props.cart.items
    console.log('HELLO props', this.props.cart)
    console.log('HELLO localStorage', localStorage.getItem('cartList'))
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
                      this.props.fetchDeleteProduct(item.id)
                      this.props.history.push('/cart')
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
    fetchDeleteProduct: id => dispatch(fetchDeleteProduct(id)),
    clearCart: () => dispatch(clearAll())
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
