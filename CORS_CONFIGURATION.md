# 🌐 Configuración de CORS - Backend Render

## ✅ CORS Configurado Correctamente

Tu backend en Render ahora acepta peticiones desde:

### 🔗 Dominios permitidos:

1. **Local Development**:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - `http://localhost:4173`

2. **Producción (Render)**:
   - `https://pr-ecomeerse-carlosdev-comunity.onrender.com`

---

## 📝 Configuración aplicada en:

### 1. `SecurityConfig.java`
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:3000", 
        "http://localhost:5173", 
        "http://localhost:4173",
        "https://pr-ecomeerse-carlosdev-comunity.onrender.com"
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);
    
    // ... resto del código
}
```

### 2. `WebConfig.java`
```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    // CORS para API
    registry.addMapping("/api/**")
            .allowedOrigins(
                "http://localhost:3000", 
                "http://localhost:5173", 
                "http://localhost:4173",
                "https://pr-ecomeerse-carlosdev-comunity.onrender.com"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    
    // CORS para imágenes
    registry.addMapping("/uploads/**")
            .allowedOrigins(/* mismos orígenes */)
            .allowedMethods("GET", "OPTIONS")
            .allowedHeaders("*")
            .maxAge(3600);
}
```

---

## 🚀 Configuración del Frontend

### Para React (Vite/Create React App)

Crea un archivo `.env` en la raíz de tu proyecto frontend:

```env
# Desarrollo
VITE_API_URL=http://localhost:8080
# O para producción
VITE_API_URL=https://pr-ecomeerse-carlosdev-comunity.onrender.com
```

Y úsalo en tu código:

```javascript
// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    login: `${API_BASE_URL}/api/auth/login`,
    productos: `${API_BASE_URL}/api/productos`,
    // ... más endpoints
  }
};

// Uso con fetch
fetch(api.endpoints.login, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Importante para CORS con cookies
  body: JSON.stringify({ email, password })
})
```

### Para Axios

```javascript
// src/config/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  withCredentials: true, // Importante para CORS
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// Uso:
import api from './config/axios';

// Login
const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

// Obtener productos
const getProductos = async () => {
  const response = await api.get('/api/productos');
  return response.data;
};
```

---

## 🧪 Pruebas desde el Frontend

### 1. Probar CORS con curl
```bash
curl -X OPTIONS https://pr-ecomeerse-carlosdev-comunity.onrender.com/api/productos \
  -H "Origin: https://tu-frontend.com" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

Deberías ver en la respuesta:
```
< Access-Control-Allow-Origin: https://pr-ecomeerse-carlosdev-comunity.onrender.com
< Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
< Access-Control-Allow-Credentials: true
```

### 2. Probar desde el navegador

Abre la consola de tu navegador y ejecuta:

```javascript
// Test básico de CORS
fetch('https://pr-ecomeerse-carlosdev-comunity.onrender.com/api/productos')
  .then(response => response.json())
  .then(data => console.log('✅ CORS funciona:', data))
  .catch(error => console.error('❌ Error CORS:', error));

// Test con autenticación
const token = 'tu_token_aqui';
fetch('https://pr-ecomeerse-carlosdev-comunity.onrender.com/api/usuarios', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => console.log('✅ Auth funciona:', data))
  .catch(error => console.error('❌ Error:', error));
```

---

## 🔧 Configuración Adicional para Producción

### Si tu frontend estará en otro dominio (ej: Vercel, Netlify)

Actualiza los archivos agregando tu dominio frontend:

```java
// En SecurityConfig.java y WebConfig.java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://localhost:4173",
    "https://pr-ecomeerse-carlosdev-comunity.onrender.com",  // Backend
    "https://tu-frontend.vercel.app",                         // Frontend en Vercel
    "https://tu-frontend.netlify.app"                         // Frontend en Netlify
));
```

### Configurar variable de entorno en Render

También puedes hacer esto dinámico con variables de entorno:

1. En `application-production.properties`:
```properties
cors.allowed-origins=${CORS_ALLOWED_ORIGINS:http://localhost:3000,http://localhost:5173}
```

2. En Render → Environment:
```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://tu-frontend.com
```

3. Leer en el código:
```java
@Value("${cors.allowed-origins}")
private String allowedOrigins;

@Override
public void addCorsMappings(CorsRegistry registry) {
    String[] origins = allowedOrigins.split(",");
    registry.addMapping("/api/**")
            .allowedOrigins(origins)
            // ... resto de configuración
}
```

---

## ⚠️ Problemas Comunes

### ❌ Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Causa**: El origen no está en la lista de permitidos.

**Solución**: Verifica que el dominio esté exactamente como lo estás usando (con/sin `https`, con/sin `www`).

### ❌ Error: "CORS policy: The value of 'Access-Control-Allow-Credentials' is '' when the request's credentials mode is 'include'"

**Causa**: Estás enviando credenciales pero no está configurado en el backend.

**Solución**: Ya está configurado con `allowCredentials(true)` ✅

### ❌ Error: Peticiones funcionan en local pero no en producción

**Causa**: 
1. HTTPS vs HTTP mixto
2. Dominio no agregado a CORS
3. Firewall o proxy bloqueando

**Solución**:
1. Asegúrate de usar HTTPS en producción
2. Verifica que el dominio esté en la lista
3. Revisa los logs de Render

---

## 📚 Endpoints Disponibles

Con CORS configurado, tu frontend puede acceder a:

### Públicos (sin autenticación):
- `GET /api/productos` - Listar productos
- `GET /api/productos/{id}` - Ver producto
- `GET /api/categorias` - Listar categorías
- `POST /api/auth/login` - Login
- `POST /api/usuarios` - Registro
- `GET /uploads/productos/{imagen}` - Ver imágenes

### Protegidos (requieren JWT):
- `POST /api/productos` - Crear producto (ADMIN)
- `PUT /api/productos/{id}` - Actualizar producto (ADMIN)
- `DELETE /api/productos/{id}` - Eliminar producto (ADMIN)
- `GET /api/usuarios` - Listar usuarios (USER/ADMIN)
- `GET /api/pedidos` - Ver mis pedidos (USER)
- `POST /api/pedidos` - Crear pedido (USER)

---

## ✅ Checklist de Configuración

- [x] CORS configurado en `SecurityConfig.java`
- [x] CORS configurado en `WebConfig.java`
- [x] Dominio de Render agregado
- [x] Métodos HTTP incluyen `PATCH`
- [x] `allowCredentials` habilitado
- [ ] Frontend configurado con `VITE_API_URL`
- [ ] Frontend enviando credenciales (`credentials: 'include'`)
- [ ] JWT token agregado en headers (`Authorization: Bearer`)
- [ ] Probado desde el navegador

---

## 🎯 Próximos Pasos

1. **Subir cambios a GitHub**:
   ```bash
   git add .
   git commit -m "feat: Configurar CORS para Render"
   git push origin main
   ```

2. **Render desplegará automáticamente** (si tienes auto-deploy habilitado)

3. **Esperar 3-5 minutos** para que Render reconstruya la imagen

4. **Probar desde tu frontend**:
   ```javascript
   fetch('https://pr-ecomeerse-carlosdev-comunity.onrender.com/api/productos')
     .then(r => r.json())
     .then(d => console.log('✅ Funciona!', d))
   ```

---

¡Listo! 🎉 Tu backend ahora aceptará peticiones desde tu frontend en producción.

