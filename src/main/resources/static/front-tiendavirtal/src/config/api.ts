export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
  },
  // Productos
  PRODUCTOS: `${API_URL}/api/productos`,
  // Carrito
  CARRITO: `${API_URL}/api/carrito`,
  // Uploads
  UPLOADS: `${API_URL}/uploads`,
};
