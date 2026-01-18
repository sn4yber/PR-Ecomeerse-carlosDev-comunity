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
                    "/api/files/**",
                    "/uploads/**"  // Permitir acceso público a las imágenes
                );
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // CORS para API
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:3000",
                    "http://localhost:5173",
                    "http://localhost:4173",
                    "https://pr-ecomeerse-carlosdev-comunity.onrender.com",  // Backend en Render
                    "https://*.netlify.app",  // Frontend en Netlify
                    "https://pr-ecomeerse-carlosdev-comunity.netlify.app"  // Tu dominio específico
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
        
        // CORS para imágenes
        registry.addMapping("/uploads/**")
                .allowedOrigins(
                    "http://localhost:3000",
                    "http://localhost:5173",
                    "http://localhost:4173",
                    "https://pr-ecomeerse-carlosdev-comunity.onrender.com",  // Backend en Render
                    "https://*.netlify.app",  // Frontend en Netlify
                    "https://pr-ecomeerse-carlosdev-comunity.netlify.app"  // Tu dominio específico
                )
                .allowedMethods("GET", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configurar el acceso a las imágenes subidas
        java.io.File uploadDir = new java.io.File(uploadPath);
        String absolutePath = uploadDir.getAbsolutePath();
        
        // Asegurar que el directorio existe
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        // IMPORTANTE: La ruta DEBE terminar con / para que Spring la reconozca correctamente
        if (!absolutePath.endsWith(java.io.File.separator)) {
            absolutePath += java.io.File.separator;
        }
        
        // Configurar el resource handler - FIXED: usar file: (no file:///) para rutas absolutas
        String resourceLocation = "file:" + absolutePath.replace("\\", "/");

        registry.addResourceHandler("/uploads/productos/**")
                .addResourceLocations(resourceLocation);

        System.out.println("========================================");
        System.out.println("🖼️  Configuración de imágenes:");
        System.out.println("   Ruta configurada: " + uploadPath);
        System.out.println("   Ruta absoluta: " + absolutePath);
        System.out.println("   Resource location: " + resourceLocation);
        System.out.println("   URL de acceso: http://localhost:8080/uploads/productos/");
        System.out.println("   Archivos disponibles:");
        
        // Listar archivos disponibles
        java.io.File[] files = uploadDir.listFiles((d, name) -> 
            name.toLowerCase().endsWith(".jpg") || 
            name.toLowerCase().endsWith(".jpeg") || 
            name.toLowerCase().endsWith(".png")
        );
        
        if (files != null && files.length > 0) {
            for (java.io.File file : files) {
                System.out.println("   ✓ http://localhost:8080/uploads/productos/" + file.getName());
            }
        } else {
            System.out.println("   ⚠️  No se encontraron imágenes en: " + absolutePath);
        }
        System.out.println("========================================");
    }
}
