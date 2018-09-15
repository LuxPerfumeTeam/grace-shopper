import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/categories'

class AdminProductForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      inventory: 0,
      image: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
      price: 0,
      inventory: 0,
      image: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Inventory</label>
            <input
              name="inventory"
              type="text"
              value={this.state.inventory}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Image</label>
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
    )
  }
}

const mapState = state => ({
  categories: state.categories
})

const mapDispatch = dispatch => ({
  addNewCategory: product => dispatch(addNewProduct(product))
})

export default connect(mapState, mapDispatch)(AdminProductForm)
