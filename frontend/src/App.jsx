import BusTable from './components/BusTable'

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a1a2e', marginBottom: '1.5rem' }}>Gestión de Buses</h1>
      <BusTable />
    </div>
  )
}

export default App
