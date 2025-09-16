package com.example.E_comeerse.service;

import com.example.E_comeerse.model.Producto;
import com.example.E_comeerse.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación de la interfaz ProductoService.
 * Se encarga de la lógica de negocio relacionada con productos.
 */
@Service
public class ProductoServiceImpl implements ProductoService {
    // Inyección del repositorio de productos
    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /**
     * Retorna la lista de todos los productos almacenados en la base de datos.
     * @return lista de productos
     */
    @Override
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }
}

