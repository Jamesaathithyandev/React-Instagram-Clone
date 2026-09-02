import React from 'react'
import { Link } from 'react-router-dom'
import products from '../components/product'

function Home() {
  return (
    <div className="home-hero">
      <div className="home-heading">
        <h1>Welcome to ShopStore</h1>
        <p className="home-subheading">Your one-stop shop for all your needs</p>
      </div>
      <div className="home-container">
        <div className="container-name">
          <h2>Our Products</h2>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="product-price">${(product.price / 100).toFixed(2)}</p>

              <div className="btns">
                <Link to="/checkout" className="btn btn-primary">
                  View Details
                </Link>
                <button type="button" className="btn btn-secondary">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home