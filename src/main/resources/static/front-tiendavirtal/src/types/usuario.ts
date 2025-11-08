/**
 * @fileoverview Tipos para gestión de usuarios
 * @author E-commerce Team
 */

/**
 * Interface del Usuario
 */
export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  telefono?: string;
  rol: 'ADMIN' | 'USER';
  fechaCreacion: string;
  fechaModificacion: string;
}

/**
 * DTO para crear/registrar usuario
 */
export interface CrearUsuarioRequest {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  contrasena: string;
  email: string;
  telefono?: string;
  rol?: 'ADMIN' | 'USER';
}

/**
 * DTO para actualizar usuario
 */
export interface ActualizarUsuarioRequest {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  email: string;
  telefono?: string;
  rol: 'ADMIN' | 'USER';
  contrasena?: string; // Opcional para cambiar contraseña
}

/**
 * Filtros para búsqueda de usuarios
 */
export interface FiltrosUsuarios {
  search?: string;
  rol?: 'ADMIN' | 'USER' | 'ALL';
}

/**
 * Estadísticas de usuarios
 */
export interface EstadisticasUsuarios {
  totalUsuarios: number;
  totalAdmins: number;
  totalClientes: number;
  nuevosEsteMes: number;
}
