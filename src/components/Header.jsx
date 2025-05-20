import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '/logo_solo.svg';
import userIcon from '../assets/iconusuario.png';
import '../css/Header.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setShowMenu(false); // cerrar menú si cambia de ruta
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const showConditionalLink = location.pathname === '/about' || location.pathname === '/contact';

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo StockIA" className="logo" />
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

        {isLoggedIn && (
          <div className="user-profile-container" ref={menuRef}>
            <button className="user-icon-btn" onClick={() => setShowMenu(!showMenu)}>
              <img src={userIcon} alt="Usuario" className="user-icon" />
            </button>
            {showMenu && (
              <div className="profile-dropdown">
                <Link to="/perfil" className="dropdown-item">👤 Ver perfil</Link>
                <button onClick={handleLogout} className="dropdown-item logout-btn">🔓 Cerrar sesión</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}


