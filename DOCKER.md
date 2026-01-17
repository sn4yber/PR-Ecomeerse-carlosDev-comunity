# 🐳 Guía de Dockerización - E-Commerce Backend

Esta guía explica cómo ejecutar el backend de NebulaTech E-Commerce usando Docker y Docker Compose.

## 📋 Requisitos Previos

- **Docker Desktop** instalado (Windows/Mac) o Docker Engine (Linux)
- **Docker Compose** v2.0 o superior
- Mínimo 2GB de RAM disponible para los contenedores
- Puerto **8080** (backend) y **5432** (PostgreSQL) disponibles

## 🏗️ Arquitectura Docker

```
┌─────────────────────────────────────────┐
│         Docker Compose Stack            │
│                                          │
│  ┌────────────────┐  ┌───────────────┐ │
│  │   Backend      │  │  PostgreSQL   │ │
│  │ Spring Boot    │──│   Database    │ │
│  │ Port: 8080     │  │  Port: 5432   │ │
│  └────────────────┘  └───────────────┘ │
│           │                  │          │
│     uploads_data      postgres_data    │
│      (Volume)           (Volume)        │
└─────────────────────────────────────────┘
```

## 🚀 Inicio Rápido

### 1. Construir y Levantar los Servicios

```bash
# Construir y levantar todos los servicios
docker-compose up -d --build

# Ver logs en tiempo real
docker-compose logs -f backend
```

### 2. Verificar que los Servicios Están Corriendo

```bash
# Ver estado de los contenedores
docker-compose ps

# Verificar salud del backend
curl http://localhost:8080/actuator/health

# Verificar PostgreSQL
docker-compose exec postgres pg_isready -U ecommerce_user -d ecommerce_db
```

### 3. Acceder a la Aplicación

- **API Backend**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health
- **PostgreSQL**: localhost:5432

## 📝 Comandos Útiles

### Gestión de Contenedores

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (CUIDADO: elimina datos)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart backend

# Ver logs
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Construcción y Actualización

```bash
# Reconstruir imagen después de cambios en código
docker-compose build backend

# Reconstruir y reiniciar
docker-compose up -d --build backend

# Limpiar imágenes antiguas
docker image prune -f
```

### Debugging y Mantenimiento

```bash
# Acceder al contenedor del backend
docker-compose exec backend sh

# Acceder a PostgreSQL CLI
docker-compose exec postgres psql -U ecommerce_user -d ecommerce_db

# Ver uso de recursos
docker stats

# Inspeccionar logs de un contenedor
docker-compose logs --tail=100 backend
```

## 🗄️ Base de Datos

### Conexión desde Aplicaciones Externas

Si quieres conectarte a la base de datos desde tu IDE o cliente SQL:

```
Host: localhost
Port: 5432
Database: ecommerce_db
Username: ecommerce_user
Password: ecommerce_password
```

### Backup y Restore

```bash
# Hacer backup de la base de datos
docker-compose exec -T postgres pg_dump -U ecommerce_user ecommerce_db > backup.sql

# Restaurar desde backup
docker-compose exec -T postgres psql -U ecommerce_user ecommerce_db < backup.sql
```

## 📦 Volúmenes Persistentes

El docker-compose crea dos volúmenes persistentes:

1. **postgres_data**: Almacena los datos de la base de datos
2. **uploads_data**: Almacena las imágenes de productos

```bash
# Listar volúmenes
docker volume ls

# Inspeccionar un volumen
docker volume inspect ecomerse_postgres_data

# Eliminar volúmenes no utilizados (CUIDADO)
docker volume prune
```

## 🔧 Configuración

### Variables de Entorno

Puedes modificar las variables de entorno en el archivo `docker-compose.yml`:

```yaml
environment:
  SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/ecommerce_db
  SPRING_DATASOURCE_USERNAME: ecommerce_user
  SPRING_DATASOURCE_PASSWORD: ecommerce_password
  JWT_SECRET: tu-clave-secreta-aqui
  JWT_EXPIRATION: 86400
  JAVA_OPTS: -Xms512m -Xmx1024m
```

### Archivo .env (Opcional)

Puedes crear un archivo `.env` en la raíz del proyecto:

```env
# Database
POSTGRES_DB=ecommerce_db
POSTGRES_USER=ecommerce_user
POSTGRES_PASSWORD=ecommerce_password

# JWT
JWT_SECRET=tu-clave-secreta-muy-larga-y-segura
JWT_EXPIRATION=86400

# Java
JAVA_OPTS=-Xms512m -Xmx1024m
```

## 🐛 Resolución de Problemas

### El backend no inicia

```bash
# Ver logs detallados
docker-compose logs backend

# Verificar que PostgreSQL está listo
docker-compose ps postgres

# Reiniciar servicios en orden
docker-compose restart postgres
sleep 10
docker-compose restart backend
```

### Error de conexión a la base de datos

```bash
# Verificar que ambos contenedores están en la misma red
docker network inspect ecomerse_ecommerce-network

# Verificar variables de entorno
docker-compose exec backend env | grep SPRING_DATASOURCE
```

### Puerto 8080 o 5432 ya en uso

Modifica los puertos en `docker-compose.yml`:

```yaml
ports:
  - "8081:8080"  # Cambia 8081 por el puerto que prefieras
```

### Problemas de permisos con volúmenes

```bash
# En el contenedor, verificar permisos
docker-compose exec backend ls -la /app/uploads

# Si es necesario, recrear volúmenes
docker-compose down -v
docker-compose up -d
```

## 🔒 Seguridad en Producción

Antes de desplegar en producción:

1. **Cambiar credenciales por defecto**:
   - Password de PostgreSQL
   - JWT Secret (usar clave de 256+ bits)

2. **Usar secrets en lugar de variables de entorno**:
   ```yaml
   secrets:
     db_password:
       file: ./secrets/db_password.txt
   ```

3. **Configurar límites de recursos**:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '1.0'
         memory: 1024M
   ```

4. **Actualizar la imagen base** regularmente para parches de seguridad

## 📊 Monitoreo

### Health Checks

El backend incluye health checks automáticos:

```bash
# Verificar health del backend
curl http://localhost:8080/actuator/health

# Respuesta esperada:
# {"status":"UP"}
```

### Métricas

```bash
# Ver métricas de la aplicación
curl http://localhost:8080/actuator/metrics

# Métricas específicas
curl http://localhost:8080/actuator/metrics/jvm.memory.used
```

## 🚢 Deploy a Producción

### Docker Hub

```bash
# Login a Docker Hub
docker login

# Tag de la imagen
docker tag ecomerse-backend:latest tu-usuario/ecommerce-backend:v1.0.0

# Push de la imagen
docker push tu-usuario/ecommerce-backend:v1.0.0
```

### Variables de Entorno para Producción

Crear archivo `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  backend:
    image: tu-usuario/ecommerce-backend:v1.0.0
    environment:
      SPRING_DATASOURCE_URL: ${DATABASE_URL}
      SPRING_DATASOURCE_USERNAME: ${DATABASE_USER}
      SPRING_DATASOURCE_PASSWORD: ${DATABASE_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      SPRING_PROFILES_ACTIVE: production
```

## 📚 Estructura de Archivos Docker

```
D:\Ecomerse/
├── Dockerfile                    # Imagen multi-stage del backend
├── docker-compose.yml            # Orquestación de servicios
├── .dockerignore                 # Archivos excluidos de la imagen
└── src/main/resources/
    ├── application.properties    # Configuración local
    └── application-docker.properties  # Configuración para Docker
```

## 🤝 Contribuir

Si encuentras problemas o tienes sugerencias para mejorar la configuración Docker:

1. Abre un issue en el repositorio
2. Envía un pull request con mejoras
3. Comparte tu experiencia con la comunidad

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**Desarrollado con ❤️ por NebulaTech Team**

Para más información, consulta el [README principal](./README.md).

