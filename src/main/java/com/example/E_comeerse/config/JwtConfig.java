package com.example.E_comeerse.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

/**
 * Configuración para propiedades JWT
 * Centraliza la configuración de tokens JWT
 */
@Configuration
@ConfigurationProperties(prefix = "jwt")
@Data
public class JwtConfig {
    
    private String secret = "mySecretKey123456789012345678901234567890"; // Clave secreta por defecto
    private long expiration = 86400000; // 24 horas en milisegundos
    private long refreshExpiration = 604800000; // 7 días en milisegundos
    private String tokenPrefix = "Bearer ";
    private String headerString = "Authorization";
    
}
