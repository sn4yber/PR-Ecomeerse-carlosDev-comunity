/**
 * @fileoverview Componente de ruta protegida para administradores
 * @description Protege rutas que requieren rol de ADMIN, redirigiendo si no tiene permisos
 * @author E-commerce Team
 * @created 2025-11-08
 */

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Componente AdminRoute
 * Verifica si el usuario está autenticado Y tiene rol de ADMIN
 * Si no está autenticado, redirige al login
 * Si no es ADMIN, redirige al home con mensaje de error
 */
export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState<'yes' | 'no-auth' | 'no-admin'>('no-auth');

  useEffect(() => {
    // Verificar autenticación y rol
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    // Si no hay token o user, no está autenticado
    if (!token || !userStr) {
      setHasAccess('no-auth');
      setIsChecking(false);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      
      // Verificar si el rol es ADMIN
      const isAdmin = user.rol === 'ADMIN';
      
      console.log('🔒 AdminRoute Check:', {
        hasToken: !!token,
        hasUser: !!userStr,
        userRole: user.rol,
        isAdmin,
        currentPath: location.pathname
      });

      if (isAdmin) {
        setHasAccess('yes');
      } else {
        setHasAccess('no-admin');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setHasAccess('no-auth');
    }
    
    setIsChecking(false);
  }, [location.pathname]);

  // Mostrar loading mientras verifica
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (hasAccess === 'no-auth') {
    console.warn('⚠️ Usuario no autenticado, redirigiendo a /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si no es admin, redirigir al home con mensaje
  if (hasAccess === 'no-admin') {
    console.warn('⚠️ Usuario sin permisos de administrador, redirigiendo a /');
    alert('⛔ No tienes permisos para acceder al panel de administrador.');
    return <Navigate to="/" replace />;
  }

  // Si es admin, renderizar los children
  return <>{children}</>;
};

export default AdminRoute;
