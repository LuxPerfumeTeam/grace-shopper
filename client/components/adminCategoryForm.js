import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewCategory} from '../store/categories'

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
    this.setState({
      name: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addNewCategory(this.state)
    this.setState({
      name: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div>
            <label>Category</label>
            <input
              name="name"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
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
  addNewCategory: category => dispatch(addNewCategory(category))
})

export default connect(mapState, mapDispatch)(AdminCategoryForm)
