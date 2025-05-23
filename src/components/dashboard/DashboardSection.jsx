import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import PropTypes from 'prop-types'

export default function DashboardSection({ user, products, categories }) {
  useEffect(() => {
    if (!products.length || !categories.length) return

    const invCtx = document.getElementById('inventoryChart')
    let inventoryChart = null
    if (invCtx) {
      const map = {}
      categories.forEach(c => { map[c.id] = c.name })
      const grouped = {}
      products.forEach(p => {
        const name = map[p.category_id] || 'Sin categoría'
        grouped[name] = (grouped[name] || 0) + parseFloat(p.quantity || 0)
      })
      inventoryChart = new Chart(invCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(grouped),
          datasets: [{
            label: 'Inventario por categoría',
            data: Object.values(grouped)
          }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      })
    }

    const recentCtx = document.getElementById('recentProductsChart')
    let recentProductsChart = null
    if (recentCtx) {
      const recent = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
      recentProductsChart = new Chart(recentCtx, {
        type: 'bar',
        data: {
          labels: recent.map(p => p.name),
          datasets: [{ label: 'Últimos productos agregados', data: recent.map(p => p.quantity) }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      })
    }

    return () => {
      if (inventoryChart) {
        inventoryChart.destroy()
      }
      if (recentProductsChart) {
        recentProductsChart.destroy()
      }
    }
  }, [products, categories])

  return (
    <section id="dashboardSection">
      <div className="dashboard-cards">
        <div className="card">
          <h3>Productos</h3>
          <p><strong>{products.length}</strong></p>
        </div>
        <div className="card">
          <h3>Categorías</h3>
          <p><strong>{categories.length}</strong></p>
        </div>
        <div className="card">
          <h3>Usuario</h3>
          <p><strong>{user?.email || '--'}</strong></p>
        </div>
      </div>

      <h2>Inventario</h2>
      <canvas id="inventoryChart" height="120"></canvas>

      <h2>Productos recientes</h2>
      <canvas id="recentProductsChart" height="120"></canvas>
    </section>
  )
}

DashboardSection.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string
  }),
  products: PropTypes.arrayOf(PropTypes.shape({
    category_id: PropTypes.any,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdAt: PropTypes.string,
    name: PropTypes.string
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
} 