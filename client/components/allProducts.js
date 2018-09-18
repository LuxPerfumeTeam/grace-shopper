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
        <h3>All Perfumes</h3>
        <div className="row">
        {products.map(product => (
          <div key={product.id} className="col s6 m4">
              <div className="card">
              <div className="card-image">
                <img src={product.image}/>
              </div>
                <div className="card-title center-align"><i className="material-icons right"/>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </div>
                <Link to="/cart">
                  <button
                    type="submit"
                    name="action"
                    onClick={() => {
                      this.props.fetchAddToCart(product)
                    }}
                  ><a className="waves-effect waves-light btn"><i className="material-icons">shopping_cart</i> Add to cart</a></button>
                </Link>
              </div>
            </div>
        ))}
        </div>
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
