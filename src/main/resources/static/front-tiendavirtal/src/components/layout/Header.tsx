/**
 * @fileoverview Componente Header principal del e-commerce
 * @description Header con menú hamburguesa lateral estilo Wikipedia y título centrado
 * @author E-commerce Team
 * @created 2025-09-20
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { HeaderProps } from '../../types';

/**
 * Icono de configuración/admin
 */
const AdminIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

/**
 * Icono de carrito de compras
 */
const CartIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7H19m-8-7V9a3 3 0 116 0v4m-6 0v7" />
  </svg>
);

/**
 * Icono de usuario/perfil
 */
const UserIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

/**
 * Icono de menú hamburguesa
 */
const MenuIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

/**
 * Icono de cerrar (X)
 */
const CloseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/**
 * Componente Header principal
 * 
 * Características:
 * - Menú hamburguesa a la izquierda que se desliza desde la izquierda
 * - Título centrado
 * - Estilo similar a Wikipedia
 * - Responsive design
 * - Animaciones suaves
 * 
 * @param title - Título principal del sitio
 * @param menuItems - Items del menú de navegación
 * @param className - Clases CSS adicionales
 */
export const Header: React.FC<HeaderProps> = ({ 
  title, 
  className = "" 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Estado temporal para el login (después se integrará con el sistema de autenticación)
  // Por ahora siempre invitado, los botones redirigen a las páginas correspondientes
  const [isLoggedIn] = useState(false);
  const [userProfile] = useState({
    name: 'Usuario Invitado',
    role: 'guest', // 'admin', 'user', 'guest'
    avatar: null
  });

  /**
   * Alternar el estado del sidebar
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /**
   * Cerrar sidebar al hacer clic en el overlay
   */
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  /**
   * Manejar el escape key para cerrar el sidebar
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el sidebar está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Header principal */}
      <header className={`
        bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40
        ${className}
      `}>
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Botón menú hamburguesa */}
          <button
            onClick={toggleSidebar}
            className="
              flex items-center justify-center w-10 h-10 rounded-lg
              hover:bg-gradient-to-br hover:from-purple-100 hover:to-gray-100
              active:bg-gradient-to-br active:from-purple-200 active:to-gray-200
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            "
            aria-label="Abrir menú de navegación"
            aria-expanded={isSidebarOpen}
          >
            <MenuIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Título centrado como Link */}
          <div className="flex-1 flex justify-center">
            <Link 
              to="/"
              className="
                px-6 py-2 rounded-lg
                bg-transparent 
                hover:bg-gradient-to-r hover:from-purple-100 hover:to-gray-100
                active:bg-gradient-to-r active:from-purple-200 active:to-gray-200
                border border-transparent hover:border-purple-300
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                group
                no-underline
              "
            >
              <h1 className="
                text-xl font-semibold text-gray-900
                sm:text-2xl md:text-3xl
                truncate
                group-hover:bg-gradient-to-r group-hover:from-purple-700 group-hover:to-gray-800
                group-hover:bg-clip-text group-hover:text-transparent
                transition-all duration-200
              ">
                {title}
              </h1>
            </Link>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-2">
            {/* Botón de carrito */}
            <Link 
              to="/carrito"
              className="
                flex items-center justify-center w-10 h-10 rounded-lg
                hover:bg-gradient-to-br hover:from-purple-100 hover:to-gray-100
                active:bg-gradient-to-br active:from-purple-200 active:to-gray-200
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                no-underline
              "
              aria-label="Ir al carrito"
            >
              <CartIcon className="w-6 h-6 text-gray-700" />
            </Link>
            
            {/* Botón de usuario/perfil - Redirecciona al login */}
            <Link 
              to="/login"
              className="
                flex items-center justify-center w-10 h-10 rounded-lg
                hover:bg-gradient-to-br hover:from-purple-100 hover:to-gray-100
                active:bg-gradient-to-br active:from-purple-200 active:to-gray-200
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                no-underline
              "
              aria-label="Ir al login"
            >
              <UserIcon className="w-6 h-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </header>

      {/* Overlay para cerrar el sidebar */}
      {isSidebarOpen && (
        <div
          className="
            fixed inset-0 bg-black bg-opacity-25 z-50
            transition-opacity duration-300
          "
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar lateral estilo Wikipedia */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-gray-200
      `}>
        {/* Header del sidebar */}
        <div className="
          flex items-center justify-between p-4 border-b border-gray-200
          bg-gray-50
        ">
          <h2 className="text-lg font-semibold text-gray-900">
            Navegación
          </h2>
          <button
            onClick={closeSidebar}
            className="
              flex items-center justify-center w-8 h-8 rounded-lg
              hover:bg-gradient-to-br hover:from-purple-100 hover:to-gray-100
              active:bg-gradient-to-br active:from-purple-200 active:to-gray-200
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            "
            aria-label="Cerrar menú de navegación"
          >
            <CloseIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Sección de Perfil de Usuario */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            {/* Avatar/Icono de usuario */}
            <div className="
              flex items-center justify-center w-12 h-12 rounded-full
              bg-gradient-to-br from-purple-100 to-gray-100
              border-2 border-gray-200
            ">
              <UserIcon className="w-6 h-6 text-purple-600" />
            </div>
            
            {/* Información del usuario */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {userProfile.name}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {userProfile.role === 'guest' ? 'Invitado' : 
                 userProfile.role === 'admin' ? 'Administrador' : 'Usuario'}
              </div>
            </div>

            {/* Indicador de estado */}
            <div className={`
              w-3 h-3 rounded-full
              ${isLoggedIn ? 'bg-green-400' : 'bg-gray-400'}
            `} />
          </div>

          {/* Botones de acción */}
          <div className="mt-3 space-y-2">
            {!isLoggedIn ? (
              <div className="space-y-2">
                <Link 
                  to="/login"
                  onClick={closeSidebar}
                  className="
                    w-full px-3 py-2 text-sm font-medium text-white
                    bg-gradient-to-r from-purple-600 to-gray-800
                    hover:from-purple-700 hover:to-gray-900
                    rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    block text-center no-underline
                  "
                >
                  Iniciar Sesión
                </Link>
                <button className="
                  w-full px-3 py-2 text-sm font-medium text-gray-700
                  border border-gray-300 hover:bg-gray-50
                  rounded-lg transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                ">
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {userProfile.role === 'admin' && (
                  <button className="
                    w-full px-3 py-2 text-sm font-medium text-white
                    bg-gradient-to-r from-purple-600 to-gray-800
                    hover:from-purple-700 hover:to-gray-900
                    rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    flex items-center justify-center space-x-2
                  ">
                    <AdminIcon className="w-4 h-4" />
                    <span>Panel de Admin</span>
                  </button>
                )}
                <button 
                  className="
                    w-full px-3 py-2 text-sm font-medium text-gray-700
                    border border-gray-300 hover:bg-gray-50
                    rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  "
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contenido del sidebar */}
        <div className="p-4 h-full overflow-y-auto bg-white">
          <nav className="space-y-1">
            <Link
              to="/"
              onClick={closeSidebar}
              className="
                block px-3 py-2 rounded-md text-sm font-medium
                text-gray-700 hover:text-purple-600
                hover:bg-gradient-to-r hover:from-purple-50 hover:to-gray-50
                transition-all duration-200 border-l-2 border-transparent
                hover:border-purple-500 hover:shadow-sm
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              "
            >
              🏠 Inicio
            </Link>
            
            <Link
              to="/productos"
              onClick={closeSidebar}
              className="
                block px-3 py-2 rounded-md text-sm font-medium
                text-gray-700 hover:text-purple-600
                hover:bg-gradient-to-r hover:from-purple-50 hover:to-gray-50
                transition-all duration-200 border-l-2 border-transparent
                hover:border-purple-500 hover:shadow-sm
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              "
            >
              🛍️ Productos
            </Link>
          </nav>
        </div>

        {/* Footer del sidebar */}
        <div className="
          absolute bottom-0 left-0 right-0 p-4 
          border-t border-gray-200 bg-gray-50
        ">
          <p className="text-sm text-gray-500 text-center">
            E-commerce v1.0
          </p>
        </div>
      </aside>
    </>
  );
};
