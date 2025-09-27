package com.example.E_comeerse.model;

/**
 * Enum que define los roles disponibles en el sistema
 * - ADMIN: Administrador con acceso completo
 * - USER: Usuario regular con permisos limitados
 */
public enum Role {
    ADMIN("ADMIN"),
    USER("USER");
    
    private final String authority;
    
    Role(String authority) {
        this.authority = authority;
    }
    
    public String getAuthority() {
        return authority;
    }
    
    @Override
    public String toString() {
        return authority;
    }
}
