/**
 * @fileoverview Componente de página Login
 * @description Página de autenticación del e-commerce con persistencia
 * @author E-commerce Team
 * @created 2025-09-25
 */

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export interface LoginProps {
  className?: string;
}

export const Login: React.FC<LoginProps> = ({ className = "" }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("endpoint del back", { //Snayber aqui va el endpoint ej:"https://dominio/api/login"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreUsuario, contrasena }),
      });

      if (!response.ok) throw new Error("Credenciales inválidas");
      return response.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard"; // Redirección
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate();
  };

  return (
    <main className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Iniciar Sesión
            </span>
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
              <input
                type="text"
                id="usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
              disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Autenticando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;