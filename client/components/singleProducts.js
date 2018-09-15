import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleproduct'
import {withRouter, Link} from 'react-router-dom'
import {fetchAddToCart} from '../store/cart'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchSingleProduct(productId)
  }

  render() {
    const selectedProduct = this.props.selectedPerfume

    return (
      <div>
        <Link to="/cart">
          <button
            type="submit"
            onClick={() => {
              this.props.fetchAddToCart(selectedProduct)
            }}
          >
            Add to Cart
          </button>
        </Link>
        <li key={selectedProduct.id}>
          <h2> {selectedProduct.name}</h2>
          <img src={'/' + selectedProduct.image} />
          {selectedProduct.description}
          {selectedProduct.review}
        </li>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    fetchAddToCart: product => dispatch(fetchAddToCart(product))
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
