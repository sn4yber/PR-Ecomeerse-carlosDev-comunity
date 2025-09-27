package com.example.E_comeerse.config;

import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.model.Role;
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
        // Crear usuario administrador por defecto
        if (usuarioRepository.findByNombreUsuario("admin").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNombre("Administrador");
            admin.setApellido("Sistema");
            admin.setNombreUsuario("admin");
            admin.setContrasena(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@ecommerce.com");
            admin.setTelefono("1234567890");
            admin.setRol(Role.ADMIN); // Rol de administrador

            usuarioRepository.save(admin);
            log.info("🔐 Usuario administrador creado:");
            log.info("   Username: admin");
            log.info("   Password: admin123");
            log.info("   Rol: ADMIN");
        }

        // Crear usuario de prueba regular
        if (usuarioRepository.findByNombreUsuario("usuario").isEmpty()) {
            Usuario usuario = new Usuario();
            usuario.setNombre("Usuario");
            usuario.setApellido("Prueba");
            usuario.setNombreUsuario("usuario");
            usuario.setContrasena(passwordEncoder.encode("123456"));
            usuario.setEmail("usuario@ecommerce.com");
            usuario.setTelefono("0987654321");
            usuario.setRol(Role.USER); // Rol de usuario regular

            usuarioRepository.save(usuario);
            log.info("👤 Usuario regular creado:");
            log.info("   Username: usuario");
            log.info("   Password: 123456");
            log.info("   Rol: USER");
        }
    }
}
