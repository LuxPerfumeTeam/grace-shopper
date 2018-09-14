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
  constructor() {
    super()
    this.state = {
      // quantity: this.props.item.quantity,
    }
  }
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    console.log('Whats in my cart?', this.props.cart)
    return 'Hi'
    // <div>
    //   <h3>Shopping Cart HELLO</h3>
    // <ul>

    // {this.props.cart.length &&
    //   this.props.cart.map(item => (
    //     <li key={item.id}>
    //       <Link to={`/products/${item.id}`}>{item.name}</Link>
    //       <td>{item.price}</td>
    //       <td>{item.quantity}</td>
    //       <div>
    //         <button type="button" onClick={() => this.setState(this.state.quantity++)}>
    //           +
    //         </button>
    //         <button
    //           type="button"
    //           onClick={() => this.setState(this.state.quantity--)}
    //         >
    //           -
    //         </button>
    //         <button
    //           type="button"
    //           onClick={() => this.props.deleteProduct(item)}
    //         >
    //           delete
    //         </button>
    //       </div>
    //     </li>
    //   ))}
    // </ul>
    //   <button type="button" onClick={() => this.props.clearCart()}>
    //     clearCart
    //   </button>
    // </div>
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
    cart: state.cart
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
