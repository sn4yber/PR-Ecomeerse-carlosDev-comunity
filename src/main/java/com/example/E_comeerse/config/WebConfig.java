package com.example.E_comeerse.config;

import com.example.E_comeerse.security.JwtValidationInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración web que registra interceptors y habilita características adicionales
 * Incluye el interceptor de validación JWT como hook adicional
 */
@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final JwtValidationInterceptor jwtValidationInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtValidationInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                    "/api/auth/login",
                    "/api/auth/refresh",
                    "/api/public/**",
                    "/api/productos",
                    "/api/productos/{id}",
                    "/api/categorias",
                    "/api/categorias/{id}"
                );
    }
}
