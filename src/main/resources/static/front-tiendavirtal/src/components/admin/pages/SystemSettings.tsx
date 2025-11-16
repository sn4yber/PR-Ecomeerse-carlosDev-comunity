/**
 * @fileoverview Componente de Configuración del Sistema para Admin
 * @description Página para configurar parámetros del sistema del e-commerce
 * @author E-commerce Team
 * @created 2025-09-29
 * @updated 2025-11-16 - Implementado panel completo de configuración
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ConfiguracionPanel } from '../../pages/ConfiguracionPanel';

export interface SystemSettingsProps {
  className?: string;
}

/**
 * Componente SystemSettings - Configuración completa del sistema
 * 
 * Características:
 * - Configuración general (nombre, contacto, descripción)
 * - Configuración de tienda (moneda, IVA, envío)
 * - Opciones avanzadas (mantenimiento, stock, permisos)
 * - Todo guardado en localStorage
 * 
 * @param className - Clases CSS adicionales
 */
export const SystemSettings: React.FC<SystemSettingsProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header con botón de regreso */}
        <div className="mb-6">
          <div className="flex items-center justify-end">
            <Link
              to="/admin"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Panel
            </Link>
          </div>
        </div>

        {/* Panel de configuración completo */}
        <ConfiguracionPanel />
      </div>
    </div>
  );
};

export default SystemSettings;