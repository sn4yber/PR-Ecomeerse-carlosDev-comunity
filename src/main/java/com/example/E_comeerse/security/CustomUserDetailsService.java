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

        // Crear las autoridades basadas en el rol del usuario
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()));

        log.debug("Usuario encontrado: {} con rol: {}", usuario.getNombreUsuario(), usuario.getRol());

        return UserPrincipal.builder()
            .id(usuario.getIdUsuario())
            .username(usuario.getNombreUsuario())
            .password(usuario.getContrasena())
            .email(usuario.getEmail())
            .nombre(usuario.getNombre())
            .apellido(usuario.getApellido())
            .telefono(usuario.getTelefono())
            .authorities(authorities)
            .enabled(true)
            .accountNonExpired(true)
            .accountNonLocked(true)
            .credentialsNonExpired(true)
            .build();
    }
}
