package com.example.E_comeerse.dto;

import com.example.E_comeerse.model.Pedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para la información detallada de un pedido
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDetalleDto {
    
    private Long id;
    private String numeroPedido;
    private String numeroTicket;
    private LocalDateTime fechaPedido;
    private BigDecimal total;
    private String estadoPedido;
    private String estadoPago;
    private String metodoPago;
    
    // Información del cliente
    private String clienteNombre;
    private String clienteEmail;
    private String clienteTelefono;
    private String clienteIdentificacion;
    private String clienteDireccion;
    private String clienteCiudad;
    private String clientePais;
    
    // Información del usuario (si está registrado)
    private Long usuarioId;
    
    // Totales
    private BigDecimal subtotal;
    private BigDecimal descuentos;
    private BigDecimal impuestos;
    
    /**
     * Constructor desde entidad Pedido
     */
    public static PedidoDetalleDto fromEntity(Pedido pedido) {
        if (pedido == null) {
            return null;
        }
        
        BigDecimal total = pedido.getMontoTotal() != null ? pedido.getMontoTotal() : BigDecimal.ZERO;
        BigDecimal impuestos = pedido.getMontoImpuestos() != null ? pedido.getMontoImpuestos() : BigDecimal.ZERO;
        BigDecimal descuentos = pedido.getMontoDescuento() != null ? pedido.getMontoDescuento() : BigDecimal.ZERO;
        
        return PedidoDetalleDto.builder()
                .id(pedido.getId())
                .numeroPedido(pedido.getNumeroPedido())
                .numeroTicket(pedido.getNumeroTicket())
                .fechaPedido(pedido.getFechaCreacion())
                .total(total)
                .estadoPedido(pedido.getEstadoPedido() != null ? pedido.getEstadoPedido().name() : null)
                .estadoPago(pedido.getEstadoPago() != null ? pedido.getEstadoPago().name() : null)
                .metodoPago(pedido.getMetodoPago())
                .clienteNombre(pedido.getClienteNombre())
                .clienteEmail(pedido.getClienteEmail())
                .clienteTelefono(pedido.getClienteTelefono())
                .clienteIdentificacion(pedido.getClienteIdentificacion())
                .clienteDireccion(pedido.getClienteDireccion())
                .clienteCiudad(pedido.getClienteCiudad())
                .clientePais(pedido.getClientePais())
                .usuarioId(pedido.getIdUsuario())
                .subtotal(total.subtract(impuestos).add(descuentos))
                .descuentos(descuentos)
                .impuestos(impuestos)
                .build();
    }
}
