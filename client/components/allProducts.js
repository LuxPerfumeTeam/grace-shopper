import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {withRouter, NavLink} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {fetchAddToCart} from '../store/cart'

// import Cart from './cart'
class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      orderProductsId: 1,
      name: '',
      quantity: 1,
      userOrderId: 1
    }
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h3>Perfume</h3>

        {products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} />
              {product.name}
            </Link>
            <Link to="/cart">
              <button
                type="submit"
                onClick={() => {
                  console.log('clicking')
                  this.props.fetchAddToCart(product)
                }}
              >
                Add to Cart
              </button>
            </Link>
          </div>
        ))}
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
    fetchProducts: () => dispatch(fetchProducts()),
    fetchAddToCart: product => dispatch(fetchAddToCart(product))
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
