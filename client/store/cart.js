import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */
const cart = []

/**
 * ACTION CREATORS
 */
const addProduct = cart => ({type: ADD_PRODUCT, cart})

/**
 * THUNK CREATORS
 */

export const fetchAddToCart = id => async dispatch => {
  try {
    const res = await axios.post(`/api/products/cart`, id)
    dispatch(addProduct(res.data || cart))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = cart, action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      return [...state, action.cart]
    }
    default:
      return state
  }
}
