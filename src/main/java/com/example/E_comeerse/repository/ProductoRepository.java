package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la entidad Producto.
 * Extiende JpaRepository para obtener operaciones CRUD básicas automáticamente.
 *
 * Métodos disponibles automáticamente:
 * - findAll() - obtiene todos los productos
 * - save() - guarda un producto
 * - findById() - busca por ID
 * - deleteById() - elimina por ID
 * - count() - cuenta total de productos
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Los métodos CRUD básicos están disponibles automáticamente
    // Los otros integrantes pueden agregar métodos personalizados aquí
    // Ejemplo: List<Producto> findByNombreContaining(String nombre);
}
