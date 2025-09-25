# NebulaTech E-Commerce 🚀

**Frontend para e-commerce de productos gaming** desarrollado con React + TypeScript + Vite

![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-blue)
![React Query](https://img.shields.io/badge/TanStack%20Query-5.x-red)

## 📋 Índice

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Componentes](#componentes)
- [Navegación](#navegación)
- [Sistema de Autenticación](#sistema-de-autenticación)
- [Estado y Datos](#estado-y-datos)
- [Próximas Implementaciones](#próximas-implementaciones)

## 🎯 Descripción

**NebulaTech** es una plataforma e-commerce especializada en productos gaming. El frontend está diseñado con arquitectura modular, usando principios SOLID y patrones de desarrollo modernos.

### Características principales:
- 🎨 **Diseño responsivo** con gradientes morados/grises
- 🔍 **Navegación intuitiva** con sidebar estilo Wikipedia
- 👤 **Sistema de usuarios** preparado para admin y clientes
- 📱 **Componentes reutilizables** bien documentados
- 🚀 **Optimizado** para desarrollo en equipo

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.1 | Framework UI |
| **TypeScript** | 5.8.3 | Tipado estático |
| **Vite** | 7.1.6 | Build tool |
| **TailwindCSS** | 4.1.13 | Styling |
| **React Router** | 6.x | Navegación |
| **TanStack Query** | 5.90.2 | Estado/API calls |
| **GSAP** | 3.13.0 | Animaciones |

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Navegación principal + sidebar
│   │   └── Footer.tsx        # Footer global
│   ├── pages/
│   │   ├── Home.tsx          # Página principal ✅
│   │   ├── Productos.tsx     # Catálogo (en construcción)
│   │   ├── Carrito.tsx       # Carrito compras (en construcción)
│   │   └── Login.tsx         # Autenticación (en construcción)
│   ├── SplitText.tsx         # Animaciones de texto
│   └── index.ts              # Barrel exports
├── types/
│   └── index.ts              # Tipos TypeScript
├── utils/                    # Utilidades
├── assets/                   # Recursos estáticos
├── App.tsx                   # Componente principal
└── main.tsx                  # Entry point + React Query
```

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/sn4yber/PR-Ecomeerse-carlosDev-comunity.git

# Navegar al directorio del frontend
cd E-comeerse/src/main/resources/static/front-tiendavirtal

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 💻 Desarrollo

### Scripts disponibles:
```bash
npm run dev      # Servidor desarrollo (http://localhost:5173)
npm run build    # Build producción
npm run preview  # Preview build
npm run lint     # ESLint
```

### Comandos de desarrollo:
- **Hot reload** automático
- **TypeScript checking** en tiempo real
- **ESLint** configurado para React + TypeScript

## 🧩 Componentes

### ✅ Implementados

#### `Home.tsx`
- **Hero section** con gradientes
- **Sección "Sobre nosotros"**
- **Productos destacados** (con React Query)
- **CTA** hacia página de productos

#### `Header.tsx`
- **Menú hamburguesa** lateral
- **Sección de perfil** de usuario
- **Navegación** con React Router
- **Sistema de login** preparado

#### `Footer.tsx`
- Footer global del sitio

### 🚧 En Construcción

#### `Productos.tsx`
- Catálogo completo de productos
- Sistema de filtros y búsqueda
- Integración con API backend

#### `Carrito.tsx`
- Gestión del carrito de compras
- Cálculo de totales
- Proceso de checkout

#### `Login.tsx`
- Sistema de autenticación
- **Persistencia comentada** para implementación futura
- Tips para desarrollo con React Query

## 🗺️ Navegación

### Rutas disponibles:
```typescript
/ → Home (página principal)
/productos → Productos (en construcción)
/carrito → Carrito (en construcción)
/login → Login (en construcción - solo vía perfil)
```

### Menú del sidebar:
- ✅ **Inicio** → `/`
- ✅ **Productos** → `/productos`
- ✅ **Carrito** → `/carrito`

### Navegación especial:
- **Login** → Accesible solo desde sección de perfil en sidebar
- **Botón "Ver Productos"** → Redirige desde Home a `/productos`

## 🔐 Sistema de Autenticación

### Estado actual:
- 👤 **Sección de perfil** en sidebar implementada
- 🔄 **Estados de usuario**: Invitado/Usuario/Admin
- 🚧 **Login persistente**: Preparado pero comentado

### Para implementar persistencia:
```typescript
// En App.tsx - descommentar:
const { data: authData, isLoading } = useQuery(['authStatus'], ...);
if (!authData?.authenticated) return <Login />;

// En Login.tsx - descommentar:
const loginMutation = useMutation({ ... });
```

### Características futuras:
- 🔑 **JWT tokens** en localStorage
- 👥 **Roles diferenciados** (cliente vs admin)
- 🔒 **Rutas protegidas**
- 🎛️ **Panel de administrador**

## 📊 Estado y Datos

### React Query setup:
```typescript
// main.tsx
const queryClient = new QueryClient();

// Hook ejemplo en Home.tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['productos'],
  queryFn: () => fetch('/api/productos').then(r => r.json())
});
```

### Patrones implementados:
- ✅ **useQuery** para fetch de datos
- 🚧 **useMutation** (preparado para login)
- ✅ **Cache automático** con staleTime
- ✅ **Error handling** integrado

## 🎨 Design System

### Gradientes de marca:
```css
/* Principal */
from-gray-900 to-purple-600

/* Hover */
from-purple-700 to-gray-800

/* Botones */
from-purple-600 to-gray-800
```

### Responsividad:
- **Mobile first** approach
- **Grid responsive** con Tailwind
- **Breakpoints**: sm, md, lg, xl

## 🔄 Próximas Implementaciones

### Backend Integration:
- [ ] **API endpoints** para productos
- [ ] **Sistema de autenticación** JWT
- [ ] **CRUD** de productos (panel admin)
- [ ] **Gestión de carrito** en servidor

### Frontend Features:
- [ ] **Buscador** de productos
- [ ] **Filtros** por categoría
- [ ] **Paginación** de resultados
- [ ] **Checkout** completo
- [ ] **Dashboard** de administrador

### UX/UI:
- [ ] **Loading states** completos
- [ ] **Animaciones** adicionales con GSAP
- [ ] **Notificaciones** toast
- [ ] **Formularios** con validación

### DevOps:
- [ ] **CI/CD** pipeline
- [ ] **Tests** unitarios y e2e
- [ ] **Docker** containerización
- [ ] **Deploy** a producción

## 👥 Equipo

### Frontend Team:
- **sn4yber** - Desarrollador Frontend Lead
- **Henry James Mendoza** - Desarrollador Frontend
- **Tú** - Desarrollador Frontend

### Backend Team:
- **Patricio Echeverría** - Desarrollador Backend

### Proyecto:
- **E-commerce carlosDev community**
- **Especialización**: Productos gaming y tecnología

## 📝 Notas para el Equipo

### Para desarrolladores Frontend (sn4yber, Henry James Mendoza):
1. **Revisar tipos** en `/types/index.ts`
2. **Seguir patrones** de React Query establecidos
3. **Documentar componentes** con JSDoc
4. **Mantener consistencia** en gradientes y estilos morados/grises
5. **Coordinar** con Backend (Patricio) para endpoints API

### Para Backend (Patricio Echeverría):
1. **API endpoints** siguiendo REST conventions
2. **JWT Authentication** para login persistente
3. **CORS** configurado para frontend en puerto 5173
4. **Base URL**: `/api/` para todos los endpoints
5. **Coordinar** con Frontend team para schemas de datos

### Convenciones del Proyecto:
- **Componentes** en PascalCase
- **Archivos** con extensión `.tsx` (Frontend)
- **Props** tipadas con interfaces TypeScript
- **Comentarios** en español para el equipo
- **Commits** descriptivos en español
- **Branches** por feature: `feature/nombre-feature`

### Flujo de Trabajo:
1. **Henry & sn4yber**: Implementar componentes UI/UX
2. **Patricio**: Desarrollar API REST con Spring Boot
3. **Integración**: Conectar Frontend con Backend via React Query
4. **Testing**: Validar flujo completo E2E

---

**Desarrollado con ❤️ para la comunidad NebulaTech gaming**
