package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Carrito.
 * Proporciona métodos de acceso a datos para carritos de compras.
 * 
 * Principios SOLID aplicados:
 * - Interface Segregation: Solo métodos necesarios para Carrito
 * - Dependency Inversion: Abstracción de acceso a datos
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {

    /**
     * Busca el carrito activo de un usuario específico
     * 
     * @param idUsuario ID del usuario
     * @return Optional con el carrito si existe
     */
    Optional<Carrito> findByIdUsuario(Long idUsuario);

    /**
     * Verifica si existe un carrito para un usuario
     * 
     * @param idUsuario ID del usuario
     * @return true si existe, false en caso contrario
     */
    boolean existsByIdUsuario(Long idUsuario);

    /**
     * Busca carritos modificados después de una fecha específica
     * Útil para procesos de limpieza o análisis
     * 
     * @param fecha Fecha de referencia
     * @return Lista de carritos modificados después de la fecha
     */
    @Query("SELECT c FROM Carrito c WHERE c.fechaModificacion > :fecha")
    List<Carrito> findCarritosModificadosDespues(@Param("fecha") LocalDateTime fecha);

    /**
     * Busca carritos con items (no vacíos)
     * 
     * @return Lista de carritos que tienen items
     */
    @Query("SELECT c FROM Carrito c WHERE SIZE(c.items) > 0")
    List<Carrito> findCarritosConItems();

    /**
     * Busca carritos vacíos
     * 
     * @return Lista de carritos sin items
     */
    @Query("SELECT c FROM Carrito c WHERE SIZE(c.items) = 0")
    List<Carrito> findCarritosVacios();

    /**
     * Cuenta la cantidad de items en un carrito específico
     * 
     * @param idCarrito ID del carrito
     * @return Cantidad total de items
     */
    @Query("SELECT SUM(ci.cantidad) FROM CarritoItem ci WHERE ci.carrito.idCarrito = :idCarrito")
    Integer countItemsByCarritoId(@Param("idCarrito") Long idCarrito);

    /**
     * Busca carritos abandonados (sin modificar en X días)
     * Útil para estrategias de recuperación de carritos
     * 
     * @param fecha Fecha límite de abandono
     * @return Lista de carritos abandonados
     */
    @Query("SELECT c FROM Carrito c WHERE c.fechaModificacion < :fecha AND SIZE(c.items) > 0")
    List<Carrito> findCarritosAbandonados(@Param("fecha") LocalDateTime fecha);

    /**
     * Elimina el carrito de un usuario específico
     * 
     * @param idUsuario ID del usuario
     */
    void deleteByIdUsuario(Long idUsuario);
}
