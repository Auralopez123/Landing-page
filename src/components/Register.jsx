import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })
  const [match, setMatch] = useState(false)
  const [registerMessage, setRegisterMessage] = useState('')
  const [msgColor, setMsgColor] = useState('red')
  const [tokenVisible, setTokenVisible] = useState(false)
  const [tokenInput, setTokenInput] = useState('')
  const [tokenMessage, setTokenMessage] = useState('')

  // Validate password requirements and match
  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password)
    })
    setMatch(password !== '' && password === confirmPassword)
  }, [password, confirmPassword])

  const handleRegister = async e => {
    e.preventDefault()
    if (!match) {
      setRegisterMessage('Las contraseñas no coinciden.')
      setMsgColor('red')
      return
    }

    try {
      const res = await fetch('https://stock-ia.duckdns.org/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          companyName,
          phone,
          email,
          password,
          confirmPassword
        })
      })
      const data = await res.json()

      if (res.ok) {
        setRegisterMessage('Registro exitoso. Revisa tu correo para confirmar.')
        setMsgColor('green')
        setTokenVisible(true)
      } else {
        setRegisterMessage(data.message || 'Error en el registro.')
        setMsgColor('red')
      }
    } catch (err) {
      console.error(err)
      setRegisterMessage('Error al conectar con el servidor.')
      setMsgColor('red')
    }
  }

  const handleConfirm = async () => {
    try {
      const res = await fetch('https://stock-ia.duckdns.org/users/confirm-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenInput })
      })
      const data = await res.json()
      if (res.ok) {
        setTokenMessage('Token confirmado. Ya puedes iniciar sesión.')
        setMsgColor('green')
      } else {
        setTokenMessage(data.message || 'Token inválido o expirado.')
        setMsgColor('red')
      }
    } catch (err) {
      console.error(err)
      setTokenMessage('Error al conectar con el servidor.')
      setMsgColor('red')
    }
  }

  return (
    <div className="container modern-login">
      <div className="left-panel">
        <div className="logo-container">
          <img src={logo} alt="Logo StockIA" />
          <h2>Bienvenido a <span>StockIA</span></h2>
          <p>Administra tu inventario fácilmente.<br/>Descarga nuestra APK o crea tu cuenta para comenzar.</p>
          <a href="/downloads/stockia.apk" className="download-btn" download>Descargar APK</a>
        </div>
      </div>

      <div className="right-panel">
        <div className="form-box">
          <h2>Registro</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nombre de la empresa"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Crear contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />

            <div id="passwordRequirements">
              <p>La contraseña debe contener:</p>
              <ul>
                <li className={requirements.length ? 'valid' : 'invalid'}>Al menos 8 caracteres</li>
                <li className={requirements.uppercase ? 'valid' : 'invalid'}>Una letra mayúscula</li>
                <li className={requirements.lowercase ? 'valid' : 'invalid'}>Una letra minúscula</li>
                <li className={requirements.number ? 'valid' : 'invalid'}>Un número</li>
                <li className={requirements.special ? 'valid' : 'invalid'}>Un carácter especial (!@#$%^&*)</li>
              </ul>
            </div>
            {password && (
              <div id="passwordMatchMessage" className={match ? 'valid' : 'invalid'}>
                {match ? 'Las contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
              </div>
            )}

            <div className="button-group">
              <button type="submit">Registrarse</button>
              <Link to="/login" className="secondary-link">Ya tengo cuenta</Link>
            </div>
            {registerMessage && (
              <p style={{ color: msgColor, marginTop: '1rem' }}>{registerMessage}</p>
            )}
          </form>

          {tokenVisible && (
            <div id="tokenConfirmation" className="token-section">
              <h3>Confirmar registro</h3>
              <input
                type="text"
                placeholder="Introduce el token recibido"
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                required
              />
              <button type="button" onClick={handleConfirm} className="download-btn">
                Confirmar token
              </button>
              {tokenMessage && (
                <p style={{ color: msgColor, marginTop: '0.5rem' }}>{tokenMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
