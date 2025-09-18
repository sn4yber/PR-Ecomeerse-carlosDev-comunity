package com.example.E_comeerse.service;

import com.example.E_comeerse.model.Producto;
import com.example.E_comeerse.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Implementación de la interfaz ProductoService.
   */
@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        validarProducto(producto);
        return productoRepository.save(producto);
    }

    @Override
    public Optional<Producto> buscarPorId(Long id) {
        return productoRepository.findById(id);
    }

    @Override
    public Producto actualizarProducto(Long id, Producto producto) {
        Optional<Producto> productoExistente = productoRepository.findById(id);
        if (productoExistente.isEmpty()) {
            throw new IllegalArgumentException("Producto no encontrado con ID: " + id);
        }

        validarProducto(producto);

        Producto productoActualizar = productoExistente.get();
        productoActualizar.setNombre(producto.getNombre());
        productoActualizar.setDescripcion(producto.getDescripcion());
        productoActualizar.setPrecio(producto.getPrecio());
        productoActualizar.setCantidadStock(producto.getCantidadStock());
        productoActualizar.setIdCategoria(producto.getIdCategoria());
        productoActualizar.setCodigoProducto(producto.getCodigoProducto());
        productoActualizar.setUrlImagen(producto.getUrlImagen());

        return productoRepository.save(productoActualizar);
    }

    @Override
    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new IllegalArgumentException("Producto no encontrado con ID: " + id);
        }
        productoRepository.deleteById(id);
    }

    @Override
    public List<Producto> buscarPorCategoria(Long idCategoria) {
        return productoRepository.findByIdCategoria(idCategoria);
    }

    @Override
    public List<Producto> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return List.of();
        }
        return productoRepository.findByNombreContainingIgnoreCase(nombre.trim());
    }

    private void validarProducto(Producto producto) {
        if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del producto no puede estar vacío");
        }
        if (producto.getPrecio() == null || producto.getPrecio().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a 0");
        }
    }
}
