# React Frontend Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar los 4 templates Thymeleaf con páginas React equivalentes, manteniendo diseño visual y funcionalidad completa.

**Architecture:** BrowserRouter con 4 rutas. Sidebar + Topbar extraídos en Layout compartido. Modales como componentes standalone que reciben callbacks onClose/onSaved. Inline styles para consistencia con código existente.

**Tech Stack:** React 18, react-router-dom, Vite, inline styles, fetch API (sin axios)

---

## File Map

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `frontend/src/App.jsx` | Modificar | BrowserRouter + 4 rutas |
| `frontend/src/components/Sidebar.jsx` | Crear | Nav lateral con ítem activo via useLocation |
| `frontend/src/components/Topbar.jsx` | Crear | Barra superior con título + avatar |
| `frontend/src/components/Layout.jsx` | Crear | Wrapper: Sidebar + Topbar + children |
| `frontend/src/components/BusTable.jsx` | Sin cambios | Tabla paginada de buses (ya existe) |
| `frontend/src/components/BusModal.jsx` | Sin cambios | Modal detalle bus (ya existe) |
| `frontend/src/components/AddBusModal.jsx` | Crear | Formulario agregar bus |
| `frontend/src/components/AddMarcaModal.jsx` | Crear | Formulario agregar marca |
| `frontend/src/components/ViajeTable.jsx` | Crear | Tabla paginada de viajes |
| `frontend/src/components/ViajeDetailModal.jsx` | Crear | Modal detalle viaje |
| `frontend/src/components/CreateViajeModal.jsx` | Crear | Formulario crear viaje |
| `frontend/src/pages/LoginPage.jsx` | Crear | Página login |
| `frontend/src/pages/DashboardPage.jsx` | Crear | Dashboard con stats |
| `frontend/src/pages/BusesPage.jsx` | Crear | Página gestión buses |
| `frontend/src/pages/ViajesPage.jsx` | Crear | Página gestión viajes |

---

## Task 1: Instalar react-router-dom

**Files:**
- Modify: `frontend/package.json`

- [ ] **Instalar la dependencia**

```bash
cd frontend && npm install react-router-dom
```

Expected output: `added X packages`

- [ ] **Verificar en package.json**

Confirmar que `"react-router-dom"` aparece en `dependencies`.

- [ ] **Commit**

```bash
git add frontend/package.json frontend/package-lock.json
git commit -m "feat: add react-router-dom"
```

---

## Task 2: Sidebar

**Files:**
- Create: `frontend/src/components/Sidebar.jsx`

- [ ] **Crear el componente**

```jsx
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
        <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>BusProject</h2>
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
```

---

## Task 3: Topbar y Layout

**Files:**
- Create: `frontend/src/components/Topbar.jsx`
- Create: `frontend/src/components/Layout.jsx`

- [ ] **Crear Topbar**

```jsx
export default function Topbar({ title }) {
  return (
    <div style={{
      background: '#fff', padding: '1rem 2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <h1 style={{ fontSize: '1.2rem', color: '#1a1a2e', fontWeight: 600, margin: 0 }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#555', fontSize: '0.88rem' }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: '0.8rem',
        }}>A</div>
        <span>Administrador</span>
      </div>
    </div>
  )
}
```

- [ ] **Crear Layout**

```jsx
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ title, children }) {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f0f2f5', display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: 260, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar title={title} />
        <div style={{ padding: '2rem', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
```

---

## Task 4: LoginPage

**Files:**
- Create: `frontend/src/pages/LoginPage.jsx`
- Create: `frontend/src/pages/` (directorio)

- [ ] **Crear directorio pages**

```bash
mkdir frontend/src/pages
```

- [ ] **Crear LoginPage**

```jsx
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
```

---

## Task 5: DashboardPage

**Files:**
- Create: `frontend/src/pages/DashboardPage.jsx`

- [ ] **Crear DashboardPage**

```jsx
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
```

---

## Task 6: AddMarcaModal y AddBusModal

**Files:**
- Create: `frontend/src/components/AddMarcaModal.jsx`
- Create: `frontend/src/components/AddBusModal.jsx`

- [ ] **Crear AddMarcaModal**

```jsx
import { useState } from 'react'

const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const modalStyle = { background: '#fff', borderRadius: 14, padding: '2rem', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', position: 'relative' }
const inputStyle = { width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 7, fontSize: '0.88rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }

export default function AddMarcaModal({ onClose, onSaved }) {
  const [nombre, setNombre] = useState('')
  const [saving, setSaving] = useState(false)

  function handleOverlay(e) { if (e.target === e.currentTarget) onClose() }

  function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    fetch('/bus/marcas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre.trim() }),
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(() => { onSaved(); onClose() })
      .catch(() => alert('Error al guardar la marca'))
      .finally(() => setSaving(false))
  }

  return (
    <div style={overlayStyle} onClick={handleOverlay}>
      <div style={modalStyle}>
        <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#888' }} onClick={onClose}>✕</button>
        <h2 style={{ fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '1.25rem', fontWeight: 700 }}>Agregar Marca</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.35rem' }}>Nombre de Marca</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Ej: Volvo" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.45rem 1.1rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 7, color: '#555', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" disabled={saving} style={{ padding: '0.45rem 1.1rem', background: '#667eea', border: 'none', borderRadius: 7, color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Crear AddBusModal**

```jsx
import { useState, useEffect } from 'react'

const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const modalStyle = { background: '#fff', borderRadius: 14, padding: '2rem', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', position: 'relative' }
const inputStyle = { width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 7, fontSize: '0.88rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }
const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.35rem' }

export default function AddBusModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ numeroBus: '', placa: '', caracteristicas: '', marcaId: '', activo: true })
  const [marcas, setMarcas] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/bus/marcas').then(r => r.json()).then(setMarcas).catch(() => {})
  }, [])

  function handleOverlay(e) { if (e.target === e.currentTarget) onClose() }
  function setField(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    fetch('/bus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, marcaId: Number(form.marcaId) }),
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(() => { onSaved(); onClose() })
      .catch(() => alert('Error al guardar el bus'))
      .finally(() => setSaving(false))
  }

  return (
    <div style={overlayStyle} onClick={handleOverlay}>
      <div style={modalStyle}>
        <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#888' }} onClick={onClose}>✕</button>
        <h2 style={{ fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '1.25rem', fontWeight: 700 }}>Agregar Bus</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Numero de Bus</label>
            <input type="text" value={form.numeroBus} onChange={setField('numeroBus')} required placeholder="Ej: 101" style={inputStyle} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Placa</label>
            <input type="text" value={form.placa} onChange={setField('placa')} required placeholder="Ej: ABC-123" style={inputStyle} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Caracteristicas</label>
            <input type="text" value={form.caracteristicas} onChange={setField('caracteristicas')} placeholder="Ej: Aire acondicionado, 40 asientos" style={inputStyle} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Marca</label>
            <select value={form.marcaId} onChange={setField('marcaId')} required style={{ ...inputStyle }}>
              <option value="">Seleccione una marca</option>
              {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="activoCheck" checked={form.activo} onChange={setField('activo')} style={{ width: 16, height: 16, cursor: 'pointer' }} />
            <label htmlFor="activoCheck" style={{ fontSize: '0.88rem', color: '#444', cursor: 'pointer' }}>Activo</label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.45rem 1.1rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 7, color: '#555', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" disabled={saving} style={{ padding: '0.45rem 1.1rem', background: '#667eea', border: 'none', borderRadius: 7, color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

---

## Task 7: BusesPage

**Files:**
- Create: `frontend/src/pages/BusesPage.jsx`

- [ ] **Crear BusesPage**

```jsx
import { useState } from 'react'
import Layout from '../components/Layout'
import BusTable from '../components/BusTable'
import AddBusModal from '../components/AddBusModal'
import AddMarcaModal from '../components/AddMarcaModal'

export default function BusesPage() {
  const [showAddBus, setShowAddBus] = useState(false)
  const [showAddMarca, setShowAddMarca] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <Layout title="Buses">
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a2e' }}>Lista de Buses</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setShowAddMarca(true)} style={{ padding: '0.45rem 1.1rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 7, color: '#555', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              + Marca
            </button>
            <button onClick={() => setShowAddBus(true)} style={{ padding: '0.45rem 1.1rem', background: '#667eea', border: 'none', borderRadius: 7, color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              Agregar Bus
            </button>
          </div>
        </div>
        <BusTable key={refreshKey} />
      </div>

      {showAddBus && <AddBusModal onClose={() => setShowAddBus(false)} onSaved={() => setRefreshKey(k => k + 1)} />}
      {showAddMarca && <AddMarcaModal onClose={() => setShowAddMarca(false)} onSaved={() => setRefreshKey(k => k + 1)} />}
    </Layout>
  )
}
```

---

## Task 8: ViajeDetailModal y CreateViajeModal

**Files:**
- Create: `frontend/src/components/ViajeDetailModal.jsx`
- Create: `frontend/src/components/CreateViajeModal.jsx`

- [ ] **Crear ViajeDetailModal**

```jsx
import { useState, useEffect } from 'react'

export default function ViajeDetailModal({ viajeId, onClose }) {
  const [viaje, setViaje] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/viaje/${viajeId}`)
      .then(r => r.json())
      .then(data => { setViaje(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [viajeId])

  function handleOverlay(e) { if (e.target === e.currentTarget) onClose() }

  const rows = viaje ? [
    ['Origen', viaje.origen || '-'],
    ['Destino', viaje.destino || '-'],
    ['Fecha Salida', viaje.fechaHoraSalida ? new Date(viaje.fechaHoraSalida).toLocaleString('es-PE') : '-'],
    ['Fecha Llegada Est.', viaje.fechaHoraLlegadaEstimada ? new Date(viaje.fechaHoraLlegadaEstimada).toLocaleString('es-PE') : '-'],
    ['Bus', viaje.bus ? `${viaje.bus.numeroBus} - ${viaje.bus.placa}` : '-'],
    ['Marca', viaje.bus?.marca?.nombre ?? '-'],
  ] : []

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleOverlay}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '2rem', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', position: 'relative' }}>
        <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#888' }} onClick={onClose}>✕</button>
        <h2 style={{ fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '1.25rem', fontWeight: 700 }}>Detalle del Viaje</h2>
        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Cargando...</p>}
        {!loading && viaje && rows.map(([label, value]) => (
          <div key={label} style={{ marginBottom: '0.85rem', display: 'flex', gap: '0.5rem' }}>
            <label style={{ fontWeight: 600, color: '#555', fontSize: '0.85rem', minWidth: 160 }}>{label}:</label>
            <span style={{ color: '#222', fontSize: '0.85rem' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Crear CreateViajeModal**

```jsx
import { useState, useEffect } from 'react'

const inputStyle = { width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 7, fontSize: '0.88rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }
const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: '0.35rem' }

export default function CreateViajeModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ origen: '', destino: '', fechaHoraSalida: '', fechaHoraLlegadaEstimada: '', busId: '' })
  const [buses, setBuses] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/bus/all').then(r => r.json()).then(setBuses).catch(() => {})
  }, [])

  function handleOverlay(e) { if (e.target === e.currentTarget) onClose() }
  function setField(field) { return e => setForm(prev => ({ ...prev, [field]: e.target.value })) }

  function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    fetch('/viaje', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, busId: Number(form.busId) }),
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(() => { onSaved(); onClose() })
      .catch(() => alert('Error al crear el viaje'))
      .finally(() => setSaving(false))
  }

  const fields = [
    { key: 'origen', label: 'Origen', type: 'text', placeholder: 'Ej: Lima' },
    { key: 'destino', label: 'Destino', type: 'text', placeholder: 'Ej: Arequipa' },
    { key: 'fechaHoraSalida', label: 'Fecha y Hora Salida', type: 'datetime-local' },
    { key: 'fechaHoraLlegadaEstimada', label: 'Fecha y Hora Llegada Estimada', type: 'datetime-local' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleOverlay}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '2rem', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', position: 'relative' }}>
        <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#888' }} onClick={onClose}>✕</button>
        <h2 style={{ fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '1.25rem', fontWeight: 700 }}>Crear Viaje</h2>
        <form onSubmit={handleSubmit}>
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>{label}</label>
              <input type={type} value={form[key]} onChange={setField(key)} required placeholder={placeholder} style={inputStyle} />
            </div>
          ))}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Bus</label>
            <select value={form.busId} onChange={setField('busId')} required style={{ ...inputStyle }}>
              <option value="">Seleccione un bus</option>
              {buses.map(b => <option key={b.id} value={b.id}>{b.numeroBus} - {b.placa}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.45rem 1.1rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 7, color: '#555', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" disabled={saving} style={{ padding: '0.45rem 1.1rem', background: '#667eea', border: 'none', borderRadius: 7, color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

---

## Task 9: ViajesPage

**Files:**
- Create: `frontend/src/pages/ViajesPage.jsx`

- [ ] **Crear ViajesPage**

```jsx
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ViajeDetailModal from '../components/ViajeDetailModal'
import CreateViajeModal from '../components/CreateViajeModal'

const thStyle = { background: '#1a1a2e', color: '#fff', padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, letterSpacing: '0.03em', fontSize: '0.88rem' }
const tdStyle = { padding: '0.8rem 1rem', color: '#333', borderBottom: '1px solid #f0f0f0', fontSize: '0.88rem' }

function pageBtnStyle(disabled) {
  return { padding: '0.4rem 1rem', border: '1px solid #1a1a2e', borderRadius: 6, background: disabled ? '#e5e5e5' : '#1a1a2e', color: disabled ? '#aaa' : '#fff', fontWeight: 600, fontSize: '0.82rem', cursor: disabled ? 'not-allowed' : 'pointer' }
}

export default function ViajesPage() {
  const [viajes, setViajes] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/viaje?page=${page}&size=10`)
      .then(r => r.json())
      .then(data => { setViajes(data.content ?? []); setTotalPages(data.totalPages ?? 1); setLoading(false) })
      .catch(() => setLoading(false))
  }, [page])

  return (
    <Layout title="Viajes">
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, color: '#1a1a2e' }}>
          <span>Lista de Viajes</span>
          <button onClick={() => setShowCreate(true)} style={{ padding: '0.45rem 1.1rem', background: '#667eea', border: 'none', borderRadius: 7, color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
            Crear Viaje
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '2.5rem', color: '#888' }}>Cargando viajes...</p>
        ) : viajes.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2.5rem', color: '#888' }}>No hay viajes registrados.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr>
                  {['Origen', 'Destino', 'Fecha Salida', 'Fecha Llegada Est.', 'Bus', 'Accion'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {viajes.map(v => (
                  <tr key={v.id}>
                    <td style={tdStyle}>{v.origen || '-'}</td>
                    <td style={tdStyle}>{v.destino || '-'}</td>
                    <td style={tdStyle}>{v.fechaHoraSalida ? new Date(v.fechaHoraSalida).toLocaleString('es-PE') : '-'}</td>
                    <td style={tdStyle}>{v.fechaHoraLlegadaEstimada ? new Date(v.fechaHoraLlegadaEstimada).toLocaleString('es-PE') : '-'}</td>
                    <td style={tdStyle}>{v.bus ? `${v.bus.numeroBus} - ${v.bus.placa}` : '-'}</td>
                    <td style={tdStyle}>
                      <button onClick={() => setSelectedId(v.id)} style={{ padding: '0.3rem 0.8rem', background: '#1a1a2e', border: 'none', borderRadius: 6, color: '#fff', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.25rem', borderTop: '1px solid #f0f0f0' }}>
          <button style={pageBtnStyle(page === 0)} disabled={page === 0} onClick={() => setPage(p => p - 1)}>Anterior</button>
          <span style={{ fontSize: '0.85rem', color: '#555' }}>Página {page + 1} de {totalPages}</span>
          <button style={pageBtnStyle(page >= totalPages - 1)} disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Siguiente</button>
        </div>
      </div>

      {selectedId !== null && <ViajeDetailModal viajeId={selectedId} onClose={() => setSelectedId(null)} />}
      {showCreate && <CreateViajeModal onClose={() => setShowCreate(false)} onSaved={() => setPage(0)} />}
    </Layout>
  )
}
```

---

## Task 10: App.jsx con router

**Files:**
- Modify: `frontend/src/App.jsx`

- [ ] **Reemplazar App.jsx**

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import BusesPage from './pages/BusesPage'
import ViajesPage from './pages/ViajesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/viajes" element={<ViajesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## Task 11: Verificación final

- [ ] **Correr el proyecto completo**

```bash
npm run dev
```

Abre `http://localhost:5173`

- [ ] **Verificar Login** — Ingresá cualquier email/contraseña → redirige a `/dashboard`
- [ ] **Verificar Dashboard** — Muestra cards de stats con conteo real desde `/bus/all`
- [ ] **Verificar Buses** — Tabla paginada carga, click en fila abre modal de detalle, botones "Agregar Bus" y "+ Marca" abren sus respectivos modales
- [ ] **Verificar Viajes** — Tabla paginada carga, botón "Visualizar" abre detalle, "Crear Viaje" abre formulario
- [ ] **Verificar Sidebar** — El ítem activo se resalta según la ruta actual, navegación entre páginas funciona

- [ ] **Commit final**

```bash
git add frontend/src/
git commit -m "feat: migrate Thymeleaf templates to React components"
```
