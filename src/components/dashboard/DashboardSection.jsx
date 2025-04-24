import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'

export default function DashboardSection({ user, products, categories }) {
  useEffect(() => {
    if (!products.length || !categories.length) return

    const invCtx = document.getElementById('inventoryChart')
    if (invCtx) {
      const map = {}
      categories.forEach(c => { map[c.id] = c.name })
      const grouped = {}
      products.forEach(p => {
        const name = map[p.category_id] || 'Sin categoría'
        grouped[name] = (grouped[name] || 0) + parseFloat(p.quantity || 0)
      })
      new Chart(invCtx, {
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
    if (recentCtx) {
      const recent = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
      new Chart(recentCtx, {
        type: 'bar',
        data: {
          labels: recent.map(p => p.name),
          datasets: [{ label: 'Últimos productos agregados', data: recent.map(p => p.quantity) }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      })
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