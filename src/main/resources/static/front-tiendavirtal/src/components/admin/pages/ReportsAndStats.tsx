/**
 * @fileoverview Componente de Reportes y Estadísticas para Admin
 * @description Página para visualizar reportes y estadísticas del e-commerce
 * @author E-commerce Team
 * @created 2025-09-29
 * @updated 2025-11-14 - Implementado panel completo de reportes
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ReportesPanel } from '../../pages/ReportesPanel';

export interface ReportsAndStatsProps {
  className?: string;
}

/**
 * Componente ReportsAndStats - Reportes y estadísticas completos
 * 
 * Características:
 * - Métricas de ventas en tiempo real
 * - Análisis de productos e inventario
 * - Estadísticas de usuarios
 * - Dashboard visual con cards y gráficos
 * 
 * @param className - Clases CSS adicionales
 */
export const ReportsAndStats: React.FC<ReportsAndStatsProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header con botón de regreso */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reportes y Estadísticas</h1>
              <p className="text-gray-600 mt-1">Métricas clave del e-commerce</p>
            </div>
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

        {/* Panel de reportes completo */}
        <ReportesPanel />
      </div>
    </div>
  );
};

export default ReportsAndStats;
