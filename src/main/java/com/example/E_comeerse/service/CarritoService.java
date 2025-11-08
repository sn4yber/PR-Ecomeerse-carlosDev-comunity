package com.example.E_comeerse.service;

import com.example.E_comeerse.dto.CarritoDto;
import com.example.E_comeerse.dto.DatosFacturacionDto;
import com.example.E_comeerse.dto.FacturaDto;

import java.util.Optional;

/**
 * Interfaz del servicio de Carrito.
 * Define los contratos de negocio para la gestión del carrito de compras.
 * 
 * Principios SOLID aplicados:
 * - Interface Segregation: Define solo métodos necesarios
 * - Dependency Inversion: Abstracción de la lógica de negocio
 * - Single Responsibility: Solo define contratos de carrito
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
public interface CarritoService {

    /**
     * Obtiene o crea el carrito de un usuario
     * 
     * @param idUsuario ID del usuario
     * @return DTO del carrito
     */
    CarritoDto obtenerOCrearCarrito(Long idUsuario);

    /**
     * Agrega un producto al carrito
     * Si el producto ya existe, actualiza la cantidad
     * 
     * @param idUsuario ID del usuario
     * @param idProducto ID del producto a agregar
     * @param cantidad Cantidad del producto
     * @return DTO del carrito actualizado
     * @throws IllegalArgumentException si el producto no existe o no hay stock
     */
    CarritoDto agregarProducto(Long idUsuario, Long idProducto, Integer cantidad);

    /**
     * Actualiza la cantidad de un producto en el carrito
     * 
     * @param idUsuario ID del usuario
     * @param idProducto ID del producto
     * @param nuevaCantidad Nueva cantidad del producto
     * @return DTO del carrito actualizado
     * @throws IllegalArgumentException si el producto no existe en el carrito o no hay stock
     */
    CarritoDto actualizarCantidad(Long idUsuario, Long idProducto, Integer nuevaCantidad);

    /**
     * Elimina un producto del carrito
     * 
     * @param idUsuario ID del usuario
     * @param idProducto ID del producto a eliminar
     * @return DTO del carrito actualizado
     * @throws IllegalArgumentException si el producto no existe en el carrito
     */
    CarritoDto eliminarProducto(Long idUsuario, Long idProducto);

    /**
     * Vacía completamente el carrito del usuario
     * 
     * @param idUsuario ID del usuario
     * @return DTO del carrito vacío
     */
    CarritoDto vaciarCarrito(Long idUsuario);

    /**
     * Obtiene el carrito del usuario sin crearlo si no existe
     * 
     * @param idUsuario ID del usuario
     * @return Optional con el DTO del carrito si existe
     */
    Optional<CarritoDto> obtenerCarrito(Long idUsuario);

    /**
     * Verifica si el carrito tiene stock disponible para todos sus productos
     * 
     * @param idUsuario ID del usuario
     * @return true si hay stock para todos los productos, false en caso contrario
     */
    boolean verificarStockDisponible(Long idUsuario);

    /**
     * Convierte el carrito en un pedido
     * 
     * @param idUsuario ID del usuario
     * @return ID del pedido creado
     * @throws IllegalArgumentException si el carrito está vacío o no hay stock
     */
    Long convertirAPedido(Long idUsuario);

    /**
     * Convierte el carrito en un pedido con datos de facturación
     * 
     * @param idUsuario ID del usuario
     * @param datosFacturacion Datos de facturación del cliente
     * @return Factura generada con todos los detalles
     * @throws IllegalArgumentException si el carrito está vacío o no hay stock
     */
    FacturaDto convertirAPedidoConFactura(Long idUsuario, DatosFacturacionDto datosFacturacion);

    /**
     * Obtiene la cantidad total de items en el carrito
     * 
     * @param idUsuario ID del usuario
     * @return Cantidad total de items
     */
    Integer obtenerCantidadItems(Long idUsuario);
}
