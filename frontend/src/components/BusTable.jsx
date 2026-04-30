import { useState, useEffect } from 'react'
import BusModal from './BusModal.jsx'

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.9rem',
}

const thStyle = {
  backgroundColor: '#1a1a2e',
  color: '#fff',
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  letterSpacing: '0.03em',
}

function getTrStyle(index, hovered) {
  return {
    backgroundColor: hovered ? '#e8f4fd' : index % 2 === 0 ? '#fff' : '#f9f9f9',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  }
}

const tdStyle = {
  padding: '0.7rem 1rem',
  borderBottom: '1px solid #e5e5e5',
  verticalAlign: 'middle',
}

const paginationWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1.25rem',
}

function paginationBtnStyle(disabled) {
  return {
    padding: '0.45rem 1.1rem',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    backgroundColor: disabled ? '#e9e9e9' : '#1a1a2e',
    color: disabled ? '#aaa' : '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    fontSize: '0.85rem',
    transition: 'opacity 0.15s',
    opacity: disabled ? 0.6 : 1,
  }
}

const activoBadgeStyle = (activo) => ({
  display: 'inline-block',
  padding: '0.15rem 0.55rem',
  borderRadius: '12px',
  fontSize: '0.78rem',
  fontWeight: 600,
  backgroundColor: activo ? '#d4edda' : '#f8d7da',
  color: activo ? '#155724' : '#721c24',
})

const loadingStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: '#888',
  fontSize: '1rem',
}

export default function BusTable() {
  const [buses, setBuses] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedBusId, setSelectedBusId] = useState(null)
  const [hoveredRow, setHoveredRow] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/bus?page=${page}&size=10`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setBuses(data.content ?? [])
        setTotalPages(data.totalPages ?? 0)
        setLoading(false)
      })
      .catch(() => {
        setBuses([])
        setLoading(false)
      })
  }, [page])

  return (
    <div>
      {loading ? (
        <p style={loadingStyle}>Cargando buses...</p>
      ) : buses.length === 0 ? (
        <p style={{ ...loadingStyle, color: '#c0392b' }}>
          No se encontraron buses.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Número</th>
                <th style={thStyle}>Placa</th>
                <th style={thStyle}>Marca</th>
                <th style={thStyle}>Características</th>
                <th style={thStyle}>Activo</th>
                <th style={thStyle}>Fecha Creación</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <tr
                  key={bus.id}
                  style={getTrStyle(index, hoveredRow === bus.id)}
                  onClick={() => setSelectedBusId(bus.id)}
                  onMouseEnter={() => setHoveredRow(bus.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={tdStyle}>{bus.numeroBus}</td>
                  <td style={tdStyle}>{bus.placa}</td>
                  <td style={tdStyle}>{bus.marca ? bus.marca.nombre : '—'}</td>
                  <td style={tdStyle}>{bus.caracteristicas || '—'}</td>
                  <td style={tdStyle}>
                    <span style={activoBadgeStyle(bus.activo)}>
                      {bus.activo ? '✓ Activo' : '✗ Inactivo'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {bus.fechaCreacion
                      ? new Date(bus.fechaCreacion).toLocaleDateString('es-PE')
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={paginationWrapStyle}>
        <button
          style={paginationBtnStyle(page === 0)}
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          &laquo; Anterior
        </button>
        <span style={{ color: '#444', fontSize: '0.9rem', fontWeight: 500 }}>
          Página {page + 1} de {totalPages || 1}
        </span>
        <button
          style={paginationBtnStyle(page >= totalPages - 1)}
          disabled={page >= totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente &raquo;
        </button>
      </div>

      {selectedBusId !== null && (
        <BusModal
          busId={selectedBusId}
          onClose={() => setSelectedBusId(null)}
        />
      )}
    </div>
  )
}
