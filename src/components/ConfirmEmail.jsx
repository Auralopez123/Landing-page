import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function ConfirmEmail() {
  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const [msgColor, setMsgColor] = useState('red')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) setToken(tokenParam)

    if (searchParams.get('unconfirmed') === 'true') {
      alert('Tu cuenta necesita ser confirmada. Ingresa el token que te enviamos por correo.')
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://stock-ia.duckdns.org/users/confirm-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Cuenta confirmada con éxito. Ya puedes iniciar sesión.')
        setMsgColor('green')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setMessage(data.message || 'Token inválido o expirado.')
        setMsgColor('red')
      }
    } catch (err) {
      console.error(err)
      setMessage('Error al conectar con el servidor.')
      setMsgColor('red')
    }
  }

  return (
    <div className="container modern-login">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo StockIA" />
          <h2>Confirmar correo electrónico</h2>
          <p>Ingresa el código que recibiste por correo para activar tu cuenta.</p>
        </div>
      </div>
      <div className="right-panel">
        <div className="form-box">
          <h2>Verifica tu cuenta</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Token de confirmación"
              value={token}
              onChange={e => setToken(e.target.value)}
              required
            />
            <button type="submit" className="button-group-button">Confirmar correo</button>
          </form>
          {message && <p style={{ color: msgColor, marginTop: '1rem' }}>{message}</p>}
          <Link to="/login" className="secondary-btn volver-link" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
