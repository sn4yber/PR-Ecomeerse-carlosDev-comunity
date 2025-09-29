/**
 * @fileoverview Header compartido para el panel de administración
 * @description Componente de header reutilizable para todas las páginas de admin
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React, { useState } from 'react';
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
  // Estado para el dropdown del usuario
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Obtener información del usuario desde localStorage
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className={`bg-purple-900 shadow-lg border-b border-purple-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo, título y botón de regreso */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link
                to={backButtonPath}
                className="inline-flex items-center p-2 bg-purple-800 hover:bg-purple-700 rounded-lg text-white transition-all duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            )}
            
            {/* Logo mejorado */}
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-lg shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <div className="ml-2">
              <h1 className="text-xl font-bold text-white">
                {title}
              </h1>
              <p className="text-purple-200 text-sm">
                ✨ {subtitle}
              </p>
            </div>
          </div>

          {/* Sección del usuario mejorada */}
          <div className="flex items-center space-x-4">
            {/* Indicador de notificaciones */}
            <button className="relative p-2 bg-purple-800 hover:bg-purple-700 rounded-lg text-white transition-all duration-200">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.403-2.297c-.137-.093-.215-.235-.215-.386V9a6 6 0 10-12 0v5.317c0 .151-.078.293-.215.386L1 17h5m9 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>

            {/* Perfil del usuario con dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 bg-purple-800 hover:bg-purple-700 rounded-lg text-white transition-all duration-200"
              >
                {/* Avatar mejorado */}
                <div className="flex items-center justify-center w-8 h-8 bg-pink-500 rounded-lg shadow-md">
                  <span className="text-white font-bold text-sm">
                    {(userInfo.nombre?.[0] || 'A').toUpperCase()}
                  </span>
                </div>
                
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">
                    {userInfo.nombre || 'Administrador'} {userInfo.apellido || 'Sistema'}
                  </p>
                  <p className="text-xs text-purple-200 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {userInfo.rol || 'ADMIN'}
                  </p>
                </div>
                
                <svg className={`h-4 w-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu mejorado */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-pink-500 rounded-lg">
                        <span className="text-white font-bold text-sm">
                          {(userInfo.nombre?.[0] || 'A').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {userInfo.nombre || 'Administrador'} {userInfo.apellido || 'Sistema'}
                        </p>
                        <p className="text-xs text-gray-500">{userInfo.email || 'admin@nebulatech.com'}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                          {userInfo.rol || 'ADMIN'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                      <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Configuración
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium"
                    >
                      <svg className="mr-3 h-4 w-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay para cerrar el dropdown */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default AdminHeader;
