package com.example.E_comeerse.dto;

import lombok.Builder;
import lombok.Data;

/**
 * DTO para respuestas de autenticación exitosa
 */
@Data
@Builder
public class AuthResponse {
    
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Long expiresIn;
    private UserInfo user;

    @Data
    @Builder
    public static class UserInfo {
        private Long id;
        private String nombreUsuario;
        private String email;
        private String nombre;
        private String apellido;
        private String rol;
    }
}
