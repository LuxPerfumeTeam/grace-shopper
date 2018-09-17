import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const EDIT_PRODUCTS = 'EDIT_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
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

const addProducts = product => {
  return {
    type: ADD_PRODUCTS,
    product
  }
}

const editProducts = product => {
  return {
    type: EDIT_PRODUCTS,
    product
  }
}

const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
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

export const addNewProduct = product => async dispatch => {
  try {
    const res = await axios.post('/api/products', product)
    dispatch(addProducts(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteAProduct = productId => {
  return async dispatch => {
    const {data} = await axios.delete(`/api/products/${productId}`)
    const action = deleteProduct(data)
    dispatch(action)
  }
}

// export const editProduct = (product) => async dispatch => {
//   try {
//     const products = await axios.put(`/api/products/${product.id}`, product)
//     dispatch(editProducts(products.data || defaultProducts))
//   } catch (error) {
//     console.error(error)
//   }
// }

//Reducer
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCTS: {
      return [...state, action.product]
    }
    // case EDIT_PRODUCTS: {
    //   return state.map(item => {
    //     if (item.id === action.products.id) {
    //       return action.product
    //     }
    //     return item
    //   })
    // }
    case DELETE_PRODUCT:
      //filter, get an array that contains everything BUT deleted product, set that array on state
      return state.filter(x => x.id === action.product.id)
    default:
      return state
  }
}
