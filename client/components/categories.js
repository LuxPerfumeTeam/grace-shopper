import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/categories'
import {Link} from 'react-router-dom'

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gender: this.props.match.params.categoryName
    }
  }

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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
