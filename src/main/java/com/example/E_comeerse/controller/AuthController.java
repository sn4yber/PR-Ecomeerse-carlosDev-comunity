package com.example.E_comeerse.controller;

import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String nombreUsuario = credentials.get("nombreUsuario");
        String contrasena = credentials.get("contrasena");
        
        Map<String, Object> response = new HashMap<>();
        
        if (usuarioService.validarCredenciales(nombreUsuario, contrasena)) {
            response.put("success", true);
            response.put("message", "Login exitoso");
            response.put("usuario", nombreUsuario);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Credenciales incorrectas");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout exitoso");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "API de autenticación funcionando");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/crear-admin")
    public ResponseEntity<Map<String, Object>> crearAdmin() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Verificar si ya existe el usuario admin
            if (usuarioService.buscarPorNombreUsuario("admin").isPresent()) {
                response.put("success", false);
                response.put("message", "El usuario admin ya existe");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Crear nuevo usuario admin
            Usuario admin = new Usuario();
            admin.setNombre("Administrador");
            admin.setApellido("Sistema");
            admin.setNombreUsuario("admin");
            admin.setContrasena("admi123");
            admin.setEmail("admin@tienda.com");
            admin.setTelefono("123456789");
            
            Usuario usuarioCreado = usuarioService.guardarUsuario(admin);
            
            response.put("success", true);
            response.put("message", "Usuario admin creado exitosamente");
            response.put("usuario", usuarioCreado.getNombreUsuario());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al crear usuario admin: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}