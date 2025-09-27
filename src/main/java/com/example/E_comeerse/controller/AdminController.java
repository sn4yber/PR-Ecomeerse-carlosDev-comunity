package com.example.E_comeerse.controller;

import com.example.E_comeerse.dto.AdminUsuarioDto;
import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.model.Role;
import com.example.E_comeerse.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UsuarioService usuarioService;

    @Autowired
    public AdminController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioService.listarTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/usuarios/crear")
    public ResponseEntity<?> crearUsuarioAdmin(@Valid @RequestBody AdminUsuarioDto usuarioDto) {
        try {
            Usuario nuevoUsuario = usuarioService.crearUsuarioConRol(usuarioDto);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear el usuario: " + e.getMessage());
        }
    }

    @PutMapping("/usuarios/{id}/promover")
    public ResponseEntity<?> promoverUsuario(@PathVariable Long id) {
        try {
            Usuario usuarioPromovido = usuarioService.promoverAAdmin(id);
            return ResponseEntity.ok("Usuario promovido a administrador: " + usuarioPromovido.getNombreUsuario());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al promover usuario: " + e.getMessage());
        }
    }

    // === GESTIÓN DE PRODUCTOS ===

    @GetMapping("/productos/estadisticas")
    public ResponseEntity<?> obtenerEstadisticasProductos() {
        // Endpoint para obtener estadísticas básicas de productos
        // TODO: Implementar en el service
        return ResponseEntity.ok("Estadísticas de productos - Por implementar");
    }

    @PutMapping("/productos/{id}/stock")
    public ResponseEntity<?> actualizarStock(@PathVariable Long id, @RequestParam Integer nuevoStock) {
        // Endpoint para actualizar stock de productos
        // TODO: Implementar en ProductoService
        return ResponseEntity.ok("Stock actualizado - Por implementar");
    }
}
