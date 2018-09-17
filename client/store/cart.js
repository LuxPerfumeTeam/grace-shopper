//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'

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

//THUNK
export const fetchAddToCart = product => {
  return dispatch => {
    const id = product.id
    localStorage.setItem(`${id}`, JSON.stringify(product))
    const addedProduct = JSON.parse(localStorage.getItem(`${id}`))

    const action = addToCart(addedProduct)
    dispatch(action)
  }
}

export const fetchCart = () => {
  return dispatch => {
    const arrOfId = Object.keys(localStorage)
    const uniqueArrId = arrOfId.filter(function(item, pos, self) {
      return self.indexOf(item) === pos
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
  return dispatch => {
    localStorage.clear()
    dispatch(clearCart())
  }
}

export default function(state = cart, action) {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('STATE ?? =>', state, 'Action.Product => ', action.product)
      state.items = [...state.items, action.product]
      return state
    case GET_CART:
      return action.items
    case CLEAR_CART:
      return cart
    default:
      return state
  }
}
