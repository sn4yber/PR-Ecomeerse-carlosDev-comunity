/**
 * @fileoverview Componente de Gestión de Usuarios para Admin
 * @description Página para administrar usuarios del e-commerce
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React from 'react';
import { Link } from 'react-router-dom';

export interface UserManagementProps {
  className?: string;
}

/**
 * Componente UserManagement - Gestión de usuarios
 * 
 * Características:
 * - CRUD de usuarios
 * - Gestión de roles
 * - Control de permisos
 * 
 * @param className - Clases CSS adicionales
 */
export const UserManagement: React.FC<UserManagementProps> = ({ className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
              <p className="text-gray-600">Administrar usuarios y permisos</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Gestión de Usuarios
          </h3>
          <p className="text-gray-500">
            Esta funcionalidad está en desarrollo. Pronto podrás gestionar usuarios, roles y permisos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
