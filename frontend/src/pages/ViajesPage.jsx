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
