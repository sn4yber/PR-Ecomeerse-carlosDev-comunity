package com.example.E_comeerse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para transferir información de un Item del Carrito.
 * Evita exponer la entidad directamente y permite personalizar la respuesta.
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo transferencia de datos
 * - Dependency Inversion: No depende de la capa de persistencia
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoItemDto {

    private Long idItem;
    private Long idProducto;
    private String nombreProducto;
    private String urlImagen;
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subtotal;
    private BigDecimal descuento;
    private BigDecimal porcentajeDescuento;
    private LocalDateTime fechaAgregado;
    private LocalDateTime fechaModificacion;
    
    /**
     * Información adicional del producto
     */
    private Integer stockDisponible;
    private Boolean disponible;
}
