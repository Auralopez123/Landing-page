import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import '../../css/nosotros.css'
import equipo from '../../assets/equipo.jpg'

export default function About() {
  return (
    <div className="page-container">
      <Header />
      <div className="about-content compact-layout">
        <div className="about-text">
          <h1>¿Quienes somos?</h1>
          <p>
            En StockIA nos hemos propuesto simplificar la gestión de inventarios para que las
            empresas puedan enfocarse en crecer. Enseñamos a las organizaciones a aprovechar
            el poder de los datos en sus procesos de abastecimiento, logística y venta.
          </p>
          <p>
            ¡Sabes qué? Este trabajo es importante porque impacta a cientos de negocios.
            Creemos que la vida es un poco mejor cuando las experiencias del cliente, como
            gestionar sus productos o acceder a información clave, son fluidas y fáciles.
          </p>
        </div>
        <div className="about-image small-image">
          <img src={equipo} alt="Equipo StockIA" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

