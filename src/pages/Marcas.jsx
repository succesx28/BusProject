import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Marcas() {
  const { token } = useAuth();
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMarcas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMarcas = async () => {
    if (!token) { setLoading(false); return; }
    try {
      const res = await fetch('http://localhost:8080/bus/marcas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMarcas(data);
      }
    } catch (e) {
      console.error(e);
      setError('Error al cargar marcas');
    } finally {
      setLoading(false);
    }
  };

  const submitMarca = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    try {
      const res = await fetch('http://localhost:8080/bus/marcas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: nombre.trim() })
      });
      if (res.ok) {
        const m = await res.json();
        setMarcas((prev) => [...prev, m]);
        setNombre('');
        setOpen(false);
      } else {
        setError('Error al guardar marca');
      }
    } catch (err) {
      setError('Error al guardar marca');
    }
  };

  return (
    <div className="page marcas-page" style={{ padding: '1rem' }}>
      <div className="card" style={{ padding: '1rem 1.5rem', borderRadius: 8 }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Marcas de Buses</span>
          <button className="btn-primary" onClick={() => setOpen(true)}>Agregar Marca</button>
        </div>

        {loading ? (
          <div className="loading" style={{ padding: '1rem' }}>Cargando marcas...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {marcas.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{m.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {error && <div className="error-msg" style={{ marginTop: '0.5rem' }}>{error}</div>}
      </div>

      {open && (
        <div className="modal-overlay open" style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal" style={{ background: '#fff', padding: '1.5rem', borderRadius: 8, width: '90%', maxWidth: 420, position: 'relative' }}>
            <button className="modal-close" onClick={() => setOpen(false)} style={{ position: 'absolute', top: 8, right: 8, border: 0, background: 'transparent', fontSize: 18 }}>×</button>
            <h2 style={{ marginTop: 0 }}>Agregar Marca</h2>
            <form onSubmit={submitMarca}>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label>Nombre</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required placeholder="Volvo" style={{ width:'100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: 6 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" className="btn-cancel" onClick={() => setOpen(false)} style={{ padding: '0.5rem 1rem' }}>Cancelar</button>
                <button className="btn-primary" type="submit" style={{ padding: '0.5rem 1rem' }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
