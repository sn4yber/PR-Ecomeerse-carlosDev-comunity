/**
 * @fileoverview Componente de Gestión de Pedidos para Admin
 * @description Página para administrar pedidos del e-commerce
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React from 'react';
import { Link } from 'react-router-dom';

export interface OrderManagementProps {
  className?: string;
}

/**
 * Componente OrderManagement - Gestión de pedidos
 * 
 * Características:
 * - CRUD de pedidos
 * - Gestión de estados
 * - Control de envíos
 * - Facturación
 * 
 * @param className - Clases CSS adicionales
 */
export const OrderManagement: React.FC<OrderManagementProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
              <p className="text-gray-600">Administrar pedidos, estados de entrega y facturación</p>
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
                El módulo de gestión de pedidos está siendo desarrollado por el equipo. Próximamente podrás administrar pedidos, actualizar estados y gestionar la facturación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
