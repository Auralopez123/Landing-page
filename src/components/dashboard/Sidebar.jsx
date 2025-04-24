import React from 'react'

export default function Sidebar({ setSection }) {
  return (
    <div className="sidebar">
      <h2>StockIA</h2>
      <a href="#" onClick={() => setSection('dashboard')}>Dashboard</a>
      <a href="#" onClick={() => setSection('products')}>Productos</a>
      <a href="#" onClick={() => setSection('categories')}>Categorías</a>
    </div>
  )
}
