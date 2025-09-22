package com.example.E_comeerse.service;
import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodosLosUsuarios() {
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
        return usuarioRepository.save(usuario);
    }
    public void eliminarUsuario(Long id){
        usuarioRepository.deleteById(id);
    }
    
    public boolean validarCredenciales(String nombreUsuario, String contrasena) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombreUsuario(nombreUsuario);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Comparar directamente las contraseñas (sin hash por simplicidad)
            return contrasena.equals(usuario.getContrasena());
        }
        return false;
    }
    
    public Optional<Usuario> buscarPorNombreUsuario(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }
}

