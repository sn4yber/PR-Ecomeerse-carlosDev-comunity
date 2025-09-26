package com.example.E_comeerse.repository;

import com.example.E_comeerse.model.RefreshToken;
import com.example.E_comeerse.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para gestión de refresh tokens
 * Maneja sesiones persistentes de usuarios
 */
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    /**
     * Buscar refresh token por token
     */
    Optional<RefreshToken> findByToken(String token);

    /**
     * Buscar refresh tokens activos por usuario
     */
    @Query("SELECT rt FROM RefreshToken rt WHERE rt.usuario = :usuario AND rt.isActive = true")
    List<RefreshToken> findActiveTokensByUsuario(@Param("usuario") Usuario usuario);

    /**
     * Eliminar tokens expirados
     */
    @Modifying
    @Query("DELETE FROM RefreshToken rt WHERE rt.expiryDate < :now")
    int deleteExpiredTokens(@Param("now") LocalDateTime now);

    /**
     * Desactivar todos los tokens de un usuario
     */
    @Modifying
    @Query("UPDATE RefreshToken rt SET rt.isActive = false WHERE rt.usuario = :usuario")
    int deactivateAllUserTokens(@Param("usuario") Usuario usuario);

    /**
     * Desactivar token específico
     */
    @Modifying
    @Query("UPDATE RefreshToken rt SET rt.isActive = false WHERE rt.token = :token")
    int deactivateToken(@Param("token") String token);

    /**
     * Contar tokens activos por usuario
     */
    @Query("SELECT COUNT(rt) FROM RefreshToken rt WHERE rt.usuario = :usuario AND rt.isActive = true")
    long countActiveTokensByUsuario(@Param("usuario") Usuario usuario);
}
