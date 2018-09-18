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
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src={'/' + selectedProduct.image} />
              <span className="card-title" myClassHey>
                <i className="material-icons right" />
              </span>
              {selectedProduct.name}
            </div>
            <Link to="/cart">
              <button
                className="btn-floating btn-large waves-effect waves-light red"
                type="submit"
                name="action"
                onClick={() => {
                  this.props.fetchAddToCart(selectedProduct)
                }}
              >
                <i className="material-icons right">add</i>
              </button>
            </Link>
          </div>
          <div className="card-content">
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.review}</p>
          </div>
        </div>
      </div>

      // <Link to="/cart"><button type="submit" onClick={() => {this.props.fetchAddToCart(selectedProduct)}}>Add to Cart</button></Link>
      //   <Link to="/cart">
      //     <button
      //       type="submit"
      //       onClick={() => {
      //         this.props.fetchAddToCart(selectedProduct)
      //       }}
      //     >Add to Cart</button>
      //   </Link>
      //   <li key={selectedProduct.id}>
      //     <h2> {selectedProduct.name}</h2>
      //     <img src={'/' + selectedProduct.image} />
      //     {selectedProduct.description}
      //     {selectedProduct.review}
      //   </li>
      // </div>
      // </div>
      // </div>
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
