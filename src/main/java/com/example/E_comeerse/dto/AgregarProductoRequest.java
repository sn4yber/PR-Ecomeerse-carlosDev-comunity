package com.example.E_comeerse.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para la petición de agregar un producto al carrito.
 * Valida los datos de entrada antes de procesarlos.
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo validación de entrada
 * - Open/Closed: Extensible agregando más validaciones
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgregarProductoRequest {

    @NotNull(message = "El ID del producto es obligatorio")
    private Long idProducto;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    /**
     * Constructor simplificado para testing
     * 
     * @param idProducto ID del producto
     */
    public AgregarProductoRequest(Long idProducto) {
        this.idProducto = idProducto;
        this.cantidad = 1;
    }
}
