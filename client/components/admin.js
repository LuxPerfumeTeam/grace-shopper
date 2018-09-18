import React, {Component} from 'react'
import {connect} from 'react-redux'

class Admin extends Component {
  render() {
    const name = this.props.firstName
    const lastName = this.props.lastName
    return (
      <div>
        <h3>Welcome {name + ' ' + lastName}</h3>
        <p>Admin Dashboard </p>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName
})

export default connect(mapStateToProps, null)(Admin)
