package com.example.E_comeerse.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para mostrar estadísticas del e-commerce al administrador
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadisticasDto {

    // Estadísticas de productos
    private Long totalProductos;
    private Long productosSinStock;
    private Long productosActivos;

    // Estadísticas de usuarios
    private Long totalUsuarios;
    private Long usuariosAdministradores;

    // Estadísticas de ventas (básicas por ahora)
    private Double ventasTotales;
    private Long totalPedidos;
    private Long pedidosPendientes;

    // Categoría más popular
    private String categoriaMasPopular;
    private Long productosEnCategoriaMasPopular;
}
