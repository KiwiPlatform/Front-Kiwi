import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import SeguridadPage from './pages/SeguridadPage';
import MantenimientoPage from './pages/MantenimientoPage';
import LeadEditPage from './pages/LeadEditPage';
import LeadsListPage from './components/LeadsListPage';
import { LeadsProvider } from './context/LeadsContext';

function App() {
  return (
    <LeadsProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<LeadsListPage />} />
            <Route path="edit/:leadId" element={<LeadEditPage />} />
          </Route>
          <Route path="/seguridad" element={<SeguridadPage />} />
          <Route path="/mantenimiento" element={<MantenimientoPage />} />
        </Route>
      </Routes>
    </LeadsProvider>
  );
}

export default App; 