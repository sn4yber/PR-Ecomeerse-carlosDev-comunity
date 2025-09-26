package com.example.E_comeerse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO para peticiones de refresh token
 */
@Data
public class RefreshTokenRequest {

    @NotBlank(message = "El refresh token es obligatorio")
    private String refreshToken;
}
