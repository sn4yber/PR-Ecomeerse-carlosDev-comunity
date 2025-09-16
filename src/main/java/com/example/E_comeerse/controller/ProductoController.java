package com.example.E_comeerse.controller;

import com.example.E_comeerse.model.Producto;
import com.example.E_comeerse.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controlador REST para exponer endpoints relacionados con productos.
 * Permite consultar la lista de productos disponibles.
 */
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    // Inyección del servicio de productos
    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    /**
     * Endpoint para obtener todos los productos.
     * @return lista de productos
     */
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarProductos();
    }
}

