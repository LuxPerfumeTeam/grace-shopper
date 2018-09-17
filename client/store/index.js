import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import singleproduct from './singleproduct'
import categories from './categories'
import cart from './cart'
import orders from './orders'

const reducer = combineReducers({
  user,
  product,
  singleproduct,
  categories,
  cart,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const initialState = localStorage.state
  ? JSON.parse(localStorage.state)
  : undefined
const store = createStore(reducer, initialState, middleware)
store.subscribe(() => {
  localStorage.state = JSON.stringify(store.getState())
})

export default store
export * from './user'
export * from './categories'
export * from './orders'
