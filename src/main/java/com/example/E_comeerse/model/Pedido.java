package com.example.E_comeerse.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long id;

    @NotNull(message = "El ID del usuario es obligatorio")
    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @NotBlank(message = "El número de pedido es obligatorio")
    @Size(max = 50, message = "El número de pedido no puede exceder 50 caracteres")
    @Column(name = "numero_pedido", unique = true, nullable = false, length = 50)
    private String numeroPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pedido")
    private EstadoPedido estadoPedido = EstadoPedido.PENDIENTE;

    @NotNull(message = "El monto total es obligatorio")
    @DecimalMin(value = "0.00", message = "El monto total debe ser mayor o igual a 0")
    @Digits(integer = 8, fraction = 2, message = "El monto total debe tener máximo 8 dígitos enteros y 2 decimales")
    @Column(name = "monto_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoTotal;

    @DecimalMin(value = "0.00", message = "El monto de envío debe ser mayor o igual a 0")
    @Digits(integer = 8, fraction = 2, message = "El monto de envío debe tener máximo 8 dígitos enteros y 2 decimales")
    @Column(name = "monto_envio", precision = 10, scale = 2)
    private BigDecimal montoEnvio = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "El monto de impuestos debe ser mayor o igual a 0")
    @Digits(integer = 8, fraction = 2, message = "El monto de impuestos debe tener máximo 8 dígitos enteros y 2 decimales")
    @Column(name = "monto_impuestos", precision = 10, scale = 2)
    private BigDecimal montoImpuestos = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "El monto de descuento debe ser mayor o igual a 0")
    @Digits(integer = 8, fraction = 2, message = "El monto de descuento debe tener máximo 8 dígitos enteros y 2 decimales")
    @Column(name = "monto_descuento", precision = 10, scale = 2)
    private BigDecimal montoDescuento = BigDecimal.ZERO;

    @Column(name = "id_cupon")
    private Long idCupon;

    @Column(name = "id_direccion_envio")
    private Long idDireccionEnvio;

    @Column(name = "id_direccion_facturacion")
    private Long idDireccionFacturacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pago")
    private EstadoPago estadoPago = EstadoPago.PENDIENTE;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;

    // Enums
    public enum EstadoPedido {
        PENDIENTE, PROCESANDO, ENVIADO, ENTREGADO, CANCELADO, REEMBOLSADO
    }

    public enum EstadoPago {
        PENDIENTE, COMPLETADO, FALLIDO, REEMBOLSADO
    }

    public Pedido() {}

    public Pedido(Long idUsuario, String numeroPedido, BigDecimal montoTotal) {
        this.idUsuario = idUsuario;
        this.numeroPedido = numeroPedido;
        this.montoTotal = montoTotal;
    }

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaModificacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        fechaModificacion = LocalDateTime.now();
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public String getNumeroPedido() { return numeroPedido; }
    public void setNumeroPedido(String numeroPedido) { this.numeroPedido = numeroPedido; }

    public EstadoPedido getEstadoPedido() { return estadoPedido; }
    public void setEstadoPedido(EstadoPedido estadoPedido) { this.estadoPedido = estadoPedido; }

    public BigDecimal getMontoTotal() { return montoTotal; }
    public void setMontoTotal(BigDecimal montoTotal) { this.montoTotal = montoTotal; }

    public BigDecimal getMontoEnvio() { return montoEnvio; }
    public void setMontoEnvio(BigDecimal montoEnvio) { this.montoEnvio = montoEnvio; }

    public BigDecimal getMontoImpuestos() { return montoImpuestos; }
    public void setMontoImpuestos(BigDecimal montoImpuestos) { this.montoImpuestos = montoImpuestos; }

    public BigDecimal getMontoDescuento() { return montoDescuento; }
    public void setMontoDescuento(BigDecimal montoDescuento) { this.montoDescuento = montoDescuento; }

    public Long getIdCupon() { return idCupon; }
    public void setIdCupon(Long idCupon) { this.idCupon = idCupon; }

    public Long getIdDireccionEnvio() { return idDireccionEnvio; }
    public void setIdDireccionEnvio(Long idDireccionEnvio) { this.idDireccionEnvio = idDireccionEnvio; }

    public Long getIdDireccionFacturacion() { return idDireccionFacturacion; }
    public void setIdDireccionFacturacion(Long idDireccionFacturacion) { this.idDireccionFacturacion = idDireccionFacturacion; }

    public EstadoPago getEstadoPago() { return estadoPago; }
    public void setEstadoPago(EstadoPago estadoPago) { this.estadoPago = estadoPago; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public LocalDateTime getFechaModificacion() { return fechaModificacion; }
    public void setFechaModificacion(LocalDateTime fechaModificacion) { this.fechaModificacion = fechaModificacion; }
}
