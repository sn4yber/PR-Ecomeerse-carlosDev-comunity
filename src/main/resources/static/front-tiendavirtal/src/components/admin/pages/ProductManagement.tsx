/**
 * @fileoverview Componente de Gestión de Productos para Admin
 * @description Página para administrar productos del e-commerce
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React from 'react';
import { Link } from 'react-router-dom';

export interface ProductManagementProps {
  className?: string;
}

/**
 * Componente ProductManagement - Gestión de productos
 * 
 * Características:
 * - CRUD de productos
 * - Gestión de categorías
 * - Control de inventario
 * 
 * @param className - Clases CSS adicionales
 */
export const ProductManagement: React.FC<ProductManagementProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
              <p className="text-gray-600">Administrar catálogo de productos</p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              ← Volver al Panel
            </Link>
          </div>
        </div>

        {/* Contenido en construcción */}
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Gestión de Productos
          </h3>
          <p className="text-gray-500">
            Esta funcionalidad está en desarrollo. Pronto podrás gestionar todo el catálogo de productos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
