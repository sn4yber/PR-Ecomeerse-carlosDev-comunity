package com.example.E_comeerse.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

/**
 * Configuración de DataSource para producción
 * Maneja automáticamente URLs de PostgreSQL que no tienen el prefijo jdbc:
 */
@Configuration
@Profile("production")
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        System.out.println("=== DataSource Configuration ===");
        System.out.println("Original DATABASE_URL: " + (databaseUrl != null ? databaseUrl.substring(0, Math.min(30, databaseUrl.length())) + "..." : "null"));

        if (databaseUrl == null || databaseUrl.isEmpty()) {
            throw new IllegalStateException("DATABASE_URL environment variable is not set");
        }

        // Si la URL no comienza con jdbc:, agregarla
        if (!databaseUrl.startsWith("jdbc:")) {
            System.out.println("Adding jdbc: prefix to DATABASE_URL");
            databaseUrl = "jdbc:" + databaseUrl;
        }

        // Eliminar channel_binding=require si está presente (puede causar problemas)
        if (databaseUrl.contains("channel_binding=require")) {
            System.out.println("Removing channel_binding=require parameter");
            databaseUrl = databaseUrl.replace("&channel_binding=require", "");
            databaseUrl = databaseUrl.replace("?channel_binding=require&", "?");
            databaseUrl = databaseUrl.replace("?channel_binding=require", "");
        }

        System.out.println("Final JDBC URL: " + databaseUrl.substring(0, Math.min(50, databaseUrl.length())) + "...");
        System.out.println("================================");

        return DataSourceBuilder
                .create()
                .url(databaseUrl)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
