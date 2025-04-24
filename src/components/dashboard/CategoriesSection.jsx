// src/components/dashboard/CategoriesSection.jsx
import React, { useState } from 'react'
import { FaSort } from 'react-icons/fa'

export default function CategoriesSection({ categories, products }) {
  const [sortField, setSortField] = useState('count')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const countProductsByCategory = (categoryId) => {
    return products.filter(p => p.category_id === categoryId).length
  }

  const handleSort = (field) => {
    const direction = (sortField === field && sortDirection === 'asc') ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(direction)
  }

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

  const filteredAndSortedCategories = [...categories]
    .filter(c => c.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      const countA = countProductsByCategory(a.id)
      const countB = countProductsByCategory(b.id)
      return sortDirection === 'asc' ? countA - countB : countB - countA
    })

  return (
    <section id="categoriesSection">
      <h2>Resumen por Categoría</h2>

      <div className="product-controls">
        <input
          type="text"
          placeholder="Buscar por nombre de categoría..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre de Categoría</th>
            <th onClick={() => handleSort('count')} style={{ cursor: 'pointer', textAlign: 'center' }}>
                Cantidad de Productos {renderSortIcon('count')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedCategories.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{countProductsByCategory(c.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
