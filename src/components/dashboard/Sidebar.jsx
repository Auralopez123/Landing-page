import React from 'react'
import PropTypes from 'prop-types';

export default function Sidebar({ setSection }) {
  return (
    <div className="sidebar">
      <h2>StockIA</h2>
      <a href="#" onClick={() => setSection('dashboard')}>Dashboard</a>
      <a href="#" onClick={() => setSection('products')}>Productos</a>
      <a href="#" onClick={() => setSection('categories')}>Categorías</a>
      <a href="/downloads/stockia.apk" className="download-btn" download>Descargar APK</a>

    </div>
  )
}

Sidebar.propTypes = {
  setSection: PropTypes.func.isRequired
};
