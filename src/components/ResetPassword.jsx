import React, { useState } from 'react'
import {useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.svg'


export default function ResetPassword() {
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [msgColor, setMsgColor] = useState('red')
  const navigate = useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.')
      setMsgColor('red')
      return
    }

    try {
      const res = await fetch('https://stock-ia.duckdns.org/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword, confirmNewPassword: confirmPassword })
      })
      const data = await res.json()

      if (res.ok) {
        setMessage('Contraseña restablecida con éxito. Ya puedes iniciar sesión.')
        setMsgColor('green')
        setTimeout(() => navigate('/login'), 2000)

      } else {
        setMessage(data.message || 'Error de validación.')
        setMsgColor('red')
      }
    } catch (err) {
      console.error(err)
      setMessage('Error de conexión con el servidor.')
      setMsgColor('red')
    }
  }

  return (
    <div className="container modern-login">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo StockIA" />
          <h2>Restablecer contraseña</h2>
          <p>Ingresa el token que te enviamos por correo y configura una nueva contraseña.</p>
        </div>
      </div>
      <div className="right-panel">
        <div className="form-box">
          <h2>Nueva contraseña</h2>
          <form onSubmit={handleSubmit}>
          <label htmlFor="token">Código</label>

            <input
              type="text"
              placeholder="Código del correo"
              value={token}
              onChange={e => setToken(e.target.value)}
              required
            />
            
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            
            <label htmlFor="confirm-password">Confirma tu contraseña</label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="button-group-button">Restablecer</button>
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
