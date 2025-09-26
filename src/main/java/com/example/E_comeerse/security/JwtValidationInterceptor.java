package com.example.E_comeerse.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Interceptor para validaciones adicionales de JWT
 * Hook que se ejecuta antes y después de cada petición
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtValidationInterceptor implements HandlerInterceptor {

    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        
        log.debug("Procesando petición: {} {}", method, requestURI);
        
        // Skip validation for public endpoints
        if (isPublicEndpoint(requestURI)) {
            return true;
        }

        // Validar que el usuario esté autenticado para endpoints protegidos
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("Acceso denegado a endpoint protegido: {} {}", method, requestURI);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("""
                {
                    "error": "Token requerido",
                    "message": "Se requiere autenticación para acceder a este recurso",
                    "timestamp": "%s",
                    "status": 401
                }
                """.formatted(java.time.Instant.now().toString()));
            return false;
        }

        // Log successful authentication
        log.debug("Usuario autenticado: {} accediendo a: {}", authentication.getName(), requestURI);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        
        if (ex != null) {
            log.error("Error durante el procesamiento de la petición: {}", ex.getMessage());
        }
        
        // Log response status for monitoring
        int status = response.getStatus();
        if (status >= 400) {
            log.warn("Petición completada con error: {} {} - Status: {}", 
                    request.getMethod(), request.getRequestURI(), status);
        }
    }

    /**
     * Determinar si un endpoint es público
     */
    private boolean isPublicEndpoint(String requestURI) {
        return requestURI.startsWith("/api/auth/") ||
               requestURI.startsWith("/api/public/") ||
               requestURI.startsWith("/actuator/") ||
               requestURI.equals("/api/productos") ||
               requestURI.startsWith("/api/productos/") ||
               requestURI.equals("/api/categorias") ||
               requestURI.startsWith("/api/categorias/") ||
               requestURI.equals("/");
    }
}
