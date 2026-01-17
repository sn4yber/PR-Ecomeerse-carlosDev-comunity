# 🚀 Inicio Rápido con Docker

## Comandos Básicos

### Windows (PowerShell)
```powershell
# Iniciar todo (backend + PostgreSQL)
.\docker-start.ps1

# Detener servicios
.\docker-stop.ps1

# Ver logs
.\docker-logs.ps1

# Solo PostgreSQL (para desarrollo local)
.\docker-dev.ps1
```

### Linux/Mac
```bash
# Iniciar todo
docker-compose up -d --build

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f backend

# Solo PostgreSQL
docker-compose -f docker-compose.dev.yml up -d
```

## URLs

- **Backend**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health
- **PostgreSQL**: localhost:5432

## Credenciales de Base de Datos

- **Database**: ecommerce_db
- **Usuario**: ecommerce_user
- **Contraseña**: ecommerce_password

## Más Información

Ver documentación completa en [DOCKER.md](./DOCKER.md)

