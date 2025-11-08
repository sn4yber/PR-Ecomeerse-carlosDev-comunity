package com.example.E_comeerse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para la respuesta de factura/ticket
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacturaDto {

    private String numeroTicket;
    private String numeroPedido;
    private LocalDateTime fecha;
    
    // Datos del cliente
    private DatosFacturacionDto cliente;
    
    // Productos
    private List<ItemFactura> items;
    
    // Totales
    private BigDecimal subtotal;
    private BigDecimal descuentoTotal;
    private BigDecimal impuestos;
    private BigDecimal total;
    
    // Información del sistema
    private String empresaNombre;
    private String empresaNit;
    private String empresaDireccion;
    private String empresaTelefono;
    private String empresaEmail;
    private String empresaWeb;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ItemFactura {
        private String nombreProducto;
        private Integer cantidad;
        private BigDecimal precioUnitario;
        private BigDecimal subtotal;
        private BigDecimal descuento;
    }
}
