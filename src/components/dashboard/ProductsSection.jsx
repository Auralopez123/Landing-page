// src/components/dashboard/ProductsSection.jsx
import React, { useState } from 'react'
import { FaSort } from 'react-icons/fa'

export default function ProductsSection({ products, categories, setSearchTerm, setSortBy }) {
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (field) => {
    const direction = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(direction)
    setSortBy(`${field}:${direction}`)
  }

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = sortField === 'price' ? parseFloat(a.unit_price) : parseFloat(a[sortField])
    const bValue = sortField === 'price' ? parseFloat(b.unit_price) : parseFloat(b[sortField])
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
  })

  const renderSortIcon = (field) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <FaSort
        style={{
          marginLeft: '4px',
          transform: sortField === field && sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s',
          opacity: sortField === field ? 1 : 0.5,
          fontSize: '12px'
        }}
      />
    </span>
  )

  return (
    <section id="productsSection">
      <h2>Listado de Productos</h2>

      <div className="product-controls">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th onClick={() => handleSort('quantity')} style={{ cursor: 'pointer' }}>
              Cantidad {renderSortIcon('quantity')}
            </th>
            <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
              Precio por unidad {renderSortIcon('price')}
            </th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(p => (
            <tr key={p.id}>
              <td>
                <img
                  src={
                    p.image_url
                      ? `hhttps://stock-ia.duckdns.org${p.image_url}`
                      : 'src/assets/no_image.jpg'
                  }
                  alt={p.name}
                  className="product-image"
                />
              </td>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>${parseFloat(p.unit_price).toFixed(2)}</td>
              <td>{categories.find(c => c.id === p.category_id)?.name || 'Sin categoría'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
