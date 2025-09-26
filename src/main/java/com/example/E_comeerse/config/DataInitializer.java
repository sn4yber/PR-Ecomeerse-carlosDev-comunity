package com.example.E_comeerse.config;

import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Inicializador de datos de prueba
 * Crea usuario administrador por defecto al iniciar la aplicación
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeTestUsers();
    }

    private void initializeTestUsers() {
        // Verificar si ya existe el usuario admin
        if (usuarioRepository.findByNombreUsuario("admin").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNombre("Administrador");
            admin.setApellido("Sistema");
            admin.setNombreUsuario("admin");
            admin.setContrasena(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@temp.com"); // Email requerido por validación
            admin.setTelefono("1234567890");

            usuarioRepository.save(admin);
            log.info("Usuario administrador creado:");
            log.info("  Username: admin");
            log.info("  Password: admin123");
        }

        // Crear usuario de prueba regular
        if (usuarioRepository.findByNombreUsuario("usuario").isEmpty()) {
            Usuario usuario = new Usuario();
            usuario.setNombre("Usuario");
            usuario.setApellido("Prueba");
            usuario.setNombreUsuario("usuario");
            usuario.setContrasena(passwordEncoder.encode("123456"));
            usuario.setEmail("usuario@temp.com"); // Email requerido por validación
            usuario.setTelefono("0987654321");

            usuarioRepository.save(usuario);
            log.info("Usuario de prueba creado:");
            log.info("  Username: usuario");
            log.info("  Password: 123456");
        }

        log.info("=== CREDENCIALES DE ACCESO ===");
        log.info("ADMIN -> Username: admin | Password: admin123");
        log.info("USER  -> Username: usuario | Password: 123456");
        log.info("===============================");
    }
}
