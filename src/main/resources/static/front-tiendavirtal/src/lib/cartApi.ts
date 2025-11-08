/**
 * @fileoverview API Client para el sistema de Carrito
 * @description Servicios para comunicación con el backend del carrito
 * @author E-commerce Team
 * @created 2025-10-13
 */

import { ensureValidToken } from './tokenRefresh';
import type {
  Cart,
  AgregarProductoRequest,
  ActualizarCantidadRequest,
  CheckoutResponse,
  VerificarStockResponse,
  CantidadItemsResponse,
  CheckoutRequest,
  Factura
} from '../types/cart';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Obtener headers con token de autenticación válido
 */
const getAuthHeaders = async (): Promise<HeadersInit> => {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

/**
 * Manejar errores de las respuestas HTTP
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMsg = `Error HTTP ${response.status}`;
    try {
      const error = await response.json();
      errorMsg = error.error || error.message || errorMsg;
    } catch {
      errorMsg = `Error al procesar la solicitud (${response.status})`;
    }
    throw new Error(errorMsg);
  }
  
  return response.json();
};

/**
 * Servicios del carrito
 */
export const cartAPI = {
  /**
   * Obtener el carrito del usuario autenticado
   */
  obtenerCarrito: async (): Promise<Cart> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    
    return handleResponse<Cart>(response);
  },

  /**
   * Obtener la cantidad de items en el carrito
   */
  obtenerCantidadItems: async (): Promise<number> => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/carrito/cantidad`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });
      
      const data = await handleResponse<CantidadItemsResponse>(response);
      return data.cantidad;
    } catch (error) {
      console.error('Error al obtener cantidad de items:', error);
      return 0;
    }
  },

  /**
   * Agregar un producto al carrito
   */
  agregarProducto: async (request: AgregarProductoRequest): Promise<Cart> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito/agregar`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(request),
    });
    
    return handleResponse<Cart>(response);
  },

  /**
   * Actualizar la cantidad de un producto en el carrito
   */
  actualizarCantidad: async (
    idProducto: number,
    request: ActualizarCantidadRequest
  ): Promise<Cart> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito/producto/${idProducto}`, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(request),
    });
    
    return handleResponse<Cart>(response);
  },

  /**
   * Eliminar un producto del carrito
   */
  eliminarProducto: async (idProducto: number): Promise<Cart> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito/producto/${idProducto}`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    });
    
    return handleResponse<Cart>(response);
  },

  /**
   * Vaciar el carrito completamente
   */
  vaciarCarrito: async (): Promise<Cart> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito/vaciar`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    });
    
    return handleResponse<Cart>(response);
  },

  /**
   * Verificar stock disponible para el carrito
   */
  verificarStock: async (): Promise<boolean> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito/verificar-stock`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    
    const data = await handleResponse<VerificarStockResponse>(response);
    return data.stockDisponible;
  },

  /**
   * Realizar el checkout (convertir carrito a pedido) - DEPRECATED
   * @deprecated Usar checkoutConFactura en su lugar
   */
  checkout: async (): Promise<number> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito/checkout`, {
      method: 'POST',
      headers,
      credentials: 'include',
    });
    
    const data = await handleResponse<CheckoutResponse>(response);
    return data.idPedido;
  },

  /**
   * Realizar checkout con datos de facturación
   */
  checkoutConFactura: async (request: CheckoutRequest): Promise<Factura> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/carrito/checkout`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(request),
    });
    
    return handleResponse<Factura>(response);
  },
};

/**
 * Hook personalizado para usar la API del carrito (opcional)
 * Exportar para uso directo en componentes
 */
export const useCartAPI = () => {
  return {
    obtenerCarrito: cartAPI.obtenerCarrito,
    obtenerCantidadItems: cartAPI.obtenerCantidadItems,
    agregarProducto: cartAPI.agregarProducto,
    actualizarCantidad: cartAPI.actualizarCantidad,
    eliminarProducto: cartAPI.eliminarProducto,
    vaciarCarrito: cartAPI.vaciarCarrito,
    verificarStock: cartAPI.verificarStock,
    checkout: cartAPI.checkout,
    checkoutConFactura: cartAPI.checkoutConFactura,
  };
};
