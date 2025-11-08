/**
 * @fileoverview Tipos para la gestión de pedidos
 */

export interface PedidoDetalle {
  id: number;
  numeroPedido: string;
  numeroTicket: string;
  fechaPedido: string;
  total: number;
  estadoPedido: EstadoPedido;
  estadoPago: EstadoPago;
  metodoPago: string;
  
  // Información del cliente
  clienteNombre: string;
  clienteEmail: string;
  clienteTelefono: string;
  clienteIdentificacion: string;
  clienteDireccion: string;
  clienteCiudad: string;
  clientePais: string;
  
  // Información del usuario
  usuarioId: number;
  
  // Totales
  subtotal: number;
  descuentos: number;
  impuestos: number;
}

export type EstadoPedido = 
  | 'PENDIENTE' 
  | 'PROCESANDO' 
  | 'ENVIADO' 
  | 'ENTREGADO' 
  | 'CANCELADO' 
  | 'REEMBOLSADO';

export type EstadoPago = 
  | 'PENDIENTE' 
  | 'COMPLETADO' 
  | 'FALLIDO' 
  | 'REEMBOLSADO';

export interface ActualizarEstadoPedido {
  estadoPedido: EstadoPedido;
  estadoPago: EstadoPago;
}

export interface FiltrosPedidos {
  search?: string;
  estadoPedido?: EstadoPedido | '';
  estadoPago?: EstadoPago | '';
}

export interface EstadisticasPedidos {
  totalPedidos: number;
  pendientes: number;
  procesando: number;
  enviados: number;
  entregados: number;
  cancelados: number;
  totalVentas: number;
  ventasMesActual: number;
}

// Mapeo de estados a colores para UI
export const ESTADO_PEDIDO_COLORS: Record<EstadoPedido, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  PROCESANDO: 'bg-blue-100 text-blue-800',
  ENVIADO: 'bg-purple-100 text-purple-800',
  ENTREGADO: 'bg-green-100 text-green-800',
  CANCELADO: 'bg-red-100 text-red-800',
  REEMBOLSADO: 'bg-gray-100 text-gray-800',
};

export const ESTADO_PAGO_COLORS: Record<EstadoPago, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  COMPLETADO: 'bg-green-100 text-green-800',
  FALLIDO: 'bg-red-100 text-red-800',
  REEMBOLSADO: 'bg-orange-100 text-orange-800',
};

// Labels en español
export const ESTADO_PEDIDO_LABELS: Record<EstadoPedido, string> = {
  PENDIENTE: 'Pendiente',
  PROCESANDO: 'Procesando',
  ENVIADO: 'Enviado',
  ENTREGADO: 'Entregado',
  CANCELADO: 'Cancelado',
  REEMBOLSADO: 'Reembolsado',
};

export const ESTADO_PAGO_LABELS: Record<EstadoPago, string> = {
  PENDIENTE: 'Pendiente',
  COMPLETADO: 'Completado',
  FALLIDO: 'Fallido',
  REEMBOLSADO: 'Reembolsado',
};
