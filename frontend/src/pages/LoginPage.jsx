import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/dashboard')
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    border: '2px solid #e0e0e0', borderRadius: 8,
    fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle = {
    display: 'block', color: '#333', fontWeight: 600,
    marginBottom: '0.5rem', fontSize: '0.9rem',
  }

  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', padding: '2.5rem', borderRadius: 16,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: '100%', maxWidth: 400,
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#667eea', fontSize: '2rem', fontWeight: 700, margin: 0 }}>BusProject</h1>
          <p style={{ color: '#764ba2', fontSize: '0.9rem', marginTop: '0.25rem' }}>Sistema de Gestion de Buses</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Correo Electronico</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com" required autoFocus style={inputStyle} />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Contrasena</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Tu contrasena" required style={inputStyle} />
          </div>
          <button type="submit" style={{
            width: '100%', padding: '0.85rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff', border: 'none', borderRadius: 8,
            fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
          }}>Ingresar</button>
        </form>
      </div>
    </div>
  )
}
