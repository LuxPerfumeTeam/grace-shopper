import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class AllProducts extends Component {
  render() {
    const products = this.props.products

    return (
      <div>
        <h3>Perfume</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image} />
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      //   <h1>No perfumes available</h1>
    )
  }
}
export default AllProducts
