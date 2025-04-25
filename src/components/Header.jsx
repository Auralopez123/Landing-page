import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '/logo_solo.svg'
import '../css/Header.css'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [location]) // Esto vuelve a verificar si cambia la ruta

  const showConditionalLink = location.pathname === '/about' || location.pathname === '/contact'

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
        <img src={logo} alt="Logo StockIA" className="logo" style={{ filter: 'brightness(0) invert(1)' }} />
        <span className="brand-name">StockIA</span>
        </Link>
      </div>
      <div className="header-right">
      {showConditionalLink && (
          isLoggedIn
            ? <Link to="/dashboard">Dashboard</Link>
            : <Link to="/login">Login</Link>
        )}
        <Link to="/about">Sobre nosotros</Link>
        <Link to="/contact">Contáctanos</Link>
      </div>
    </header>
  )
}
