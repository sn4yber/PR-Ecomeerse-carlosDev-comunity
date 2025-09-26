# 🛒 E-Commerce - NebulaTech TiendaVirtual

## 📋 Descripción Completa

**NebulaTech E-Commerce** es un proyecto colaborativo de tienda virtual desarrollado con arquitectura full-stack moderna. Combina **Spring Boot** para el backend API REST con **React + TypeScript** para el frontend, creando una aplicación escalable para gestión completa de productos gaming, usuarios y pedidos en línea.

### 🎯 Objetivos del Proyecto
- Crear una plataforma e-commerce completa y funcional
- Implementar mejores prácticas de desarrollo full-stack
- Proporcionar experiencia de usuario moderna y responsiva
- Gestión completa de inventario, usuarios y pedidos
- Sistema de autenticación JWT robusto

## 🏗️ Arquitectura Completa del Sistema

```
E-comeerse/
├── 📁 Backend (Spring Boot + Java 24)
│   ├── src/main/java/com/example/E_comeerse/
│   │   ├── 🎮 EComeerseApplication.java    # Clase principal
│   │   ├── 🎛️ config/                      # Configuraciones
│   │   │   ├── SecurityConfig.java         # Seguridad Spring
│   │   │   ├── JwtConfig.java             # Configuración JWT
│   │   │   ├── WebConfig.java             # Configuración Web/CORS
│   │   │   └── DataInitializer.java       # Datos iniciales
│   │   ├── 🎯 controller/                  # Controladores REST API
│   │   │   ├── AuthController.java         # Autenticación
│   │   │   ├── UsuarioController.java      # Gestión usuarios
│   │   │   ├── ProductoController.java     # Gestión productos
│   │   │   ├── CategoriaController.java    # Gestión categorías
│   │   │   └── PedidoController.java       # Gestión pedidos
│   │   ├── 🗂️ dto/                        # Data Transfer Objects
│   │   │   ├── AuthResponse.java          # Respuesta autenticación
│   │   │   ├── LoginRequest.java          # Petición login
│   │   │   └── RefreshTokenRequest.java   # Petición refresh token
│   │   ├── ⚠️ exception/                   # Manejo de excepciones
│   │   │   └── AuthExceptionHandler.java  # Excepciones auth
│   │   ├── 🏗️ model/                      # Entidades JPA
│   │   │   ├── Usuario.java               # Entidad Usuario
│   │   │   ├── Producto.java              # Entidad Producto
│   │   │   ├── Categoria.java             # Entidad Categoría
│   │   │   └── Pedido.java                # Entidad Pedido
│   │   ├── 🗃️ repository/                 # Repositorios JPA
│   │   │   ├── UsuarioRepository.java     # Repo usuarios
│   │   │   ├── ProductoRepository.java    # Repo productos
│   │   │   ├── CategoriaRepository.java   # Repo categorías
│   │   │   └── PedidoRepository.java      # Repo pedidos
│   │   ├── 🔒 security/                    # Sistema seguridad JWT
│   │   │   ├── JwtTokenUtil.java          # Utilidades JWT
│   │   │   ├── JwtAuthenticationFilter.java # Filtro JWT
│   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   ├── JwtValidationInterceptor.java
│   │   │   ├── CustomUserDetailsService.java
│   │   │   └── UserPrincipal.java         # Principal usuario
│   │   └── 🎪 service/                     # Lógica de negocio
│   │       ├── UsuarioService.java        # Servicios usuario
│   │       ├── ProductoService.java       # Servicios producto
│   │       ├── CategoriaService.java      # Servicios categoría
│   │       └── PedidoService.java         # Servicios pedido
│   ├── src/main/resources/
│   │   ├── application.properties         # Configuración app
│   │   ├── static/                        # Recursos estáticos
│   │   │   └── front-tiendavirtal/        # Frontend integrado
│   │   └── templates/                     # Plantillas (si aplica)
│   └── src/test/java/                     # Tests unitarios
├── 📁 Frontend (React + TypeScript)
│   └── src/main/resources/static/front-tiendavirtal/
│       ├── 📋 package.json                # Dependencias NPM
│       ├── 🏠 index.html                  # Página principal HTML
│       ├── ⚙️ vite.config.ts              # Configuración Vite
│       ├── 🎨 tailwind.config.js          # Configuración Tailwind
│       ├── 📏 tsconfig.*.json             # Configuración TypeScript
│       ├── 🔍 eslint.config.js            # Configuración ESLint
│       ├── public/                        # Assets públicos
│       │   ├── universo.png               # Logo/Favicon
│       │   └── random-image.png           # Imágenes demo
│       └── src/                           # Código fuente frontend
│           ├── 🎯 main.tsx                # Entry point + React Query
│           ├── 📱 App.tsx                 # Componente principal
│           ├── 🎨 index.css               # Estilos globales
│           ├── 🧩 components/             # Componentes React
│           │   ├── layout/                # Componentes layout
│           │   │   ├── Header.tsx         # Navegación + Sidebar
│           │   │   ├── Footer.tsx         # Footer global
│           │   │   └── index.ts           # Exports layout
│           │   ├── pages/                 # Páginas/Vistas
│           │   │   ├── Home.tsx           # Página inicio ✅
│           │   │   ├── Login.tsx          # Página login 🚧
│           │   │   ├── Productos.tsx      # Catálogo productos 🚧
│           │   │   ├── Carrito.tsx        # Carrito compras 🚧
│           │   │   └── index.ts           # Exports páginas
│           │   ├── ui/                    # Componentes UI reutilizables
│           │   │   └── index.ts           # Exports UI (futuro)
│           │   └── index.ts               # Exports principales
│           ├── 📝 types/                  # Definiciones TypeScript
│           │   └── index.ts               # Tipos principales
│           ├── 🛠️ utils/                  # Utilidades y helpers
│           │   └── mockData.ts            # Datos mock desarrollo
│           └── 🖼️ assets/                 # Recursos del frontend
├── 📦 Maven Files
│   ├── pom.xml                           # Configuración Maven
│   ├── mvnw                              # Maven Wrapper Unix
│   ├── mvnw.cmd                          # Maven Wrapper Windows
│   └── target/                           # Archivos compilados
└── 📚 Documentación
    ├── README.md                         # Este archivo
    ├── RESUMEN_DESARROLLO.md             # Resumen desarrollo
    └── HELP.md                           # Ayuda Spring Boot
```

## 🛠️ Stack Tecnológico Completo

### 🌐 Backend (API REST)
- **☕ Java 24** - Lenguaje de programación principal
- **🍃 Spring Boot 3.5.5** - Framework principal
- **🗃️ Spring Data JPA** - ORM y acceso a datos
- **🔒 Spring Security** - Autenticación y autorización
- **🔑 JWT (JSON Web Tokens)** - Autenticación stateless
  - `jjwt-api 0.11.5` - API JWT
  - `jjwt-impl 0.11.5` - Implementación JWT
  - `jjwt-jackson 0.11.5` - Serialización JSON
- **🐘 PostgreSQL** - Base de datos principal (Neon)
- **✅ Spring Boot Validation** - Validación de datos
- **📊 Spring Boot Actuator** - Monitoreo y métricas
- **☁️ Spring Cloud Config** - Configuración distribuida
- **🔄 Spring Boot Cache** - Sistema de caché
- **🔗 OAuth2 Client** - Autenticación externa
- **🧪 Spring Boot Test** - Framework de testing
- **📝 Lombok** - Reducir boilerplate de código
- **🔧 Spring Boot DevTools** - Herramientas desarrollo
- **📦 Maven** - Gestión de dependencias y build

### ⚛️ Frontend (SPA - Single Page Application)
- **⚛️ React 19.1.1** - Biblioteca UI principal
- **📘 TypeScript 5.8.3** - Tipado estático
- **⚡ Vite 7.1.6** - Build tool y dev server
- **🎨 Tailwind CSS 4.1.13** - Framework CSS utility-first
- **🔄 TanStack Query 5.90.2** - Data fetching y cache
- **🧭 React Router DOM 7.9.2** - Enrutamiento SPA
- **🎭 GSAP 3.13.0** - Animaciones avanzadas
- **🔍 ESLint 9.35.0** - Linting y calidad código
- **📏 TypeScript ESLint 8.43.0** - Rules específicas TS
- **⚙️ Globals 16.4.0** - Variables globales
- **🔄 React Hooks ESLint** - Rules para hooks
- **♻️ React Refresh** - Hot reload desarrollo

## 🚀 Instalación y Configuración Completa

### Prerrequisitos

- **Java 24** o superior
- **Node.js 18** o superior
- **Maven 3.6** o superior
- **Git** para control de versiones
- **PostgreSQL** (o acceso a Neon DB)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/sn4yber/PR-Ecomeerse-carlosDev-comunity.git
cd E-comeerse
```

### 2. Configuración del Backend

#### Variables de Entorno
El archivo `src/main/resources/application.properties` contiene:

```properties
# Configuración del servidor
spring.application.name=E-comeerse
server.port=8080

# Base de datos PostgreSQL Neon (CONFIGURADA)
spring.datasource.url=jdbc:postgresql://ep-jolly-leaf-adc61hdy-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
spring.datasource.username=neondb_owner
spring.datasource.password=npg_CoH9eFL3WrmT
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration
jwt.secret=bXlTZWNyZXRLZXkxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTA=
jwt.expiration=86400000
jwt.refresh-expiration=604800000
jwt.token-prefix=Bearer 
jwt.header-string=Authorization

# Cloud y desarrollo
spring.cloud.config.enabled=false
management.security.enabled=false
spring.scheduling.enable=true
logging.level.com.example.E_comeerse.security=DEBUG
```

> ⚠️ **Importante**: En producción, usar variables de entorno para credenciales

#### Ejecutar Backend

```bash
# Compilar y ejecutar
./mvnw spring-boot:run

# O usando Maven instalado
mvn spring-boot:run

# El servidor estará disponible en: http://localhost:8080
```

### 3. Configuración del Frontend

#### Instalar Dependencias

```bash
cd src/main/resources/static/front-tiendavirtal
npm install
```

#### Ejecutar Frontend en Desarrollo

```bash
# Navegar al directorio del frontend
cd src/main/resources/static/front-tiendavirtal
npm run dev

# Servidor de desarrollo disponible en: http://localhost:5173
```

> 📌 **Importante**: Usar siempre la ruta completa para ejecutar el frontend desde cualquier ubicación

#### Construir para Producción

```bash
npm run build
```

## 🗃️ Modelo de Base de Datos

### Entidades Principales

#### 👤 Usuario (`usuarios`)
```sql
CREATE TABLE usuarios (
    id_usuario BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos y Validaciones:**
- `id_usuario`: Clave primaria autogenerada
- `nombre`: 2-50 caracteres, obligatorio
- `apellido`: 2-50 caracteres, obligatorio
- `nombreUsuario`: 3-50 caracteres, único, obligatorio
- `contrasena`: Mínimo 6 caracteres, hasheada
- `email`: Formato email válido, único, obligatorio
- `telefono`: Hasta 20 caracteres, opcional
- Timestamps automáticos de creación y modificación

#### 🛍️ Producto (`productos`)
```sql
CREATE TABLE productos (
    id_producto BIGSERIAL PRIMARY KEY,
    nombre_producto VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    cantidad_stock INTEGER DEFAULT 0 CHECK (cantidad_stock >= 0),
    id_categoria BIGINT,
    codigo_producto VARCHAR(100) UNIQUE,
    url_imagen VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);
```

**Campos y Validaciones:**
- `id_producto`: Clave primaria autogenerada
- `nombre`: 2-200 caracteres, obligatorio
- `descripcion`: Texto largo, opcional
- `precio`: Decimal positivo, obligatorio
- `cantidadStock`: Entero no negativo, default 0
- `idCategoria`: Referencia a categorías
- `codigoProducto`: Hasta 100 caracteres, único
- `urlImagen`: URL hasta 500 caracteres

#### 📂 Categoria (`categorias`)
```sql
CREATE TABLE categorias (
    id_categoria BIGSERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos y Validaciones:**
- `id_categoria`: Clave primaria autogenerada
- `nombre`: 2-100 caracteres, obligatorio
- `descripcion`: Texto largo, opcional
- Timestamps automáticos

#### 📦 Pedido (`pedidos`)
```sql
CREATE TABLE pedidos (
    id_pedido BIGSERIAL PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    numero_pedido VARCHAR(50) UNIQUE NOT NULL,
    estado_pedido VARCHAR(20) DEFAULT 'PENDIENTE',
    monto_total DECIMAL(10,2) NOT NULL CHECK (monto_total >= 0),
    monto_envio DECIMAL(10,2) DEFAULT 0 CHECK (monto_envio >= 0),
    monto_impuestos DECIMAL(10,2) DEFAULT 0 CHECK (monto_impuestos >= 0),
    monto_descuento DECIMAL(10,2) DEFAULT 0 CHECK (monto_descuento >= 0),
    id_cupon BIGINT,
    id_direccion_envio BIGINT,
    id_direccion_facturacion BIGINT,
    estado_pago VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
```

**Estados del Pedido:**
- `PENDIENTE`: Pedido creado, no procesado
- `PROCESANDO`: En preparación
- `ENVIADO`: Enviado al cliente
- `ENTREGADO`: Entregado exitosamente
- `CANCELADO`: Cancelado por usuario/admin
- `REEMBOLSADO`: Reembolso procesado

**Estados del Pago:**
- `PENDIENTE`: Pago no procesado
- `COMPLETADO`: Pago exitoso
- `FALLIDO`: Pago falló
- `REEMBOLSADO`: Reembolso procesado

## 📊 API REST Endpoints Completos

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Body | Respuesta |
|--------|----------|-------------|------|-----------|
| `POST` | `/api/auth/login` | Iniciar sesión | `{username, password}` | `{token, refreshToken, user}` |
| `POST` | `/api/auth/logout` | Cerrar sesión | - | `{message}` |
| `POST` | `/api/auth/refresh` | Renovar token | `{refreshToken}` | `{token, refreshToken}` |
| `POST` | `/api/auth/crear-admin` | Crear admin | - | `{user, message}` |
| `GET` | `/api/auth/test` | Test endpoint | - | `{message, timestamp}` |

### 👤 Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción | Body | Respuesta |
|--------|----------|-------------|------|-----------|
| `GET` | `/api/usuarios` | Listar todos los usuarios | - | `[{usuario}]` |
| `POST` | `/api/usuarios` | Crear nuevo usuario | `{nombre, apellido, nombreUsuario, email, contrasena}` | `{usuario}` |
| `GET` | `/api/usuarios/{id}` | Obtener usuario por ID | - | `{usuario}` |
| `PUT` | `/api/usuarios/{id}` | Actualizar usuario | `{campos a actualizar}` | `{usuario}` |
| `DELETE` | `/api/usuarios/{id}` | Eliminar usuario | - | `{message}` |

### 🛍️ Productos (`/api/productos`)

| Método | Endpoint | Descripción | Body | Respuesta |
|--------|----------|-------------|------|-----------|
| `GET` | `/api/productos` | Listar todos los productos | - | `[{producto}]` |
| `POST` | `/api/productos` | Crear nuevo producto | `{nombre, precio, descripcion, etc}` | `{producto}` |
| `GET` | `/api/productos/{id}` | Obtener producto por ID | - | `{producto}` |
| `PUT` | `/api/productos/{id}` | Actualizar producto | `{campos a actualizar}` | `{producto}` |
| `DELETE` | `/api/productos/{id}` | Eliminar producto | - | `{message}` |
| `GET` | `/api/productos/categoria/{idCategoria}` | Productos por categoría | - | `[{producto}]` |
| `GET` | `/api/productos/buscar?q={query}` | Buscar productos | - | `[{producto}]` |

### 📂 Categorías (`/api/categorias`)

| Método | Endpoint | Descripción | Body | Respuesta |
|--------|----------|-------------|------|-----------|
| `GET` | `/api/categorias` | Listar todas las categorías | - | `[{categoria}]` |
| `POST` | `/api/categorias` | Crear nueva categoría | `{nombre, descripcion}` | `{categoria}` |
| `GET` | `/api/categorias/{id}` | Obtener categoría por ID | - | `{categoria}` |
| `PUT` | `/api/categorias/{id}` | Actualizar categoría | `{campos a actualizar}` | `{categoria}` |
| `DELETE` | `/api/categorias/{id}` | Eliminar categoría | - | `{message}` |

### 📦 Pedidos (`/api/pedidos`)

| Método | Endpoint | Descripción | Body | Respuesta |
|--------|----------|-------------|------|-----------|
| `GET` | `/api/pedidos` | Listar todos los pedidos | - | `[{pedido}]` |
| `POST` | `/api/pedidos` | Crear nuevo pedido | `{idUsuario, numeroPedido, montoTotal, etc}` | `{pedido}` |
| `GET` | `/api/pedidos/{id}` | Obtener pedido por ID | - | `{pedido}` |
| `PUT` | `/api/pedidos/{id}` | Actualizar pedido | `{campos a actualizar}` | `{pedido}` |
| `DELETE` | `/api/pedidos/{id}` | Eliminar pedido | - | `{message}` |
| `GET` | `/api/pedidos/usuario/{idUsuario}` | Pedidos de un usuario | - | `[{pedido}]` |
| `GET` | `/api/pedidos/estado/{estado}` | Pedidos por estado | - | `[{pedido}]` |

## 🧩 Componentes Frontend Detallados

### 📱 Estructura de Componentes

#### 🏠 Header (`/components/layout/Header.tsx`)
**Características principales:**
- **Menú hamburguesa** estilo Wikipedia con sidebar deslizante
- **Título centrado** con gradiente morado y efectos hover
- **Sistema de navegación** completo con React Router
- **Perfil de usuario** con estado (Invitado/Usuario/Admin)
- **Responsive design** con breakpoints móvil/tablet/desktop
- **Accesibilidad** completa con navegación por teclado
- **Estados de autenticación** visual (conectado/desconectado)

```typescript
interface HeaderProps {
  title: string;
  menuItems: MenuItem[];
  className?: string;
}

// Items del menú configurables
const menuItems = [
  { id: 'home', label: 'Inicio', href: '/', icon: '🏠' },
  { id: 'products', label: 'Productos', href: '/productos', icon: '🛍️' },
  { id: 'cart', label: 'Carrito', href: '/carrito', icon: '🛒' },
  // ... más items
];
```

#### 🦶 Footer (`/components/layout/Footer.tsx`)
**Características:**
- **Información de contacto** completa
- **Enlaces de navegación** organizados por secciones
- **Botón de WhatsApp** integrado
- **Información corporativa** de NebulaTech
- **Design system** consistente con Tailwind
- **Links externos** y redes sociales

#### 🏠 Home (`/components/pages/Home.tsx`)
**Estado:** ✅ Completamente implementado
- **Hero section** con animaciones GSAP
- **Gradientes** personalizados morado/negro
- **Call-to-action** principales
- **Responsive** para todos los dispositivos
- **Performance optimizado**

#### 🔐 Login (`/components/pages/Login.tsx`)
**Estado:** 🚧 En construcción
- **Estructura base** implementada
- **Integración React Query** preparada
- **Persistencia JWT** comentada (lista para activar)
- **Validaciones** de formulario pendientes
- **Estados de carga** preparados

#### 🛍️ Productos (`/components/pages/Productos.tsx`)
**Estado:** 🚧 En construcción
- **Grid de productos** responsive
- **Filtros por categoría** preparados
- **Búsqueda** en tiempo real
- **Carrito** integrado
- **Paginación** implementada

#### 🛒 Carrito (`/components/pages/Carrito.tsx`)
**Estado:** 🚧 En construcción
- **Gestión de estado** global
- **Cálculos automáticos** de totales
- **Persistencia** localStorage
- **Checkout** integrado
- **Animaciones** de cambios

### 🎨 Design System y Estilos

#### Paleta de Colores
```css
:root {
  /* Colores principales */
  --primary-purple: #9333ea;
  --primary-black: #000000;
  --primary-gradient: linear-gradient(to right, #9333ea, #000000);
  
  /* Grises del sistema */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-600: #6b7280;
  --gray-800: #374151;
  
  /* Estados */
  --hover-purple: #f3e8ff;
  --success-green: #10b981;
  --error-red: #ef4444;
  --warning-yellow: #f59e0b;
}
```

#### Tipografía
```css
/* Sistema de fuentes */
font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

/* Escalas de texto */
.text-sm    { font-size: 0.875rem; }  /* 14px */
.text-base  { font-size: 1rem; }      /* 16px */
.text-lg    { font-size: 1.125rem; }  /* 18px */
.text-xl    { font-size: 1.25rem; }   /* 20px */
.text-2xl   { font-size: 1.5rem; }    /* 24px */
.text-3xl   { font-size: 1.875rem; }  /* 30px */

/* Pesos */
.font-medium   { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold     { font-weight: 700; }
```

#### Componentes Base
```css
/* Botones */
.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-purple-600 to-gray-800
         hover:from-purple-700 hover:to-gray-900
         text-white font-semibold rounded-lg
         transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2;
}

.btn-secondary {
  @apply px-6 py-3 bg-white border border-gray-300
         hover:bg-gray-50 text-gray-700 font-medium rounded-lg
         transition-all duration-200;
}

/* Cards */
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200
         hover:shadow-md transition-shadow duration-200;
}

/* Inputs */
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md
         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
         transition-all duration-200;
}
```

## 🔄 Gestión de Estado y Datos

### React Query Setup
```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 10, // 10 minutos
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});
```

### Hooks Personalizados (Futuros)
```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return { authenticated: false };
      
      const response = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.json();
    },
    staleTime: 1000 * 60 * 15, // 15 minutos
  });
};

// hooks/useProducts.ts
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    keepPreviousData: true,
  });
};

// hooks/useCart.ts
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartFromLocalStorage(),
    initialData: [],
  });
};
```

## 🔒 Sistema de Seguridad JWT

### Configuración JWT
```properties
# JWT Settings (application.properties)
jwt.secret=bXlTZWNyZXRLZXkxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTA=
jwt.expiration=86400000       # 24 horas
jwt.refresh-expiration=604800000  # 7 días
jwt.token-prefix=Bearer 
jwt.header-string=Authorization
```

### Flujo de Autenticación
1. **Login** → `POST /api/auth/login`
2. **Recibir tokens** → `accessToken` (24h) + `refreshToken` (7d)
3. **Guardar en localStorage** → Persistencia cliente
4. **Interceptor HTTP** → Añadir `Authorization: Bearer {token}`
5. **Auto-refresh** → Renovar antes de expiración
6. **Logout** → Limpiar tokens y redireccionar

### Componentes de Seguridad
- **JwtAuthenticationFilter**: Intercepta requests HTTP
- **JwtAuthenticationEntryPoint**: Maneja errores 401
- **JwtTokenUtil**: Genera y valida tokens
- **JwtValidationInterceptor**: Valida tokens en requests
- **CustomUserDetailsService**: Carga detalles del usuario
- **UserPrincipal**: Wrapper para Spring Security

### Roles y Permisos (Futuro)
```java
public enum UserRole {
    GUEST,    // Usuario no autenticado
    USER,     // Cliente registrado
    ADMIN,    // Administrador
    SUPER_ADMIN // Super administrador
}
```

## 🎯 Rutas Frontend (React Router)

### Configuración de Rutas
```typescript
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/categorias" element={<Categorias />} />
    
    {/* Rutas de autenticación */}
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Registro />} />
    
    {/* Rutas protegidas */}
    <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
    <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
    <Route path="/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
    
    {/* Rutas admin */}
    <Route path="/admin/*" element={<AdminRoute><AdminPanel /></AdminRoute>} />
    
    {/* Ruta 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
```

### Componentes de Protección
```typescript
// components/ProtectedRoute.tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: authData, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!authData?.authenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

// components/AdminRoute.tsx
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: authData } = useAuth();
  
  if (authData?.user?.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};
```

## 📝 Scripts y Comandos Disponibles

### Backend (Maven)
```bash
# Limpiar proyecto
./mvnw clean

# Compilar
./mvnw compile

# Ejecutar tests
./mvnw test

# Empaquetar
./mvnw package

# Ejecutar aplicación
./mvnw spring-boot:run

# Generar documentación
./mvnw javadoc:javadoc

# Verificar dependencias
./mvnw dependency:tree

# Análisis de código
./mvnw spotbugs:check
```

### Frontend (NPM)
```bash
# Desarrollo
npm run dev           # Servidor desarrollo (localhost:5173)

# Build
npm run build         # Compilar para producción
npm run preview       # Vista previa build local

# Linting
npm run lint          # ESLint + reglas TypeScript
npm run lint:fix      # Auto-fix problemas

# Testing (futuro)
npm run test          # Jest/Vitest tests
npm run test:watch    # Tests en modo watch
npm run test:coverage # Coverage report

# Utilidades
npm run type-check    # Solo verificar tipos TS
npm run format        # Prettier format
```

## 🚀 Despliegue y Producción

### Variables de Entorno Producción
```bash
# .env.production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRATION=3600000
CORS_ORIGINS=https://yourdomain.com
LOG_LEVEL=WARN
SPRING_PROFILES_ACTIVE=prod
```

### Docker Configuration (Futuro)
```dockerfile
# Dockerfile
FROM openjdk:24-jdk-slim

WORKDIR /app

COPY target/E-comeerse-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/static/front-tiendavirtal/dist/ /app/static/

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    depends_on:
      - db
      
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy en Neon + Vercel (Recomendado)
1. **Backend**: Deploy en Railway/Heroku conectado a Neon DB
2. **Frontend**: Deploy en Vercel con build automático
3. **Variables**: Configurar en dashboard de cada plataforma
4. **CORS**: Actualizar origins en producción

## 🧪 Testing y Calidad de Código

### Testing Backend (Spring Boot)
```java
// Ejemplo test unitario
@SpringBootTest
class ProductoServiceTest {
    
    @Autowired
    private ProductoService productoService;
    
    @MockBean
    private ProductoRepository productoRepository;
    
    @Test
    void testCrearProducto() {
        // Given
        Producto producto = new Producto("Test", new BigDecimal("99.99"));
        when(productoRepository.save(any())).thenReturn(producto);
        
        // When
        Producto resultado = productoService.guardarProducto(producto);
        
        // Then
        assertThat(resultado.getNombre()).isEqualTo("Test");
    }
}
```

### Testing Frontend (Futuro - Vitest)
```typescript
// tests/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('should render title correctly', () => {
    render(<Header title="Test Store" menuItems={[]} />);
    expect(screen.getByText('Test Store')).toBeInTheDocument();
  });
  
  it('should toggle sidebar on menu click', () => {
    render(<Header title="Store" menuItems={menuItems} />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toBeVisible();
  });
});
```

### Calidad de Código
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-console': 'warn'
    }
  }
];
```

## 🔧 Monitoreo y Observabilidad

### Spring Boot Actuator Endpoints
- `/actuator/health` - Estado de la aplicación
- `/actuator/metrics` - Métricas de performance
- `/actuator/info` - Información de la aplicación
- `/actuator/loggers` - Configuración de logs
- `/actuator/env` - Variables de entorno (desarrollo)

### Logging Configuration
```properties
# Configuración de logs
logging.level.com.example.E_comeerse=DEBUG
logging.level.org.springframework.security=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.pattern.console=%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n
```

## 🤝 Colaboración y Flujo de Trabajo

### Estructura del Equipo
- **Frontend Developers**: sn4yber, Henry James Mendoza
  - Componentes React/TypeScript
  - UI/UX implementation
  - Integración con API
- **Backend Developer**: Patricio Echeverría
  - API REST Spring Boot
  - Base de datos PostgreSQL
  - Sistema de autenticación JWT
- **Coordinación**: Integración full-stack y deployment

### Git Flow
```bash
# Flujo de desarrollo
git checkout -b feature/nueva-funcionalidad
# Desarrollar feature
git add .
git commit -m "feat: implementar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
# Crear Pull Request
```

### Convenciones de Código
```javascript
// Convenciones Frontend
// Componentes: PascalCase
export const ProductCard = ({ product }: ProductCardProps) => {
  // Props tipadas con interfaces
};

// Archivos: kebab-case
// product-card.tsx, user-service.ts

// Hooks custom: camelCase con prefijo 'use'
const useProductData = () => { };

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = '/api';
```

```java
// Convenciones Backend
// Clases: PascalCase
public class ProductoService {
    // Métodos: camelCase
    public List<Producto> obtenerTodosLosProductos() { }
    
    // Variables: camelCase
    private ProductoRepository productoRepository;
}

// Endpoints: kebab-case
@GetMapping("/productos-por-categoria/{id}")
```

### Conventional Commits
```bash
# Tipos de commit
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato (sin afectar lógica)
refactor: refactoring de código
test: añadir o modificar tests
chore: cambios en build o dependencias

# Ejemplos
git commit -m "feat: implementar carrito de compras"
git commit -m "fix: corregir validación de email"
git commit -m "docs: actualizar README con instrucciones de despliegue"
```

## 🛣️ Roadmap de Desarrollo

### Fase 1: Core Functionality (Actual) ✅
- [x] Estructura base del proyecto
- [x] Configuración Spring Boot + React
- [x] Modelo de base de datos
- [x] API REST básica (CRUD)
- [x] Autenticación JWT
- [x] Frontend con React Router
- [x] Design system Tailwind
- [x] Componentes base (Header, Footer, Home)

### Fase 2: E-commerce Features 🚧
- [ ] Sistema de carrito de compras
- [ ] Gestión de productos frontend
- [ ] Sistema de categorías frontend
- [ ] Búsqueda y filtros
- [ ] Perfil de usuario
- [ ] Gestión de pedidos

### Fase 3: Advanced Features 📋
- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Notificaciones email
- [ ] Panel de administración
- [ ] Analytics y reportes
- [ ] Sistema de reviews/ratings
- [ ] Wishlist/favoritos

### Fase 4: Optimization & Scale 🚀
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] PWA features
- [ ] Caching strategies
- [ ] CDN integration
- [ ] Load balancing

## 📊 Métricas y KPIs

### Técnicas
- **Performance**: < 3s tiempo de carga
- **Uptime**: > 99.9%
- **Test Coverage**: > 80%
- **Code Quality**: A+ en SonarQube

### Negocio
- **Conversion Rate**: Meta > 2%
- **Cart Abandonment**: < 70%
- **User Retention**: > 60% mensual
- **Revenue per User**: Tracking mensual

## 🔐 Seguridad y Compliance

### Medidas de Seguridad Implementadas
- ✅ **JWT Authentication** con refresh tokens
- ✅ **Password Hashing** con BCrypt
- ✅ **CORS Configuration** para frontend
- ✅ **Input Validation** con Bean Validation
- ✅ **SQL Injection Prevention** con JPA
- ✅ **HTTPS Enforcement** (producción)

### Medidas Futuras
- [ ] **Rate Limiting** para API
- [ ] **CSRF Protection** adicional
- [ ] **OAuth2** integration (Google, Facebook)
- [ ] **2FA** para administradores
- [ ] **Audit Logs** para acciones críticas
- [ ] **Data Encryption** at rest

### GDPR Compliance
- [ ] Política de privacidad
- [ ] Consentimiento de cookies
- [ ] Right to be forgotten
- [ ] Data portability
- [ ] Breach notification procedures

## 🌍 Internacionalización (i18n)

### Preparación para Múltiples Idiomas
```typescript
// Futuro: react-i18next
const translations = {
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito'
    },
    products: {
      title: 'Productos',
      addToCart: 'Agregar al carrito'
    }
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    },
    products: {
      title: 'Products',
      addToCart: 'Add to cart'
    }
  }
};
```

## 📱 Progressive Web App (PWA)

### Características PWA Futuras
- [ ] **Service Worker** para caché offline
- [ ] **Web App Manifest** para instalación
- [ ] **Push Notifications** para promociones
- [ ] **Offline Support** para navegación básica
- [ ] **App-like Experience** en móviles

## 🐛 Debugging y Troubleshooting

### Logs Importantes
```bash
# Ver logs backend en tiempo real
tail -f logs/spring.log

# Filtrar errores JWT
grep "JWT" logs/spring.log | grep "ERROR"

# Ver logs frontend (browser console)
localStorage.getItem('debug') // Activar debug mode
```

### Problemas Comunes

#### Backend Issues
- **Puerto 8080 ocupado**: `sudo lsof -ti:8080 | xargs kill -9`
- **Base de datos no conecta**: Verificar credenciales en `application.properties`
- **JWT expira muy rápido**: Ajustar `jwt.expiration` property

#### Frontend Issues
- **CORS errors**: Verificar `@CrossOrigin` en controllers
- **Build falla**: Limpiar `node_modules` y reinstalar
- **Hot reload no funciona**: Verificar proxy en `vite.config.ts`

## 📚 Recursos y Referencias

### Documentación Técnica
- [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)

### Herramientas de Desarrollo
- **IDE Backend**: IntelliJ IDEA, Eclipse STS
- **IDE Frontend**: VS Code, WebStorm
- **Database**: pgAdmin, DBeaver
- **API Testing**: Postman, Insomnia
- **Version Control**: Git, GitHub Desktop

### Recursos de Aprendizaje
- **Spring Boot**: Baeldung, Spring Academy
- **React**: Official Tutorial, React Query docs
- **PostgreSQL**: PostgreSQL Tutorial
- **JWT**: jwt.io documentation

## 👥 Contacto y Soporte

### Team Members
- **GitHub**: [sn4yber](https://github.com/sn4yber)
- **Frontend**: Henry James Mendoza
- **Backend**: Patricio Echeverría

### Repositorio
- **Main Repo**: [PR-Ecomeerse-carlosDev-comunity](https://github.com/sn4yber/PR-Ecomeerse-carlosDev-comunity)
- **Branch**: `main`
- **Issues**: Reportar bugs y feature requests en GitHub

### Contacto del Proyecto
- **Email**: [contacto pendiente]
- **Discord**: NebulaTech Gaming Community
- **Documentación**: Esta README.md (actualizada constantemente)

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver archivo `LICENSE` para más detalles.

### Términos de Uso
- ✅ Uso comercial permitido
- ✅ Modificación permitida
- ✅ Distribución permitida
- ✅ Uso privado permitido
- ❌ Sin garantía
- ❌ Sin responsabilidad del autor

---

## 📝 Notas Finales

> 💡 **Importante**: Esta documentación se actualiza constantemente con el progreso del proyecto. Para la versión más reciente, siempre consultar el README.md en la rama `main`.

> 🚀 **Para nuevos desarrolladores**: Seguir la sección "Instalación y Configuración" paso a paso. En caso de problemas, consultar la sección "Debugging y Troubleshooting" o crear un issue en GitHub.

> 🤝 **Para contribuidores**: Leer las "Convenciones de Código" y seguir el "Git Flow" establecido. Toda contribución es bienvenida siguiendo las mejores prácticas documentadas.

### Última Actualización
**Fecha**: 26 de septiembre de 2025  
**Versión**: v2.0.0 - Documentación Completa  
**Autor**: Equipo NebulaTech E-commerce  

---

**Desarrollado con ❤️ para la comunidad NebulaTech gaming**

🎮 *"Building the future of gaming e-commerce, one commit at a time"* 🎮
