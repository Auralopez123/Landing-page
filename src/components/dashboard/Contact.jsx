import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import '../../css/contact.css'
import contactImg from '../../assets/contactenos.jpg'

export default function Contact() {
  return (
    <div className="page-container">
      <Header />

      <div className="page-content">
        <div className="contact-section">
          <div className="contact-info">
            <h2 className="contact-title">
              Para nosotros es muy importante conocer sus opiniones e inquietudes acerca de nuestros servicios.
            </h2>
            <ul className="contact-list">
              <li><i className="fas fa-phone-alt"></i><span><strong>Teléfonos:</strong> (57+8)6715862 – (57+8)6715857, 3204963480</span></li>
              <li><i className="fas fa-envelope"></i><span><strong>Email:</strong> stockia@gmail.com</span></li>
              <li><i className="fas fa-map-marker-alt"></i><span><strong>Dirección:</strong> Calle 40 No. 33 - 64 centro</span></li>
            </ul>
          </div>

          <div className="contact-image">
            <img src={contactImg} alt="Contáctenos" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


