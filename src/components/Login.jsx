import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import Header from './Header'
import Footer from './Footer'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [msgColor, setMsgColor] = useState('red')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('https://stock-ia.duckdns.org/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (res.ok && data?.data?.token) {
        localStorage.setItem('token', data.data.token)
        setMsgColor('green')
        setMessage(data.message || 'Inicio de sesión exitoso.')
        setTimeout(() => navigate('/dashboard'), 1000)
        return
      }

      if (data.message?.toLowerCase().includes('pendiente por confirmar')) {
        navigate('/confirmar-token?unconfirmed=true')
        return
      }

      setMessage(data.message || 'Credenciales incorrectas.')
    } catch {
      setMessage('Error al conectar con el servidor.')
    }
  }

  return (
    <>
      <Header />
      <div className="container modern-login">
        <div className="left-panel">
          <div className="logo-container">
            <img src={logo} alt="Logo StockIA" />
            <h2>Bienvenido a <span>StockIA</span></h2>
            <p>Administra tu inventario fácilmente.<br />Descarga nuestra APK o inicia sesión para más opciones.</p>
            <a href="/downloads/stockia.apk" className="download-btn" download>Descargar APK</a>
          </div>
        </div>
        <div className="right-panel">
          <div className="form-box">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <div className="button-group">
                <button type="submit">Iniciar sesión</button>
                <Link to="/register" className="secondary-btn">Registrarse</Link>
              </div>
              <div className="forgot-link">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              </div>
              {message && (
                <p style={{ color: msgColor, marginTop: '1rem' }}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
