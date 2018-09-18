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
      <div className="row">
        <div className="col s12 m5">
          <div className="card">
            <div className="card-title center-align"><i className="material-icons right"/>
              {selectedProduct.name}
              </div>
            <div className="card-image">
              <img src={'/' + selectedProduct.image}/>
            </div>
            <Link to="/cart">
              <button
                type="submit" name="action" onClick={() => {this.props.fetchAddToCart(selectedProduct)
                }}><a className="waves-effect waves-light btn"><i className="material-icons center-align">shopping_cart</i> Add to cart</a>
              </button>
            </Link>
          </div>
          <div className="card-content">
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.review}</p>
          </div>
        </div>
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
