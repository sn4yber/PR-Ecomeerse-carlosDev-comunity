package com.example.E_comeerse.service;

import com.example.E_comeerse.dto.AuthResponse;
import com.example.E_comeerse.dto.LoginRequest;
import com.example.E_comeerse.dto.RefreshTokenRequest;
import com.example.E_comeerse.model.RefreshToken;
import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.repository.UsuarioRepository;
import com.example.E_comeerse.security.JwtTokenUtil;
import com.example.E_comeerse.security.UserPrincipal;
import com.example.E_comeerse.config.JwtConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * Servicio de autenticación que maneja login, logout y renovación de tokens
 * Integra JWT tokens con sesiones persistentes
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UsuarioRepository usuarioRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;

    /**
     * Autenticar usuario y generar tokens JWT
     */
    @Transactional
    public AuthResponse login(LoginRequest loginRequest, HttpServletRequest request) {
        try {
            // Autenticar credenciales
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getNombreUsuario(),
                    loginRequest.getContrasena()
                )
            );

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            
            // Buscar usuario en base de datos
            Usuario usuario = usuarioRepository.findByNombreUsuario(loginRequest.getNombreUsuario())
                .orElseThrow(() -> new BadCredentialsException("Usuario no encontrado"));

            // Generar access token
            String accessToken = jwtTokenUtil.generateToken(userPrincipal);

            // Obtener información del dispositivo e IP
            String deviceInfo = getDeviceInfo(request, loginRequest.getDeviceInfo());
            String ipAddress = getClientIpAddress(request);

            // Crear refresh token
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(
                usuario, deviceInfo, ipAddress
            );

            log.info("Usuario autenticado exitosamente: {}", loginRequest.getNombreUsuario());

            return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .expiresIn(jwtConfig.getExpiration() / 1000) // En segundos
                .user(AuthResponse.UserInfo.builder()
                    .id(usuario.getIdUsuario())
                    .nombreUsuario(usuario.getNombreUsuario())
                    .email(usuario.getEmail())
                    .nombre(usuario.getNombre())
                    .apellido(usuario.getApellido())
                    .build())
                .build();

        } catch (AuthenticationException e) {
            log.warn("Intento de autenticación fallido para usuario: {}", loginRequest.getNombreUsuario());
            throw new BadCredentialsException("Credenciales inválidas");
        }
    }

    /**
     * Renovar access token usando refresh token
     */
    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
            .map(refreshToken -> {
                // Verificar si el token es válido
                if (!refreshTokenService.verifyExpiration(refreshToken)) {
                    throw new RuntimeException("Refresh token expirado o inválido");
                }

                // Cargar detalles del usuario
                UserDetails userDetails = userDetailsService.loadUserByUsername(
                    refreshToken.getUsuario().getNombreUsuario()
                );

                // Generar nuevo access token
                String newAccessToken = refreshTokenService.generateNewAccessToken(refreshToken, userDetails);

                Usuario usuario = refreshToken.getUsuario();

                return AuthResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(requestRefreshToken) // Mantener el mismo refresh token
                    .tokenType("Bearer")
                    .expiresIn(jwtConfig.getExpiration() / 1000)
                    .user(AuthResponse.UserInfo.builder()
                        .id(usuario.getIdUsuario())
                        .nombreUsuario(usuario.getNombreUsuario())
                        .email(usuario.getEmail())
                        .nombre(usuario.getNombre())
                        .apellido(usuario.getApellido())
                        .build())
                    .build();
            })
            .orElseThrow(() -> new RuntimeException("Refresh token no encontrado"));
    }

    /**
     * Cerrar sesión específica
     */
    @Transactional
    public void logout(String refreshToken) {
        if (refreshToken != null && !refreshToken.isEmpty()) {
            refreshTokenService.revokeToken(refreshToken);
            log.info("Sesión cerrada exitosamente");
        }
    }

    /**
     * Cerrar todas las sesiones del usuario
     */
    @Transactional
    public void logoutAllSessions(String username) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        refreshTokenService.revokeAllUserTokens(usuario);
        log.info("Todas las sesiones cerradas para usuario: {}", username);
    }

    /**
     * Validar si un access token es válido
     */
    public boolean validateAccessToken(String token) {
        return jwtTokenUtil.isTokenValid(token);
    }

    /**
     * Extraer información del dispositivo
     */
    private String getDeviceInfo(HttpServletRequest request, String providedDeviceInfo) {
        if (providedDeviceInfo != null && !providedDeviceInfo.isEmpty()) {
            return providedDeviceInfo;
        }
        
        String userAgent = request.getHeader("User-Agent");
        return userAgent != null ? userAgent.substring(0, Math.min(userAgent.length(), 200)) : "Unknown Device";
    }

    /**
     * Obtener dirección IP del cliente
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}
