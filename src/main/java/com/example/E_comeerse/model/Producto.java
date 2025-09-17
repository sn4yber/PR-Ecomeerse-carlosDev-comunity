package com.example.E_comeerse.model;

/**
 * Entidad Producto que representa un producto en el sistema.
 * Versión simple sin JPA para pruebas sin base de datos.
 */
public class Producto {
    /**
     * Identificador único del producto.
     */
    private Long id;

    /**
     * Nombre del producto.
     */
    private String nombre;

    /**
     * Constructor vacío.
     */
    public Producto() {}

    /**
     * Constructor para crear un producto con nombre.
     * @param nombre Nombre del producto
     */
    public Producto(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Constructor completo.
     * @param id identificador único
     * @param nombre nombre del producto
     */
    public Producto(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    /**
     * Obtiene el id del producto.
     * @return id del producto
     */
    public Long getId() { return id; }

    /**
     * Asigna el id del producto.
     * @param id identificador único
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Obtiene el nombre del producto.
     * @return nombre del producto
     */
    public String getNombre() { return nombre; }

    /**
     * Asigna el nombre del producto.
     * @param nombre nombre del producto
     */
    public void setNombre(String nombre) { this.nombre = nombre; }
}
