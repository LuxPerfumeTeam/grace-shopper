import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
//change to store/set... in store

//initial state
const defaultProducts = []

/*
  defaultProducts = {
    all: [],
    selected: {},
    isLoading: false,
  }
*/

//ACTION CREATOR
const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

//THUNK
export const fetchProducts = () => async dispatch => {
  try {
    const products = await axios.get('/api/products')
    dispatch(getProducts(products.data || defaultProducts)) //not needed for defaultProducts
  } catch (error) {
    console.error(error)
  }
}

//Reducer
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products

    default:
      return state
  }
}
