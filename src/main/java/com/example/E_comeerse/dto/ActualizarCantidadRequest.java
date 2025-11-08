package com.example.E_comeerse.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para la petición de actualizar la cantidad de un producto en el carrito.
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
public class ActualizarCantidadRequest {

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;
}
