package com.example.E_comeerse.service;

import com.example.E_comeerse.model.Producto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementación de la interfaz ProductoService.
 * Se encarga de la lógica de negocio relacionada con productos.
 * Preparada para implementación con base de datos - sin almacenamiento en memoria.
 */
@Service
public class ProductoServiceImpl implements ProductoService {

    /**
     *
     * Preparado para inyección de repositorio cuando se configure base de datos.
     */
    public ProductoServiceImpl() {
        // Sin inicialización de almacenamiento en memoria
        // Listo para trabajar con repositorio de base de datos
    }

    /**
     * Retorna la lista de todos los productos.
     * TODO: Implementar con repositorio de base de datos.
     * @return lista vacía temporalmente hasta configurar BD
     */
    @Override
    public List<Producto> listarProductos() {
        // TODO: Reemplazar con: return productoRepository.findAll();
        return new ArrayList<>(); // Lista vacía hasta implementar BD
    }

    /**
     * Guarda un nuevo producto.
     * TODO: Implementar con repositorio de base de datos.
     * @param producto el producto a guardar
     * @return el producto guardado
     */
    @Override
    public Producto guardarProducto(Producto producto) {
        // Validación básica
        if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del producto no puede estar vacío");
        }

        // TODO: Reemplazar con: return productoRepository.save(producto);

        // Simular guardado sin almacenar (retorna el mismo objeto)
        // Esto es temporal hasta configurar la base de datos
        producto.setId(1L); // ID temporal
        return producto;
    }
}
