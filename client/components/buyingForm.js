import React, {Component} from 'react'
// import Stripe from './stripe'
import {clearAll} from '../store/cart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchAddUser} from '../store/user'

function validate(firstName, lastName, address, city, state, zipcode) {
  const errors = []
  if (firstName.length === 0) {
    errors.push('Oops! Your name is empty!')
  }
  if (lastName.length === 0) {
    errors.push('Oops! Your last name is empty!')
  }
  if (address.length === 0) {
    errors.push('Oops! Address is empty!')
  }
  if (city.length === 0) {
    errors.push('Oops! City is empty!')
  }
  if (state.length === 0) {
    errors.push('Oops! State is empty!')
  }
  if (typeof zipcode !== 'number' && zipcode.length < 3) {
    errors.push('Oops! Zipcode is not entered correctly')
  }

  return errors
}

class BuyingForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      email: '',
      errors: []
    }
    // this.sendUser = this.sendUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      zipcode,
      phone
    } = this.state
    const errors = validate(
      firstName,
      lastName,
      address,
      city,
      state,
      zipcode,
      phone
    )
    if (errors.length > 0) {
      this.setState({errors})
    } else {
      this.props.fetchAddUser(this.state)
      this.props.clearCart()
      this.props.history.push('/stripe')
    }
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    const {errors} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.map(error => <p key={error}>Error: {error}</p>)}
        <div>
          <label>First Name</label>
          <div>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Last Name </label>
          <div>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>City </label>
          <div>
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>State</label>
          <div>
            <input
              type="text"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Zipcode</label>
          <div>
            <input
              type="text"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Phone</label>
          <div>
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div>
          <label>Email</label>
          <div>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
        </div>
        {/* <Stripe /> */}

        <button color="primary" size="lg" type="submit">
          Complete Payment
        </button>
      </form>
    )
  }
}
//once complete payment, send the info to another thunk that posts to user api route to create a user/ guest(need if else statement for password)
const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearAll()),
    fetchAddUser: user => dispatch(fetchAddUser(user))
  }
}

module.exports = withRouter(connect(null, mapDispatchToProps)(BuyingForm))
