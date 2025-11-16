package com.example.E_comeerse.controller;

import com.example.E_comeerse.model.Role;
import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioService.listarTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.obtenerUsuarioPorId(id);
        return usuario.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crearUsuario(
            @Valid @RequestBody Usuario usuario, 
            Authentication authentication) {
        try {
            // Si no hay autenticación (registro público), FORZAR rol USER
            if (authentication == null || !authentication.isAuthenticated()) {
                usuario.setRol(Role.USER);
            } 
            // Si hay autenticación, verificar si es ADMIN
            else {
                boolean esAdmin = authentication.getAuthorities()
                    .contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
                
                // Si NO es ADMIN, solo puede crear usuarios con rol USER
                if (!esAdmin) {
                    usuario.setRol(Role.USER);
                }
                // Si es ADMIN, puede usar el rol que venga en el request
                // (no hacemos nada, usamos el rol que ya tiene el objeto)
            }
            
            Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioService.obtenerUsuarioPorId(id);
        if (usuarioExistente.isPresent()) {
            try {
                usuario.setIdUsuario(id);
                Usuario usuarioActualizado = usuarioService.guardarUsuario(usuario);
                return ResponseEntity.ok(usuarioActualizado);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.obtenerUsuarioPorId(id);
        if (usuario.isPresent()) {
            usuarioService.eliminarUsuario(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // ========== ENDPOINTS PARA PERFIL DE USUARIO ==========
    
    /**
     * Obtener perfil del usuario autenticado
     * GET /api/usuarios/perfil
     */
    @GetMapping("/perfil")
    public ResponseEntity<?> obtenerPerfil(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("No autenticado");
            }
            
            String nombreUsuario = authentication.getName();
            Optional<Usuario> usuario = usuarioService.obtenerPorNombreUsuario(nombreUsuario);
            
            return usuario.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener perfil: " + e.getMessage());
        }
    }
    
    /**
     * Actualizar perfil del usuario autenticado
     * PUT /api/usuarios/perfil
     */
    @PutMapping("/perfil")
    public ResponseEntity<?> actualizarPerfil(
            @Valid @RequestBody Usuario usuarioActualizado,
            Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("No autenticado");
            }
            
            String nombreUsuario = authentication.getName();
            Optional<Usuario> usuarioOpt = usuarioService.obtenerPorNombreUsuario(nombreUsuario);
            
            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Usuario usuario = usuarioOpt.get();
            
            // Actualizar solo campos permitidos (no rol, no contraseña aquí)
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setApellido(usuarioActualizado.getApellido());
            usuario.setEmail(usuarioActualizado.getEmail());
            usuario.setTelefono(usuarioActualizado.getTelefono());
            // nombreUsuario NO se puede cambiar
            
            Usuario guardado = usuarioService.actualizarPerfil(usuario);
            return ResponseEntity.ok(guardado);
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar perfil: " + e.getMessage());
        }
    }
    
    /**
     * Cambiar contraseña del usuario autenticado
     * POST /api/usuarios/cambiar-contrasena
     */
    @PostMapping("/cambiar-contrasena")
    public ResponseEntity<?> cambiarContrasena(
            @RequestBody CambiarContrasenaRequest request,
            Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("No autenticado");
            }
            
            String nombreUsuario = authentication.getName();
            
            boolean resultado = usuarioService.cambiarContrasena(
                nombreUsuario, 
                request.getContrasenaActual(), 
                request.getNuevaContrasena()
            );
            
            if (resultado) {
                return ResponseEntity.ok("Contraseña actualizada exitosamente");
            } else {
                return ResponseEntity.badRequest()
                        .body("La contraseña actual es incorrecta");
            }
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cambiar contraseña: " + e.getMessage());
        }
    }
    
    // Clase interna para el request de cambio de contraseña
    public static class CambiarContrasenaRequest {
        private String contrasenaActual;
        private String nuevaContrasena;
        
        public String getContrasenaActual() {
            return contrasenaActual;
        }
        
        public void setContrasenaActual(String contrasenaActual) {
            this.contrasenaActual = contrasenaActual;
        }
        
        public String getNuevaContrasena() {
            return nuevaContrasena;
        }
        
        public void setNuevaContrasena(String nuevaContrasena) {
            this.nuevaContrasena = nuevaContrasena;
        }
    }
}
