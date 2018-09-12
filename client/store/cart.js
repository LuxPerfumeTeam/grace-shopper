import axios from 'axios'

//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
//delete one Chanel No. 5
const DELETE_ITEMS = 'DELETE_ITEMS'
//delete all Chanel No. 5
const CLEAR_CART = 'CLEAR_CART'
//empty cart

//INITIAL STATE
const cart = []
//ACTION CREATORS
export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}
export function getCart(cart) {
  return {
    type: GET_CART,
    cart
  }
}

export function deleteItem(product) {
  return {
    type: DELETE_ITEM,
    product
  }
}

export function clearCart(cart) {
  return {
    type: CLEAR_CART,
    cart
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

export const removeFromCart = product => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/${product.id}`)
    const removed = response.data
    const action = deleteItem(removed)
    dispatch(action)
  }
}

export const clearAll = () => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/`)
    const removed = response.data
    const action = clearCart(removed)
    dispatch(action)
  }
}

export default function(state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    case GET_CART:
      return state
    case DELETE_ITEM:
      return state.filter(product => product.id !== action.product.id)
    case CLEAR_CART:
      return cart

    default:
      return state
  }
}
