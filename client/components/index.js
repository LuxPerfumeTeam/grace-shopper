/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Homepage} from './homepage'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './allProducts'
export {default as SingleProduct} from './singleProducts'
export {default as Cart} from './cart'
export {default as BuyingForm} from './buyingForm'
export {default as Admin} from './admin'
export {default as addProduct} from './adminProductForm '
export {default as addCategory} from './adminCategoryForm'
export {default as Orders} from './adminOrders'
