/**
 * API Client para reportes y estadísticas del panel de administrador
 */

import type { EstadisticasGenerales } from '../types/reporte';
import { ensureValidToken } from '../lib/tokenRefresh';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Obtiene las estadísticas generales del e-commerce
 * Solo accesible para administradores
 */
export const obtenerEstadisticasGenerales = async (): Promise<EstadisticasGenerales> => {
  await ensureValidToken();
  
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  const response = await fetch(`${API_BASE_URL}/api/admin/estadisticas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('No tienes permisos para acceder a las estadísticas');
    }
    throw new Error('Error al obtener las estadísticas');
  }

  const data = await response.json();
  return data;
};
