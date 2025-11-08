package com.example.E_comeerse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para la respuesta de factura/ticket
 * Contiene toda la información para generar el ticket
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacturaResponseDto {
    
    private Long idPedido;
    private String numeroPedido;
    private String numeroTicket;
    private LocalDateTime fecha;
    
    // Información del cliente
    private String nombreCliente;
    private String identificacion;
    private String telefono;
    private String email;
    private String direccion;
    private String ciudad;
    private String codigoPostal;
    
    // Método de pago
    private String metodoPago;
    
    // Items del pedido
    private List<ItemFacturaDto> items;
    
    // Totales
    private Double subtotal;
    private Double descuento;
    private Double impuestos;
    private Double total;
    
    // Info de la empresa
    private String nombreEmpresa;
    private String nitEmpresa;
    private String direccionEmpresa;
    private String telefonoEmpresa;
    private String webEmpresa;
    
    /**
     * DTO para los items de la factura
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ItemFacturaDto {
        private String nombreProducto;
        private Integer cantidad;
        private Double precioUnitario;
        private Double descuento;
        private Double total;
    }
}
