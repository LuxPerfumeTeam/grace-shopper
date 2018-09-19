//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const DELETE_FROM_CART = 'DELETE_CART'
const DELETE_ONE_FROM_CART = 'DELETE_ONE_FROM_CART'
//empty cart

//INITIAL STATE
const cart = {
  items: []
  // total: 0
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

function clearCart() {
  return {
    type: CLEAR_CART
  }
}

function deleteOneFromCart(product) {
  return {
    type: DELETE_ONE_FROM_CART,
    product
  }
}
function deleteFromCart(id) {
  return {
    type: DELETE_FROM_CART,
    id
  }
}
//THUNK

export const fetchDeleteOneFromCart = product => {
  //console.log('local storage', localStorage.getItem(1))
  return dispatch => {
    const id = product.id
    if (typeof Number(id) === 'number') {
      const localStorageObj = JSON.parse(localStorage.getItem(id))
      if (localStorageObj && localStorageObj.id) {
        localStorageObj.quantity--
      }

      const action = deleteOneFromCart(product)
      dispatch(action)
    }
  }
}
export const fetchDeleteFromCart = id => {
  return dispatch => {
    localStorage.removeItem(`${id}`)
    console.log('localStorage', localStorage.getItem(id))

    const action = deleteFromCart(id)
    dispatch(action)
  }
}

export const fetchAddToCart = product => {
  return dispatch => {
    const id = product.id
    if (typeof Number(id) === 'number') {
      const localStorageObj = JSON.parse(localStorage.getItem(id))
      if (localStorageObj && localStorageObj.id) {
        localStorageObj.quantity++
      }

      localStorage.setItem(`${id}`, JSON.stringify(product))
      //const addedProduct = JSON.parse(localStorage.getItem(`${id}`))
      console.log('local storage object', localStorage.getItem(id))
      console.log('local storage', localStorage)
      const action = addToCart(product)
      dispatch(action)
    }
  }
}

export const fetchCart = () => {
  return dispatch => {
    const arrOfId = Object.keys(localStorage)
    const uniqueArrId = arrOfId.filter(function(item, pos, self) {
      return self.indexOf(item) === pos && item.length < 3
    })
    console.log(arrOfId)
    const arrOfProducts = uniqueArrId.map(each => {
      let value = localStorage[each]
      return JSON.parse(value)
    })
    const action = getCart(arrOfProducts)
    dispatch(action)
  }
}

export const clearAll = () => {
  localStorage.clear()
  console.log(Object.keys(localStorage))
  return dispatch => {
    dispatch(fetchCart())
  }
}

export default function(state = cart.items, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const stateCopy = [...state]
      for (let i = 0; i < stateCopy.length; ++i) {
        if (stateCopy[i].id === action.product.id) {
          stateCopy[i].quantity += 1

          return stateCopy
        }
      }
      return [...state, action.product]
    }
    case GET_CART:
      return action.items
    case CLEAR_CART:
      return cart
    case DELETE_FROM_CART:
      return state.filter(each => each.id !== action.id)
    case DELETE_ONE_FROM_CART:
      for (let i = 0; i < state.length; ++i) {
        if (state[i].id === action.product.id) {
          state[i].quantity--
        }
      }
      return state.filter(each => each.quantity > 0)
    default:
      return state
  }
}
