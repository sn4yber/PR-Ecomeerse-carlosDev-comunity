/**
 * @fileoverview Componente de página Login
 * @description Página de autenticación del e-commerce con persistencia
 * @author E-commerce Team
 * @created 2025-09-25
 */

import React from 'react';
// import { useQuery } from '@tanstack/react-query'; // Descomentar para verificar auth
// import { useMutation } from '@tanstack/react-query'; // Descomentar para login mutations

/**
 * Props del componente Login
 */
export interface LoginProps {
  className?: string;
}

/**
 * Componente Login - Página de autenticación
 * 
 * Características:
 * - Diseño responsivo
 * - Formulario de login
 * - Persistencia de sesión (comentada para implementación futura)
 * - Validación de campos
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la autenticación
 * - Interface Segregation: Props específicas y necesarias
 * 
 * @param className - Clases CSS adicionales
 */
export const Login: React.FC<LoginProps> = ({ className = "" }) => {
  /**
   * PERSISTENCIA DE LOGIN - PARA IMPLEMENTAR DESPUÉS
   * 
   * Tip: Usar useQuery para verificar token al cargar
   * Tip: Usar useMutation para login
   * Tip: localStorage para guardar token
   * Tip: En App.tsx agregar verificación global
   */

  return (
    <main className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Iniciar Sesión
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Autenticación para acceder al e-commerce
          </p>
        </div>

        {/* Contenido principal - vacío por ahora como solicitado */}
        <div className="bg-white rounded-lg shadow-sm p-8 min-h-96 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">Login en construcción</h2>
            <p>El sistema de autenticación se agregará próximamente</p>
          </div>
        </div>

        {/* Información para desarrolladores */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            nota-HENRY - para la persistencia de login
          </h3>
          <p className="text-xs text-blue-700">
            Para persistencia de login: useQuery + localStorage + verificación en App.tsx
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
