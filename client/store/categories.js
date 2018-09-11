import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const categories = []

/**
 * ACTION CREATORS
 */
const getCategories = category => ({type: GET_CATEGORIES, category})

/**
 * THUNK CREATORS
 */
export const fetchCategory = gender => async dispatch => {
  try {
    const res = await axios.get(`/api/products/category/${gender}`)
    dispatch(getCategories(res.data || categories))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = categories, action) {
  switch (action.type) {
    case GET_CATEGORIES: {
      return action.category
    }

    default:
      return state
  }
}
