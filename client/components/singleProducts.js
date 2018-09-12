import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleproduct'
import {withRouter} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchSingleProduct(productId)
  }
  render() {
    const selectedProduct = this.props.selectedPerfume[0] || {}

    return (
      <div>
        <li key={selectedProduct.id}>
          <button onClick={() => addToCart(selectedProduct.id)}>
            Add to Cart
          </button>
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
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
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
