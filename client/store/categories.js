import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const SET_CATEGORIES_TYPE = 'SET_CATEGORIES_TYPE'

/**
 * INITIAL STATE
 */
const categories = []

/**
 * ACTION CREATORS
 */
const getCategories = category => ({type: GET_CATEGORIES, category})
const setCategoriesType = types => ({type: SET_CATEGORIES_TYPE, types})

/**
 * THUNK CREATORS
 */
export const fetchCategory = gender => async dispatch => {
  try {
    const res = await axios.get(`/api/products/category/${gender}`)
    dispatch(getCategories(res.data || categories))
  } catch (err) {
    console.error('hey there is an error with fetchCategory', err)
  }
}

export const fetchCategoryTypes = () => async dispatch => {
  try {
    const res = await axios.get(`/api/products/category`)
    dispatch(setCategoriesType(res.data))
  } catch (err) {
    console.error('hey there is an error with fetchCategory', err)
  }
}

/**
 * REDUCER
 */
export default function(state = categories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.category
    case SET_CATEGORIES_TYPE:
      return action.types
    default:
      return state
  }
}
