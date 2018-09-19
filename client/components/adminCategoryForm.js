import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewCategories} from '../store/categories'

class AdminCategoryForm extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addNewCategories(this.state)
    this.setState({
      name: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <h3> Add a New Category </h3>
            <label>Category Name</label>
            <input
              name="name"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="..."
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

const mapState = state => ({
  category: state.category
})

const mapDispatch = dispatch => ({
  addNewCategories: category => dispatch(addNewCategories(category))
})

export default connect(mapState, mapDispatch)(AdminCategoryForm)
