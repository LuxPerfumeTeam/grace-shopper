import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const SET_CATEGORIES_TYPE = 'SET_CATEGORIES_TYPE'
const ADD_CATEGORIES = 'ADD_CATEGORIES'

/**
 * INITIAL STATE
 */
const categories = []

/**
 * ACTION CREATORS
 */
const getCategories = category => ({type: GET_CATEGORIES, category})
const setCategoriesType = types => ({type: SET_CATEGORIES_TYPE, types})
const addCategories = category => {
  return {
    type: ADD_CATEGORIES,
    category
  }
}

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

export const addNewCategories = category => async dispatch => {
  try {
    const res = await axios.post(`/api/products/category`, category)
    dispatch(addCategories(res.data))
  } catch (error) {
    console.error(error)
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
    case ADD_CATEGORIES: {
      return [...state, action.category]
    }
    default:
      return state
  }
}
