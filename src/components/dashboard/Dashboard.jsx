import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import Sidebar from './Sidebar'
import DashboardSection from './DashboardSection'
import ProductsSection from './ProductsSection'
import CategoriesSection from './CategoriesSection'
import '../../css/dashboard-styles.css';

export default function Dashboard() {
  const [section, setSection] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const navigate = useNavigate()

  const filteredProducts = [...products]
    .filter(p => p.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      if (sortBy === 'quantity') {
        return parseFloat(b.quantity) - parseFloat(a.quantity)
      } else if (sortBy === 'price') {
        return parseFloat(b.unit_price) - parseFloat(a.unit_price)
      } else {
        return a.name.localeCompare(b.name)
      }
    })

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
          fetch('https://stock-ia.duckdns.org/users/profile', { headers }),
          fetch('https://stock-ia.duckdns.org/products', { headers }),
          fetch('https://stock-ia.duckdns.org/categories', { headers })
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

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <Header />
      <div className="dashboard-page" style={{ display: 'flex' }}>
        <Sidebar setSection={setSection} />
        <div className="main-content">
          <header className="dashboard-header">
            <h1>{
              section === 'dashboard' ? 'Dashboard' :
              section === 'products' ? 'Productos' :
              'Categorías'
            }</h1>
            <button className="logout-btn" onClick={logout}>Cerrar sesión</button>
          </header>

          {section === 'dashboard' && (
            <DashboardSection user={user} products={products} categories={categories} />
          )}

          {section === 'products' && (
            <ProductsSection
              products={filteredProducts}
              categories={categories}
              setSearchTerm={setSearchTerm}
              setSortBy={setSortBy}
            />
          )}

          {section === 'categories' && (
            <CategoriesSection categories={categories} products={products} />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
