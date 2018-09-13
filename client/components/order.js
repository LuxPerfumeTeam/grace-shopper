import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchCart} from '../store/cart'

class Order extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    console.log('props', this.props)
    return 'in order component'
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

const mapStateToProps = state => {
  return {
    order: state.cart
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order))
