/**
 * @fileoverview Componente de página Carrito
 * @description Página del carrito de compras del e-commerce
 * @author E-commerce Team
 * @created 2025-09-25
 */

import React from 'react';

/**
 * Props del componente Carrito
 */
export interface CarritoProps {
  className?: string;
}

/**
 * Componente Carrito - Página del carrito de compras
 * 
 * Características:
 * - Diseño responsivo
 * - Lista de productos en carrito
 * - Cálculo de totales (pendiente)
 * - Proceso de checkout (pendiente)
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la presentación del carrito
 * - Interface Segregation: Props específicas y necesarias
 * 
 * @param className - Clases CSS adicionales
 */
export const Carrito: React.FC<CarritoProps> = ({ className = "" }) => {
  return (
    <main className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Carrito de Compras
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Revisa tus productos antes de finalizar la compra
          </p>
        </div>

        {/* Contenido principal - vacío por ahora como solicitado */}
        <div className="bg-white rounded-lg shadow-sm p-8 min-h-96 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">Carrito en construcción</h2>
            <p>La funcionalidad del carrito se agregará próximamente</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Carrito;
