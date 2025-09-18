package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}
