import React, {Component} from 'react'
import axios from 'axios'

export default class Cards extends Component {
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
        key: 'pk_test_DkM3NlMql92QieNJkm1PjQbL',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: token => {
          this.setState({loading: true})
          // use fetch or some other AJAX library here if you dont want to use axios
          axios.post('/api/payment', {
            stripeToken: token.id
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