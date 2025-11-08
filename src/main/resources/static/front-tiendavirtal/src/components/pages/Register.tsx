/**
 * @fileoverview Componente de página de Registro
 * @description Página de registro público para nuevos usuarios
 * @author E-commerce Team
 * @created 2025-11-08
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registrarUsuario } from '../../api/usuariosApi';
import type { CrearUsuarioRequest } from '../../types/usuario';

export interface RegisterProps {
  className?: string;
}

/**
 * Componente Register - Registro de nuevos usuarios
 * 
 * Características:
 * - Formulario de registro completo
 * - Validación de campos
 * - Registro automático como USER
 * - Redirección a login después del registro
 * - Integración con sistema de carrito
 * 
 * @param className - Clases CSS adicionales
 */
export const Register: React.FC<RegisterProps> = ({ className = "" }) => {
  const [formulario, setFormulario] = useState<CrearUsuarioRequest>({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    email: '',
    telefono: '',
    rol: 'USER'
  });

  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const registroMutation = useMutation({
    mutationFn: registrarUsuario,
    onSuccess: () => {
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      window.location.href = '/login';
    },
    onError: (error: any) => {
      setError(error.message || 'Error al registrar usuario');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (formulario.contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formulario.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    registroMutation.mutate(formulario);
  };

  return (
    <main className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 ${className}`}>
      <div className="w-full max-w-2xl">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-sm text-gray-600">
            Regístrate para comenzar a comprar
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  required
                  minLength={2}
                  maxLength={50}
                  value={formulario.nombre}
                  onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  required
                  minLength={2}
                  maxLength={50}
                  value={formulario.apellido}
                  onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            {/* Usuario y Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700">
                  Nombre de Usuario *
                </label>
                <input
                  type="text"
                  id="nombreUsuario"
                  required
                  minLength={3}
                  maxLength={50}
                  value={formulario.nombreUsuario}
                  onChange={(e) => setFormulario({ ...formulario, nombreUsuario: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  placeholder="usuario123"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  maxLength={100}
                  value={formulario.email}
                  onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono (Opcional)
              </label>
              <input
                type="tel"
                id="telefono"
                maxLength={20}
                value={formulario.telefono}
                onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                placeholder="+57 300 123 4567"
              />
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                  Contraseña *
                </label>
                <input
                  type="password"
                  id="contrasena"
                  required
                  minLength={6}
                  value={formulario.contrasena}
                  onChange={(e) => setFormulario({ ...formulario, contrasena: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña *
                </label>
                <input
                  type="password"
                  id="confirmarContrasena"
                  required
                  minLength={6}
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terminos"
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300"
                />
              </div>
              <label htmlFor="terminos" className="ml-2 text-sm text-gray-600">
                Acepto los{' '}
                <a href="#" className="text-purple-600 hover:underline">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-purple-600 hover:underline">
                  política de privacidad
                </a>
              </label>
            </div>

            {/* Info adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>📦 Beneficios de registrarse:</strong>
                <br />
                • Guarda tus productos favoritos en el carrito
                <br />
                • Realiza compras de forma segura
                <br />
                • Accede al historial de tus pedidos
                <br />• Recibe notificaciones sobre tus compras
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={registroMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-md flex items-center justify-center space-x-2"
            >
              {registroMutation.isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                  </svg>
                  <span>Registrando...</span>
                </>
              ) : (
                <>
                  <span>Crear Cuenta</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            {/* Link a Login */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
