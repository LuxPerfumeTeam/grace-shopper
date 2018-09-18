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
          <div key={product.id} className="row">
            <div className="col s12 m4">
              <div className="card-image">
                <img src={product.image} />
                <span className="card-title" myClassHey>
                  <i className="material-icons right" />
                </span>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <Link to="/cart">
                  <button
                    className="btn-floating btn-large waves-effect waves-light red"
                    type="submit"
                    name="action"
                    onClick={() => {
                      this.props.fetchAddToCart(product)
                    }}
                  >
                    <i className="material-icons right">add</i>
                  </button>
                </Link>
              </div>
            </div>
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
