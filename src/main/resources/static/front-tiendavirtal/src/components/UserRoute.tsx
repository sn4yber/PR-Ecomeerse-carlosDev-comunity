/**
 * @fileoverview Componente para proteger rutas que requieren autenticación
 * Permite acceso tanto a usuarios normales (USER) como administradores (ADMIN)
 * @author E-commerce Team
 */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface UserRouteProps {
  children: React.ReactNode;
}

/**
 * UserRoute - Componente que protege rutas verificando si el usuario está autenticado
 * A diferencia de AdminRoute, este permite acceso tanto a USER como a ADMIN
 */
export const UserRoute: React.FC<UserRouteProps> = ({ children }) => {
  const [hasAccess, setHasAccess] = useState<'loading' | 'yes' | 'no'>('loading');

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (!token || !userStr) {
        setHasAccess('no');
        return;
      }

      try {
        const user = JSON.parse(userStr);
        // Verificar que el usuario tenga un rol válido
        if (user.rol === 'ADMIN' || user.rol === 'USER') {
          setHasAccess('yes');
        } else {
          setHasAccess('no');
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setHasAccess('no');
      }
    };

    checkAuth();
  }, []);

  if (hasAccess === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (hasAccess === 'no') {
    alert('⛔ Debes iniciar sesión para acceder a esta página.');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
