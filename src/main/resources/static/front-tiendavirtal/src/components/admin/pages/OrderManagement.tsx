/**
 * @fileoverview Componente de Gestión de Pedidos para Admin
 * @description Página para administrar pedidos del e-commerce
 * @author E-commerce Team
 * @created 2025-09-29
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePedidos, useActualizarEstadoPedido, useEstadisticasPedidos } from '../../../hooks/usePedidos';
import type { PedidoDetalle, FiltrosPedidos, EstadoPedido, EstadoPago } from '../../../types/pedido';
import { 
  ESTADO_PEDIDO_COLORS, 
  ESTADO_PAGO_COLORS,
  ESTADO_PEDIDO_LABELS,
  ESTADO_PAGO_LABELS
} from '../../../types/pedido';

export interface OrderManagementProps {
  className?: string;
}

/**
 * Componente OrderManagement - Gestión de pedidos
 */
export const OrderManagement: React.FC<OrderManagementProps> = ({ className = "" }) => {
  const [filtros, setFiltros] = useState<FiltrosPedidos>({
    search: '',
    estadoPedido: '',
    estadoPago: '',
  });
  
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<PedidoDetalle | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { data: pedidos = [], isLoading, error, refetch } = usePedidos(filtros);
  const { data: estadisticas } = useEstadisticasPedidos();
  const actualizarEstadoMutation = useActualizarEstadoPedido();

  const handleFiltroChange = (campo: keyof FiltrosPedidos, valor: string) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleVerDetalle = (pedido: PedidoDetalle) => {
    setPedidoSeleccionado(pedido);
    setMostrarModal(true);
  };

  const handleActualizarEstado = async (estadoPedido: EstadoPedido, estadoPago: EstadoPago) => {
    if (!pedidoSeleccionado) return;

    try {
      await actualizarEstadoMutation.mutateAsync({
        id: pedidoSeleccionado.id,
        datos: { estadoPedido, estadoPago },
      });
      setMostrarModal(false);
      setPedidoSeleccionado(null);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado del pedido');
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
              <p className="text-gray-600">Administrar pedidos, estados de entrega y facturación</p>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              ← Volver al Panel
            </Link>
          </div>
        </div>

        {/* Estadísticas */}
        {estadisticas && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.totalPedidos}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.pendientes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Entregados</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.entregados}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ventas Mes</p>
                  <p className="text-xl font-bold text-gray-900">{formatearPrecio(estadisticas.ventasMesActual)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                value={filtros.search}
                onChange={(e) => handleFiltroChange('search', e.target.value)}
                placeholder="Número de pedido, cliente, email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado Pedido
              </label>
              <select
                value={filtros.estadoPedido}
                onChange={(e) => handleFiltroChange('estadoPedido', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Todos</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="PROCESANDO">Procesando</option>
                <option value="ENVIADO">Enviado</option>
                <option value="ENTREGADO">Entregado</option>
                <option value="CANCELADO">Cancelado</option>
                <option value="REEMBOLSADO">Reembolsado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado Pago
              </label>
              <select
                value={filtros.estadoPago}
                onChange={(e) => handleFiltroChange('estadoPago', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Todos</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="COMPLETADO">Completado</option>
                <option value="FALLIDO">Fallido</option>
                <option value="REEMBOLSADO">Reembolsado</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>

        {/* Tabla de Pedidos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-gray-600">Cargando pedidos...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              Error al cargar pedidos: {error.message}
            </div>
          ) : pedidos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No se encontraron pedidos
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado Pago
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pedido.numeroPedido}</div>
                        <div className="text-sm text-gray-500">{pedido.numeroTicket}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pedido.clienteNombre}</div>
                        <div className="text-sm text-gray-500">{pedido.clienteEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatearFecha(pedido.fechaPedido)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatearPrecio(pedido.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ESTADO_PEDIDO_COLORS[pedido.estadoPedido]}`}>
                          {ESTADO_PEDIDO_LABELS[pedido.estadoPedido]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ESTADO_PAGO_COLORS[pedido.estadoPago]}`}>
                          {ESTADO_PAGO_LABELS[pedido.estadoPago]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleVerDetalle(pedido)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalle */}
      {mostrarModal && pedidoSeleccionado && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
          }}
          onClick={() => setMostrarModal(false)}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '0.5rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                Detalle del Pedido
              </h2>
              <p style={{ color: '#6B7280' }}>{pedidoSeleccionado.numeroPedido}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                Información del Cliente
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div>
                  <p style={{ color: '#6B7280' }}>Nombre:</p>
                  <p style={{ fontWeight: '500' }}>{pedidoSeleccionado.clienteNombre}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Email:</p>
                  <p style={{ fontWeight: '500' }}>{pedidoSeleccionado.clienteEmail}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Teléfono:</p>
                  <p style={{ fontWeight: '500' }}>{pedidoSeleccionado.clienteTelefono}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Identificación:</p>
                  <p style={{ fontWeight: '500' }}>{pedidoSeleccionado.clienteIdentificacion}</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <p style={{ color: '#6B7280' }}>Dirección:</p>
                  <p style={{ fontWeight: '500' }}>
                    {pedidoSeleccionado.clienteDireccion}, {pedidoSeleccionado.clienteCiudad}, {pedidoSeleccionado.clientePais}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                Información del Pedido
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div>
                  <p style={{ color: '#6B7280' }}>Método de Pago:</p>
                  <p style={{ fontWeight: '500' }}>{pedidoSeleccionado.metodoPago}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Fecha:</p>
                  <p style={{ fontWeight: '500' }}>{formatearFecha(pedidoSeleccionado.fechaPedido)}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Subtotal:</p>
                  <p style={{ fontWeight: '500' }}>{formatearPrecio(pedidoSeleccionado.subtotal)}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Impuestos:</p>
                  <p style={{ fontWeight: '500' }}>{formatearPrecio(pedidoSeleccionado.impuestos)}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Descuentos:</p>
                  <p style={{ fontWeight: '500' }}>{formatearPrecio(pedidoSeleccionado.descuentos)}</p>
                </div>
                <div>
                  <p style={{ color: '#6B7280' }}>Total:</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#059669' }}>
                    {formatearPrecio(pedidoSeleccionado.total)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                Actualizar Estados
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Estado del Pedido
                  </label>
                  <select
                    value={pedidoSeleccionado.estadoPedido}
                    onChange={(e) => {
                      setPedidoSeleccionado({
                        ...pedidoSeleccionado,
                        estadoPedido: e.target.value as EstadoPedido,
                      });
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.375rem',
                    }}
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="PROCESANDO">Procesando</option>
                    <option value="ENVIADO">Enviado</option>
                    <option value="ENTREGADO">Entregado</option>
                    <option value="CANCELADO">Cancelado</option>
                    <option value="REEMBOLSADO">Reembolsado</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Estado del Pago
                  </label>
                  <select
                    value={pedidoSeleccionado.estadoPago}
                    onChange={(e) => {
                      setPedidoSeleccionado({
                        ...pedidoSeleccionado,
                        estadoPago: e.target.value as EstadoPago,
                      });
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.375rem',
                    }}
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="COMPLETADO">Completado</option>
                    <option value="FALLIDO">Fallido</option>
                    <option value="REEMBOLSADO">Reembolsado</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setMostrarModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontWeight: '500',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleActualizarEstado(pedidoSeleccionado.estadoPedido, pedidoSeleccionado.estadoPago)}
                disabled={actualizarEstadoMutation.isPending}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  backgroundColor: '#4F46E5',
                  color: '#ffffff',
                  fontWeight: '500',
                  cursor: actualizarEstadoMutation.isPending ? 'not-allowed' : 'pointer',
                  opacity: actualizarEstadoMutation.isPending ? 0.6 : 1,
                }}
              >
                {actualizarEstadoMutation.isPending ? 'Actualizando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
