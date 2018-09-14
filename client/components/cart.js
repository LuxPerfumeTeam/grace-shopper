import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  fetchCart,
  postToCart,
  decrementQuantity,
  deleteProduct,
  clearAll
} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div>
        <h3>Shopping Cart</h3>
        <ul>
          {props.cart.length &&
            props.cart.map(item => (
              <li key={item.id}>
                <Link to={`/products/${item.id}`}>{item.name}</Link>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <div>
                  <button type="button" onClick={() => props.addToCart(item)}>
                    add
                  </button>
                  <button
                    type="button"
                    onClick={() => props.decrementQuantity(item)}
                  >
                    remove
                  </button>
                  <button
                    type="button"
                    onClick={() => props.deleteProduct(item)}
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <button type="button" onClick={() => props.clearCart()}>
          clearCart
        </button>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    addToCart: product => dispatch(addToCart(product)),
    decrementQuantity: product => dispatch(decrementQuantity(product)),
    deleteProduct: product => dispatch(deleteProduct(product)),
    clearCart: () => dispatch(clearAll())
  }
}

const mapStateToProps = state => {
  return {
    order: state.cart
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
