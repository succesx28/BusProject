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
