package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para la entidad Producto.
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // TODO: Agregar métodos personalizados aquí

    List<Producto> findByIdCategoria(Long idCategoria);

    @Query("SELECT p FROM Producto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Producto> findByNombreContainingIgnoreCase(@Param("nombre") String nombre);

    List<Producto> findByCodigoProducto(String codigoProducto);

    @Query("SELECT p FROM Producto p WHERE p.cantidadStock > 0")
    List<Producto> findProductosEnStock();
}
