package com.example.E_comeerse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad CarritoItem que representa un producto individual dentro del carrito.
 * Mantiene la relación entre el carrito, el producto y la cantidad seleccionada.
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la información de un item del carrito
 * - Dependency Inversion: Depende de abstracciones (Carrito, Producto)
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Entity
@Table(name = "carrito_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarritoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private Long idItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_carrito", nullable = false)
    @JsonIgnore
    private Carrito carrito;

    @NotNull(message = "El ID del producto es obligatorio")
    @Column(name = "id_producto", nullable = false)
    private Long idProducto;

    @Column(name = "nombre_producto", length = 200)
    private String nombreProducto;

    @Column(name = "url_imagen", length = 500)
    private String urlImagen;

    @NotNull(message = "El precio es obligatorio")
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "subtotal", precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "descuento", precision = 10, scale = 2)
    private BigDecimal descuento = BigDecimal.ZERO;

    @Column(name = "porcentaje_descuento")
    private BigDecimal porcentajeDescuento = BigDecimal.ZERO;

    @Column(name = "fecha_agregado")
    private LocalDateTime fechaAgregado;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;

    /**
     * Constructor para crear un item del carrito
     * 
     * @param carrito Carrito al que pertenece
     * @param producto Producto a agregar
     * @param cantidad Cantidad del producto
     */
    public CarritoItem(Carrito carrito, Producto producto, Integer cantidad) {
        this.carrito = carrito;
        this.idProducto = producto.getId();
        this.nombreProducto = producto.getNombre();
        this.urlImagen = producto.getUrlImagen();
        this.precioUnitario = producto.getPrecio();
        this.cantidad = cantidad;
        this.descuento = BigDecimal.ZERO;
        this.porcentajeDescuento = BigDecimal.ZERO;
        calcularSubtotal();
    }

    /**
     * Método de ciclo de vida JPA - se ejecuta antes de persistir
     */
    @PrePersist
    protected void onCreate() {
        fechaAgregado = LocalDateTime.now();
        fechaModificacion = LocalDateTime.now();
        calcularSubtotal();
    }

    /**
     * Método de ciclo de vida JPA - se ejecuta antes de actualizar
     */
    @PreUpdate
    protected void onUpdate() {
        fechaModificacion = LocalDateTime.now();
        calcularSubtotal();
    }

    /**
     * Calcula el subtotal del item (precio x cantidad - descuento)
     * Aplica descuentos si están configurados
     */
    public void calcularSubtotal() {
        if (precioUnitario != null && cantidad != null) {
            BigDecimal totalSinDescuento = precioUnitario.multiply(new BigDecimal(cantidad));
            
            // Aplicar descuento si existe
            if (porcentajeDescuento != null && porcentajeDescuento.compareTo(BigDecimal.ZERO) > 0) {
                this.descuento = totalSinDescuento
                        .multiply(porcentajeDescuento.divide(new BigDecimal("100")))
                        .setScale(2, java.math.RoundingMode.HALF_UP);
            }
            
            this.subtotal = totalSinDescuento.subtract(descuento);
        }
    }

    /**
     * Actualiza la cantidad del item
     * 
     * @param nuevaCantidad Nueva cantidad del producto
     */
    public void actualizarCantidad(Integer nuevaCantidad) {
        this.cantidad = nuevaCantidad;
        calcularSubtotal();
    }

    /**
     * Aplica un descuento al item
     * 
     * @param porcentaje Porcentaje de descuento (0-100)
     */
    public void aplicarDescuento(BigDecimal porcentaje) {
        this.porcentajeDescuento = porcentaje;
        calcularSubtotal();
    }

    /**
     * Verifica si el item es válido (tiene producto y cantidad positiva)
     * 
     * @return true si es válido, false en caso contrario
     */
    public boolean esValido() {
        return idProducto != null && cantidad != null && cantidad > 0;
    }

    /**
     * Obtiene el total del item incluyendo descuentos
     * 
     * @return subtotal final del item
     */
    public BigDecimal obtenerTotal() {
        return subtotal != null ? subtotal : BigDecimal.ZERO;
    }
}
