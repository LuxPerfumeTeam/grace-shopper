import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/product'

class SearchForm extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.search = this.search.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.search(this.state.name)
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  search(name) {
    console.log('WHAT IS NAMEEEE?', name)
    const found = this.props.products.filter(each => {
      console.log('WHAT IS EACH', each)
      return name.length === each.name.length && name[0] === each.name[0]
    })
    // if(found.length === 1) this.props.history.push(`/products/${found[0].id}`)
    // else

    this.props.history.push(`/products/${found[0].id}`)
  }
  render() {
    return (
      <div className="left hide-on-med-and-down black-text">
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            type="text"
            value={this.state.name}
            placeholder="search"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.product
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchForm)
)
