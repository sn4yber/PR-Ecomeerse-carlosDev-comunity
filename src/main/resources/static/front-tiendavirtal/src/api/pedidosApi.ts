/**
 * @fileoverview API para gestión de pedidos
 */

import { ensureValidToken } from '../lib/tokenRefresh';

const API_BASE_URL = 'http://localhost:8080/api';

import type { 
  PedidoDetalle, 
  ActualizarEstadoPedido, 
  FiltrosPedidos,
  EstadisticasPedidos 
} from '../types/pedido';

/**
 * Obtener lista de pedidos con filtros
 */
export async function obtenerPedidos(filtros: FiltrosPedidos = {}): Promise<PedidoDetalle[]> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const params = new URLSearchParams();
  
  if (filtros.search) {
    params.append('search', filtros.search);
  }
  if (filtros.estadoPedido) {
    params.append('estadoPedido', filtros.estadoPedido);
  }
  if (filtros.estadoPago) {
    params.append('estadoPago', filtros.estadoPago);
  }

  const url = `${API_BASE_URL}/pedidos/admin/lista${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener pedidos');
  }

  return response.json();
}

/**
 * Obtener detalle de un pedido
 */
export async function obtenerDetallePedido(id: number): Promise<PedidoDetalle> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/pedidos/admin/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener detalle del pedido');
  }

  return response.json();
}

/**
 * Actualizar estado de un pedido
 */
export async function actualizarEstadoPedido(
  id: number, 
  datos: ActualizarEstadoPedido
): Promise<PedidoDetalle> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/pedidos/admin/${id}/estado`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error al actualizar estado del pedido');
  }

  return response.json();
}

/**
 * Obtener estadísticas de pedidos
 */
export async function obtenerEstadisticas(): Promise<EstadisticasPedidos> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/pedidos/admin/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener estadísticas');
  }

  return response.json();
}
