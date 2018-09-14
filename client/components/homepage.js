import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {withRouter, NavLink} from 'react-router-dom'
import AllProducts from './allProducts'
import Cart from './cart'
class Homepage extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const products = this.props.products

    return (
      <div>
        <AllProducts products={products} />
        <Cart />
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    products: state.product
  }
}
const mapDispatchToProps = function(dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homepage)
)
