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
        {!loading && !viaje && <p style={{ textAlign: 'center', color: '#c0392b', padding: '1rem 0' }}>No se pudo cargar la información del viaje.</p>}
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
