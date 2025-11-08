package com.example.E_comeerse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * DTO para transferir información del Carrito.
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
public class CarritoDto {

    private Long idCarrito;
    private Long idUsuario;
    private List<CarritoItemDto> items = new ArrayList<>();
    private BigDecimal subtotal;
    private BigDecimal descuentoTotal;
    private BigDecimal impuestos;
    private BigDecimal total;
    private Integer cantidadItems;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;

    /**
     * Constructor para crear un DTO vacío de carrito
     * 
     * @param idUsuario ID del usuario
     */
    public CarritoDto(Long idUsuario) {
        this.idUsuario = idUsuario;
        this.items = new ArrayList<>();
        this.subtotal = BigDecimal.ZERO;
        this.descuentoTotal = BigDecimal.ZERO;
        this.impuestos = BigDecimal.ZERO;
        this.total = BigDecimal.ZERO;
        this.cantidadItems = 0;
    }
}
