package com.example.E_comeerse.service;

import com.example.E_comeerse.model.Producto;
import java.util.List;
import java.util.Optional;

/**
 * Interfaz del servicio de productos.
 * Define los métodos disponibles para la gestión de productos.
 */
public interface ProductoService {
    List<Producto> listarProductos();

    Producto guardarProducto(Producto producto);

    Optional<Producto> buscarPorId(Long id);

    Producto actualizarProducto(Long id, Producto producto);

    void eliminarProducto(Long id);

    List<Producto> buscarPorCategoria(Long idCategoria);

    List<Producto> buscarPorNombre(String nombre);

    List<Producto> obtenerProductosDestacados();

    List<Producto> obtenerTop3Destacados();

    Producto marcarComoDestacado(Long id, Boolean destacado);
}
