//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const CLEAR_CART = 'CLEAR_CART'
//empty cart

//INITIAL STATE
const cart = {
  items: [],
  total: 0
}

//ACTION CREATORS
function addToCart(product) {
  return {
    type: ADD_TO_CART,
    product
  }
}
function getCart(items) {
  return {
    type: GET_CART,
    items
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
export const fetchAddToCart = product => {
  return dispatch => {
    localStorage.setItem('product', JSON.stringify(product))
    const addedProduct = JSON.parse(localStorage.getItem('product'))
    const action = addToCart(addedProduct)
    dispatch(action)
  }
}

export const fetchCart = () => {
  return dispatch => {
    const arrayOfItems = Object.keys(localStorage)
    const items = JSON.parse(localStorage.getItem('product'))
    console.log('what is this?', JSON.parse(localStorage.getItem('product')))
    const action = getCart(items)
    dispatch(action)
  }
}

export const fetchDeleteProduct = id => {
  return dispatch => {
    const items = JSON.parse(localStorage.getItem('product'))
    console.log('what is cart list?', cartList)
    const deleted = JSON.parse(localStorage.removeItem('product'))
    const action = deleteProduct(deleted)
    dispatch(action)
  }
}

export const clearAll = () => {
  return dispatch => {
    localStorage.clear()
    dispatch(clearCart())
  }
}

export default function(state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, items: [...state.items, action.product]}
    // case GET_CART:
    //   return [...state.itemsaction.items
    case DELETE_PRODUCT:
      return action.product
    case CLEAR_CART:
      return cart
    default:
      return state
  }
}
