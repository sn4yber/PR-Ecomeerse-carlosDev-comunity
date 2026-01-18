/**
 * @fileoverview Sistema de refresh automático de tokens JWT
 * @description Maneja el refresh automático del token antes de que expire
 * @author E-commerce Team
 * @created 2025-10-02
 */

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api`;

/**
 * Decodifica un token JWT sin validar (solo para leer claims)
 */
function decodeJWT(token: string): any {
  try {
    // Validar que el token existe y tiene el formato correcto
    if (!token || typeof token !== 'string' || !token.includes('.')) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}



/**
 * Refresca el token usando el refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    // El backend devuelve 'accessToken', no 'token'
    const newToken = data.accessToken || data.token;
    
    // Guardar el nuevo token
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      return null;
    }
    
    // Si viene un nuevo refresh token, guardarlo también
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }

    return newToken;
  } catch (error) {
    return null;
  }
}

/**
 * Verifica y refresca el token si es necesario
 * Retorna el token válido (actual o refrescado)
 */
export async function ensureValidToken(): Promise<string | null> {
  const currentToken = localStorage.getItem('token');

  if (!currentToken) {
    return null;
  }

  const decoded = decodeJWT(currentToken);
  if (decoded && decoded.exp) {
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    
    // Si el token aún es válido (no expiró), usarlo directamente
    if (timeUntilExpiration > 0) {
      // Refrescar en background si está por expirar (sin bloquear)
      if (timeUntilExpiration < 120000) {
        refreshAccessToken().catch(() => {
          // Silenciosamente ignorar errores de refresh en background
        });
      }
      
      return currentToken;
    }
  }

  // Si el token expiró o no se pudo decodificar, intentar refrescar
  const newToken = await refreshAccessToken();
  
  if (!newToken) {
    return null;
  }
  
  return newToken;
}

/**
 * Iniciar verificación periódica del token (cada minuto)
 */
export function startTokenRefreshMonitor(): void {
  // Verificar inmediatamente
  ensureValidToken();

  // Luego verificar cada minuto
  setInterval(() => {
    ensureValidToken();
  }, 60000); // 60 segundos
}
