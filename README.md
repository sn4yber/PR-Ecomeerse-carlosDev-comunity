# 🛒 E-Commerce Universal Template System# 🛒 E-Commerce - NebulaTech TiendaVirtual



> **Una plataforma de comercio electrónico completamente personalizable y lista para producción**[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green.svg)](https://spring.io/projects/spring-boot)

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)[![React](https://img.shields.io/badge/React-19.1.1-61DAFB.svg)](https://reactjs.org/)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green.svg)](https://spring.io/projects/spring-boot)[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC.svg)](https://tailwindcss.com/)

[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)## 🎉 ¡Novedades v3.0.0!



---> **✨ Sistema Completo de Gestión de Usuarios y Autenticación Implementado**



## 🎯 ¿Qué es este proyecto?Esta versión introduce un **sistema integral de usuarios** con registro público, autenticación por roles, autocompletado de datos en checkout y trazabilidad completa de pedidos. ¡La experiencia de usuario ha sido mejorada significativamente!



Un **sistema e-commerce universal** que se adapta a cualquier tipo de negocio. Desde tiendas de tecnología hasta boutiques de ropa, configura toda tu tienda desde un panel de administración intuitivo **sin escribir código**.**Nuevas funcionalidades destacadas:**

- 👥 **Registro de usuarios** sin autenticación previa en `/register`

### ✨ Por qué es Especial- 🔐 **Login inteligente** con detección automática de rol (ADMIN/USER)

- 🛡️ **Protección de rutas** administrativas con `AdminRoute`

- 🎨 **100% Personalizable** - Panel de configuración con 7 tabs completos- 🛒 **Autocompletado** de datos personales en el checkout

- 🏪 **Multi-Industria** - Gaming, Ropa, Tecnología, Hogar, Deportes- 📊 **Panel de administración** de usuarios con CRUD completo

- 🔐 **Seguro** - Autenticación JWT, roles, encriptación BCrypt- 🔒 **Encriptación BCrypt** de contraseñas

- 📱 **Responsive** - Funciona perfecto en móvil, tablet y desktop- 📦 **Trazabilidad** de pedidos vinculados a usuarios

- 🚀 **Production Ready** - Listo para desplegar en producción

[Ver Changelog completo](#-changelog---historial-de-cambios) | [Ver Sistema de Usuarios](#-sistema-de-gestión-de-usuarios-completo)

---

---

## 📚 Documentación Completa

## 📋 Descripción Completa

| Documento | Descripción |

|-----------|-------------|**NebulaTech E-Commerce** es un proyecto colaborativo de tienda virtual desarrollado con arquitectura full-stack moderna. Combina **Spring Boot** para el backend API REST con **React + TypeScript** para el frontend, creando una aplicación escalable para gestión completa de productos gaming, usuarios y pedidos en línea.

| **[📖 README_PROYECTO.md](README_PROYECTO.md)** | Documentación técnica completa y detallada |

| **[👤 GUIA_USUARIO.md](GUIA_USUARIO.md)** | Manual de usuario para admins y clientes |### 🎯 Objetivos del Proyecto

| **[💾 database/carrito_schema.sql](database/carrito_schema.sql)** | Schema de base de datos |- Crear una plataforma e-commerce completa y funcional

- Implementar mejores prácticas de desarrollo full-stack

---- Proporcionar experiencia de usuario moderna y responsiva

- Gestión completa de inventario, usuarios y pedidos

## 🚀 Inicio Rápido- Sistema de autenticación JWT robusto con refresh automático

- Manejo inteligente de sesiones y persistencia de login

### Prerrequisitos- Sistema de subida y gestión de imágenes de productos

- **✨ NUEVO:** Sistema completo de registro de usuarios con roles

- Java 17+ ☕- **✨ NUEVO:** Autocompletado de datos en checkout para usuarios registrados

- Node.js 18+ 📦- **✨ NUEVO:** Panel de administración de usuarios con CRUD completo

- MySQL 8.0+ 🗄️- **✨ NUEVO:** Trazabilidad de pedidos vinculados a usuarios

- Maven 3.8+ 🔧

## 🏗️ Arquitectura Completa del Sistema

### Instalación

```

```bashE-comeerse/

# 1. Clonar el repositorio├── 📁 Backend (Spring Boot + Java 24)

git clone https://github.com/sn4yber/PR-Ecomeerse-carlosDev-comunity.git│   ├── src/main/java/com/example/E_comeerse/

cd PR-Ecomeerse-carlosDev-comunity│   │   ├── 🎮 EComeerseApplication.java    # Clase principal

│   │   ├── 🎛️ config/                      # Configuraciones

# 2. Configurar base de datos│   │   │   ├── SecurityConfig.java         # Seguridad Spring

mysql -u root -p < database/carrito_schema.sql│   │   │   ├── JwtConfig.java             # Configuración JWT

│   │   │   ├── WebConfig.java             # Configuración Web/CORS

# 3. Configurar application.properties│   │   │   └── DataInitializer.java       # Datos iniciales

# Editar: src/main/resources/application.properties│   │   ├── 🎯 controller/                  # Controladores REST API

# Actualizar credenciales de base de datos│   │   │   ├── AuthController.java         # Autenticación

│   │   │   ├── UsuarioController.java      # Gestión usuarios

# 4. Iniciar Backend│   │   │   ├── ProductoController.java     # Gestión productos

./mvnw spring-boot:run│   │   │   ├── CategoriaController.java    # Gestión categorías

│   │   │   └── PedidoController.java       # Gestión pedidos

# 5. Iniciar Frontend (en otra terminal)│   │   ├── 🗂️ dto/                        # Data Transfer Objects

cd src/main/resources/static/front-tiendavirtal│   │   │   ├── AuthResponse.java          # Respuesta autenticación

npm install│   │   │   ├── LoginRequest.java          # Petición login

npm run dev│   │   │   └── RefreshTokenRequest.java   # Petición refresh token

```│   │   ├── ⚠️ exception/                   # Manejo de excepciones

│   │   │   └── AuthExceptionHandler.java  # Excepciones auth

**Backend:** `http://localhost:8080`  │   │   ├── 🏗️ model/                      # Entidades JPA

**Frontend:** `http://localhost:5173`│   │   │   ├── Usuario.java               # Entidad Usuario

│   │   │   ├── Producto.java              # Entidad Producto

---│   │   │   ├── Categoria.java             # Entidad Categoría

│   │   │   └── Pedido.java                # Entidad Pedido

## 🎨 Sistema de Configuración Universal│   │   ├── 🗃️ repository/                 # Repositorios JPA

│   │   │   ├── UsuarioRepository.java     # Repo usuarios

El corazón del proyecto es el **Panel de Configuración** con 7 secciones editables:│   │   │   ├── ProductoRepository.java    # Repo productos

│   │   │   ├── CategoriaRepository.java   # Repo categorías

### 1️⃣ General│   │   │   └── PedidoRepository.java      # Repo pedidos

Nombre de tienda, slogan, contacto, logo, tipo de negocio│   │   ├── 🔒 security/                    # Sistema seguridad JWT

│   │   │   ├── JwtTokenUtil.java          # Utilidades JWT

### 2️⃣ Tienda│   │   │   ├── JwtAuthenticationFilter.java # Filtro JWT

Moneda, IVA, costos de envío, umbrales de envío gratis│   │   │   ├── JwtAuthenticationEntryPoint.java

│   │   │   ├── JwtValidationInterceptor.java

### 3️⃣ Hero Section│   │   │   ├── CustomUserDetailsService.java

Banner principal, títulos, subtítulos, imágenes, CTAs│   │   │   └── UserPrincipal.java         # Principal usuario

│   │   └── 🎪 service/                     # Lógica de negocio

### 4️⃣ Características│   │       ├── UsuarioService.java        # Servicios usuario

Beneficios del negocio (envío gratis, garantías, etc.)│   │       ├── ProductoService.java       # Servicios producto

│   │       ├── CategoriaService.java      # Servicios categoría

### 5️⃣ Redes Sociales│   │       └── PedidoService.java         # Servicios pedido

Links y visibilidad de Facebook, Instagram, Twitter, WhatsApp, LinkedIn│   ├── src/main/resources/

│   │   ├── application.properties         # Configuración app

### 6️⃣ Categorías│   │   ├── static/                        # Recursos estáticos

Productos organizados con emojis y gradientes personalizados│   │   │   └── front-tiendavirtal/        # Frontend integrado

│   │   └── templates/                     # Plantillas (si aplica)

### 7️⃣ Avanzada│   └── src/test/java/                     # Tests unitarios

Modo mantenimiento, políticas de stock, configuraciones técnicas├── 📁 Frontend (React + TypeScript)

│   └── src/main/resources/static/front-tiendavirtal/

**Todo se guarda automáticamente y se ve reflejado al instante** ✨│       ├── 📋 package.json                # Dependencias NPM

│       ├── 🏠 index.html                  # Página principal HTML

---│       ├── ⚙️ vite.config.ts              # Configuración Vite

│       ├── 🎨 tailwind.config.js          # Configuración Tailwind

## 🛍️ Características para Clientes│       ├── 📏 tsconfig.*.json             # Configuración TypeScript

│       ├── 🔍 eslint.config.js            # Configuración ESLint

- ✅ Catálogo dinámico con categorías personalizadas│       ├── public/                        # Assets públicos

- ✅ Carrito persistente entre sesiones│       │   ├── universo.png               # Logo/Favicon

- ✅ Sistema de búsqueda y filtros│       │   └── random-image.png           # Imágenes demo

- ✅ Checkout simplificado en 3 pasos│       └── src/                           # Código fuente frontend

- ✅ Registro de usuarios con autocompletado de datos│           ├── 🎯 main.tsx                # Entry point + React Query

- ✅ Historial completo de pedidos│           ├── 📱 App.tsx                 # Componente principal

- ✅ Seguimiento de estados de envío│           ├── 🎨 index.css               # Estilos globales

│           ├── 🧩 components/             # Componentes React

---│           │   ├── 📁 admin/              # 🆕 Componentes Admin Panel

│           │   │   ├── layout/            # Layout componentes admin

## 👨‍💼 Panel de Administración│           │   │   │   ├── AdminHeader.tsx # Header panel admin ✅

│           │   │   │   ├── AdminSidebar.tsx # Sidebar admin ✅

### Dashboard Principal│           │   │   │   └── index.ts       # Exports layout admin

- 📊 Estadísticas en tiempo real│           │   │   ├── pages/             # Páginas admin

- 📈 Gráficos de ventas y productos│           │   │   │   ├── AdminPanel.tsx # Dashboard principal ✅

- 🚨 Alertas de stock bajo y pedidos pendientes│           │   │   │   ├── ProductManagement.tsx # Gestión productos ✅

│           │   │   │   ├── UserManagement.tsx # Gestión usuarios ✅

### Gestión de Productos│           │   │   │   ├── OrderManagement.tsx # Gestión pedidos 🚧

- ➕ Crear, editar, eliminar productos│           │   │   │   ├── ReportsAndStats.tsx # Reportes y stats 🚧

- 🖼️ Carga múltiple de imágenes│           │   │   │   ├── SystemSettings.tsx # Config sistema 🚧

- 📦 Control de inventario en tiempo real│           │   │   │   └── index.ts       # Exports páginas admin

- 🏷️ Organización por categorías│           │   │   ├── ui/                # Componentes UI admin

│           │   │   │   ├── AdminButton.tsx # Botón admin ✅

### Gestión de Usuarios│           │   │   │   ├── AdminCard.tsx  # Card admin ✅

- 👥 CRUD completo de usuarios│           │   │   │   ├── AdminTable.tsx # Tabla admin ✅

- 🎭 Sistema de roles (ADMIN/USER)│           │   │   │   └── index.ts       # Exports UI admin

- 🔐 Cambio de permisos│           │   │   └── index.ts           # Exports admin principales

- 📊 Estadísticas de usuarios│           │   ├── layout/                # Componentes layout

│           │   │   ├── Header.tsx         # Navegación + Sidebar

### Gestión de Pedidos│           │   │   ├── Footer.tsx         # Footer global

- 📋 Lista completa con filtros│           │   │   └── index.ts           # Exports layout

- 🔄 Actualización de estados│           │   ├── pages/                 # Páginas/Vistas

- 👤 Información del comprador│           │   │   ├── Home.tsx           # Página inicio ✅

- 📧 Sistema de notificaciones│           │   │   ├── Login.tsx          # Página login ✅ (con detección admin)

│           │   │   ├── Productos.tsx      # Catálogo productos 🚧

### Editor de Configuración│           │   │   ├── Carrito.tsx        # Carrito compras 🚧

- ⚙️ 7 tabs de configuración completa│           │   │   └── index.ts           # Exports páginas

- 🎨 Editor visual WYSIWYG│           │   ├── ui/                    # Componentes UI reutilizables

- 💾 Guardado automático│           │   │   └── index.ts           # Exports UI (futuro)

- 👁️ Vista previa en tiempo real│           │   └── index.ts               # Exports principales

│           ├── 📝 types/                  # Definiciones TypeScript

---│           │   └── index.ts               # Tipos principales

│           ├── 🛠️ utils/                  # Utilidades y helpers

## 🛠️ Stack Tecnológico│           │   └── mockData.ts            # Datos mock desarrollo

│           └── 🖼️ assets/                 # Recursos del frontend

### Backend├── 📦 Maven Files

- ☕ **Java 17** - Lenguaje base│   ├── pom.xml                           # Configuración Maven

- 🍃 **Spring Boot 3.x** - Framework principal│   ├── mvnw                              # Maven Wrapper Unix

- 🔐 **Spring Security + JWT** - Autenticación│   ├── mvnw.cmd                          # Maven Wrapper Windows

- 🗄️ **Spring Data JPA** - ORM│   └── target/                           # Archivos compilados

- 🐬 **MySQL** - Base de datos└── 📚 Documentación

- 📦 **Maven** - Gestión de dependencias    ├── README.md                         # Este archivo

    ├── RESUMEN_DESARROLLO.md             # Resumen desarrollo

### Frontend    └── HELP.md                           # Ayuda Spring Boot

- ⚛️ **React 19.1.1** - Biblioteca UI```

- 📘 **TypeScript 5.8.3** - Tipado estático

- ⚡ **Vite 7.1.6** - Build tool## ⭐ Características Principales del Sistema

- 🎨 **Tailwind CSS 4.1.13** - Framework CSS

- 🔄 **TanStack Query 5.90.2** - Data fetching### 🔐 Sistema de Autenticación y Usuarios

- 🧭 **React Router DOM 7.9.2** - Enrutamiento

- **✅ Registro Público de Usuarios**: Cualquier persona puede registrarse en `/register` sin autenticación previa

---- **✅ Login Inteligente**: Detecta automáticamente el rol y redirige a la página correspondiente (Admin → `/admin`, User → `/`)

- **✅ Protección de Rutas**: Componente `AdminRoute` que valida permisos antes de permitir acceso al panel admin

## 🏗️ Arquitectura del Proyecto- **✅ Roles y Permisos**: Sistema de roles (USER/ADMIN) con validación en backend y frontend

- **✅ Seguridad Robusta**: Contraseñas encriptadas con BCrypt, tokens JWT, refresh automático

```

PR-Ecomeerse-carlosDev-comunity/### 🛒 Sistema de Carrito y Pedidos

├── 📁 src/main/java/                    # Backend Spring Boot

│   └── com/example/E_comeerse/- **✅ Carrito Persistente**: Vinculado al usuario, se mantiene entre sesiones

│       ├── config/                      # Configuraciones- **✅ Autocompletado de Datos**: Formulario de facturación se completa automáticamente con datos del usuario registrado

│       ├── controller/                  # Endpoints REST- **✅ Trazabilidad Completa**: Cada pedido vinculado a `idUsuario` para historial y análisis

│       ├── dto/                         # Data Transfer Objects- **✅ Gestión de Estados**: Pedidos con estados (PENDIENTE, ENVIADO, ENTREGADO, CANCELADO)

│       ├── model/                       # Entidades JPA- **✅ Panel Admin**: Visualización y gestión completa de pedidos con información del comprador

│       ├── repository/                  # Repositorios

│       ├── security/                    # JWT & Auth### 👥 Panel de Administración

│       └── service/                     # Lógica de negocio

│- **✅ Gestión de Usuarios**: CRUD completo con búsqueda, filtros y estadísticas

├── 📁 src/main/resources/- **✅ Gestión de Productos**: Crear, editar, eliminar productos con imágenes

│   ├── application.properties           # Config backend- **✅ Gestión de Categorías**: Organización jerárquica de productos

│   └── static/front-tiendavirtal/      # Frontend React- **✅ Gestión de Pedidos**: Ver todos los pedidos, cambiar estados, ver detalles del comprador

│       └── src/- **✅ Estadísticas en Tiempo Real**: Total de usuarios, productos, pedidos, ventas

│           ├── api/                     # Clientes HTTP

│           ├── components/              # Componentes React### 🎨 Experiencia de Usuario

│           │   ├── admin/              # Panel admin

│           │   ├── layout/             # Header, Footer- **✅ Diseño Moderno**: UI responsive con Tailwind CSS y animaciones GSAP

│           │   ├── pages/              # Páginas principales- **✅ Navegación Intuitiva**: Menú hamburguesa, búsqueda rápida, filtros por categoría

│           │   └── common/             # Componentes comunes- **✅ Carga Optimizada**: Lazy loading de imágenes, caché con TanStack Query

│           ├── context/                 # React Context API- **✅ Feedback Visual**: Loaders, mensajes de éxito/error, notificaciones

│           ├── hooks/                   # Custom hooks- **✅ Accesibilidad**: Diseño responsive móvil/tablet/desktop

│           └── types/                   # TypeScript types

│### 🔧 Arquitectura Técnica

├── 📁 database/                         # Scripts SQL

├── 📁 uploads/                          # Imágenes de productos- **✅ API REST Completa**: Endpoints documentados para todas las operaciones

└── 📚 Documentación/- **✅ Validación de Datos**: Backend valida todos los inputs con Spring Validation

    ├── README.md                        # Este archivo- **✅ Manejo de Errores**: Sistema centralizado de excepciones con mensajes claros

    ├── README_PROYECTO.md              # Documentación técnica- **✅ CORS Configurado**: Comunicación segura entre frontend y backend

    └── GUIA_USUARIO.md                 # Manual de usuario- **✅ Base de Datos PostgreSQL**: Hospedada en Neon con esquema completo

```

## 🛠️ Stack Tecnológico Completo

---

### 🌐 Backend (API REST)

## 📊 API REST Endpoints- **☕ Java 24** - Lenguaje de programación principal

- **🍃 Spring Boot 3.5.5** - Framework principal

### Autenticación- **🗃️ Spring Data JPA** - ORM y acceso a datos

- `POST /api/auth/login` - Iniciar sesión- **🔒 Spring Security** - Autenticación y autorización

- `POST /api/auth/register` - Registro público- **🔑 JWT (JSON Web Tokens)** - Autenticación stateless

- `POST /api/auth/refresh` - Renovar token  - `jjwt-api 0.11.5` - API JWT

  - `jjwt-impl 0.11.5` - Implementación JWT

### Productos  - `jjwt-jackson 0.11.5` - Serialización JSON

- `GET /api/productos` - Listar productos- **🐘 PostgreSQL** - Base de datos principal (Neon)

- `POST /api/productos` - Crear producto (Admin)- **✅ Spring Boot Validation** - Validación de datos

- `PUT /api/productos/{id}` - Actualizar (Admin)- **📊 Spring Boot Actuator** - Monitoreo y métricas

- `DELETE /api/productos/{id}` - Eliminar (Admin)- **☁️ Spring Cloud Config** - Configuración distribuida

- **🔄 Spring Boot Cache** - Sistema de caché

### Usuarios- **🔗 OAuth2 Client** - Autenticación externa

- `GET /api/usuarios` - Listar usuarios (Admin)- **🧪 Spring Boot Test** - Framework de testing

- `POST /api/usuarios` - Crear usuario- **📝 Lombok** - Reducir boilerplate de código

- `PUT /api/usuarios/{id}` - Actualizar- **🔧 Spring Boot DevTools** - Herramientas desarrollo

- `DELETE /api/usuarios/{id}` - Eliminar (Admin)- **📦 Maven** - Gestión de dependencias y build



### Pedidos### ⚛️ Frontend (SPA - Single Page Application)

- `GET /api/pedidos` - Listar pedidos- **⚛️ React 19.1.1** - Biblioteca UI principal

- `POST /api/pedidos` - Crear pedido- **📘 TypeScript 5.8.3** - Tipado estático

- `GET /api/pedidos/usuario/{id}` - Pedidos de usuario- **⚡ Vite 7.1.6** - Build tool y dev server

- `PUT /api/pedidos/{id}/estado` - Cambiar estado (Admin)- **🎨 Tailwind CSS 4.1.13** - Framework CSS utility-first

- **🔄 TanStack Query 5.90.2** - Data fetching y cache

Ver documentación completa en [README_PROYECTO.md](README_PROYECTO.md)- **🧭 React Router DOM 7.9.2** - Enrutamiento SPA

- **🎭 GSAP 3.13.0** - Animaciones avanzadas

---- **🔍 ESLint 9.35.0** - Linting y calidad código

- **📏 TypeScript ESLint 8.43.0** - Rules específicas TS

## 💡 Casos de Uso Reales- **⚙️ Globals 16.4.0** - Variables globales

- **🔄 React Hooks ESLint** - Rules para hooks

### Tienda de Gaming- **♻️ React Refresh** - Hot reload desarrollo

```javascript

{## 🚀 Instalación y Configuración Completa

  nombreTienda: "GamersHub Pro",

  tipoNegocio: "gaming",### Prerrequisitos

  categorias: [

    { nombre: "Teclados", icono: "⌨️" },- **Java 24** o superior

    { nombre: "Ratones", icono: "🖱️" },- **Node.js 18** o superior

    { nombre: "Headsets", icono: "🎧" }- **Maven 3.6** o superior

  ]- **Git** para control de versiones

}- **PostgreSQL** (o acceso a Neon DB)

```

### 1. Clonar el Repositorio

### Boutique de Ropa

```javascript```bash

{git clone https://github.com/sn4yber/PR-Ecomeerse-carlosDev-comunity.git

  nombreTienda: "Fashion Boutique",cd E-comeerse

  tipoNegocio: "ropa",```

  categorias: [

    { nombre: "Vestidos", icono: "👗" },### 2. Configuración del Backend

    { nombre: "Zapatos", icono: "👠" },

    { nombre: "Accesorios", icono: "👜" }#### Variables de Entorno

  ]El archivo `src/main/resources/application.properties` contiene:

}

``````properties

# Configuración del servidor

### Tienda de Tecnologíaspring.application.name=E-comeerse

```javascriptserver.port=8080

{

  nombreTienda: "TechMarket Pro",# Base de datos PostgreSQL Neon (CONFIGURADA)

  tipoNegocio: "tecnologia",spring.datasource.url=jdbc:postgresql://ep-jolly-leaf-adc61hdy-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

  categorias: [spring.datasource.username=neondb_owner

    { nombre: "Laptops", icono: "💻" },spring.datasource.password=npg_CoH9eFL3WrmT

    { nombre: "Smartphones", icono: "📱" },spring.datasource.driver-class-name=org.postgresql.Driver

    { nombre: "Audio", icono: "🎧" }

  ]# JPA/Hibernate

}spring.jpa.hibernate.ddl-auto=update

```spring.jpa.show-sql=true

spring.jpa.properties.hibernate.format_sql=true

---spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect



## 🔐 Seguridad# JWT Configuration

jwt.secret=bXlTZWNyZXRLZXkxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTA=

- ✅ Autenticación JWT con tokens de 24hjwt.expiration=86400000

- ✅ Contraseñas encriptadas con BCryptjwt.refresh-expiration=604800000

- ✅ Validación de roles en backend y frontendjwt.token-prefix=Bearer 

- ✅ Protección CORS configuradajwt.header-string=Authorization

- ✅ Validación de inputs con Bean Validation

- ✅ Prevención de SQL Injection con JPA# Cloud y desarrollo

spring.cloud.config.enabled=false

---management.security.enabled=false

spring.scheduling.enable=true

## 🎓 Aprendizajes del Proyectologging.level.com.example.E_comeerse.security=DEBUG

```

Este proyecto es resultado de:

- 💪 **Perseverancia** - Superar cada desafío técnico> ⚠️ **Importante**: En producción, usar variables de entorno para credenciales

- 🧠 **Lógica Impecable** - Arquitectura pensada y sólida

- 🎨 **Código Limpio** - Documentado y mantenible#### Ejecutar Backend

- ❤️ **Pasión por el Desarrollo** - Cada línea con propósito

```bash

---# Compilar y ejecutar

./mvnw spring-boot:run

## 🤝 Contribuir

# O usando Maven instalado

Las contribuciones son bienvenidas! Por favor:mvn spring-boot:run



1. Fork el proyecto# El servidor estará disponible en: http://localhost:8080

2. Crea una rama (`git checkout -b feature/amazing`)```

3. Commit tus cambios (`git commit -m 'Add amazing feature'`)

4. Push a la rama (`git push origin feature/amazing`)### 3. Configuración del Frontend

5. Abre un Pull Request

#### Instalar Dependencias

---

```bash

## 📝 Licenciacd src/main/resources/static/front-tiendavirtal

npm install

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.```



---#### Ejecutar Frontend en Desarrollo



## 🙏 Agradecimientos```bash

# Navegar al directorio del frontend

Este proyecto fue desarrollado con:cd src/main/resources/static/front-tiendavirtal

- ❤️ **Pasión** por crear software de calidadnpm run dev

- ☕ **Café** para las largas sesiones de código

- 💻 **Dedicación** para lograr la excelencia# Servidor de desarrollo disponible en: http://localhost:5173

```

---

> 📌 **Importante**: Usar siempre la ruta completa para ejecutar el frontend desde cualquier ubicación

## 📞 Contacto

#### Construir para Producción

¿Preguntas? ¿Sugerencias? ¿Colaboraciones?

```bash

- 📧 Email: [tu-email@ejemplo.com]npm run build

- 🐙 GitHub: [sn4yber](https://github.com/sn4yber)```



---## 🗃️ Modelo de Base de Datos



<div align="center">### Entidades Principales



**Hecho con ❤️, ☕ y mucho 💻**#### 👤 Usuario (`usuarios`)

```sql

*"El código no es solo instrucciones, es arte y solución de problemas"*CREATE TABLE usuarios (

    id_usuario BIGSERIAL PRIMARY KEY,

⭐ Si te gustó este proyecto, dale una estrella!    nombre VARCHAR(50) NOT NULL,

    apellido VARCHAR(50) NOT NULL,

</div>    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,

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

## � Sistema de Gestión de Usuarios Completo

### 🎯 Características Principales del Sistema de Usuarios

El sistema implementa una **gestión integral de usuarios** con autenticación, registro, permisos y trazabilidad completa en pedidos.

#### ✅ Funcionalidades Implementadas

1. **🔐 Registro Público de Usuarios**
   - Formulario de registro accesible en `/register`
   - Validación de campos (email, contraseña, datos personales)
   - Encriptación automática de contraseñas con BCrypt
   - Asignación automática de rol `USER` (sin opción de elegir admin)
   - Verificación de duplicados (email y nombre de usuario)

2. **🔑 Sistema de Login Inteligente**
   - Detección automática de rol al iniciar sesión
   - Redirección inteligente: ADMIN → `/admin`, USER → `/`
   - Persistencia de sesión con JWT y localStorage
   - Refresh automático de tokens sin intervención del usuario

3. **🛡️ Protección de Rutas por Rol**
   - `AdminRoute`: Componente que verifica rol ADMIN
   - Validación tanto en frontend como en backend
   - Mensaje de error al intentar acceso no autorizado
   - Backend valida permisos antes de ejecutar operaciones

4. **📦 Integración con Carrito y Pedidos**
   - Cada carrito está vinculado al `idUsuario`
   - Datos del usuario se autocomplementan en checkout
   - Pedidos guardan `idUsuario` + datos de facturación
   - Trazabilidad completa: siempre se sabe quién compró

5. **👥 Panel de Gestión de Usuarios (Admin)**
   - CRUD completo de usuarios desde el panel admin
   - Visualización de roles, emails, teléfonos
   - Búsqueda y filtros por rol (ALL, ADMIN, USER)
   - Estadísticas de usuarios (total, admins, clientes)
   - Solo administradores pueden crear otros administradores

### 🔐 Roles y Permisos

```java
public enum Role {
    USER("USER"),     // Cliente - Puede comprar y ver sus pedidos
    ADMIN("ADMIN");   // Administrador - Acceso total al panel admin
}
```

#### Tabla de Permisos

| Acción | USER | ADMIN |
|--------|------|-------|
| Registrarse | ✅ | - |
| Iniciar sesión | ✅ | ✅ |
| Ver productos | ✅ | ✅ |
| Agregar al carrito | ✅ | ✅ |
| Realizar compras | ✅ | ✅ |
| Ver sus propios pedidos | ✅ | ✅ |
| Acceder al panel admin | ❌ | ✅ |
| Gestionar productos | ❌ | ✅ |
| Gestionar usuarios | ❌ | ✅ |
| Ver todos los pedidos | ❌ | ✅ |
| Cambiar estados de pedidos | ❌ | ✅ |
| Crear otros administradores | ❌ | ✅ |

### 📋 Modelo de Usuario Completo

```java
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 50)
    private String nombre;
    
    @NotBlank(message = "El apellido es obligatorio")
    @Size(min = 2, max = 50)
    private String apellido;
    
    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(min = 3, max = 50)
    @Column(unique = true)
    private String nombreUsuario;
    
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, max = 255)
    private String contrasena;  // ← Encriptada con BCrypt
    
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Email debe tener formato válido")
    @Column(unique = true)
    private String email;
    
    @Size(max = 20)
    private String telefono;
    
    @Enumerated(EnumType.STRING)
    private Role rol = Role.USER;  // ← Default USER
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;
}
```

### 🔄 Flujo Completo de Usuario

```mermaid
graph TD
    A[Usuario visita /register] --> B[Completa formulario]
    B --> C{Datos válidos?}
    C -->|No| B
    C -->|Sí| D[Backend: Rol = USER automático]
    D --> E[Contraseña encriptada]
    E --> F[Usuario guardado en BD]
    F --> G[Redirección a /login]
    G --> H[Usuario inicia sesión]
    H --> I{Rol del usuario?}
    I -->|USER| J[Redirección a /]
    I -->|ADMIN| K[Redirección a /admin]
    J --> L[Puede comprar productos]
    K --> M[Acceso a panel admin]
    L --> N[Datos se autocomplementan en checkout]
    N --> O[Pedido vinculado a su idUsuario]
    M --> P[Puede ver todos los pedidos con usuario asociado]
```

### 🛒 Integración con Sistema de Carrito

#### Autocompletado en Checkout

Cuando un usuario registrado hace checkout, el modal de facturación **automáticamente carga**:

```typescript
// FacturacionFormModal.tsx
useEffect(() => {
  if (isOpen) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      
      setFormData(prev => ({
        ...prev,
        nombreCompleto: `${user.nombre} ${user.apellido}`,
        email: user.email,
        telefono: user.telefono || ''
      }));
    }
  }
}, [isOpen]);
```

**Campos autocompletados:**
- ✅ Nombre completo: `nombre + apellido`
- ✅ Email: email registrado
- ✅ Teléfono: teléfono registrado (si existe)

**Campos que debe completar el usuario:**
- Número de identificación (DNI/Cédula)
- Dirección completa
- Ciudad y país
- Código postal (opcional)
- Método de pago

#### Vinculación con Pedidos

```java
// Pedido.java - Modelo completo
@Entity
@Table(name = "pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;  // ← Usuario que realizó la compra
    
    // Datos de facturación del pedido
    @Column(name = "cliente_nombre")
    private String clienteNombre;
    
    @Column(name = "cliente_email")
    private String clienteEmail;
    
    @Column(name = "cliente_telefono")
    private String clienteTelefono;
    
    @Column(name = "cliente_direccion")
    private String clienteDireccion;
    
    // ... más campos
}
```

**Beneficios:**
1. **Trazabilidad**: Siempre se sabe qué usuario hizo cada compra
2. **Experiencia**: Menos campos para llenar en cada compra
3. **Análisis**: Métricas por usuario (compras, frecuencia, etc.)
4. **Soporte**: Fácil contactar al cliente si hay problemas

### 🔒 Seguridad del Sistema de Usuarios

#### Backend - SecurityConfig.java

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(authz -> authz
            // Registro público sin autenticación
            .requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll()
            
            // Login público
            .requestMatchers("/api/auth/login", "/api/auth/refresh").permitAll()
            
            // Panel admin - SOLO ADMIN
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            
            // Resto requiere autenticación
            .anyRequest().authenticated()
        );
    return http.build();
}
```

#### Backend - UsuarioController.java

```java
@PostMapping
public ResponseEntity<?> crearUsuario(
        @Valid @RequestBody Usuario usuario, 
        Authentication authentication) {
    
    // Si no hay autenticación (registro público), FORZAR rol USER
    if (authentication == null || !authentication.isAuthenticated()) {
        usuario.setRol(Role.USER);
    } 
    // Si hay autenticación, verificar si es ADMIN
    else {
        boolean esAdmin = authentication.getAuthorities()
            .contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        
        // Si NO es ADMIN, solo puede crear usuarios con rol USER
        if (!esAdmin) {
            usuario.setRol(Role.USER);
        }
    }
    
    // Encriptar contraseña y guardar
    Usuario usuarioGuardado = usuarioService.guardarUsuario(usuario);
    return ResponseEntity.status(HttpStatus.CREATED).body(usuarioGuardado);
}
```

#### Frontend - AdminRoute.tsx

```typescript
export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      setHasAccess('no-auth');
      return;
    }

    const user = JSON.parse(userStr);
    const isAdmin = user.rol === 'ADMIN';
    
    if (isAdmin) {
      setHasAccess('yes');
    } else {
      setHasAccess('no-admin');
    }
  }, []);

  // Redirecionar según acceso
  if (hasAccess === 'no-auth') {
    return <Navigate to="/login" />;
  }
  
  if (hasAccess === 'no-admin') {
    alert('⛔ No tienes permisos para acceder al panel de administrador.');
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};
```

### 📁 Estructura de Archivos del Sistema de Usuarios

#### Backend
```
src/main/java/com/example/E_comeerse/
├── model/
│   ├── Usuario.java                    ✅ Entidad con roles
│   └── Role.java                       ✅ Enum de roles
├── controller/
│   └── UsuarioController.java          ✅ CRUD con validación de roles
├── service/
│   └── UsuarioService.java             ✅ Encriptación de contraseñas
├── repository/
│   └── UsuarioRepository.java          ✅ Queries personalizadas
└── config/
    └── SecurityConfig.java             ✅ Configuración de permisos
```

#### Frontend
```
src/main/resources/static/front-tiendavirtal/src/
├── components/
│   ├── pages/
│   │   ├── Login.tsx                   ✅ Login con detección de rol
│   │   └── Register.tsx                ✅ Registro público
│   ├── admin/pages/
│   │   └── UserManagement.tsx          ✅ Gestión completa de usuarios
│   ├── cart/
│   │   └── FacturacionFormModal.tsx    ✅ Autocompletado de datos
│   └── AdminRoute.tsx                  ✅ Protección de rutas admin
├── api/
│   └── usuariosApi.ts                  ✅ API de usuarios
└── types/
    └── usuario.ts                      ✅ Tipos TypeScript
```

### 🎯 Casos de Uso

#### Caso 1: Registro de Cliente
1. Usuario accede a `/register`
2. Completa formulario con sus datos
3. Acepta términos y condiciones
4. Click en "Crear Cuenta"
5. Backend valida, encripta contraseña y asigna `rol: USER`
6. Redirección automática a `/login`
7. Usuario inicia sesión normalmente

#### Caso 2: Compra con Datos Autocompletados
1. Usuario (ya registrado) agrega productos al carrito
2. Click en "Finalizar Compra"
3. Modal de facturación se abre con datos pre-cargados:
   - ✅ Nombre completo
   - ✅ Email
   - ✅ Teléfono
4. Usuario solo completa: dirección, identificación, método de pago
5. Pedido se crea con `idUsuario` vinculado
6. Admin puede ver en panel quién realizó la compra

#### Caso 3: Admin Gestiona Usuarios
1. Admin inicia sesión (rol ADMIN detectado)
2. Redirección automática a `/admin`
3. Click en "Gestión de Usuarios"
4. Ve lista completa de usuarios con filtros
5. Puede crear nuevos usuarios con cualquier rol
6. Puede editar o eliminar usuarios existentes
7. Puede promover usuarios a ADMIN si es necesario

### 🚀 Ventajas del Sistema Implementado

1. **✅ Seguridad Robusta**
   - Contraseñas encriptadas con BCrypt
   - Validación de roles en backend y frontend
   - Prevención de escalada de privilegios

2. **✅ Experiencia de Usuario Mejorada**
   - Menos campos para llenar en cada compra
   - Datos consistentes entre pedidos
   - Proceso de checkout más rápido

3. **✅ Trazabilidad Completa**
   - Cada pedido vinculado a un usuario
   - Historial de compras por usuario
   - Análisis y métricas precisas

4. **✅ Escalabilidad**
   - Fácil agregar nuevos roles en el futuro
   - Sistema de permisos extensible
   - Preparado para features avanzadas

5. **✅ Mantenimiento Simplificado**
   - Código limpio y bien documentado
   - Separación clara de responsabilidades
   - Pruebas unitarias facilitadas

## �📊 API REST Endpoints Completos

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Body | Respuesta |
|--------|----------|-------------|------|-----------|
| `POST` | `/api/auth/login` | Iniciar sesión | `{username, password}` | `{token, refreshToken, user}` |
| `POST` | `/api/auth/logout` | Cerrar sesión | - | `{message}` |
| `POST` | `/api/auth/refresh` | Renovar token | `{refreshToken}` | `{token, refreshToken}` |
| `POST` | `/api/auth/crear-admin` | Crear admin | - | `{user, message}` |
| `GET` | `/api/auth/test` | Test endpoint | - | `{message, timestamp}` |

### 👤 Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción | Público | Body | Respuesta |
|--------|----------|-------------|---------|------|-----------|
| `GET` | `/api/usuarios` | Listar todos los usuarios | ❌ (requiere auth) | - | `[{usuario}]` |
| `POST` | `/api/usuarios` | **Registrar nuevo usuario** | ✅ **SÍ** (registro público) | `{nombre, apellido, nombreUsuario, email, contrasena, telefono}` | `{usuario}` |
| `GET` | `/api/usuarios/{id}` | Obtener usuario por ID | ❌ (requiere auth) | - | `{usuario}` |
| `PUT` | `/api/usuarios/{id}` | Actualizar usuario | ❌ (requiere auth) | `{campos a actualizar}` | `{usuario}` |
| `DELETE` | `/api/usuarios/{id}` | Eliminar usuario | ❌ (requiere auth) | - | `{message}` |

> **⚠️ IMPORTANTE**: El endpoint `POST /api/usuarios` es **PÚBLICO** (sin autenticación) para permitir el registro de nuevos clientes. El sistema **automáticamente asigna el rol `USER`** a todos los registros públicos, sin importar el rol enviado en el body. Solo administradores autenticados pueden crear usuarios con rol `ADMIN`.

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

### 🛡️ Panel de Administración (`/api/admin`) - 🔒 Solo ADMIN

| Método | Endpoint | Descripción | Body | Respuesta |
|--------|----------|-------------|------|-----------|
| `GET` | `/api/admin/usuarios` | Listar todos los usuarios (admin) | - | `[{usuario}]` |
| `POST` | `/api/admin/usuarios/crear` | Crear usuario con rol específico | `{adminUsuarioDto}` | `{usuario}` |
| `PUT` | `/api/admin/usuarios/{id}/promover` | Promover usuario a admin | - | `{mensaje}` |
| `GET` | `/api/admin/productos` | Listar productos (panel admin) | - | `[{producto}]` |
| `POST` | `/api/admin/productos` | Crear producto (panel admin) | `{producto}` | `{producto}` |
| `PUT` | `/api/admin/productos/{id}` | Actualizar producto (panel admin) | `{producto}` | `{producto}` |
| `DELETE` | `/api/admin/productos/{id}` | Eliminar producto (panel admin) | - | `{mensaje}` |
| `GET` | `/api/admin/productos/{id}` | Obtener producto para edición | - | `{producto}` |

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

## 🛡️ Panel de Administración - Sistema Completo

### 🎯 Características del Panel Admin

El panel de administración es una **sección completamente separada** del frontend público, diseñado específicamente para administradores del sistema con funcionalidades avanzadas de gestión.

#### ✅ Funcionalidades Implementadas

1. **🔐 Autenticación Basada en Roles**
   - Login con detección automática de rol ADMIN
   - Redirección automática al panel `/admin` para administradores
   - Protección de rutas administrativas con Spring Security

2. **📊 Dashboard Principal** (`/admin`)
   - Vista general del sistema con métricas clave
   - Navegación centralizada a todos los módulos
   - Indicadores de estado del sistema

3. **👥 Gestión de Usuarios** (`/admin/usuarios`)
   - CRUD completo de usuarios del sistema
   - Promoción de usuarios regulares a administradores
   - Visualización de roles y estados de cuenta

4. **🛍️ Gestión de Productos** (`/admin/productos`)
   - CRUD completo de productos
   - Gestión de categorías y stock
   - Subida de imágenes y gestión de metadatos

#### 🚧 Módulos en Desarrollo

5. **📦 Gestión de Pedidos** (`/admin/pedidos`)
   - Visualización y gestión de todos los pedidos
   - Cambio de estados (Pendiente → Procesando → Enviado → Entregado)
   - Sistema de notificaciones a clientes

6. **📈 Reportes y Estadísticas** (`/admin/reportes`)
   - Dashboard con métricas de ventas
   - Gráficos de rendimiento temporal
   - Reportes de productos más vendidos

7. **⚙️ Configuración del Sistema** (`/admin/configuracion`)
   - Parámetros generales del sistema
   - Configuración de métodos de pago
   - Ajustes de envío y logística

### 🏗️ Arquitectura del Panel Admin

#### Backend - Controlador Admin (`AdminController.java`)

```java
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")  // 🔒 Solo usuarios con rol ADMIN
public class AdminController {
    
    // Gestión de usuarios
    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listarTodosLosUsuarios();
    
    @PostMapping("/usuarios/crear")
    public ResponseEntity<?> crearUsuarioAdmin(@Valid @RequestBody AdminUsuarioDto usuarioDto);
    
    @PutMapping("/usuarios/{id}/promover")
    public ResponseEntity<?> promoverUsuario(@PathVariable Long id);
    
    // Gestión de productos
    @GetMapping("/productos")
    public ResponseEntity<List<Producto>> listarProductosAdmin();
    
    @PostMapping("/productos")
    public ResponseEntity<?> crearProductoAdmin(@Valid @RequestBody Producto producto);
    
    @PutMapping("/productos/{id}")
    public ResponseEntity<?> actualizarProductoAdmin(@PathVariable Long id, @Valid @RequestBody Producto producto);
    
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<?> eliminarProductoAdmin(@PathVariable Long id);
}
```

#### Frontend - Estructura de Componentes Admin

```
📁 components/admin/
├── 📁 layout/                    # Layout específicos del admin
│   ├── AdminHeader.tsx           # Header del panel admin ✅
│   ├── AdminSidebar.tsx          # Sidebar navegación admin ✅
│   └── index.ts                  # Exports layout admin
├── 📁 pages/                     # Páginas principales admin
│   ├── AdminPanel.tsx            # Dashboard principal ✅
│   ├── ProductManagement.tsx     # Gestión productos ✅
│   ├── UserManagement.tsx        # Gestión usuarios ✅
│   ├── OrderManagement.tsx       # Gestión pedidos 🚧
│   ├── ReportsAndStats.tsx       # Reportes y estadísticas 🚧
│   ├── SystemSettings.tsx        # Configuración sistema 🚧
│   └── index.ts                  # Exports páginas admin
├── 📁 ui/                        # Componentes UI específicos admin
│   ├── AdminButton.tsx           # Botones estilo admin ✅
│   ├── AdminCard.tsx             # Cards para dashboard ✅
│   ├── AdminTable.tsx            # Tablas para listados ✅
│   └── index.ts                  # Exports UI admin
└── index.ts                      # Exports principales admin
```

### 🔐 Sistema de Autenticación Admin

#### Flujo de Login para Administradores

1. **Login Estándar** - Usuario ingresa credenciales en `/login`
2. **Detección de Rol** - Backend valida credenciales y devuelve rol del usuario
3. **Redirección Automática** - Si rol = "ADMIN", redirección a `/admin`
4. **Acceso Protegido** - Todas las rutas `/admin/*` requieren rol ADMIN

```typescript
// Login.tsx - Detección automática de administradores
const loginMutation = useMutation({
  mutationFn: async () => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario, contrasena }),
    });
    return response.json();
  },
  onSuccess: (data) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    // 🎯 Detección automática de rol admin
    if (data.user.rol === "ADMIN") {
      window.location.href = "/admin"; // Redirección al panel admin
    } else {
      window.location.href = "/dashboard"; // Dashboard normal
    }
  }
});
```

### 🎨 Diseño y UX del Panel Admin

#### Características de Diseño

- **🎨 Design System Consistente** - Paleta de colores dedicada para admin
- **📱 Responsive Design** - Optimizado para desktop y tablet
- **⚡ Performance** - Lazy loading de componentes pesados
- **🔍 Búsqueda y Filtros** - Herramientas avanzadas de gestión
- **📊 Visualización de Datos** - Charts y métricas en tiempo real

#### Estados de Desarrollo

- **✅ Completamente Funcional**: AdminPanel, ProductManagement, UserManagement
- **🚧 En Desarrollo**: OrderManagement, ReportsAndStats, SystemSettings
- **📋 Planificado**: Sistema de notificaciones, Gestión de roles avanzada

### 🛣️ Rutas del Panel Admin

```typescript
// App.tsx - Configuración de rutas admin
<Routes>
  {/* Rutas públicas */}
  <Route path="/" element={<Home />} />
  <Route path="/productos" element={<Productos />} />
  <Route path="/login" element={<Login />} />
  
  {/* 🛡️ Panel de Administración */}
  <Route path="/admin" element={<AdminPanel />} />
  <Route path="/admin/productos" element={<ProductManagement />} />
  <Route path="/admin/usuarios" element={<UserManagement />} />
  <Route path="/admin/pedidos" element={<OrderManagement />} />
  <Route path="/admin/reportes" element={<ReportsAndStats />} />
  <Route path="/admin/configuracion" element={<SystemSettings />} />
</Routes>
```

## 🔐 Sistema de Autenticación JWT Avanzado

### 🎯 Características del Sistema de Autenticación

El proyecto implementa un **sistema de autenticación JWT robusto** con las siguientes características:

- ✅ **Autenticación basada en tokens JWT**
- ✅ **Refresh tokens automático** sin intervención del usuario
- ✅ **Persistencia de sesión** (login permanece activo)
- ✅ **Manejo inteligente de expiración** de tokens
- ✅ **Navegación sin interrupciones** por la aplicación
- ✅ **Subida de imágenes autenticada** con tokens válidos
- ✅ **Rutas protegidas** por rol (USER/ADMIN)

### 🏗️ Arquitectura del Sistema de Tokens

#### Backend - Generación de Tokens

```java
// JwtTokenUtil.java - Generación de tokens
public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration * 1000))
        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
        .compact();
}

// Configuración: jwt.expiration=86400 (24 horas)
```

#### Frontend - Sistema de Refresh Automático

El frontend implementa un sistema inteligente de refresh de tokens que:

1. **Verifica la expiración** del token antes de cada petición
2. **Refresca automáticamente** si el token está por expirar (< 2 minutos)
3. **No interrumpe** la experiencia del usuario
4. **Maneja errores** de forma transparente

```typescript
// tokenRefresh.ts - Sistema de refresh automático
export async function ensureValidToken(): Promise<string | null> {
  const currentToken = localStorage.getItem('token');
  
  if (!currentToken) return null;

  const decoded = decodeJWT(currentToken);
  if (decoded && decoded.exp) {
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    
    // Si el token aún es válido, usarlo directamente
    if (timeUntilExpiration > 0) {
      // Refrescar en background si está por expirar
      if (timeUntilExpiration < 120000) {
        refreshAccessToken().catch(() => {});
      }
      return currentToken;
    }
  }

  // Si expiró, refrescar antes de continuar
  return await refreshAccessToken();
}
```

### 🔄 Flujo de Refresh de Tokens

```mermaid
graph TD
    A[Usuario hace petición] --> B{Token válido?}
    B -->|Sí y > 2 min| C[Usar token actual]
    B -->|Sí pero < 2 min| D[Refrescar en background]
    B -->|No/Expirado| E[Refrescar inmediatamente]
    D --> C
    E --> F{Refresh exitoso?}
    F -->|Sí| G[Usar nuevo token]
    F -->|No| H[Error de auth]
    C --> I[Ejecutar petición]
    G --> I
```

### 📋 Endpoints de Autenticación

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "nombreUsuario": "admin",
  "contrasena": "admin123"
}

Response 200 OK:
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "745aa35d-31fd-4660-9b32-5dd0f4e4725d",
  "tokenType": "Bearer",
  "expiresIn": 86400,
  "user": {
    "id": 1,
    "nombre": "Admin",
    "email": "admin@example.com",
    "rol": "ADMIN"
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "745aa35d-31fd-4660-9b32-5dd0f4e4725d"
}

Response 200 OK:
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "745aa35d-31fd-4660-9b32-5dd0f4e4725d",
  "tokenType": "Bearer",
  "expiresIn": 86400
}
```

### 🛡️ Protección de Rutas

#### Frontend - ProtectedRoute Component

```typescript
// ProtectedRoute.tsx - Protección de rutas por rol
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Uso en rutas
<Route
  path="/admin/*"
  element={
    <ProtectedRoute requiredRole="ADMIN">
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

#### Backend - Spring Security Config

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Rutas públicas
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/productos/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                
                // Rutas protegidas por rol
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/files/**").authenticated()
                
                // Resto requiere autenticación
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### 📁 Sistema de Subida de Imágenes Autenticado

```typescript
// api.ts - Subida de imágenes con token automático
export const filesAPI = {
  subirImagen: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    // Token válido obtenido automáticamente
    const token = await ensureValidToken();
    
    if (!token) {
      throw new Error('Error de autenticación');
    }
    
    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir imagen');
    }

    const data = await response.json();
    return {
      url: `http://localhost:8080${data.url}`,
      filename: data.filename,
    };
  }
};
```

### 🎯 Beneficios del Sistema

1. **✅ Experiencia de Usuario Fluida**
   - No requiere login repetido cada hora
   - Navegación sin interrupciones
   - Subida de archivos sin errores 401

2. **✅ Seguridad Robusta**
   - Tokens de corta duración (24h)
   - Refresh tokens seguros
   - Protección por rol en backend y frontend

3. **✅ Mantenimiento Simplificado**
   - Sistema centralizado de tokens
   - Código limpio y modular
   - Fácil de extender y mantener

4. **✅ Performance Optimizado**
   - Refresh en background sin bloqueos
   - Caché de tokens válidos
   - Mínimas llamadas al servidor

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
**Estado:** ✅ Completamente funcional con detección de admin
- **Sistema de autenticación** completo con backend
- **Detección automática de roles** (USER/ADMIN)
- **Redirección inteligente** al dashboard correspondiente
- **Persistencia JWT** en localStorage
- **Manejo de errores** de autenticación
- **Integración React Query** para estado de carga

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
- **AuthExceptionHandler**: Manejo global de excepciones de autenticación

### 🛡️ Sistema de Roles Implementado

```java
public enum Role {
    USER,     // Cliente registrado - Acceso a funciones básicas
    ADMIN     // Administrador - Acceso completo al panel admin
}
```

#### Flujo de Autorización

1. **Login** → Backend valida credenciales y devuelve rol del usuario
2. **Token JWT** → Incluye información del rol en el payload
3. **Frontend** → Detecta rol y redirige al dashboard correspondiente
4. **Backend Security** → `@PreAuthorize("hasRole('ADMIN')")` protege endpoints admin
5. **Rutas Protegidas** → Spring Security valida permisos automáticamente

#### Endpoints Protegidos por Rol

- **🟢 Público**: `/api/auth/login`, `/api/productos` (GET)
- **🔵 USER**: `/api/usuarios/{id}` (solo su propio perfil), `/api/pedidos` (sus pedidos)
- **🔴 ADMIN**: `/api/admin/**`, `/api/productos` (POST/PUT/DELETE), gestión completa

## 🎯 Rutas Frontend (React Router)

### Configuración de Rutas
```typescript
// App.tsx - Rutas completas implementadas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes = () => (
  <Routes>
    {/* 🌐 Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/login" element={<Login />} />
    
    {/* 👤 Rutas de usuario autenticado */}
    <Route path="/carrito" element={<Carrito />} />
    <Route path="/dashboard" element={<UserDashboard />} />
    
    {/* 🛡️ Panel de Administración - Solo ADMIN */}
    <Route path="/admin" element={<AdminPanel />} />
    <Route path="/admin/productos" element={<ProductManagement />} />
    <Route path="/admin/usuarios" element={<UserManagement />} />
    <Route path="/admin/pedidos" element={<OrderManagement />} />
    <Route path="/admin/reportes" element={<ReportsAndStats />} />
    <Route path="/admin/configuracion" element={<SystemSettings />} />
    
    {/* Fallback - Redirección al home */}
    <Route path="*" element={<Home />} />
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

---

## 📋 Changelog - Historial de Cambios

### 🎉 v3.0.0 - Sistema Completo de Usuarios y Autenticación (8 de noviembre de 2025)

#### ✨ Nuevas Características

1. **👥 Sistema de Gestión de Usuarios**
   - ✅ Registro público de usuarios en `/register`
   - ✅ Panel de administración CRUD completo en `/admin/usuarios`
   - ✅ Validación de roles (USER/ADMIN)
   - ✅ Encriptación de contraseñas con BCrypt
   - ✅ Estadísticas de usuarios en panel admin

2. **🔐 Mejoras de Seguridad**
   - ✅ Componente `AdminRoute` para protección de rutas admin
   - ✅ Validación de roles en frontend y backend
   - ✅ Asignación automática de rol USER en registros públicos
   - ✅ Solo admins autenticados pueden crear otros admins
   - ✅ Endpoint público `POST /api/usuarios` para registro

3. **🛒 Integración con Carrito y Pedidos**
   - ✅ Autocompletado de datos en checkout (nombre, email, teléfono)
   - ✅ Pedidos vinculados a `idUsuario` para trazabilidad
   - ✅ Datos del usuario persistidos en localStorage
   - ✅ Experiencia de usuario mejorada en facturación

4. **📱 Nuevos Componentes Frontend**
   - ✅ `Register.tsx` - Página de registro público
   - ✅ `UserManagement.tsx` - Panel admin gestión usuarios
   - ✅ `AdminRoute.tsx` - Protector de rutas administrativas
   - ✅ Actualizado `Login.tsx` con enlace a registro
   - ✅ Actualizado `FacturacionFormModal.tsx` con auto-fill

5. **🔧 Backend - Nuevas Funcionalidades**
   - ✅ `UsuarioController` con validación de roles
   - ✅ `UsuarioService` con encriptación automática
   - ✅ `SecurityConfig` actualizado para registro público
   - ✅ Modelo `Usuario` completo con fechas de auditoría
   - ✅ Modelo `Pedido` con campo `idUsuario`

#### 🐛 Correcciones

- ✅ Corregido: Usuarios públicos podían acceder al panel admin
- ✅ Corregido: Contraseñas no se encriptaban al crear usuario
- ✅ Corregido: Endpoint de registro requería autenticación
- ✅ Corregido: Warnings de imports no usados en UserManagement
- ✅ Corregido: Usuarios registrados no podían elegir rol (siempre USER)

#### 📚 Documentación

- ✅ Nueva sección completa sobre Sistema de Gestión de Usuarios
- ✅ Documentado flujo de registro y autenticación
- ✅ Tabla de permisos por rol
- ✅ Diagramas de flujo de usuario
- ✅ Ejemplos de código y casos de uso
- ✅ Actualizada tabla de API endpoints

---

### 🚀 v2.0.0 - Sistema de Carrito y Pedidos (26 de septiembre de 2025)

- ✅ Implementación completa del carrito de compras
- ✅ Sistema de checkout con formulario de facturación
- ✅ Gestión de pedidos con estados (PENDIENTE, ENVIADO, ENTREGADO)
- ✅ Panel de administración con gestión de pedidos
- ✅ Integración con backend para persistencia de pedidos

---

### 🎨 v1.5.0 - Sistema de Autenticación JWT (Septiembre 2025)

- ✅ Implementación de login con JWT tokens
- ✅ Refresh tokens automático
- ✅ Protección de rutas con `ProtectedRoute`
- ✅ Persistencia de sesión en localStorage
- ✅ Backend con Spring Security y JWT

---

### 🛍️ v1.0.0 - Sistema Base E-commerce (Agosto 2025)

- ✅ Catálogo de productos con categorías
- ✅ Sistema de búsqueda y filtros
- ✅ Diseño responsive con Tailwind CSS
- ✅ API REST completa (productos, categorías)
- ✅ Base de datos PostgreSQL en Neon
- ✅ Backend Spring Boot + Frontend React

---

### Última Actualización

**Fecha**: 8 de noviembre de 2025  
**Versión**: v3.0.0 - Sistema Completo de Usuarios y Autenticación  
**Autor**: Equipo NebulaTech E-commerce  

---

**Desarrollado con ❤️ para la comunidad NebulaTech gaming**

🎮 *"Building the future of gaming e-commerce, one commit at a time"* 🎮
