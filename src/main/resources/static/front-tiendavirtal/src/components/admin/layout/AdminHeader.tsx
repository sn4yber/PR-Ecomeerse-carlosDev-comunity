/**
 * @fileoverview Header compartido para el panel de administración
 * @description Componente de header reutilizable para todas las páginas de admin
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React from 'react';
import { Link } from 'react-router-dom';

export interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonPath?: string;
  className?: string;
}

/**
 * Componente AdminHeader - Header compartido del panel de administración
 * 
 * Características:
 * - Información del usuario
 * - Botón de logout
 * - Navegación opcional de regreso
 * - Título y subtítulo configurables
 * 
 * @param title - Título de la página
 * @param subtitle - Subtítulo de la página
 * @param showBackButton - Mostrar botón de regreso
 * @param backButtonPath - Ruta del botón de regreso
 * @param className - Clases CSS adicionales
 */
export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Panel de Administración",
  subtitle = "NebulaTech",
  showBackButton = false,
  backButtonPath = "/admin",
  className = ""
}) => {
  // Obtener información del usuario desde localStorage
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className={`bg-white shadow-sm border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo, título y botón de regreso */}
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Link
                to={backButtonPath}
                className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 mr-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            )}
            
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>

          {/* Usuario y logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {userInfo.nombre || 'Administrador'} {userInfo.apellido || 'Sistema'}
              </p>
              <p className="text-xs text-gray-500">
                {userInfo.rol || 'ADMIN'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
