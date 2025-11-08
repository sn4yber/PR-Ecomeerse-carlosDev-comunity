package com.example.E_comeerse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para actualizar el estado de un pedido
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarEstadoPedidoDto {
    
    @NotBlank(message = "El estado del pedido es obligatorio")
    private String estadoPedido; // PENDIENTE, PROCESANDO, ENVIADO, ENTREGADO, CANCELADO, REEMBOLSADO
    
    @NotBlank(message = "El estado del pago es obligatorio")
    private String estadoPago; // PENDIENTE, COMPLETADO, FALLIDO, REEMBOLSADO
}
