//create a homepage eventully
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Materialize from 'materialize-css'

export default class Homepage extends Component {
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => {
      let elems = document.querySelectorAll('.carousel')
      let instances = Materialize.Carousel.init(elems, {
        numVisible: 3
      })
      // let carousel = instances[0]
      setInterval(() => {
        // carousel.next()
      }, 4000)
    })
  }
  render() {
    return (
      <div id="carousel" className="carousel-slider center">
        <div className="carousel-fixed-item center">
          <Link
            to="/products"
            className="btn waves-effect white grey-text darken-text-2"
          >
            Shop Now
          </Link>
          <div className="carousel">
            <a className="carousel-item" href="#one!">
              <img src="perfume1.jpg" />
            </a>
            <a className="carousel-item" href="#two!">
              <img src="perfume2.jpg" />
            </a>
            <a className="carousel-item" href="#three!">
              <img src="perfume3.jpg" />
            </a>
            <a className="carousel-item" href="#four!">
              <img src="perfume4.jpg" />
            </a>
            <a className="carousel-item" href="#five!">
              <img src="perfume5.jpg" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}
