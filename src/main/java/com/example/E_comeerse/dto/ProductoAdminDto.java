package com.example.E_comeerse.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * DTO para gestión de productos desde el panel de administrador
 */
public class ProductoAdminDto {

    private Long id;

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(min = 2, max = 200, message = "El nombre debe tener entre 2 y 200 caracteres")
    private String nombre;

    @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    @Digits(integer = 8, fraction = 2, message = "El precio debe tener máximo 8 dígitos enteros y 2 decimales")
    private BigDecimal precio;

    @Min(value = 0, message = "El stock no puede ser negativo")
    @NotNull(message = "La cantidad en stock es obligatoria")
    private Integer cantidadStock;

    private Long idCategoria;

    @Size(max = 100, message = "El código de producto no puede exceder 100 caracteres")
    private String codigoProducto;

    @Size(max = 500, message = "La URL de imagen no puede exceder 500 caracteres")
    @Pattern(regexp = "^(https?://.*\\.(jpg|jpeg|png|gif|webp)|)$", 
             message = "La URL debe ser válida y terminar en jpg, jpeg, png, gif o webp")
    private String urlImagen;

    // Constructores
    public ProductoAdminDto() {}

    public ProductoAdminDto(String nombre, String descripcion, BigDecimal precio, Integer cantidadStock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidadStock = cantidadStock;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getCantidadStock() { return cantidadStock; }
    public void setCantidadStock(Integer cantidadStock) { this.cantidadStock = cantidadStock; }

    public Long getIdCategoria() { return idCategoria; }
    public void setIdCategoria(Long idCategoria) { this.idCategoria = idCategoria; }

    public String getCodigoProducto() { return codigoProducto; }
    public void setCodigoProducto(String codigoProducto) { this.codigoProducto = codigoProducto; }

    public String getUrlImagen() { return urlImagen; }
    public void setUrlImagen(String urlImagen) { this.urlImagen = urlImagen; }

    @Override
    public String toString() {
        return "ProductoAdminDto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                ", cantidadStock=" + cantidadStock +
                '}';
    }
}
