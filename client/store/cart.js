//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const DELETE_FROM_CART = 'DELETE_CART'

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
function deleteFromCart(id) {
  return {
    type: DELETE_FROM_CART,
    id
  }
}
//THUNK

export const fetchDeleteFromCart = id => {
  return dispatch => {
    // console.log('what is this', JSON.parse(localStorage.removeItem(`${id}`)))
    localStorage.removeItem(`${id}`)

    const action = deleteFromCart(id)
    dispatch(action)
  }
}
export const fetchAddToCart = product => {
  return dispatch => {
    const id = product.id
    if (typeof Number(id) === 'number') {
      localStorage.setItem(`${id}`, JSON.stringify(product))
      const addedProduct = JSON.parse(localStorage.getItem(`${id}`))

      const action = addToCart(addedProduct)
      dispatch(action)
    }
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
      console.log('i am in add to cart thunk')
      console.log('state', state)
      console.log('Action.Product', action.product)
      state.items = [...state, action.product]
      console.log('state', state)
    case GET_CART:
      return action.items
    case CLEAR_CART:
      return cart
    case DELETE_FROM_CART:
      return state.filter(each => each.id !== action.id)
    default:
      return state
  }
}
