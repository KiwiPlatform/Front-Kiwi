import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import LeadsPage from './pages/LeadsPage';
import ProspectosPage from './pages/ProspectosPage';
import LeadEditPage from './pages/LeadEditPage';
import LeadsListPage from './components/LeadsListPage';
import ProspectosListPage from './components/ProspectosListPage';
import { LeadsProvider } from './context/LeadsContext';
import ExtraPage from './pages/ExtraPage';

function App() {
  return (
    <LeadsProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Ruta raíz - redirige a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Rutas de Leads con layout anidado */}
          <Route path="/leads" element={<LeadsPage />}>
            <Route index element={<LeadsListPage />} />
            <Route path="list" element={<LeadsListPage />} />
            <Route path="edit/:leadId" element={<LeadEditPage />} />
            <Route path="transferir" element={<ExtraPage />} />
          </Route>
          
          {/* Rutas de Prospectos con layout anidado */}
          <Route path="/prospectos" element={<ProspectosPage />}>
            <Route index element={<ProspectosListPage />} />
            <Route path="listado" element={<ProspectosListPage />} />
            <Route path="transferir" element={<ExtraPage />} />
          </Route>
        </Route>
        
        {/* Ruta catch-all para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </LeadsProvider>
  );
}

export default App; 