import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteAProduct, addNewProduct} from '../store/product'
import {Link} from 'react-router-dom'
class AdminProductForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: '',
      inventory: '',
      image: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.delete = this.delete.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addNewProduct(this.state)

    this.setState({
      name: '',
      description: '',
      price: '',
      inventory: '',
      image: ''
    })
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  delete(id) {
    this.props.deleteAProduct(id)
    this.props.history.push('/admin/addproduct')
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <h3> Add a New Product </h3>
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="..."
              />
            </div>
            <div>
              <label>Description</label>
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="..."
              />
            </div>
            <div>
              <label>Price</label>
              <input
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.handleChange}
                placeholder="..."
              />
            </div>
            <div>
              <label>Inventory</label>
              <input
                name="inventory"
                type="text"
                value={this.state.inventory}
                onChange={this.handleChange}
                placeholder="..."
              />
            </div>
            <div>
              <label>ImageUrl</label>
              <input
                name="image"
                type="text"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit">Submit</button>
          </div>
        </form>

        <div>
          <h3>Perfume Products</h3>
          <table>
            <tbody>
              <tr>
                <th>Product Name </th>

                <th>Product Price</th>
                <th>Product Inventory </th>
                <th>Product Description </th>
                <th>Edit/Delete Product</th>
              </tr>
            </tbody>

            {products.map(product => (
              <tbody key={product.id}>
                <tr>
                  <th>{product.name}</th>
                  <th>{product.price}</th>
                  <th>{product.inventory}</th>
                  <th>{product.description}</th>
                  <th>
                    <Link to={`/admin/editProduct/${product.id}`}>
                      <button type="submit">Edit</button>
                    </Link>
                    <button
                      type="submit"
                      onClick={() => this.delete(product.id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addNewProduct: product => dispatch(addNewProduct(product)),
  deleteAProduct: id => dispatch(deleteAProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductForm)
