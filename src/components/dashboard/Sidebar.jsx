import React from 'react'
import PropTypes from 'prop-types';

export default function Sidebar({ setSection }) {
  return (
    <div className="sidebar">
      <h2>StockIA</h2>
      <button onClick={() => setSection('dashboard')}>Dashboard</button>
      <button onClick={() => setSection('products')}>Productos</button>
      <button onClick={() => setSection('categories')}>Categorías</button>
      <a href="/downloads/stockia.apk" className="download-btn" download>Descargar APK</a>

    </div>
  )
}

Sidebar.propTypes = {
  setSection: PropTypes.func.isRequired
};
