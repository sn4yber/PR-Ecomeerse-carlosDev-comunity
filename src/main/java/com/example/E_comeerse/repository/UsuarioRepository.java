package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    
    boolean existsByEmail(String email);
    
    boolean existsByNombreUsuario(String nombreUsuario);
    
    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) OR LOWER(u.apellido) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Usuario> findByNombreOrApellidoContainingIgnoreCase(@Param("nombre") String nombre);
}
