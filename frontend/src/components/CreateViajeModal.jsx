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
