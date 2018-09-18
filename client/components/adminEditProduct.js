import React, {Component} from 'react'
import {fetchSingleProduct} from '../store/singleproduct'
import {editProduct} from '../store/product'
import {connect} from 'react-redux'

export class adminEditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: 0,
      inventory: 0,
      image: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const id = this.props.id
    this.props.fetchSingleProduct(id)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const product = this.state

    const id = this.props.id
    this.props.editProduct(id, product)
    this.props.history.push(`/admin/addproduct`)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Product Name</label>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder={this.props.product.name}
            />
          </div>
        </div>

        <div>
          <label> Description </label>
          <div>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder={this.props.product.description}
            />
          </div>
        </div>
        <div>
          <label>Price </label>
          <div>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              placeholder={this.props.product.price}
            />
          </div>
        </div>

        <div>
          <label>Inventory </label>
          <div>
            <input
              type="text"
              name="inventory"
              value={this.state.inventory}
              onChange={this.handleChange}
              placeholder={this.props.product.inventory}
            />
          </div>
        </div>

        <div>
          <label>Image </label>
          <div>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleChange}
              placeholder={this.props.product.image}
            />
          </div>
        </div>
        <button type="submit">Edit Product</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  return {
    product: state.product,
    id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    editProduct: (id, product) => dispatch(editProduct(id, product))
  }
}

const ConnectedAdminEditProduct = connect(mapStateToProps, mapDispatchToProps)(
  adminEditProduct
)

export default ConnectedAdminEditProduct
