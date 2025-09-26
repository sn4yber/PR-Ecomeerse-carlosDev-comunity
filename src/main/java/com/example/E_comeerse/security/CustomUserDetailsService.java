package com.example.E_comeerse.security;

import com.example.E_comeerse.model.Usuario;
import com.example.E_comeerse.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Servicio personalizado para cargar detalles de usuario
 * Implementa UserDetailsService para integración con Spring Security
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Cargando usuario por username: {}", username);
        
        Usuario usuario = usuarioRepository.findByNombreUsuario(username)
            .orElseThrow(() -> {
                log.warn("Usuario no encontrado: {}", username);
                return new UsernameNotFoundException("Usuario no encontrado: " + username);
            });

        log.debug("Usuario encontrado: {}", usuario.getNombreUsuario());
        
        return UserPrincipal.builder()
            .id(usuario.getIdUsuario())
            .username(usuario.getNombreUsuario())
            .password(usuario.getContrasena())
            .email(usuario.getEmail())
            .nombre(usuario.getNombre())
            .apellido(usuario.getApellido())
            .telefono(usuario.getTelefono())
            .authorities(getAuthorities(usuario))
            .enabled(true)
            .accountNonExpired(true)
            .accountNonLocked(true)
            .credentialsNonExpired(true)
            .build();
    }

    /**
     * Obtiene las autoridades del usuario
     * Por ahora asigna rol USER por defecto, se puede expandir según necesidades
     */
    private Collection<? extends GrantedAuthority> getAuthorities(Usuario usuario) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        // Rol por defecto - se puede expandir con tabla de roles
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        
        // Se puede agregar lógica adicional para roles específicos
        // authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        
        return authorities;
    }
}
