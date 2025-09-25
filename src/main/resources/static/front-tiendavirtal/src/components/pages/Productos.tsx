/**
 * @fileoverview Componente de página Productos
 * @description Página de productos del e-commerce
 * @author E-commerce Team
 * @created 2025-09-25
 */

import React from 'react';

/**
 * Props del componente Productos
 */
export interface ProductosProps {
  className?: string;
}

/**
 * Componente Productos - Página de productos
 * 
 * Características:
 * - Diseño responsivo
 * - Lista de productos
 * - Filtros y búsqueda (pendiente)
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la presentación de productos
 * - Interface Segregation: Props específicas y necesarias
 * 
 * @param className - Clases CSS adicionales
 */
export const Productos: React.FC<ProductosProps> = ({ className = "" }) => {
  return (
    <main className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Productos
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Explora nuestro catálogo completo de productos gaming
          </p>
        </div>

        {/* Contenido principal - vacío por ahora como solicitado */}
        <div className="bg-white rounded-lg shadow-sm p-8 min-h-96 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">Página en construcción</h2>
            <p>El contenido de productos se agregará próximamente</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Productos;
