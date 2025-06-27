import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const hasValidToken = authService.isAuthenticated();
      
      setIsAuthenticated(hasValidToken);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    // Guardar la ubicación actual para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, renderizar las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute; 