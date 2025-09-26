package com.example.E_comeerse.service;

import com.example.E_comeerse.config.JwtConfig;
import com.example.E_comeerse.model.RefreshToken;
import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.repository.RefreshTokenRepository;
import com.example.E_comeerse.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Servicio para gestión de refresh tokens y sesiones persistentes
 * Maneja la creación, validación y limpieza de tokens de actualización
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtConfig jwtConfig;

    /**
     * Crear un nuevo refresh token para el usuario
     */
    @Transactional
    public RefreshToken createRefreshToken(Usuario usuario, String deviceInfo, String ipAddress) {
        // Limpiar tokens expirados del usuario
        cleanExpiredTokensForUser(usuario);
        
        // Limitar número de sesiones activas por usuario (máximo 5)
        limitActiveSessionsForUser(usuario, 5);

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .usuario(usuario)
                .expiryDate(LocalDateTime.now().plusSeconds(jwtConfig.getRefreshExpiration() / 1000))
                .deviceInfo(deviceInfo)
                .ipAddress(ipAddress)
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .lastUsed(LocalDateTime.now())
                .build();

        RefreshToken savedToken = refreshTokenRepository.save(refreshToken);
        log.info("Refresh token creado para usuario: {}", usuario.getNombreUsuario());
        
        return savedToken;
    }

    /**
     * Verificar y obtener refresh token por token string
     */
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    /**
     * Verificar si el refresh token es válido
     */
    public boolean verifyExpiration(RefreshToken token) {
        if (token.isExpired() || !token.getIsActive()) {
            if (!token.getIsActive()) {
                log.warn("Intento de uso de refresh token inactivo: {}", token.getToken());
            } else {
                log.warn("Refresh token expirado: {}", token.getToken());
            }
            refreshTokenRepository.delete(token);
            return false;
        }
        
        // Actualizar último uso
        token.setLastUsed(LocalDateTime.now());
        refreshTokenRepository.save(token);
        
        return true;
    }

    /**
     * Generar nuevo access token usando refresh token
     */
    @Transactional
    public String generateNewAccessToken(RefreshToken refreshToken, UserDetails userDetails) {
        if (!verifyExpiration(refreshToken)) {
            throw new RuntimeException("Refresh token inválido o expirado");
        }

        log.info("Generando nuevo access token para usuario: {}", refreshToken.getUsuario().getNombreUsuario());
        return jwtTokenUtil.generateToken(userDetails);
    }

    /**
     * Revocar refresh token específico
     */
    @Transactional
    public void revokeToken(String token) {
        refreshTokenRepository.deactivateToken(token);
        log.info("Refresh token revocado: {}", token.substring(0, 8) + "...");
    }

    /**
     * Revocar todos los tokens de un usuario
     */
    @Transactional
    public void revokeAllUserTokens(Usuario usuario) {
        int revokedCount = refreshTokenRepository.deactivateAllUserTokens(usuario);
        log.info("Revocados {} refresh tokens para usuario: {}", revokedCount, usuario.getNombreUsuario());
    }

    /**
     * Obtener sesiones activas del usuario
     */
    public List<RefreshToken> getActiveUserSessions(Usuario usuario) {
        return refreshTokenRepository.findActiveTokensByUsuario(usuario);
    }

    /**
     * Limpiar tokens expirados de un usuario específico
     */
    @Transactional
    public void cleanExpiredTokensForUser(Usuario usuario) {
        List<RefreshToken> userTokens = refreshTokenRepository.findActiveTokensByUsuario(usuario);
        long expiredCount = userTokens.stream()
                .filter(RefreshToken::isExpired)
                .peek(refreshTokenRepository::delete)
                .count();
        
        if (expiredCount > 0) {
            log.debug("Limpiados {} tokens expirados para usuario: {}", expiredCount, usuario.getNombreUsuario());
        }
    }

    /**
     * Limitar sesiones activas por usuario
     */
    @Transactional
    public void limitActiveSessionsForUser(Usuario usuario, int maxSessions) {
        List<RefreshToken> activeSessions = refreshTokenRepository.findActiveTokensByUsuario(usuario);
        
        if (activeSessions.size() >= maxSessions) {
            // Ordenar por fecha de creación y eliminar las más antiguas
            activeSessions.stream()
                    .sorted((a, b) -> a.getCreatedAt().compareTo(b.getCreatedAt()))
                    .limit(activeSessions.size() - maxSessions + 1)
                    .forEach(token -> {
                        token.setIsActive(false);
                        refreshTokenRepository.save(token);
                    });
            
            log.info("Limitadas sesiones activas para usuario: {} (máximo: {})", 
                    usuario.getNombreUsuario(), maxSessions);
        }
    }

    /**
     * Tarea programada para limpiar tokens expirados cada hora
     */
    @Scheduled(fixedRate = 3600000) // 1 hora
    @Transactional
    public void cleanupExpiredTokens() {
        int deletedCount = refreshTokenRepository.deleteExpiredTokens(LocalDateTime.now());
        if (deletedCount > 0) {
            log.info("Limpieza automática: {} refresh tokens expirados eliminados", deletedCount);
        }
    }
}
