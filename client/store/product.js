import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

//initial state
const defaultProducts = []

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
    dispatch(getProducts(products.data || defaultProducts))
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
