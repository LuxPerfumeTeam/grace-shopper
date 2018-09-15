import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleproduct'
import {withRouter} from 'react-router-dom'
import {fetchCart, postToCart, removeFromCart} from '../store/cart'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchSingleProduct(productId)
  }

  render() {
    const selectedProduct = this.props.selectedPerfume[0] || {}

    return (
      <div>
        <button
          type="submit"
          onClick={() => this.props.postToCart(selectedProduct.id)}
        >
          Add to Cart
        </button>
        <button
          type="reset"
          onClick={() => this.removeFromCart(selectedProduct)}
        >
          Remove From Cart
        </button>
        <li key={selectedProduct.id}>
          <h2> {selectedProduct.name}</h2>
          <img src={'/' + selectedProduct.image} />
          {selectedProduct.description}
        </li>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    fetchCart: id => dispatch(fetchCart(id)),
    postToCart: id => dispatch(postToCart(id)),
    removeFromCart: id => dispatch(removeFromCart(id))
  }
}
const mapStateToProps = state => {
  return {
    selectedPerfume: state.singleproduct
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
)
