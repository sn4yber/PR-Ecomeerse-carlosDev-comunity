package com.example.E_comeerse.config;

import com.example.E_comeerse.security.JwtValidationInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración web que registra interceptors y habilita características adicionales
 * Incluye el interceptor de validación JWT como hook adicional
 * Configuración de archivos estáticos para imágenes de productos
 */
@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final JwtValidationInterceptor jwtValidationInterceptor;

    @Value("${upload.path:uploads/productos}")
    private String uploadPath;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtValidationInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                    "/api/auth/login",
                    "/api/auth/refresh",
                    "/api/public/**",
                    "/api/productos",
                    "/api/productos/**",
                    "/api/categorias",
                    "/api/categorias/**",
                    "/api/files/**"
                );
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:4173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configurar el acceso a las imágenes subidas
        registry.addResourceHandler("/uploads/productos/**")
                .addResourceLocations("file:" + uploadPath + "/");
    }
}
