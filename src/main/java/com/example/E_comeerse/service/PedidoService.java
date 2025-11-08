package com.example.E_comeerse.service;

import com.example.E_comeerse.dto.ActualizarEstadoPedidoDto;
import com.example.E_comeerse.dto.PedidoDetalleDto;
import com.example.E_comeerse.model.Pedido;
import com.example.E_comeerse.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    public Pedido guardarPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public void eliminarPedido(Long id) {
        pedidoRepository.deleteById(id);
    }

    public List<Pedido> obtenerPedidosPorUsuario(Long idUsuario) {
        return pedidoRepository.findByIdUsuario(idUsuario);
    }

    public List<Pedido> obtenerPedidosPorEstado(Pedido.EstadoPedido estado) {
        return pedidoRepository.findByEstadoPedido(estado);
    }

    // ========== MÉTODOS PARA GESTIÓN DE PEDIDOS ==========

    /**
     * Obtener todos los pedidos con filtros opcionales
     */
    @Transactional(readOnly = true)
    public List<PedidoDetalleDto> obtenerPedidosConFiltros(String search, String estadoPedido, String estadoPago) {
        String estadoPedidoStr = null;
        String estadoPagoStr = null;

        if (estadoPedido != null && !estadoPedido.isEmpty()) {
            try {
                estadoPedidoStr = Pedido.EstadoPedido.valueOf(estadoPedido.toUpperCase()).name();
            } catch (IllegalArgumentException e) {
                // Ignorar si el estado no es válido
            }
        }

        if (estadoPago != null && !estadoPago.isEmpty()) {
            try {
                estadoPagoStr = Pedido.EstadoPago.valueOf(estadoPago.toUpperCase()).name();
            } catch (IllegalArgumentException e) {
                // Ignorar si el estado no es válido
            }
        }

        List<Pedido> pedidos = pedidoRepository.findPedidosConFiltros(search, estadoPedidoStr, estadoPagoStr);
        return pedidos.stream()
                .map(pedido -> {
                    try {
                        return PedidoDetalleDto.fromEntity(pedido);
                    } catch (Exception e) {
                        // Log the error and skip this pedido
                        System.err.println("Error mapping pedido " + (pedido != null ? pedido.getId() : "null") + ": " + e.getMessage());
                        e.printStackTrace();
                        return null;
                    }
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
    }

    /**
     * Obtener detalle de un pedido
     */
    @Transactional(readOnly = true)
    public PedidoDetalleDto obtenerDetallePedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado: " + id));
        return PedidoDetalleDto.fromEntity(pedido);
    }

    /**
     * Actualizar estado de un pedido
     */
    @Transactional
    public PedidoDetalleDto actualizarEstadoPedido(Long id, ActualizarEstadoPedidoDto dto) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado: " + id));

        try {
            pedido.setEstadoPedido(Pedido.EstadoPedido.valueOf(dto.getEstadoPedido().toUpperCase()));
            pedido.setEstadoPago(Pedido.EstadoPago.valueOf(dto.getEstadoPago().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Estado inválido: " + e.getMessage());
        }

        Pedido pedidoActualizado = pedidoRepository.save(pedido);
        return PedidoDetalleDto.fromEntity(pedidoActualizado);
    }

    /**
     * Obtener estadísticas de pedidos
     */
    @Transactional(readOnly = true)
    public Map<String, Object> obtenerEstadisticas() {
        Map<String, Object> stats = new HashMap<>();

        // Conteo por estados
        stats.put("totalPedidos", pedidoRepository.count());
        stats.put("pendientes", pedidoRepository.countByEstadoPedido(Pedido.EstadoPedido.PENDIENTE));
        stats.put("procesando", pedidoRepository.countByEstadoPedido(Pedido.EstadoPedido.PROCESANDO));
        stats.put("enviados", pedidoRepository.countByEstadoPedido(Pedido.EstadoPedido.ENVIADO));
        stats.put("entregados", pedidoRepository.countByEstadoPedido(Pedido.EstadoPedido.ENTREGADO));
        stats.put("cancelados", pedidoRepository.countByEstadoPedido(Pedido.EstadoPedido.CANCELADO));

        // Ventas totales
        BigDecimal totalVentas = pedidoRepository.calcularTotalVentas();
        stats.put("totalVentas", totalVentas != null ? totalVentas : BigDecimal.ZERO);

        // Ventas del mes actual
        LocalDateTime inicioMes = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        BigDecimal ventasMes = pedidoRepository.calcularVentasPorPeriodo(inicioMes);
        stats.put("ventasMesActual", ventasMes != null ? ventasMes : BigDecimal.ZERO);

        return stats;
    }
}