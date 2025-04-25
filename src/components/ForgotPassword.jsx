import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [msgColor, setMsgColor] = useState('red')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://stock-ia.duckdns.org/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()

      if (res.ok) {
        setMessage('Revisa tu correo para continuar el proceso.')
        setMsgColor('green')
        setTimeout(() => navigate('/reset-password'), 2000)
      } else {
        setMessage(data.message || 'Error al enviar correo.')
        setMsgColor('red')
      }
    } catch (err) {
      console.error(err)
      setMessage('Error de conexión.')
      setMsgColor('red')
    }
  }

  return (
    <div className="container modern-login">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo StockIA" />
          <h2>¿Olvidaste tu contraseña?</h2>
          <p>Ingresa tu correo y te enviaremos instrucciones.</p>
        </div>
      </div>
      <div className="right-panel">
        <div className="form-box">
          <h2>Recuperar contraseña</h2>
          <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="button-group-button">Enviar token</button>
          </form>
          {message && <p style={{ color: msgColor, marginTop: '1rem' }}>{message}</p>}
          <Link to="/login" className="secondary-btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}