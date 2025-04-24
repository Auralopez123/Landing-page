// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chart from 'chart.js/auto'
import '../css/dashboard-styles.css'

export default function Dashboard() {
  const [section, setSection] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  // Verificar autenticación y cargar datos
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    async function fetchData() {
      try {
        const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        const [userRes, prodRes, catRes] = await Promise.all([
          fetch('http://173.212.224.226:3000/users/profile', { headers }),
          fetch('http://173.212.224.226:3000/products', { headers }),
          fetch('http://173.212.224.226:3000/categories', { headers })
        ])
        const userData = await userRes.json()
        const prodData = await prodRes.json()
        const catData = await catRes.json()
        setUser(userData.data)
        setProducts(prodData.data || [])
        setCategories(catData.data || [])
      } catch (err) {
        console.error('Error al cargar datos del dashboard:', err)
      }
    }
    fetchData()
  }, [navigate])

  // Renderizar gráficos una vez que haya datos
  useEffect(() => {
    if (!products.length || !categories.length) return

    // Inventario por categoría
    const invCtx = document.getElementById('inventoryChart')
    if (invCtx) {
      new Chart(invCtx, {
        type: 'bar',
        data: {
          labels: (() => {
            const map = {}
            categories.forEach(c => { map[c.id] = c.name })
            const grouped = {}
            products.forEach(p => {
              const name = map[p.categoryId] || 'Sin categoría'
              grouped[name] = (grouped[name] || 0) + (p.quantity || 0)
            })
            return Object.keys(grouped)
          })(),
          datasets: [{
            label: 'Inventario por categoría',
            data: (() => {
              const map = {}
              categories.forEach(c => { map[c.id] = c.name })
              const grouped = {}
              products.forEach(p => {
                const name = map[p.categoryId] || 'Sin categoría'
                grouped[name] = (grouped[name] || 0) + (p.quantity || 0)
              })
              return Object.values(grouped)
            })()
          }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
      })
    }

    // Últimos productos agregados
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

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="dashboard-page" style={{ display: 'flex' }}>
      <div className="sidebar">
        <h2>StockIA</h2>
        <a href="#" onClick={() => setSection('dashboard')}>Dashboard</a>
        <a href="#" onClick={() => setSection('products')}>Productos</a>
        <a href="#" onClick={() => setSection('categories')}>Categorías</a>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <h1>
            {section === 'dashboard'
              ? 'Dashboard'
              : section === 'products'
              ? 'Productos'
              : 'Categorías'}
          </h1>
          <button className="logout-btn" onClick={logout}>
            Cerrar sesión
          </button>
        </header>

        {section === 'dashboard' && (
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
        )}

        {section === 'products' && (
          <section id="productsSection">
            <h2>Listado de Productos</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Cantidad</th>
                  <th>Creado</th>
                </tr>
              </thead>
              <tbody id="productsTable">
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>
                      {categories.find(c => c.id === p.categoryId)?.name || 'Sin categoría'}
                    </td>
                    <td>{p.quantity}</td>
                    <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {section === 'categories' && (
          <section id="categoriesSection">
            <h2>Listado de Categorías</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Creado</th>
                </tr>
              </thead>
              <tbody id="categoriesTable">
                {categories.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

      </div>

    </div>
  )
}
