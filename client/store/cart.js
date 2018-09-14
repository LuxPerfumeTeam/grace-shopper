import axios from 'axios'

//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY'
//delete one Chanel No. 5
const DELETE_PRODUCT = 'DELETE_PRODUCT'
//delete all Chanel No. 5
const CLEAR_CART = 'CLEAR_CART'
//empty cart

//INITIAL STATE
const cart = []

//ACTION CREATORS
function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}
function getCart(cart) {
  return {
    type: GET_CART,
    cart
  }
}

function decrementQuantity(product) {
  return {
    type: DECREMENT_QUANTITY,
    product
  }
}

function deleteProduct(product) {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

function clearCart() {
  return {
    type: CLEAR_CART
  }
}

//THUNK
export const postToCart = product => {
  return async dispatch => {
    const response = await axios.post('/api/cart', product)
    const newProduct = response.data
    const action = addToCart(newProduct)
    dispatch(action)
  }
}

export const fetchCart = () => {
  return async dispatch => {
    const response = await axios.get('/api/cart')
    const items = response.data
    const action = getCart(items)
    dispatch(action)
  }
}

export const fetchDecrementQuantity = product => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/${product.id}`)
    const removed = response.data
    const action = decrementQuantity(removed)
    dispatch(action)
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/${product.id}`)
    const removed = response.data
    const action = deleteProduct(removed)
    dispatch(action)
  }
}

export const clearAll = () => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/`)
    const removed = response.data
    const action = clearCart()
    dispatch(action)
  }
}

export default function(state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    case GET_CART:
      return action.cart
    case DECREMENT_QUANTITY:
      let indPr = state.findIndex(prod => prod.id === action.product.id)
      let currState = state
      if (state[indPr].quantity > 1) {
        currState[indPr].quantity -= 1
      } else currState.splice(indPr, 1)
      return currState
    case DELETE_PRODUCT:
      return [
        ...state,
        {product: state.filter(product => product.id !== action.product.id)}
      ]
    case CLEAR_CART:
      return cart
    default:
      return state
  }
}
