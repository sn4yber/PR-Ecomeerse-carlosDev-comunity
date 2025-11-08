/**
 * @fileoverview Custom hooks para gestión de pedidos con React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { 
  PedidoDetalle, 
  ActualizarEstadoPedido, 
  FiltrosPedidos,
  EstadisticasPedidos 
} from '../types/pedido';
import * as pedidosApi from '../api/pedidosApi';

/**
 * Hook para obtener lista de pedidos
 */
export function usePedidos(filtros: FiltrosPedidos = {}) {
  return useQuery<PedidoDetalle[], Error>({
    queryKey: ['pedidos', filtros],
    queryFn: () => pedidosApi.obtenerPedidos(filtros),
    staleTime: 30000, // 30 segundos
  });
}

/**
 * Hook para obtener detalle de un pedido
 */
export function useDetallePedido(id: number | null) {
  return useQuery<PedidoDetalle, Error>({
    queryKey: ['pedido', id],
    queryFn: () => pedidosApi.obtenerDetallePedido(id!),
    enabled: id !== null,
  });
}

/**
 * Hook para actualizar estado de pedido
 */
export function useActualizarEstadoPedido() {
  const queryClient = useQueryClient();

  return useMutation<PedidoDetalle, Error, { id: number; datos: ActualizarEstadoPedido }>({
    mutationFn: ({ id, datos }) => pedidosApi.actualizarEstadoPedido(id, datos),
    onSuccess: () => {
      // Invalidar todas las queries de pedidos para refrescar la data
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      queryClient.invalidateQueries({ queryKey: ['pedido'] });
      queryClient.invalidateQueries({ queryKey: ['estadisticas-pedidos'] });
    },
  });
}

/**
 * Hook para obtener estadísticas
 */
export function useEstadisticasPedidos() {
  return useQuery<EstadisticasPedidos, Error>({
    queryKey: ['estadisticas-pedidos'],
    queryFn: pedidosApi.obtenerEstadisticas,
    staleTime: 60000, // 1 minuto
  });
}
