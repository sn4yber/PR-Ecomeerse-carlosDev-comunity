/**
 * @fileoverview Componente de Reportes y Estadísticas para Admin
 * @description Página para visualizar reportes y estadísticas del e-commerce
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React from 'react';
import { Link } from 'react-router-dom';

export interface ReportsAndStatsProps {
  className?: string;
}

/**
 * Componente ReportsAndStats - Reportes y estadísticas
 * 
 * Características:
 * - Métricas de ventas
 * - Análisis de productos
 * - Estadísticas de usuarios
 * - Dashboards interactivos
 * 
 * @param className - Clases CSS adicionales
 */
export const ReportsAndStats: React.FC<ReportsAndStatsProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reportes y Estadísticas</h1>
              <p className="text-gray-600">Analizar ventas, tendencias y métricas del negocio</p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              ← Volver al Panel
            </Link>
          </div>
        </div>

        {/* Banner de desarrollo */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">
                🚧 Módulo en Desarrollo
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                El módulo de reportes y estadísticas está siendo desarrollado por el equipo. Próximamente tendrás acceso a métricas detalladas, gráficos de ventas y reportes personalizados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndStats;
