import React from 'react'
import '../css/about-contact.css'

export default function About() {
  return (
    <div className="page-container">
      <h2>Sobre nosotros</h2>
      <p>
        StockIA es un sistema de gestión de inventario diseñado para ayudarte a llevar un
        control preciso de tus productos y categorías. Nuestro objetivo es brindar a
        emprendedores y empresas una herramienta intuitiva, segura y accesible para manejar
        su inventario con facilidad.
      </p>
      <p>
        Con StockIA puedes visualizar tu inventario, monitorear productos recientes,
        y obtener estadísticas claras sobre tu operación.
      </p>
    </div>
  )
}

// src/App.jsx (agregar ruta)
import About from './pages/About'

<Route path="/about" element={<About />} />