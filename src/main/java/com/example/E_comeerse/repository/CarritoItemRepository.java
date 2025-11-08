package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad CarritoItem.
 * Proporciona métodos de acceso a datos para items del carrito.
 * 
 * Principios SOLID aplicados:
 * - Interface Segregation: Solo métodos necesarios para CarritoItem
 * - Dependency Inversion: Abstracción de acceso a datos
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {

    /**
     * Busca todos los items de un carrito específico
     * 
     * @param idCarrito ID del carrito
     * @return Lista de items del carrito
     */
    List<CarritoItem> findByCarrito_IdCarrito(Long idCarrito);

    /**
     * Busca un item específico de un carrito por su producto
     * 
     * @param idCarrito ID del carrito
     * @param idProducto ID del producto
     * @return Optional con el item si existe
     */
    Optional<CarritoItem> findByCarrito_IdCarritoAndIdProducto(Long idCarrito, Long idProducto);

    /**
     * Verifica si existe un producto en un carrito
     * 
     * @param idCarrito ID del carrito
     * @param idProducto ID del producto
     * @return true si existe, false en caso contrario
     */
    boolean existsByCarrito_IdCarritoAndIdProducto(Long idCarrito, Long idProducto);

    /**
     * Cuenta la cantidad de items diferentes en un carrito
     * 
     * @param idCarrito ID del carrito
     * @return Cantidad de items únicos
     */
    @Query("SELECT COUNT(ci) FROM CarritoItem ci WHERE ci.carrito.idCarrito = :idCarrito")
    Long countByCarritoId(@Param("idCarrito") Long idCarrito);

    /**
     * Elimina todos los items de un carrito
     * 
     * @param idCarrito ID del carrito
     */
    @Modifying
    @Query("DELETE FROM CarritoItem ci WHERE ci.carrito.idCarrito = :idCarrito")
    void deleteByCarritoId(@Param("idCarrito") Long idCarrito);

    /**
     * Elimina un item específico de un carrito por producto
     * 
     * @param idCarrito ID del carrito
     * @param idProducto ID del producto
     */
    @Modifying
    @Query("DELETE FROM CarritoItem ci WHERE ci.carrito.idCarrito = :idCarrito AND ci.idProducto = :idProducto")
    void deleteByCarritoIdAndProductoId(@Param("idCarrito") Long idCarrito, @Param("idProducto") Long idProducto);

    /**
     * Busca todos los items de un producto específico en todos los carritos
     * Útil para análisis de popularidad de productos
     * 
     * @param idProducto ID del producto
     * @return Lista de items del producto
     */
    List<CarritoItem> findByIdProducto(Long idProducto);

    /**
     * Calcula el subtotal de todos los items de un carrito
     * 
     * @param idCarrito ID del carrito
     * @return Suma de subtotales
     */
    @Query("SELECT SUM(ci.subtotal) FROM CarritoItem ci WHERE ci.carrito.idCarrito = :idCarrito")
    Double sumSubtotalByCarritoId(@Param("idCarrito") Long idCarrito);
}
