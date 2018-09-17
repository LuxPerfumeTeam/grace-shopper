import React, {Component} from 'react'

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

export default class BuyingForm extends Component {
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
      // this.props.addStudent(this.state)
      // this.props.history.push('/homepage')
    }
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    const {errors} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <script
          src="https://checkout.stripe.com/checkout.js"
          className="stripe-button"
          data-key="pk_test_TYooMQauvdEDq54NiTphI7jx"
          data-amount="999"
          data-name="Stripe.com"
          data-description="Widget"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto"
          data-zip-code="true"
        />
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

        <button color="primary" size="lg" type="submit">
          Pay with Card
        </button>
      </form>
    )
  }
}
