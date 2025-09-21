/**
 * @fileoverview Componente Header principal del e-commerce
 * @description Header con menú hamburguesa lateral estilo Wikipedia y título centrado
 * @author E-commerce Team
 * @created 2025-09-20
 */

import React, { useState, useEffect } from 'react';
import type { HeaderProps } from '../../types';

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
  menuItems, 
  className = "" 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

          {/* Título centrado como botón transparente */}
          <div className="flex-1 flex justify-center">
            <button className="
              px-6 py-2 rounded-lg
              bg-transparent 
              hover:bg-gradient-to-r hover:from-purple-100 hover:to-gray-100
              active:bg-gradient-to-r active:from-purple-200 active:to-gray-200
              border border-transparent hover:border-purple-300
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              group
            ">
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
            </button>
          </div>

          {/* Espacio para mantener el centrado (igual al botón hamburguesa) */}
          <div className="w-10 h-10" />
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

        {/* Contenido del sidebar */}
        <nav className="p-4 space-y-2 overflow-y-auto max-h-full">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="
                flex items-center px-4 py-3 text-gray-700 
                hover:bg-gradient-to-r hover:from-purple-50 hover:to-gray-50
                hover:text-purple-800
                active:bg-gradient-to-r active:from-purple-100 active:to-gray-100
                rounded-lg transition-all duration-200
                border-l-4 border-transparent hover:border-purple-500
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              "
              onClick={closeSidebar}
            >
              {item.icon && (
                <span className="mr-3 text-lg" role="img" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

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
