import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo StockIA" className="logo" />
          <span className="brand-name">StockIA</span>
        </Link>

        <nav className="nav-links">
          <Link to="/about">Sobre nosotros</Link>
        </nav>
      </div>
    </header>
  )
}


