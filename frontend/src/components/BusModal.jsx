import { useState, useEffect } from 'react'

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
}

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '500px',
  width: '90%',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
  position: 'relative',
}

const titleStyle = {
  margin: '0 0 1.5rem 0',
  color: '#1a1a2e',
  fontSize: '1.25rem',
  fontWeight: 700,
  borderBottom: '2px solid #e8f4fd',
  paddingBottom: '0.75rem',
}

const fieldRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '0.5rem 0',
  borderBottom: '1px solid #f0f0f0',
}

const labelStyle = {
  fontWeight: 600,
  color: '#555',
  fontSize: '0.9rem',
  minWidth: '160px',
}

const valueStyle = {
  color: '#1a1a2e',
  fontSize: '0.9rem',
  textAlign: 'right',
  wordBreak: 'break-word',
}

const closeBtnStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  fontSize: '1.4rem',
  cursor: 'pointer',
  color: '#888',
  lineHeight: 1,
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
}

const badgeBase = {
  display: 'inline-block',
  padding: '0.2rem 0.6rem',
  borderRadius: '12px',
  fontSize: '0.8rem',
  fontWeight: 600,
}

function Field({ label, value }) {
  return (
    <div style={fieldRowStyle}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  )
}

export default function BusModal({ busId, onClose }) {
  const [bus, setBus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (busId == null) return
    setLoading(true)
    setBus(null)
    fetch(`/bus/${busId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setBus(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [busId])

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={cardStyle}>
        <button style={closeBtnStyle} onClick={onClose} title="Cerrar">
          &times;
        </button>
        <h2 style={titleStyle}>Detalle del Bus</h2>

        {loading && (
          <p style={{ textAlign: 'center', color: '#888', padding: '1rem 0' }}>
            Cargando...
          </p>
        )}

        {!loading && !bus && (
          <p style={{ textAlign: 'center', color: '#c0392b', padding: '1rem 0' }}>
            No se pudo cargar la información del bus.
          </p>
        )}

        {!loading && bus && (
          <div>
            <Field label="ID" value={bus.id} />
            <Field label="Número de Bus" value={bus.numeroBus} />
            <Field label="Placa" value={bus.placa} />
            <Field
              label="Marca"
              value={bus.marca ? bus.marca.nombre : '—'}
            />
            <Field
              label="Características"
              value={bus.caracteristicas || '—'}
            />
            <div style={fieldRowStyle}>
              <span style={labelStyle}>Activo</span>
              <span
                style={{
                  ...badgeBase,
                  backgroundColor: bus.activo ? '#d4edda' : '#f8d7da',
                  color: bus.activo ? '#155724' : '#721c24',
                }}
              >
                {bus.activo ? '✓ Activo' : '✗ Inactivo'}
              </span>
            </div>
            <Field
              label="Fecha de Creación"
              value={
                bus.fechaCreacion
                  ? new Date(bus.fechaCreacion).toLocaleDateString('es-PE')
                  : '—'
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
