/**
 * @fileoverview API para gestión de usuarios
 * @author E-commerce Team
 */

import { ensureValidToken } from '../lib/tokenRefresh';
import type {
  Usuario,
  CrearUsuarioRequest,
  ActualizarUsuarioRequest,
  FiltrosUsuarios,
  ActualizarPerfilRequest,
  CambiarContrasenaRequest
} from '../types/usuario';

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Obtener lista de todos los usuarios (requiere autenticación ADMIN)
 */
export async function obtenerUsuarios(filtros: FiltrosUsuarios = {}): Promise<Usuario[]> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener usuarios');
  }

  let usuarios: Usuario[] = await response.json();

  // Aplicar filtros en el cliente si es necesario
  if (filtros.search) {
    const searchLower = filtros.search.toLowerCase();
    usuarios = usuarios.filter(u => 
      u.nombre.toLowerCase().includes(searchLower) ||
      u.apellido.toLowerCase().includes(searchLower) ||
      u.nombreUsuario.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower)
    );
  }

  if (filtros.rol && filtros.rol !== 'ALL') {
    usuarios = usuarios.filter(u => u.rol === filtros.rol);
  }

  return usuarios;
}

/**
 * Obtener un usuario por ID
 */
export async function obtenerUsuarioPorId(id: number): Promise<Usuario> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener usuario');
  }

  return response.json();
}

/**
 * Crear un nuevo usuario / Registro
 */
export async function crearUsuario(datos: CrearUsuarioRequest): Promise<Usuario> {
  // Para registro público, no requiere token
  // Para crear desde admin, sí requiere token
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  try {
    const token = await ensureValidToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    // Si no hay token, continuar sin él (registro público)
  }

  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error al crear usuario');
  }

  return response.json();
}

/**
 * Actualizar un usuario existente
 */
export async function actualizarUsuario(
  id: number,
  datos: ActualizarUsuarioRequest
): Promise<Usuario> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
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
    throw new Error(error || 'Error al actualizar usuario');
  }

  return response.json();
}

/**
 * Eliminar un usuario
 */
export async function eliminarUsuario(id: number): Promise<void> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar usuario');
  }
}

/**
 * Registrar un nuevo usuario (versión pública sin autenticación)
 */
export async function registrarUsuario(datos: CrearUsuarioRequest): Promise<Usuario> {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...datos,
      rol: 'USER' // Forzar rol USER para registros públicos
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error al registrar usuario');
  }

  return response.json();
}

// ========== API DE PERFIL DE USUARIO ==========

/**
 * Obtener perfil del usuario autenticado
 */
export async function obtenerMiPerfil(): Promise<Usuario> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener perfil');
  }

  return response.json();
}

/**
 * Actualizar perfil del usuario autenticado
 */
export async function actualizarMiPerfil(datos: ActualizarPerfilRequest): Promise<Usuario> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
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
    throw new Error(error || 'Error al actualizar perfil');
  }

  return response.json();
}

/**
 * Cambiar contraseña del usuario autenticado
 */
export async function cambiarContrasena(datos: CambiarContrasenaRequest): Promise<void> {
  const token = await ensureValidToken();
  
  if (!token) {
    throw new Error('Error de autenticación. Por favor, inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_BASE_URL}/usuarios/cambiar-contrasena`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error al cambiar contraseña');
  }
}
