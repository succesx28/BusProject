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
