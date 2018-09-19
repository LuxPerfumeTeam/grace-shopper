import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategory} from '../store/categories'
import {Link, withRouter} from 'react-router-dom'
import {fetchAddToCart} from '../store/cart'

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

  //do the onClick invoking a function that invokes a thunk creator

  render() {
    const gender = this.props.match.params.categoryName
    const genderCategory = this.props.genderCategory
    if (!genderCategory.length) {
      return <h2>No Products Yet</h2>
    }
    return (
      <div>
        <h3>{gender}</h3>
        <div className="row">
          {genderCategory.map(product => (
            <div key={product.id} className="col s6 m4">
              <div className="card">
                <div className="card-image">
                  <img src={'/' + product.image}/>
                </div>
                <div className="card-title center-align black-text"><i className="material-icons right"/>
                  <Link to={`/products/${product.id}`}><div><span>{product.name}</span></div>
                  </Link>
                </div>
                <p className="center-align">
                <Link to="/cart">
                  <button
                    type="submit"
                    name="action"
                    onClick={() => {
                      this.props.fetchAddToCart(product)
                    }}
                  ><a className="waves-effect waves-light btn"><i className="material-icons">shopping_cart</i> Add to cart</a></button>
                </Link></p>
              </div>
            </div>
          ))}
        </div>
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
      dispatch(fetchCategory(gender))
    },
    fetchAddToCart: product => dispatch(fetchAddToCart(product))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
)
