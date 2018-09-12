import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {withRouter, NavLink} from 'react-router-dom'
import AllProducts from './allProducts'
class Homepage extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const products = this.props.products
    console.log('what is showing on homepage', this.props)
    return <AllProducts products={products} />
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