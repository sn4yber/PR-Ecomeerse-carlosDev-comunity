package com.example.E_comeerse.service;
import com.example.E_comeerse.dto.AdminUsuarioDto;
import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.model.Role;
import com.example.E_comeerse.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Método principal para listar usuarios (eliminamos duplicado)
    public List<Usuario> listarTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerUsuarioPorId(Long id){
        return usuarioRepository.findById(id);
    }

    public Usuario guardarUsuario(Usuario usuario){
        if(usuarioRepository.existsByEmail(usuario.getEmail())){
            throw new IllegalArgumentException("ya existe un usuario con este email");
        }
        if(usuarioRepository.existsByNombreUsuario(usuario.getNombreUsuario())){
            throw new IllegalArgumentException("ya existe este usuario ");
        }
        
        // Encriptar la contraseña antes de guardar
        if (usuario.getContrasena() != null && !usuario.getContrasena().isEmpty()) {
            // Solo encriptar si la contraseña no está ya encriptada (verificar si tiene formato BCrypt)
            if (!usuario.getContrasena().startsWith("$2a$")) {
                usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
            }
        }
        
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id){
        usuarioRepository.deleteById(id);
    }
    
    public boolean validarCredenciales(String nombreUsuario, String contrasena) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombreUsuario(nombreUsuario);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            return passwordEncoder.matches(contrasena, usuario.getContrasena());
        }
        return false;
    }
    
    public Optional<Usuario> buscarPorNombreUsuario(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }

    /**
     * Método para administradores: crear usuario con rol específico
     */
    public Usuario crearUsuarioConRol(AdminUsuarioDto usuarioDto) {
        // Validar que no exista el email
        if (usuarioRepository.existsByEmail(usuarioDto.getEmail())) {
            throw new IllegalArgumentException("Ya existe un usuario con este email");
        }

        // Validar que no exista el nombre de usuario
        if (usuarioRepository.existsByNombreUsuario(usuarioDto.getNombreUsuario())) {
            throw new IllegalArgumentException("Ya existe este nombre de usuario");
        }

        // Crear el nuevo usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(usuarioDto.getNombre());
        nuevoUsuario.setApellido(usuarioDto.getApellido());
        nuevoUsuario.setNombreUsuario(usuarioDto.getNombreUsuario());
        nuevoUsuario.setEmail(usuarioDto.getEmail());
        nuevoUsuario.setTelefono(usuarioDto.getTelefono());
        nuevoUsuario.setRol(usuarioDto.getRol());

        // Encriptar la contraseña
        nuevoUsuario.setContrasena(passwordEncoder.encode(usuarioDto.getContrasena()));

        return usuarioRepository.save(nuevoUsuario);
    }

    /**
     * Método para promover un usuario a administrador
     */
    public Usuario promoverAAdmin(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        usuario.setRol(Role.ADMIN);
        return usuarioRepository.save(usuario);
    }
}
