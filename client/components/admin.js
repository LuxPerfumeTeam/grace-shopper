import React, {Component} from 'react'
// import {connect} from 'react-redux'
import AdminCategoryForm from './adminCategoryForm'
import AdminProductForm from './adminProductForm '

export default class Admin extends Component {
  // componentDidMount() {
  //   this.props.fetchOrders()
  // }
  render() {
    return (
      <div>
        <h3>Welcome Admin</h3>
        <h3> Add a New Category </h3>
        <AdminCategoryForm />

        <h3> Add a New Product </h3>
        <AdminProductForm />

        <h3> My Orders: </h3>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = dispatch => ({})

// export default connect(mapStateToProps)(Admin)
