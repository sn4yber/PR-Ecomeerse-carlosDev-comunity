package com.example.E_comeerse.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Punto de entrada para manejar excepciones de autenticación
 * Se ejecuta cuando un usuario no autenticado intenta acceder a recursos protegidos
 */
@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, 
                        HttpServletResponse response,
                        AuthenticationException authException) throws IOException, ServletException {
        
        log.warn("Acceso no autorizado: {}", authException.getMessage());
        
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("""
            {
                "error": "No autorizado",
                "message": "Se requiere autenticación para acceder a este recurso",
                "timestamp": "%s",
                "status": 401
            }
            """.formatted(java.time.Instant.now().toString()));
    }
}
