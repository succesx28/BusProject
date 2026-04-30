import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      display: 'flex', alignItems: 'center', gap: '1rem',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 12, background: color, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: '0.75rem',
      }}>Bus</div>
      <div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>{value}</h3>
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: 2 }}>{label}</p>
      </div>
    </div>
  )
}

function ActionCard({ to, title, desc }) {
  return (
    <Link to={to} style={{
      background: '#fff', borderRadius: 12, padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none',
      color: '#333', border: '2px solid transparent', display: 'block',
    }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a2e', margin: '0 0 0.3rem' }}>{title}</h3>
      <p style={{ fontSize: '0.82rem', color: '#888', margin: 0 }}>{desc}</p>
    </Link>
  )
}

export default function DashboardPage() {
  const [total, setTotal] = useState(0)
  const [activos, setActivos] = useState(0)

  useEffect(() => {
    fetch('/bus/all')
      .then(r => r.json())
      .then(buses => {
        setTotal(buses.length)
        setActivos(buses.filter(b => b.activo).length)
      })
      .catch(() => {})
  }, [])

  return (
    <Layout title="Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard label="Buses registrados" value={total} color="#667eea" />
        <StatCard label="Buses activos" value={activos} color="#10b981" />
      </div>
      <p style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Acceso Rápido</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <ActionCard to="/buses" title="Gestión de Buses" desc="Ver lista, filtrar y consultar detalles de cada bus" />
        <ActionCard to="/viajes" title="Viajes" desc="Registra y administra los viajes programados" />
      </div>
    </Layout>
  )
}
