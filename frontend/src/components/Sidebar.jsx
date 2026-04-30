import { Link, useLocation } from 'react-router-dom'

function navItemStyle(active) {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    color: active ? '#fff' : 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    borderLeft: active ? '3px solid #667eea' : '3px solid transparent',
    background: active ? 'rgba(102,126,234,0.2)' : 'transparent',
    transition: 'all 0.2s',
  }
}

const sectionLabel = {
  color: 'rgba(255,255,255,0.35)',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  padding: '0.5rem 1.5rem',
  display: 'block',
}

export default function Sidebar() {
  const { pathname } = useLocation()
  return (
    <aside style={{
      width: 260,
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      zIndex: 100,
    }}>
      <div style={{ padding: '2rem 1.5rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>BusProject</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Sistema de Gestión</p>
      </div>

      <nav style={{ flex: 1, padding: '1.5rem 0' }}>
        <span style={sectionLabel}>Principal</span>
        <Link to="/dashboard" style={navItemStyle(pathname === '/dashboard')}>Dashboard</Link>
        <span style={{ ...sectionLabel, marginTop: '1rem' }}>Gestión</span>
        <Link to="/buses" style={navItemStyle(pathname === '/buses')}>Buses</Link>
        <Link to="/viajes" style={navItemStyle(pathname === '/viajes')}>Viajes</Link>
        <span style={{ ...sectionLabel, marginTop: '1rem' }}>Sistema</span>
        <a href="#" style={navItemStyle(false)}>Configuración</a>
      </nav>

      <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <a href="/logout" style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          width: '100%', padding: '0.7rem 1rem',
          background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)',
          borderRadius: 8, color: '#fca5a5', fontSize: '0.88rem', fontWeight: 600,
          cursor: 'pointer', textDecoration: 'none',
        }}>Cerrar Sesión</a>
      </div>
    </aside>
  )
}
