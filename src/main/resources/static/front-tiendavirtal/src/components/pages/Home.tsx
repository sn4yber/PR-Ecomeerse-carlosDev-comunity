/**
 * @fileoverview Componente de página Home
 * @description Página principal del e-commerce con hero section
 * @author E-commerce Team
 * @created 2025-09-20
 */

import React from 'react';

/**
 * Props del componente Home
 */
export interface HomeProps {
  className?: string;
}

/**
 * Componente Home - Página principal
 * 
 * Características:
 * - Diseño responsivo
 * - Gradientes consistentes con la marca
 * - Call to action principal
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la presentación del home
 * - Interface Segregation: Props específicas y necesarias
 * 
 * @param className - Clases CSS adicionales
 */
export const Home: React.FC<HomeProps> = ({ className = "" }) => {
  return (
    <main className={`min-h-screen ${className}`}>
      {/* Hero Section Principal */}
      <section className="bg-gray-100 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenido de texto */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                  Bienvenido a <span className="bg-gradient-to-r from-purple-600 to-gray-800 bg-clip-text text-transparent">NebulaTech</span>.
                </h1>
                <p className="text-xl text-gray-600 max-w-md">
                  Encuentra lo que necesitas, para romper todos los límites.
                </p>
              </div>
              
              <button className="bg-gradient-to-r from-purple-600 to-gray-800 hover:from-purple-700 hover:to-gray-900 text-white px-8 py-4 font-semibold transition-all duration-200 hover:scale-105">
                Ver Productos
              </button>
            </div>

            {/* Imagen del hero */}
            <div className="relative">
              <div className="rounded-lg overflow-hidden aspect-[4/3] shadow-lg">
                <img 
                  src="/random-image.png" 
                  alt="Gaming & PC Components - NebulaTech" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};
