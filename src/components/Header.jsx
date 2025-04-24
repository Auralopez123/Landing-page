import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import './Header.css'

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo StockIA" className="logo" />
          <span className="brand-name">StockIA</span>
        </Link>
      </div>
      <div className="header-right">
        <Link to="/about">Sobre nosotros</Link>
        <Link to="/contact">Contáctanos</Link>
      </div>
    </header>
  )
}







