import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import BusesPage from './pages/BusesPage'
import ViajesPage from './pages/ViajesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/viajes" element={<ViajesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
