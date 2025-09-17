package com.example.E_comeerse.controller;

import com.example.E_comeerse.model.Producto;
import com.example.E_comeerse.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para exponer endpoints relacionados con productos.
 * Permite consultar y crear productos en el sistema.
 */
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    // Inyección del servicio de productos
    private final ProductoService productoService;

    /**
     * Constructor con inyección de dependencias.
     * @param productoService servicio de productos
     */
    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    /**
     * Endpoint para obtener todos los productos.
     * GET /api/productos
     * @return lista de productos
     */
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarProductos();
    }

    /**
     * Endpoint para crear un nuevo producto.
     * POST /api/productos
     * @param producto el producto a crear (enviado en el body de la petición)
     * @return el producto creado con su ID generado
     */
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        try {
            Producto productoGuardado = productoService.guardarProducto(producto);
            return new ResponseEntity<>(productoGuardado, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Manejo básico de errores de validación
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint para obtener un producto por ID.
     * GET /api/productos/{id}
     * @param id el ID del producto a buscar
     * @return el producto encontrado o error 404
     */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
        List<Producto> productos = productoService.listarProductos();
        for (Producto producto : productos) {
            if (producto.getId().equals(id)) {
                return new ResponseEntity<>(producto, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
