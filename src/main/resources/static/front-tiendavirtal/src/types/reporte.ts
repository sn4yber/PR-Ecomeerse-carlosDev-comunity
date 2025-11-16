/**
 * Tipos para estadísticas y reportes del panel de administrador
 */

export interface EstadisticasGenerales {
  // Estadísticas de productos
  totalProductos: number;
  productosSinStock: number;
  productosActivos: number;

  // Estadísticas de usuarios
  totalUsuarios: number;
  usuariosAdministradores: number;

  // Estadísticas de ventas
  ventasTotales: number;
  totalPedidos: number;
  pedidosPendientes: number;

  // Categoría más popular
  categoriaMasPopular: string;
  productosEnCategoriaMasPopular: number;
}

export interface VentaMensual {
  mes: string;
  year: number;
  ventas: number;
  pedidos: number;
}

export interface ProductoMasVendido {
  productoId: number;
  nombre: string;
  cantidadVendida: number;
  ventasTotales: number;
}
