/**
 * @fileoverview API Client para comunicación con el backend
 * @description Cliente centralizado para todas las llamadas API
 * @author E-commerce Team
 * @created 2025-10-01
 */

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Interfaz para el modelo Producto
 */
export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidadStock: number;
  idCategoria?: number;
  codigoProducto?: string;
  urlImagen?: string;
  destacado?: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

/**
 * Obtener token de autenticación
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Headers por defecto para las peticiones
 */
const getHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Servicios de API para subir archivos
 */
export const filesAPI = {
  /**
   * Subir una imagen
   */
  subirImagen: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al subir imagen');
    }

    const data = await response.json();
    return {
      url: `http://localhost:8080${data.url}`,
      filename: data.filename,
    };
  },

  /**
   * Eliminar una imagen
   */
  eliminarImagen: async (filename: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/files/delete/${filename}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar imagen');
    }
  },
};

/**
 * Servicios de API para Productos
 */
export const productosAPI = {
  /**
   * Obtener todos los productos
   */
  obtenerTodos: async (): Promise<Producto[]> => {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'GET',
      headers: getHeaders(false),
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    return response.json();
  },

  /**
   * Obtener producto por ID
   */
  obtenerPorId: async (id: number): Promise<Producto> => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'GET',
      headers: getHeaders(false),
    });

    if (!response.ok) {
      throw new Error('Error al obtener producto');
    }

    return response.json();
  },

  /**
   * Crear nuevo producto
   */
  crear: async (producto: Producto): Promise<Producto> => {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Error al crear producto');
    }

    return response.json();
  },

  /**
   * Actualizar producto existente
   */
  actualizar: async (id: number, producto: Producto): Promise<Producto> => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Error al actualizar producto');
    }

    return response.json();
  },

  /**
   * Eliminar producto
   */
  eliminar: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Error al eliminar producto');
    }
  },

  /**
   * Obtener productos destacados
   */
  obtenerDestacados: async (): Promise<Producto[]> => {
    const response = await fetch(`${API_BASE_URL}/productos/destacados`, {
      method: 'GET',
      headers: getHeaders(false),
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos destacados');
    }

    return response.json();
  },

  /**
   * Obtener top 3 productos destacados
   */
  obtenerTop3Destacados: async (): Promise<Producto[]> => {
    const response = await fetch(`${API_BASE_URL}/productos/destacados/top3`, {
      method: 'GET',
      headers: getHeaders(false),
    });

    if (!response.ok) {
      throw new Error('Error al obtener top 3 productos destacados');
    }

    return response.json();
  },

  /**
   * Marcar/desmarcar producto como destacado
   */
  marcarDestacado: async (id: number, destacado: boolean): Promise<Producto> => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}/destacado?destacado=${destacado}`, {
      method: 'PATCH',
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Error al actualizar estado destacado');
    }

    return response.json();
  },

  /**
   * Buscar productos por nombre
   */
  buscarPorNombre: async (nombre: string): Promise<Producto[]> => {
    const response = await fetch(`${API_BASE_URL}/productos/buscar?nombre=${encodeURIComponent(nombre)}`, {
      method: 'GET',
      headers: getHeaders(false),
    });

    if (!response.ok) {
      throw new Error('Error al buscar productos');
    }

    return response.json();
  },
};

export default productosAPI;
