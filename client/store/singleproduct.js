import axios from 'axios'

//ACTION TYPES
const SELECT_PRODUCT = 'SELECT_PRODUCT'

//INITIAL STATE
const selectedProduct = {}

//ACTION CREATOR
const selectProduct = product => {
  return {
    type: SELECT_PRODUCT,
    product
  }
}

//THUNK
export const fetchSingleProduct = id => async dispatch => {
  try {
    const product = await axios.get(`/api/products/${id}`)
    dispatch(selectProduct(product.data))
  } catch (error) {
    console.error(error)
  }
}

//Reducer
export default function(state = selectedProduct, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.product

    default:
      return state
  }
}
