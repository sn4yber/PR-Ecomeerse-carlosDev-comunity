package com.example.E_comeerse.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad Carrito que representa el carrito de compras de un usuario.
 * Cada usuario tiene un único carrito activo que contiene múltiples items.
 * 
 * Principios SOLID aplicados:
 * - Single Responsibility: Solo maneja la información del carrito
 * - Open/Closed: Extensible mediante CarritoItem sin modificar esta clase
 * 
 * @author E-commerce Team
 * @version 1.0
 * @since 2025-10-13
 */
@Entity
@Table(name = "carritos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrito")
    private Long idCarrito;

    @NotNull(message = "El ID del usuario es obligatorio")
    @Column(name = "id_usuario", nullable = false, unique = true)
    private Long idUsuario;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CarritoItem> items = new ArrayList<>();

    @Column(name = "subtotal", precision = 10, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(name = "descuento_total", precision = 10, scale = 2)
    private BigDecimal descuentoTotal = BigDecimal.ZERO;

    @Column(name = "impuestos", precision = 10, scale = 2)
    private BigDecimal impuestos = BigDecimal.ZERO;

    @Column(name = "total", precision = 10, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;

    @Column(name = "cantidad_items")
    private Integer cantidadItems = 0;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;

    /**
     * Constructor para crear un carrito nuevo para un usuario
     * 
     * @param idUsuario ID del usuario propietario del carrito
     */
    public Carrito(Long idUsuario) {
        this.idUsuario = idUsuario;
        this.items = new ArrayList<>();
        this.subtotal = BigDecimal.ZERO;
        this.descuentoTotal = BigDecimal.ZERO;
        this.impuestos = BigDecimal.ZERO;
        this.total = BigDecimal.ZERO;
        this.cantidadItems = 0;
    }

    /**
     * Método de ciclo de vida JPA - se ejecuta antes de persistir
     */
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaModificacion = LocalDateTime.now();
    }

    /**
     * Método de ciclo de vida JPA - se ejecuta antes de actualizar
     */
    @PreUpdate
    protected void onUpdate() {
        fechaModificacion = LocalDateTime.now();
    }

    /**
     * Calcula y actualiza todos los totales del carrito
     * Aplica lógica de negocio: subtotal, descuentos, impuestos y total
     */
    public void calcularTotales() {
        // Calcular subtotal sumando todos los subtotales de los items
        this.subtotal = items.stream()
                .map(CarritoItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calcular descuento total sumando todos los descuentos de los items
        this.descuentoTotal = items.stream()
                .map(CarritoItem::getDescuento)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calcular impuestos (ejemplo: 19% del subtotal - descuentos)
        BigDecimal baseImponible = subtotal.subtract(descuentoTotal);
        this.impuestos = baseImponible.multiply(new BigDecimal("0.19"))
                .setScale(2, java.math.RoundingMode.HALF_UP);

        // Calcular total final
        this.total = subtotal.subtract(descuentoTotal).add(impuestos);

        // Actualizar cantidad de items
        this.cantidadItems = items.stream()
                .mapToInt(CarritoItem::getCantidad)
                .sum();
    }

    /**
     * Agrega un item al carrito o actualiza su cantidad si ya existe
     * 
     * @param item Item a agregar
     */
    public void agregarItem(CarritoItem item) {
        item.setCarrito(this);
        this.items.add(item);
        calcularTotales();
    }

    /**
     * Elimina un item del carrito
     * 
     * @param item Item a eliminar
     */
    public void eliminarItem(CarritoItem item) {
        this.items.remove(item);
        calcularTotales();
    }

    /**
     * Vacía completamente el carrito
     */
    public void vaciarCarrito() {
        this.items.clear();
        calcularTotales();
    }

    /**
     * Verifica si el carrito está vacío
     * 
     * @return true si no tiene items, false en caso contrario
     */
    public boolean estaVacio() {
        return items.isEmpty();
    }

    /**
     * Obtiene la cantidad total de items en el carrito
     * 
     * @return cantidad total de items
     */
    public int obtenerCantidadTotal() {
        return items.stream()
                .mapToInt(CarritoItem::getCantidad)
                .sum();
    }
}
