package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
    List<Pedido> findByIdUsuario(Long idUsuario);
    
    Optional<Pedido> findByNumeroPedido(String numeroPedido);
    
    List<Pedido> findByEstadoPedido(Pedido.EstadoPedido estadoPedido);
    
    List<Pedido> findByEstadoPago(Pedido.EstadoPago estadoPago);
    
    @Query("SELECT p FROM Pedido p WHERE p.idUsuario = :idUsuario AND p.estadoPedido = :estado")
    List<Pedido> findByUsuarioAndEstado(@Param("idUsuario") Long idUsuario, @Param("estado") Pedido.EstadoPedido estado);
    
    @Query("SELECT p FROM Pedido p WHERE p.fechaCreacion BETWEEN :fechaInicio AND :fechaFin")
    List<Pedido> findByFechaCreacionBetween(@Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);
    
    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.idUsuario = :idUsuario")
    Long countPedidosByUsuario(@Param("idUsuario") Long idUsuario);
    
    // Consultas para gestión de pedidos
    @Query(value = "SELECT * FROM pedidos p WHERE " +
           "(:search IS NULL OR p.numero_pedido ILIKE CONCAT('%', :search, '%') OR " +
           "p.cliente_nombre ILIKE CONCAT('%', :search, '%') OR " +
           "p.cliente_email ILIKE CONCAT('%', :search, '%')) AND " +
           "(:estadoPedido IS NULL OR p.estado_pedido = :estadoPedido) AND " +
           "(:estadoPago IS NULL OR p.estado_pago = :estadoPago) " +
           "ORDER BY p.fecha_creacion DESC", nativeQuery = true)
    List<Pedido> findPedidosConFiltros(
        @Param("search") String search,
        @Param("estadoPedido") String estadoPedido,
        @Param("estadoPago") String estadoPago
    );
    
    @Query("SELECT COUNT(p) FROM Pedido p WHERE p.estadoPedido = :estado")
    Long countByEstadoPedido(@Param("estado") Pedido.EstadoPedido estado);
    
    @Query("SELECT SUM(p.montoTotal) FROM Pedido p WHERE p.estadoPago = 'COMPLETADO'")
    BigDecimal calcularTotalVentas();
    
    @Query("SELECT SUM(p.montoTotal) FROM Pedido p WHERE p.estadoPago = 'COMPLETADO' AND p.fechaCreacion >= :fechaInicio")
    BigDecimal calcularVentasPorPeriodo(@Param("fechaInicio") LocalDateTime fechaInicio);
}
