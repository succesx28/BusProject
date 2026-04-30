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
