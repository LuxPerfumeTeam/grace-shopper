import React, {Component} from 'react'
import axios from 'axios'
import {clearAll} from '../store/cart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Stripe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      stripeLoading: true
    }
    // onStripeUpdate must be bound or else clicking on button will produce error.
    this.onStripeUpdate = this.onStripeUpdate.bind(this)
    // binding loadStripe as a best practice, not doing so does not seem to cause error.
    this.loadStripe = this.loadStripe.bind(this)
  }

  loadStripe(onload) {
    if (!window.StripeCheckout) {
      const script = document.createElement('script')
      script.onload = function() {
        console.info('Stripe script loaded')
        onload()
      }
      script.src = 'https://checkout.stripe.com/checkout.js'
      document.head.appendChild(script)
    } else {
      onload()
    }
  }

  componentDidMount() {
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: async token => {
          console.log('token', token.id)
          this.setState({loading: true})
          // use fetch or some other AJAX library here if you dont want to use axios
          await axios.put('/api/stripe', {
            stripeToken: token
          })
        }
      })

      this.setState({
        stripeLoading: false,
        // loading needs to be explicitly set false so component will render in 'loaded' state.
        loading: false
      })
    })
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close()
    }
  }

  onStripeUpdate(e) {
    this.stripeHandler.open({
      name: 'test',
      description: 'widget',
      panelLabel: 'Pay Total',
      allowRememberMe: false
    })
    e.preventDefault()
    this.props.clearCart()
  }

  render() {
    const {stripeLoading, loading} = this.state
    return (
      <div>
        {loading || stripeLoading ? (
          <p>finished!</p>
        ) : (
          <button type="button" onClick={this.onStripeUpdate}>
            Pay Total
          </button>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearAll())
  }
}

module.exports = withRouter(connect(null, mapDispatchToProps)(Stripe))
