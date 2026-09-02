import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'


function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-container">
        <div className="navbar-brand">
            <Link to="/"><img src={logo} alt="ShopStore Logo" /></Link>
        </div>
        <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/checkout">Cart</Link>
        </div>
        <div className="navbar-auth">
            <div className="navbar-auth-links">
            <Link to="/auth" className="btn btn-primary">
                Login
            </Link>
            <Link to="/auth" className="btn btn-secondary">
                Sign Up
            </Link>
            </div>
        </div>
        </div>
    </nav>
  )
}

export default Navbar