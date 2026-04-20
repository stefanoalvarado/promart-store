import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import { login, obtenerDatosUsuario } from '../services/authService'

const Login = () => {
  const [usuario, setUsuario]           = useState('')
  const [contrasena, setContrasena]     = useState('')
  const [verContrasena, setVerContrasena] = useState(false)
  const [error, setError]               = useState('')
  const [cargando, setCargando]         = useState(false)

  const navigate = useNavigate()

  const validarCampos = () => {
    if (!usuario.trim() && !contrasena.trim()) {
      setError('Por favor ingresa tu usuario y contraseña.')
      return false
    }
    if (!usuario.trim()) {
      setError('Por favor ingresa tu usuario.')
      return false
    }
    if (!contrasena.trim()) {
      setError('Por favor ingresa tu contraseña.')
      return false
    }
    return true
  }


const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  if (!validarCampos()) return

  try {
    setCargando(true)
    await login(usuario, contrasena)
    await obtenerDatosUsuario(usuario)
    navigate('/inicio')
  } catch (err) {
    setError('Usuario o contraseña incorrectos.')
  } finally {
    setCargando(false)
  }
}
  return (
    <div className="login-page">

      <nav className="login-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <span>★</span>
          </div>
          <span className="nav-logo-texto">MI TIENDA</span>
        </div>
      </nav>

      {/* ── Contenido centrado ── */}
      <div className="login-contenedor">
        <div className="login-card">

          <div className="login-icono">★</div>
          <h1 className="login-titulo">Bienvenido</h1>
          <p className="login-subtitulo">Ingresa a tu cuenta</p>

          <hr className="login-separador" />

          {/* ── Formulario ── */}
          <form onSubmit={handleSubmit} className="login-form">

            {/* Usuario */}
            <div className="campo-grupo">
              <label className="campo-label">Usuario</label>
                <input
                type="text"
                className={`campo-input ${error && !usuario.trim() ? 'campo-input--error' : ''}`}
                placeholder="Ingresa tu usuario"
                value={usuario}
                autoComplete="off"
                onChange={(e) => {
                    setUsuario(e.target.value)
                    setError('')
                }}
                disabled={cargando}
                />
            </div>

            {/* Contraseña con ojito */}
            <div className="campo-grupo">
              <label className="campo-label">Contraseña</label>
              <div className="campo-password-wrapper">
                <input
                type={verContrasena ? 'text' : 'password'}
                className={`campo-input campo-input--password ${error && !contrasena.trim() ? 'campo-input--error' : ''}`}
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                autoComplete="new-password"
                onChange={(e) => {
                    setContrasena(e.target.value)
                    setError('')
                }}
                disabled={cargando}
                />
                {/* Botón ojito */}
                <button
                  type="button"
                  className="campo-ojo-btn"
                  onClick={() => setVerContrasena(!verContrasena)}
                  tabIndex={-1}
                >
                  {verContrasena ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mensaje de error — específico según el caso */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={cargando}
            >
              {cargando ? 'Ingresando...' : 'Iniciar sesión'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login