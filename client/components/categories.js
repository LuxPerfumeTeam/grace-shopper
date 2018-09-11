import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory, fetchAddToCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: this.props.match.params.categoryName
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //both componentdidmount & componentdidupdate was required to switch between catagories. componentdidmount would mount only one time so we used componentdidupdate to rerender
  componentDidMount() {
    this.props.fetchCategory(this.state.gender)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const nextGender = this.props.match.params.categoryName

    if (nextGender !== this.state.gender) {
      this.setState(
        {
          gender: nextGender
        },
        this.props.fetchCategory(nextGender)
      )
    }
  }

  handleSubmit(event, id) {
    event.preventDefault()
    this.props.add(id)
    this.props.history.push('/cart')
  }

  render() {
    const gender = this.props.match.params.categoryName
    const genderCategory = this.props.genderCategory

    return (
      <div>
        <h2>{gender}</h2>
        {genderCategory.map(product => {
          return (
            <div key={product.id}>
              <img src={'/' + product.image} />

              {product.name}
              {product.price}
              <button
                type="button"
                onClick={event => this.handleSubmit(event, product.id)}
              >
                Add
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    genderCategory: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategory: gender => {
      console.log('fetching', gender)
      dispatch(fetchCategory(gender))
    },
    add: id => {
      dispatch(fetchAddToCart(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
