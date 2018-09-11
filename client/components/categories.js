import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/categories'

class Categories extends Component {
  // constructor(props){
  //     super(props)
  // this.state = {
  //     gender : '',
  // }

  // }

  componentDidMount() {
    const gender = this.props.match.params.categoryName
    console.log('gender', gender)
    this.props.fetchCategory(gender)
  }
  render() {
    const {gender} = this.props.match.params
    const genderCategory = this.props.genderCategory

    return (
      <div>
        <h2>{gender}</h2>
        {genderCategory.map(product => {
          return (
            <div key={product.id}>
              <img src={product.image} />

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
    fetchCategory: gender => dispatch(fetchCategory(gender))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
