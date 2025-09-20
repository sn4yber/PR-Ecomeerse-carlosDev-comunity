# 🛒 E-Commerce - TiendaVirtual

## 📋 Descripción

Proyecto colaborativo de tienda virtual desarrollado con **Spring Boot** para el backend y **React + TypeScript** para el frontend. Una aplicación moderna y escalable para gestión de productos, usuarios y pedidos.

## 🏗️ Arquitectura del Proyecto

```
E-comeerse/
├── 🌐 Backend (Spring Boot)
│   ├── src/main/java/com/example/E_comeerse/
│   │   ├── controller/     # Controladores REST
│   │   ├── model/         # Entidades JPA
│   │   ├── repository/    # Repositorios de datos
│   │   └── service/       # Lógica de negocio
│   └── src/main/resources/
│       ├── application.properties
│       └── static/front-tiendavirtal/  # Frontend integrado
└── ⚛️ Frontend (React + TypeScript)
    ├── src/
    │   ├── components/    # Componentes reutilizables
    │   │   ├── layout/   # Componentes de diseño
    │   │   └── ui/       # Componentes de interfaz
    │   ├── types/        # Definiciones TypeScript
    │   └── App.tsx       # Componente principal
    ├── package.json
    └── tailwind.config.js
```

## 🛠️ Tecnologías

### Backend
- **Java 24**
- **Spring Boot 3.5.5**
- **Spring Data JPA**
- **Maven** para gestión de dependencias
- **Base de datos** (configurar según necesidad)

### Frontend
- **React 19.1.1**
- **TypeScript**
- **Vite** para bundling
- **Tailwind CSS 4.1.13** para estilos
- **ESLint** para calidad de código

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Java 24** o superior
- **Node.js 18** o superior
- **Maven 3.6** o superior
- **Git**

### 1. Clonar el Repositorio
```bash
git clone https://github.com/sn4yber/PR-Ecomeerse-carlosDev-comunity.git
cd E-comeerse
```

### 2. Configuración del Backend

#### Variables de Entorno
Crear archivo `src/main/resources/application.properties` con:

```properties
# Configuración del servidor
server.port=8080

# Configuración de base de datos
spring.datasource.url=jdbc:your-database-url
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.datasource.driver-class-name=your-driver

# Configuración JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Configuración de logging
logging.level.com.example.E_comeerse=DEBUG
```

> ⚠️ **Importante**: Nunca commitear credenciales reales. Usar variables de entorno en producción.

#### Ejecutar Backend
```bash
# Compilar y ejecutar
./mvnw spring-boot:run

# O usando Maven instalado
mvn spring-boot:run
```

### 3. Configuración del Frontend

#### Instalar Dependencias
```bash
cd src/main/resources/static/front-tiendavirtal
npm install
```

#### Ejecutar Frontend en Desarrollo
```bash
npm run dev
```

#### Construir para Producción
```bash
npm run build
```

## 📊 API Endpoints (Backend)

### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios/{id}` - Obtener usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

### Productos
- `GET /api/productos` - Listar productos
- `POST /api/productos` - Crear producto
- `GET /api/productos/{id}` - Obtener producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

### Categorías
- `GET /api/categorias` - Listar categorías
- `POST /api/categorias` - Crear categoría
- `GET /api/categorias/{id}` - Obtener categoría
- `PUT /api/categorias/{id}` - Actualizar categoría
- `DELETE /api/categorias/{id}` - Eliminar categoría

### Pedidos
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos/{id}` - Obtener pedido
- `PUT /api/pedidos/{id}` - Actualizar pedido
- `DELETE /api/pedidos/{id}` - Eliminar pedido

## 🧩 Componentes Frontend

### Header
Componente principal de navegación con:
- **Menú hamburguesa** lateral estilo Wikipedia
- **Título centrado** con efectos hover
- **Diseño responsive**
- **Navegación por teclado** (accesibilidad)

```tsx
<Header 
  title="TiendaVirtual" 
  menuItems={[
    { id: 'home', label: 'Inicio', href: '/' },
    { id: 'products', label: 'Productos', href: '/productos' }
  ]} 
/>
```

## 🎨 Guía de Estilos

### Paleta de Colores
- **Principal**: Gradiente morado (`#9333ea`) a negro (`#000000`)
- **Secundario**: Grises (`#f9fafb`, `#6b7280`, `#374151`)
- **Acentos**: Morado claro (`#f3e8ff`) para hover states

### Tipografía
- **Títulos**: Font weight `semibold` y `bold`
- **Texto**: Sistema de fonts por defecto de Tailwind
- **Tamaños responsivos**: `text-xl sm:text-2xl md:text-3xl`

## 📁 Estructura de Archivos Frontend

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Componente header principal
│   │   └── index.ts        # Exportaciones layout
│   ├── ui/
│   │   └── index.ts        # Componentes UI reutilizables
│   └── index.ts            # Exportaciones principales
├── types/
│   └── index.ts            # Definiciones TypeScript
└── App.tsx                 # Aplicación principal
```

## 🔧 Scripts Disponibles

### Backend
```bash
./mvnw clean compile      # Limpiar y compilar
./mvnw test              # Ejecutar tests
./mvnw spring-boot:run   # Ejecutar aplicación
```

### Frontend
```bash
npm run dev              # Servidor de desarrollo
npm run build           # Construir para producción
npm run lint            # Ejecutar ESLint
npm run preview         # Vista previa de producción
```

## 🤝 Contribución

### Flujo de Trabajo
1. **Fork** del repositorio
2. **Crear rama** para feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** cambios: `git commit -m "feat: añadir nueva funcionalidad"`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### Estándares de Código
- **Comentarios**: Documentar funciones y componentes complejos
- **TypeScript**: Tipado estricto en frontend
- **Clean Code**: Funciones pequeñas, nombres descriptivos
- **Responsive Design**: Mobile-first approach

## 🔒 Seguridad

### Variables de Entorno
```bash
# Ejemplo de .env (NO COMMITEAR)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USERNAME=user
DB_PASSWORD=password
JWT_SECRET=your-secret-key
```

### Buenas Prácticas
- ✅ Usar HTTPS en producción
- ✅ Validar inputs en frontend y backend
- ✅ Sanitizar datos de base de datos
- ✅ Implementar autenticación JWT
- ✅ Rate limiting en API

## 📝 TO-DO

### Backend
- [ ] Implementar autenticación JWT
- [ ] Añadir validaciones de entrada
- [ ] Tests unitarios y de integración
- [ ] Documentación con Swagger
- [ ] Sistema de roles y permisos

### Frontend
- [ ] Sistema de rutas con React Router
- [ ] Gestión de estado global
- [ ] Componentes de producto
- [ ] Carrito de compras
- [ ] Sistema de autenticación
- [ ] Tests con Jest/Vitest

## 👥 Equipo

- **Desarrollo**: Equipo colaborativo
- **Frontend**: React + TypeScript
- **Backend**: Spring Boot
- **Diseño**: Tailwind CSS

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

> 💡 **Nota**: Este es un proyecto en desarrollo activo. La documentación se actualiza constantemente.

📧 **Contacto**: Para preguntas o sugerencias, abrir un issue en GitHub.
