package com.example.E_comeerse.service;

import com.example.E_comeerse.model.Producto;
import java.util.List;

/**
 * Interfaz del servicio de productos.
 * Define los métodos disponibles para la gestión de productos.
 * Preparada para implementación con base de datos.
 */
public interface ProductoService {
    /**
     * Obtiene la lista completa de productos.
     * @return lista de todos los productos
     */
    List<Producto> listarProductos();

    /**
     * Guarda un nuevo producto.
     * @param producto el producto a guardar
     * @return el producto guardado
     */
    Producto guardarProducto(Producto producto);
}
