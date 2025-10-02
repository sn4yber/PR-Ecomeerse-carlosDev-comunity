package com.example.E_comeerse.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.E_comeerse.config.JwtConfig;

import java.io.IOException;

/**
 * Filtro JWT para interceptar y validar tokens en cada petición
 * Middleware de autenticación que verifica tokens JWT
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    private final JwtConfig jwtConfig;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        final String authorizationHeader = request.getHeader(jwtConfig.getHeaderString());
        
        String username = null;
        String jwtToken = null;

        // Extraer token del header Authorization
        if (authorizationHeader != null && authorizationHeader.startsWith(jwtConfig.getTokenPrefix())) {
            jwtToken = jwtTokenUtil.extractTokenFromHeader(authorizationHeader);
            
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (Exception e) {
                log.warn("Error extrayendo username del token JWT: {}", e.getMessage());
            }
        } else {
            log.debug("Authorization header no encontrado o no válido");
        }

        // Validar token y establecer contexto de seguridad
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                
                // Validar token
                if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                    // Crear token de autenticación
                    UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(
                            userDetails, 
                            null, 
                            userDetails.getAuthorities()
                        );
                    
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    // Establecer contexto de seguridad
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                    log.debug("Usuario autenticado: {}", username);
                } else {
                    log.warn("Token JWT inválido para usuario: {}", username);
                }
                
            } catch (Exception e) {
                log.error("Error durante autenticación JWT: {}", e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // No filtrar endpoints públicos
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/") || 
               path.startsWith("/api/public/") ||
               path.startsWith("/api/files/") ||  // ⭐ IMPORTANTE: Permitir subida de archivos
               path.startsWith("/actuator/") ||
               path.startsWith("/h2-console/") ||
               path.startsWith("/uploads/") ||  // ⭐ IMPORTANTE: Permitir acceso público a imágenes
               path.equals("/");
    }
}
