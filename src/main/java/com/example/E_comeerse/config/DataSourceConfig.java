package com.example.E_comeerse.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Configuración de DataSource para producción
 * Parsea manualmente la DATABASE_URL y configura HikariCP correctamente
 */
@Configuration
@Profile("production")
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        System.out.println("=== DataSource Configuration ===");

        if (databaseUrl == null || databaseUrl.isEmpty()) {
            throw new IllegalStateException("DATABASE_URL environment variable is not set");
        }

        try {
            // Remover jdbc: si existe para parsear
            String uriString = databaseUrl.replace("jdbc:", "");

            // Parsear la URI
            URI uri = new URI(uriString);

            String username = null;
            String password = null;

            // Extraer username y password
            String userInfo = uri.getUserInfo();
            if (userInfo != null) {
                String[] credentials = userInfo.split(":");
                username = credentials[0];
                if (credentials.length > 1) {
                    password = credentials[1];
                }
            }

            // Construir JDBC URL sin credenciales
            String jdbcUrl = "jdbc:postgresql://" + uri.getHost();
            if (uri.getPort() != -1) {
                jdbcUrl += ":" + uri.getPort();
            }
            jdbcUrl += uri.getPath();

            // Agregar query parameters (sslmode, etc.)
            String query = uri.getQuery();
            if (query != null && !query.isEmpty()) {
                // Eliminar channel_binding=require
                query = query.replace("&channel_binding=require", "")
                            .replace("channel_binding=require&", "")
                            .replace("channel_binding=require", "");

                if (!query.isEmpty()) {
                    jdbcUrl += "?" + query;
                }
            }

            System.out.println("Parsed JDBC URL: " + jdbcUrl);
            System.out.println("Username: " + username);
            System.out.println("Password: " + (password != null ? "****" : "null"));

            // Configurar HikariCP
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(jdbcUrl);
            config.setUsername(username);
            config.setPassword(password);
            config.setDriverClassName("org.postgresql.Driver");

            // Configuraciones optimizadas para Render/Neon
            config.setMaximumPoolSize(10);
            config.setMinimumIdle(5);
            config.setConnectionTimeout(20000);
            config.setIdleTimeout(300000);
            config.setMaxLifetime(1200000);

            System.out.println("HikariCP configured successfully");
            System.out.println("================================");

            return new HikariDataSource(config);

        } catch (URISyntaxException e) {
            System.err.println("Failed to parse DATABASE_URL: " + e.getMessage());
            throw new IllegalStateException("Invalid DATABASE_URL format", e);
        }
    }
}

