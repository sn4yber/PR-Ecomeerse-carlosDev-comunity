🛒 E-Commerce NebulaTech - Sistema Universal
<div align="center">
Mostrar imagen
Mostrar imagen
Mostrar imagen
Mostrar imagen
Mostrar imagen
Plataforma de comercio electrónico moderna y escalable
🚀 Demo • 📚 Documentación • 🤝 Contribuir
</div>

✨ Características Principales
<table>
<tr>
<td width="50%">
🎯 Para Clientes

✅ Catálogo dinámico con filtros
✅ Carrito persistente
✅ Checkout en 3 pasos
✅ Registro y autocompletado
✅ Historial de pedidos

</td>
<td width="50%">
👨‍💼 Para Administradores

✅ Panel de control completo
✅ Gestión de productos/usuarios
✅ Control de pedidos
✅ Estadísticas en tiempo real
✅ Sistema de roles

</td>
</tr>
</table>

🎉 Novedades v3.0.0

Sistema Completo de Gestión de Usuarios y Autenticación


👥 Registro público sin autenticación previa en /register
🔐 Login inteligente con detección automática de rol (ADMIN/USER)
🛡️ Protección de rutas administrativas con AdminRoute
🛒 Autocompletado de datos personales en checkout
📊 Panel admin de usuarios con CRUD completo
📦 Trazabilidad completa de pedidos vinculados a usuarios

Ver Changelog completo | Documentación de Usuarios

🚀 Inicio Rápido
Prerrequisitos
bash✓ Java 17+
✓ Node.js 18+
✓ MySQL 8.0+
✓ Maven 3.8+
Instalación en 5 pasos
bash# 1. Clonar repositorio
git clone https://github.com/sn4yber/PR-Ecomeerse-carlosDev-comunity.git
cd PR-Ecomeerse-carlosDev-comunity

# 2. Configurar base de datos
mysql -u root -p < database/carrito_schema.sql

# 3. Configurar application.properties
# Editar: src/main/resources/application.properties

# 4. Iniciar Backend
./mvnw spring-boot:run

# 5. Iniciar Frontend (nueva terminal)
cd src/main/resources/static/front-tiendavirtal
npm install && npm run dev
```

**URLs de acceso:**
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`

---

## 🏗️ Arquitectura del Sistema
```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (React + TS)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Cliente    │  │   Admin      │  │   Carrito    │          │
│  │   Portal     │  │   Panel      │  │   Compras    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              ↕ REST API
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Spring Boot)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Controllers  │  │  Services    │  │ Repositories │          │
│  │  (REST API)  │  │  (Lógica)    │  │    (JPA)     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         ┌──────────────────┐    ┌──────────────────┐           │
│         │   JWT Security   │    │   BCrypt Pass    │           │
│         └──────────────────┘    └──────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│              Base de Datos (PostgreSQL / Neon)                   │
│   Usuarios  │  Productos  │  Categorías  │  Pedidos             │
└─────────────────────────────────────────────────────────────────┘

🛠️ Stack Tecnológico
<table>
<tr>
<td width="50%" valign="top">
Backend

☕ Java 24
🍃 Spring Boot 3.5.5
🔐 Spring Security + JWT
🗄️ Spring Data JPA
🐘 PostgreSQL (Neon)
📦 Maven

</td>
<td width="50%" valign="top">
Frontend

⚛️ React 19.1.1
📘 TypeScript 5.8.3
⚡ Vite 7.1.6
🎨 Tailwind CSS 4.1.13
🔄 TanStack Query 5.90.2
🧭 React Router 7.9.2

</td>
</tr>
</table>

🔐 Sistema de Usuarios
Roles y Permisos
FuncionalidadUSERADMINVer productos✅✅Comprar✅✅Ver mis pedidos✅✅Panel admin❌✅Gestionar productos❌✅Gestionar usuarios❌✅Ver todos los pedidos❌✅
Flujo de Registro y Login
mermaidgraph LR
    A[Visitante] -->|/register| B[Registro]
    B --> C[Rol USER automático]
    C --> D[/login]
    D -->|USER| E[Dashboard Cliente]
    D -->|ADMIN| F[Panel Admin]
    E --> G[Compras]
    F --> H[Gestión Completa]

📊 API REST Endpoints
<details>
<summary><b>🔐 Autenticación</b> - Click para expandir</summary>
MétodoEndpointDescripciónPúblicoPOST/api/auth/loginIniciar sesión✅POST/api/auth/refreshRenovar token✅POST/api/auth/logoutCerrar sesión❌
</details>
<details>
<summary><b>👤 Usuarios</b> - Click para expandir</summary>
MétodoEndpointDescripciónPúblicoPOST/api/usuariosRegistrar usuario✅GET/api/usuariosListar usuarios❌PUT/api/usuarios/{id}Actualizar usuario❌DELETE/api/usuarios/{id}Eliminar usuario❌ (Admin)
</details>
<details>
<summary><b>🛍️ Productos</b> - Click para expandir</summary>
MétodoEndpointDescripciónAdminGET/api/productosListar productos❌POST/api/productosCrear producto✅PUT/api/productos/{id}Actualizar producto✅DELETE/api/productos/{id}Eliminar producto✅
</details>
<details>
<summary><b>📦 Pedidos</b> - Click para expandir</summary>
MétodoEndpointDescripciónRolGET/api/pedidosListar todosAdminPOST/api/pedidosCrear pedidoUserGET/api/pedidos/usuario/{id}Mis pedidosUserPUT/api/pedidos/{id}/estadoCambiar estadoAdmin
</details>

🎨 Capturas de Pantalla
<table>
<tr>
<td width="50%">
<img src="https://via.placeholder.com/500x300/9333ea/ffffff?text=Home+Page" alt="Home">
<p align="center"><b>Página Principal</b></p>
</td>
<td width="50%">
<img src="https://via.placeholder.com/500x300/000000/ffffff?text=Admin+Panel" alt="Admin">
<p align="center"><b>Panel de Administración</b></p>
</td>
</tr>
<tr>
<td width="50%">
<img src="https://via.placeholder.com/500x300/9333ea/ffffff?text=Products" alt="Products">
<p align="center"><b>Catálogo de Productos</b></p>
</td>
<td width="50%">
<img src="https://via.placeholder.com/500x300/000000/ffffff?text=Cart" alt="Cart">
<p align="center"><b>Carrito de Compras</b></p>
</td>
</tr>
</table>

📚 Documentación Completa
DocumentoDescripción📖 README_PROYECTO.mdDocumentación técnica detallada👤 GUIA_USUARIO.mdManual de usuario💾 carrito_schema.sqlSchema de base de datos

🚧 Roadmap
✅ Fase 1: Core (Completado)

Sistema base e-commerce
Autenticación JWT
Gestión de usuarios
Panel de administración

🔄 Fase 2: Features Avanzados (En Progreso)

 Sistema de pagos (Stripe)
 Notificaciones email
 Sistema de reviews
 Wishlist

📋 Fase 3: Optimización (Planificado)

 PWA
 SEO
 Analytics
 Performance optimization


🐛 Problemas Comunes
<details>
<summary><b>Puerto 8080 ocupado</b></summary>
````bash
# Linux/Mac
sudo lsof -ti:8080 | xargs kill -9
Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
</details>

<details>
<summary><b>Error de conexión a BD</b></summary>

Verificar credenciales en `application.properties`:
````properties
spring.datasource.url=jdbc:postgresql://...
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
</details>
<details>
<summary><b>CORS errors en frontend</b></summary>
Verificar @CrossOrigin en controllers backend y CORS config en WebConfig.java
</details>

🤝 Contribuir
Las contribuciones son bienvenidas! Sigue estos pasos:

Fork el proyecto
Crea una rama: git checkout -b feature/amazing-feature
Commit: git commit -m 'feat: add amazing feature'
Push: git push origin feature/amazing-feature
Abre un Pull Request

Convenciones de Commit
bashfeat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato de código
refactor: refactorización
test: añadir tests
chore: cambios en build

📋 Changelog
v3.0.0 (8 Nov 2025)

✨ Sistema completo de gestión de usuarios
🔐 Mejoras de seguridad (AdminRoute, BCrypt)
🛒 Autocompletado en checkout
📦 Trazabilidad de pedidos

v2.0.0 (26 Sep 2025)

🛒 Sistema de carrito completo
📦 Gestión de pedidos

v1.0.0 (Ago 2025)

🎉 Lanzamiento inicial

Ver historial completo

📞 Contacto
<div align="center">
GitHub: sn4yber
Email: contacto@nebulatech.com
Discord: NebulaTech Community
</div>

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver LICENSE para más detalles.

<div align="center">
Desarrollado con ❤️ por el equipo NebulaTech
⭐ Si te gustó el proyecto, dale una estrella!
🎮 "Building the future of gaming e-commerce" 🎮
</div>
