/**
 * @fileoverview Componente de ruta protegida con autenticación
 * @description Protege rutas que requieren autenticación, redirigiendo al login si no está autenticado
 * @author E-commerce Team
 * @created 2025-10-02
 */

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente ProtectedRoute
 * Verifica si el usuario está autenticado antes de renderizar los children
 * Si no está autenticado, redirige al login
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    // Verificar que existan tanto el token como la información del usuario
    const authenticated = !!(token && user);
    
    setIsAuthenticated(authenticated);
    setIsChecking(false);

    // Log para debugging
    console.log('🔒 ProtectedRoute Check:', {
      hasToken: !!token,
      hasUser: !!user,
      authenticated,
      currentPath: location.pathname
    });
  }, [location.pathname]);

  // Mostrar loading mientras verifica
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    console.warn('⚠️ Usuario no autenticado, redirigiendo a /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, renderizar los children
  return <>{children}</>;
};

export default ProtectedRoute;
