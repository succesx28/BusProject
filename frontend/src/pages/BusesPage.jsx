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
