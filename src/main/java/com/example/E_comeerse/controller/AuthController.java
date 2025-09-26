package com.example.E_comeerse.controller;

import com.example.E_comeerse.dto.AuthResponse;
import com.example.E_comeerse.dto.LoginRequest;
import com.example.E_comeerse.dto.RefreshTokenRequest;
import com.example.E_comeerse.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controlador de autenticación
 * Maneja endpoints para login, refresh token, logout y validación
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint para iniciar sesión
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest request) {

        log.info("Intento de login para usuario: {}", loginRequest.getNombreUsuario());

        try {
            AuthResponse response = authService.login(loginRequest, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error en login: {}", e.getMessage());
            throw e;
        }
    }

    /**
     * Endpoint para renovar access token usando refresh token
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {

        log.info("Solicitud de renovación de token");

        try {
            AuthResponse response = authService.refreshToken(refreshTokenRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error renovando token: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Endpoint para cerrar sesión actual
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(
            @RequestBody(required = false) Map<String, String> logoutRequest) {

        try {
            String refreshToken = logoutRequest != null ? logoutRequest.get("refreshToken") : null;
            authService.logout(refreshToken);

            return ResponseEntity.ok(Map.of("message", "Sesión cerrada exitosamente"));
        } catch (Exception e) {
            log.error("Error en logout: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Error cerrando sesión"));
        }
    }

    /**
     * Endpoint para cerrar todas las sesiones del usuario
     */
    @PostMapping("/logout-all")
    public ResponseEntity<Map<String, String>> logoutAllSessions(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Usuario no autenticado"));
        }

        try {
            String username = authentication.getName();
            authService.logoutAllSessions(username);

            return ResponseEntity.ok(Map.of("message", "Todas las sesiones cerradas exitosamente"));
        } catch (Exception e) {
            log.error("Error cerrando todas las sesiones: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Error cerrando todas las sesiones"));
        }
    }

    /**
     * Endpoint para validar si un token es válido
     */
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(
            @RequestBody Map<String, String> tokenRequest) {

        String token = tokenRequest.get("token");

        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("valid", false, "error", "Token requerido"));
        }

        try {
            boolean isValid = authService.validateAccessToken(token);
            return ResponseEntity.ok(Map.of(
                "valid", isValid,
                "message", isValid ? "Token válido" : "Token inválido"
            ));
        } catch (Exception e) {
            log.error("Error validando token: {}", e.getMessage());
            return ResponseEntity.ok(Map.of("valid", false, "error", e.getMessage()));
        }
    }

    /**
     * Endpoint para obtener información del usuario autenticado
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Usuario no autenticado"));
        }

        try {
            return ResponseEntity.ok(Map.of(
                "username", authentication.getName(),
                "authorities", authentication.getAuthorities(),
                "authenticated", authentication.isAuthenticated()
            ));
        } catch (Exception e) {
            log.error("Error obteniendo información del usuario: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Error obteniendo información del usuario"));
        }
    }
}
