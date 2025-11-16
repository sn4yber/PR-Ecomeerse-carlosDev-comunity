# 🛒 E-Commerce Universal Template System

> **Una plataforma de comercio electrónico completamente personalizable y lista para producción**

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green.svg)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC.svg)](https://tailwindcss.com/)

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Módulos del Sistema](#-módulos-del-sistema)
- [Panel de Administración](#-panel-de-administración)
- [Sistema de Configuración](#-sistema-de-configuración)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Instalación y Despliegue](#-instalación-y-despliegue)
- [Casos de Uso](#-casos-de-uso)
- [Licencia](#-licencia)

---

## 🎯 Descripción General

Este proyecto es una **plataforma de e-commerce universal** diseñada para adaptarse a cualquier tipo de negocio. Desde tiendas de tecnología hasta boutiques de ropa, el sistema se configura completamente desde un panel de administración intuitivo, sin necesidad de tocar código.

### ¿Por qué es especial?

- ✨ **100% Personalizable**: Cambia colores, textos, imágenes, categorías y características desde el panel admin
- 🎨 **Múltiples Industrias**: Gaming, Ropa, Tecnología, Hogar, Deportes y más
- 🚀 **Lista para Producción**: Autenticación JWT, gestión de roles, carrito persistente
- 📱 **Responsive Design**: Funciona perfectamente en móviles, tablets y desktop
- 🔒 **Segura**: Sistema de autenticación robusto con Spring Security
- 💾 **Persistencia Inteligente**: Configuración guardada en localStorage + backend MySQL

---

## ✨ Características Principales

### 🛍️ Para Clientes

- **Catálogo Dinámico**: Navegación por categorías personalizadas
- **Carrito Inteligente**: Persistencia automática entre sesiones
- **Sistema de Búsqueda**: Encuentra productos rápidamente
- **Filtros Avanzados**: Por categoría, precio, disponibilidad
- **Checkout Simplificado**: Proceso de compra en 3 pasos
- **Historial de Pedidos**: Seguimiento completo de compras

### 👨‍💼 Para Administradores

- **Panel de Control Completo**: Gestión total del negocio desde un solo lugar
- **Gestión de Productos**: CRUD completo con carga de imágenes
- **Control de Inventario**: Stock en tiempo real
- **Gestión de Pedidos**: Estados, seguimiento, notificaciones
- **Usuarios y Roles**: Sistema de permisos granular
- **Configuración Visual**: Editor WYSIWYG de toda la tienda

### 🎨 Sistema de Configuración Universal

El corazón del sistema es su **Panel de Configuración** con 7 secciones principales:

1. **⚙️ General**: Nombre, slogan, contacto, logo, tipo de negocio
2. **🏪 Tienda**: Moneda, IVA, costos de envío, umbrales
3. **🎭 Hero Section**: Banner principal, llamados a la acción
4. **⭐ Características**: Beneficios del negocio (envío gratis, garantías, etc.)
5. **📱 Redes Sociales**: Links y visibilidad de plataformas
6. **📂 Categorías**: Productos organizados con emojis personalizados
7. **🔧 Avanzada**: Modo mantenimiento, stock bajo, políticas

---

## 🏗️ Arquitectura del Sistema

### Backend (Spring Boot)

```
src/main/java/com/example/E_comeerse/
├── config/              # Configuración JWT, CORS, Security
├── controller/          # Endpoints REST API
│   ├── AuthController       # Autenticación y registro
│   ├── ProductoController   # CRUD productos
│   ├── CarritoController    # Gestión carrito
│   ├── PedidoController     # Procesamiento pedidos
│   └── UsuarioController    # Gestión usuarios
├── dto/                 # Data Transfer Objects
├── model/               # Entidades JPA
│   ├── Usuario              # Usuarios con roles
│   ├── Producto             # Catálogo de productos
│   ├── Carrito/CarritoItem  # Sistema de carrito
│   └── Pedido/PedidoItem    # Órdenes de compra
├── repository/          # Repositorios Spring Data JPA
├── security/            # JWT, filtros de autenticación
└── service/             # Lógica de negocio
```

### Frontend (React + TypeScript)

```
src/
├── api/                 # Clientes HTTP (axios)
├── components/
│   ├── admin/          # Módulo administrativo
│   │   ├── AdminPanel      # Dashboard principal
│   │   ├── ProductForm     # Gestión productos
│   │   └── OrderManagement # Gestión pedidos
│   ├── layout/         # Header, Footer, Sidebar
│   ├── pages/          # Páginas principales
│   │   ├── Home            # Landing page dinámica
│   │   ├── Products        # Catálogo con filtros
│   │   ├── Cart            # Carrito de compras
│   │   └── ConfiguracionPanel # Editor universal
│   └── common/         # Componentes reutilizables
├── context/            # React Context API
│   ├── ConfiguracionContext # Config global
│   └── AuthContext          # Autenticación
├── hooks/              # Custom hooks
│   ├── useCart             # Lógica del carrito
│   ├── useConfiguracion    # Persistencia config
│   └── useAuth             # Estado autenticación
└── types/              # TypeScript definitions
```

---

## 📊 Módulos del Sistema

### 1. Sistema de Autenticación

**Tecnología**: JWT (JSON Web Tokens)

**Características**:
- Registro de usuarios con validación
- Login con token JWT
- Refresh token automático
- Roles: `ADMIN` y `USER`
- Protección de rutas por rol
- Sesión persistente

**Endpoints**:
```
POST /api/auth/register  # Registro
POST /api/auth/login     # Login
GET  /api/auth/me        # Usuario actual
```

### 2. Gestión de Productos

**Características**:
- CRUD completo
- Carga de imágenes (múltiples por producto)
- Categorías dinámicas
- Stock en tiempo real
- Productos destacados
- Búsqueda y filtros

**Endpoints**:
```
GET    /api/productos              # Listar todos
GET    /api/productos/{id}         # Detalle
POST   /api/productos              # Crear (ADMIN)
PUT    /api/productos/{id}         # Actualizar (ADMIN)
DELETE /api/productos/{id}         # Eliminar (ADMIN)
POST   /api/productos/{id}/images  # Subir imagen (ADMIN)
```

### 3. Carrito de Compras

**Características**:
- Persistencia en base de datos
- Actualización en tiempo real
- Cálculo automático de totales
- Validación de stock
- Sincronización entre sesiones

**Endpoints**:
```
GET    /api/carrito                    # Ver carrito
POST   /api/carrito/agregar            # Agregar producto
PUT    /api/carrito/actualizar/{id}    # Actualizar cantidad
DELETE /api/carrito/eliminar/{id}      # Eliminar item
DELETE /api/carrito/vaciar             # Vaciar carrito
```

### 4. Sistema de Pedidos

**Características**:
- Estados: PENDIENTE, PROCESANDO, ENVIADO, ENTREGADO, CANCELADO
- Historial completo
- Detalles de productos y precios
- Información de envío
- Tracking de estado

**Endpoints**:
```
POST   /api/pedidos/crear              # Crear pedido
GET    /api/pedidos/usuario/{id}       # Pedidos de usuario
GET    /api/pedidos/{id}               # Detalle pedido
PUT    /api/pedidos/{id}/estado        # Cambiar estado (ADMIN)
GET    /api/pedidos                    # Todos los pedidos (ADMIN)
```

### 5. Gestión de Usuarios

**Características**:
- Perfiles de usuario
- Administración de roles
- Historial de actividad
- Gestión de direcciones
- Control de acceso

**Endpoints**:
```
GET    /api/usuarios              # Listar usuarios (ADMIN)
GET    /api/usuarios/{id}         # Detalle usuario
PUT    /api/usuarios/{id}         # Actualizar usuario
DELETE /api/usuarios/{id}         # Eliminar usuario (ADMIN)
PUT    /api/usuarios/{id}/rol     # Cambiar rol (ADMIN)
```

---

## 🎛️ Panel de Administración

### Dashboard Principal

El dashboard ofrece una vista completa del negocio:

- 📈 **Estadísticas en Tiempo Real**
  - Ventas totales
  - Pedidos pendientes
  - Productos en stock
  - Usuarios registrados

- 📊 **Gráficos y Métricas**
  - Ventas por mes
  - Productos más vendidos
  - Categorías populares
  - Ingresos por período

- 🚨 **Alertas Inteligentes**
  - Stock bajo
  - Pedidos pendientes
  - Productos sin imagen
  - Usuarios nuevos

### Gestión de Productos

**Formulario Completo**:
- Nombre y descripción
- Precio y stock
- Categoría
- Producto destacado (toggle)
- Carga múltiple de imágenes
- Vista previa en tiempo real

**Tabla de Productos**:
- Búsqueda instantánea
- Filtros por categoría/stock
- Acciones rápidas (editar/eliminar)
- Paginación automática

### Gestión de Pedidos

**Vista de Pedidos**:
- Lista completa con estados
- Filtros por estado/fecha
- Búsqueda por cliente
- Detalles expandibles

**Actualización de Estados**:
- Cambio de estado visual
- Notificaciones automáticas
- Historial de cambios
- Comentarios internos

---

## ⚙️ Sistema de Configuración

### ConfiguracionPanel - El Editor Universal

El `ConfiguracionPanel` es la joya del sistema. Permite personalizar **absolutamente todo** sin tocar código:

#### Tab 1: General
```typescript
- Nombre de la tienda
- Slogan
- Email de contacto
- Teléfono y WhatsApp
- Descripción del negocio
- Dirección física
- Logo (URL o emoji)
- Tipo de negocio (Gaming, Ropa, Tecnología, etc.)
- Año de fundación
```

#### Tab 2: Tienda
```typescript
- Moneda (COP, USD, EUR, MXN)
- Símbolo de moneda
- IVA (%)
- Envío gratis desde $X
- Costo de envío base
```

#### Tab 3: Hero Section
```typescript
- Título principal
- Subtítulo
- Descripción
- Texto del botón CTA
- Imagen de fondo (URL)
- Badge informativo
```

#### Tab 4: Características
```typescript
Array de características del negocio:
- Icono (emoji personalizado)
- Título
- Descripción

Ejemplos:
✅ Envío Gratis
⚡ Entrega Rápida
🔒 Compra Segura
```

#### Tab 5: Redes Sociales
```typescript
Para cada red:
- Nombre (Facebook, Instagram, Twitter, LinkedIn, WhatsApp)
- URL
- Visible (toggle)
```

#### Tab 6: Categorías
```typescript
Array de categorías personalizadas:
- Nombre
- Icono (emoji)
- Slug (para URLs)
- Gradiente de color

Ejemplos:
🖥️ Monitores
⌨️ Teclados
💻 Componentes
🎧 Audio
```

#### Tab 7: Avanzada
```typescript
- Modo mantenimiento
- Mostrar productos sin stock
- Permitir compras sin registro
- Notificar stock bajo
- Umbral de stock bajo
```

### Persistencia de Configuración

**Doble capa de persistencia**:

1. **localStorage** (Frontend):
   - Carga instantánea
   - Sin latencia
   - Fallback automático

2. **Base de Datos** (Backend - Próximamente):
   - Sincronización entre dispositivos
   - Backup automático
   - Historial de cambios

**Context API**:
```typescript
const { configuracion, actualizarSeccion, guardarConfiguracion } = useConfiguracionGlobal();

// Actualizar solo una sección
actualizarSeccion('general', {
  nombreTienda: "Mi Tienda Gaming",
  slogan: "Los mejores periféricos"
});

// Toda la configuración está disponible en cualquier componente
console.log(configuracion.categorias);
console.log(configuracion.hero.titulo);
```

---

## 🛠️ Tecnologías Utilizadas

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Java** | 17+ | Lenguaje base |
| **Spring Boot** | 3.x | Framework principal |
| **Spring Security** | 6.x | Autenticación y autorización |
| **Spring Data JPA** | 3.x | ORM y repositorios |
| **MySQL** | 8.0+ | Base de datos |
| **JWT** | 0.11.5 | Tokens de autenticación |
| **Lombok** | Latest | Reducción de boilerplate |
| **Maven** | 3.8+ | Gestión de dependencias |

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.1 | Framework UI |
| **TypeScript** | 5.8.3 | Tipado estático |
| **Vite** | 6.0.7 | Build tool |
| **TailwindCSS** | 4.1.13 | Estilos utility-first |
| **React Router** | 7.1.1 | Navegación |
| **TanStack Query** | 5.64.2 | Gestión de estado servidor |
| **Axios** | 1.7.9 | Cliente HTTP |
| **React Hook Form** | 7.54.2 | Formularios |

### Herramientas de Desarrollo

- **ESLint**: Linting de código
- **Git**: Control de versiones
- **VS Code**: IDE recomendado

---

## 📸 Capturas de Pantalla

### 🏠 Página Principal (Home)
- Hero section dinámico con imagen de fondo
- Características destacadas con iconos
- Categorías en tarjetas interactivas
- Estadísticas del negocio
- Sección "Sobre Nosotros"

### 🛍️ Catálogo de Productos
- Grid responsive de productos
- Filtros por categoría
- Búsqueda en tiempo real
- Tarjetas con hover effects
- Botón "Agregar al carrito"

### 🛒 Carrito de Compras
- Lista detallada de productos
- Control de cantidad (+/-)
- Cálculo automático de totales
- Botón de checkout
- Persistencia automática

### 👨‍💼 Panel Admin
- Dashboard con métricas
- Gestión de productos con tabla
- Editor de pedidos con estados
- Configuración universal en tabs
- Vista previa en tiempo real

---

## 🚀 Instalación y Despliegue

### Requisitos Previos

- **Java JDK** 17 o superior
- **Node.js** 18+ y npm
- **MySQL** 8.0+
- **Maven** 3.8+

### Configuración Backend

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd PR-Ecomeerse-carlosDev-comunity
```

2. **Configurar Base de Datos**

Crear base de datos MySQL:
```sql
CREATE DATABASE ecommerce_db;
```

Editar `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password

# JWT Secret (cambiar en producción)
jwt.secret=tu_clave_secreta_super_segura_aqui
jwt.expiration=86400000
```

3. **Ejecutar el schema**
```bash
mysql -u root -p ecommerce_db < database/carrito_schema.sql
```

4. **Iniciar Backend**
```bash
./mvnw spring-boot:run
```

Backend corriendo en: `http://localhost:8080`

### Configuración Frontend

1. **Navegar a la carpeta frontend**
```bash
cd src/main/resources/static/front-tiendavirtal
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Variables de Entorno**

Crear archivo `.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

4. **Iniciar Frontend**
```bash
npm run dev
```

Frontend corriendo en: `http://localhost:5173`

### Build para Producción

**Backend**:
```bash
./mvnw clean package -DskipTests
java -jar target/E_comeerse-0.0.1-SNAPSHOT.jar
```

**Frontend**:
```bash
npm run build
# Los archivos compilados estarán en dist/
```

---

## 💡 Casos de Uso

### Ejemplo 1: Tienda de Gaming

```typescript
// Configuración desde el panel
{
  general: {
    nombreTienda: "GamersHub Pro",
    tipoNegocio: "gaming",
    slogan: "Level Up Your Setup"
  },
  categorias: [
    { nombre: "Teclados", icono: "⌨️", valor: "teclados" },
    { nombre: "Ratones", icono: "🖱️", valor: "ratones" },
    { nombre: "Headsets", icono: "🎧", valor: "headsets" },
    { nombre: "Monitores", icono: "🖥️", valor: "monitores" }
  ],
  caracteristicas: [
    { icono: "🚚", titulo: "Envío Express", descripcion: "24-48h" },
    { icono: "🔧", titulo: "Soporte Técnico", descripcion: "24/7" },
    { icono: "💎", titulo: "Productos Premium", descripcion: "Marcas líderes" }
  ]
}
```

### Ejemplo 2: Boutique de Ropa

```typescript
{
  general: {
    nombreTienda: "Fashion Boutique",
    tipoNegocio: "ropa",
    slogan: "Estilo que te Define"
  },
  categorias: [
    { nombre: "Vestidos", icono: "👗", valor: "vestidos" },
    { nombre: "Zapatos", icono: "👠", valor: "zapatos" },
    { nombre: "Accesorios", icono: "👜", valor: "accesorios" },
    { nombre: "Joyería", icono: "💍", valor: "joyeria" }
  ],
  caracteristicas: [
    { icono: "✨", titulo: "Nueva Colección", descripcion: "Cada semana" },
    { icono: "🎁", titulo: "Envoltorio Regalo", descripcion: "Gratis" },
    { icono: "↩️", titulo: "Devolución Fácil", descripcion: "30 días" }
  ]
}
```

### Ejemplo 3: Tienda de Tecnología

```typescript
{
  general: {
    nombreTienda: "TechMarket Pro",
    tipoNegocio: "tecnologia",
    slogan: "Innovación al Alcance de Todos"
  },
  categorias: [
    { nombre: "Laptops", icono: "💻", valor: "laptops" },
    { nombre: "Smartphones", icono: "📱", valor: "smartphones" },
    { nombre: "Tablets", icono: "📱", valor: "tablets" },
    { nombre: "Audio", icono: "🎧", valor: "audio" }
  ],
  caracteristicas: [
    { icono: "🔒", titulo: "Garantía Oficial", descripcion: "2 años" },
    { icono: "💳", titulo: "Pago Seguro", descripcion: "SSL" },
    { icono: "📦", titulo: "Stock Real", descripcion: "Entrega inmediata" }
  ]
}
```

---

## 🎓 Lecciones Aprendidas

Este proyecto ha sido un viaje increíble de aprendizaje y perseverancia:

### Desafíos Superados

1. **Arquitectura Escalable**: Diseñar un sistema que sirva para múltiples industrias
2. **Performance**: Optimización de renderizado con React 19
3. **Persistencia**: Doble capa localStorage + backend
4. **Seguridad**: Implementación robusta de JWT y roles
5. **UX/UI**: Interfaz intuitiva que no requiere capacitación

### Mejores Prácticas Aplicadas

- ✅ Separación de concerns (MVC en backend, componentes en frontend)
- ✅ TypeScript para type safety
- ✅ Context API para estado global
- ✅ Custom hooks para lógica reutilizable
- ✅ Componentes reutilizables y modulares
- ✅ API REST bien estructurada
- ✅ Validación en frontend y backend
- ✅ Manejo robusto de errores

---

## 🔮 Roadmap Futuro

### Próximas Funcionalidades

- [ ] Sistema de reviews y calificaciones
- [ ] Chat en vivo con clientes
- [ ] Integración con pasarelas de pago (Stripe, PayPal)
- [ ] Dashboard analytics avanzado
- [ ] Sistema de cupones y descuentos
- [ ] Notificaciones push
- [ ] App móvil (React Native)
- [ ] Multi-idioma (i18n)
- [ ] Modo oscuro
- [ ] Exportación de reportes (PDF, Excel)

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🙏 Agradecimientos

Este proyecto es el resultado de:

- **Perseverancia**: Horas de debugging y refactoring
- **Pasión**: Por crear software de calidad
- **Aprendizaje**: Cada desafío fue una oportunidad
- **Visión**: Crear algo que realmente ayude a otros

> *"El código no es solo instrucciones para una máquina, es una expresión de lógica, creatividad y solución de problemas"*

---

## 📞 Contacto y Soporte

¿Preguntas? ¿Mejoras? ¿Colaboraciones?

- 📧 Email: [tu-email@ejemplo.com]
- 🐙 GitHub: [tu-usuario]
- 💼 LinkedIn: [tu-perfil]

---

<div align="center">

**Hecho con ❤️, ☕ y mucho 💻**

*"La excelencia no es un destino, es un viaje continuo"*

</div>
