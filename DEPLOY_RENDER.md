# 🚀 Guía de Despliegue en Render - E-Commerce Backend

## 📋 Prerrequisitos

- Cuenta en [Render](https://render.com) (gratis)
- Cuenta en GitHub/GitLab (para conectar el repositorio)
- Base de datos PostgreSQL (Render la proporciona gratis)

---

## 🎯 Pasos para Desplegar

### 1. Preparar el Repositorio

#### Subir el código a GitHub (si no lo has hecho):

```bash
# Inicializar repositorio Git
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Backend dockerizado listo para Render"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/TU_USUARIO/ecommerce-backend.git
git branch -M main
git push -u origin main
```

### 2. Crear Base de Datos PostgreSQL en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"PostgreSQL"**
3. Configura:
   ```
   Name: ecommerce-database
   Database: ecommerce_db
   User: ecommerce_user
   Region: Oregon (US West) o la más cercana
   Plan: Free
   ```
4. Click en **"Create Database"**
5. **⚠️ IMPORTANTE**: Guarda la **Internal Database URL** que aparece

### 3. Crear Web Service

1. En Render Dashboard, click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub/GitLab
3. Selecciona el repositorio **ecommerce-backend**

### 4. Configurar el Web Service

#### Configuración Básica:
```
Name: ecommerce-backend
Region: Oregon (US West) (misma que la base de datos)
Branch: main
Runtime: Docker
```

#### Build & Deploy:
```
Dockerfile Path: ./Dockerfile
Docker Command: (dejar vacío, usa el CMD del Dockerfile)
```

### 5. Variables de Entorno

En la sección **"Environment Variables"**, agrega:

```bash
# Base de Datos (copia la Internal Database URL de tu PostgreSQL)
DATABASE_URL=postgresql://ecommerce_user:PASSWORD@hostname/ecommerce_db

# JWT Secret (genera uno nuevo de 256 bits)
JWT_SECRET=tu_clave_secreta_super_larga_y_segura_de_al_menos_256_bits

# JWT Expiration (24 horas en segundos)
JWT_EXPIRATION=86400

# Spring Profile
SPRING_PROFILES_ACTIVE=production

# Java Options
JAVA_OPTS=-Xms512m -Xmx1024m

# Upload Path
UPLOAD_PATH=/app/uploads/productos

# CORS (ajusta según tu frontend)
CORS_ALLOWED_ORIGINS=https://tu-frontend.com,http://localhost:5173
```

#### Generar JWT Secret Seguro:
```bash
# En WSL2/Linux
openssl rand -base64 64

# O en PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 6. Configuración Avanzada

#### Plan:
```
Free (512 MB RAM, spin down después de 15 min de inactividad)
O
Starter ($7/mes, 512 MB RAM, siempre activo)
```

#### Health Check Path:
```
/actuator/health
```

#### Auto-Deploy:
```
✅ Activado (despliega automáticamente al hacer push)
```

### 7. Deploy

1. Click en **"Create Web Service"**
2. Render comenzará a:
   - Clonar el repositorio
   - Construir la imagen Docker (~5-10 min)
   - Desplegar la aplicación
3. Espera a que el estado sea **"Live"** (verde)

---

## 🌐 URLs del Servicio

Una vez desplegado, tendrás:

```
API: https://ecommerce-backend.onrender.com
Health Check: https://ecommerce-backend.onrender.com/actuator/health
Swagger (si está habilitado): https://ecommerce-backend.onrender.com/swagger-ui.html
```

---

## 🧪 Probar el Despliegue

### 1. Health Check
```bash
curl https://ecommerce-backend.onrender.com/actuator/health
```

Respuesta esperada:
```json
{
  "status": "UP"
}
```

### 2. Login
```bash
curl -X POST https://ecommerce-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombreUsuario":"admin","contrasena":"admin123"}'
```

### 3. Listar Productos
```bash
curl https://ecommerce-backend.onrender.com/api/productos
```

---

## 📊 Monitoreo

### Logs en Tiempo Real

En Render Dashboard:
1. Ve a tu servicio **ecommerce-backend**
2. Click en la pestaña **"Logs"**
3. Verás los logs en tiempo real

### Métricas

```bash
# Ver métricas de la aplicación
curl https://ecommerce-backend.onrender.com/actuator/metrics

# Métricas específicas
curl https://ecommerce-backend.onrender.com/actuator/metrics/jvm.memory.used
```

---

## 🔄 Actualizar el Despliegue

### Método 1: Push Automático (Recomendado)
```bash
# Hacer cambios en tu código
git add .
git commit -m "Actualización del backend"
git push

# Render detectará el push y desplegará automáticamente
```

### Método 2: Deploy Manual
1. Ve a Render Dashboard
2. Tu servicio → **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🗄️ Gestión de Base de Datos

### Conectarse a PostgreSQL de Render

#### Desde tu computadora:
```bash
# Usa la External Database URL de Render
psql postgresql://ecommerce_user:PASSWORD@hostname:5432/ecommerce_db
```

#### Desde pgAdmin:
```
Host: hostname-from-render
Port: 5432
Database: ecommerce_db
Username: ecommerce_user
Password: (from Render)
SSL: Require
```

### Backup de Base de Datos

```bash
# Hacer backup
pg_dump -h hostname -U ecommerce_user -d ecommerce_db > backup.sql

# Restaurar backup
psql -h hostname -U ecommerce_user -d ecommerce_db < backup.sql
```

---

## 🔒 Seguridad en Producción

### ✅ Checklist de Seguridad

- [ ] **JWT Secret único y seguro** (256+ bits)
- [ ] **DATABASE_URL segura** (no compartir)
- [ ] **HTTPS habilitado** (Render lo hace automáticamente)
- [ ] **CORS configurado** correctamente para tu frontend
- [ ] **Variables de entorno** no en el código
- [ ] **Logs de producción** en nivel INFO o WARN
- [ ] **Health checks** configurados
- [ ] **Backups regulares** de la base de datos

### Variables de Entorno Secretas

⚠️ **NUNCA** incluyas en el código:
- Contraseñas de base de datos
- JWT secrets
- API keys
- Credenciales de terceros

Siempre usa variables de entorno en Render.

---

## 🐛 Troubleshooting

### Build Falla

**Problema**: Error durante el build de Maven

**Solución**:
1. Verifica que `mvnw` tiene permisos de ejecución:
   ```bash
   git update-index --chmod=+x mvnw
   git commit -m "Fix mvnw permissions"
   git push
   ```

2. Revisa los logs de build en Render

### Aplicación no Inicia

**Problema**: El servicio está en "Deploy failed"

**Solución**:
1. Revisa los logs en Render Dashboard
2. Verifica que `DATABASE_URL` esté configurada correctamente
3. Asegúrate de que todas las variables de entorno estén presentes

### Error de Conexión a Base de Datos

**Problema**: `Connection refused` o `Authentication failed`

**Solución**:
1. Verifica que `DATABASE_URL` sea la **Internal Database URL**
2. Asegúrate de que la base de datos esté en estado "Available"
3. Verifica que ambos servicios estén en la misma región

### Aplicación Muy Lenta

**Problema**: La app tarda mucho en responder (Plan Free)

**Explicación**: En el plan Free, Render "hiberna" la aplicación después de 15 minutos de inactividad. La primera petición la despierta (puede tardar 30-60 segundos).

**Soluciones**:
1. **Upgrade al plan Starter** ($7/mes) para mantenerla siempre activa
2. **Ping automático**: Configurar un servicio como [UptimeRobot](https://uptimerobot.com/) para hacer ping cada 14 minutos
3. **Aceptar la latencia** en desarrollo/demo

### Uploads de Imágenes no Persisten

**Problema**: Las imágenes subidas desaparecen después de un redeploy

**Explicación**: Render no tiene sistema de archivos persistente en el plan Free.

**Soluciones**:
1. **Usar almacenamiento externo**:
   - AWS S3
   - Cloudinary (recomendado, plan gratis generoso)
   - Google Cloud Storage
   
2. **Implementar integración con Cloudinary**:
   ```java
   // Agregar dependencia en pom.xml
   <dependency>
       <groupId>com.cloudinary</groupId>
       <artifactId>cloudinary-http44</artifactId>
       <version>1.34.0</version>
   </dependency>
   ```

---

## 📈 Optimizaciones

### 1. Reducir Tiempo de Build

```dockerfile
# En Dockerfile, usar cache de Maven
RUN mvn dependency:go-offline -B
```

### 2. Mejorar Rendimiento

```properties
# En application-production.properties
spring.jpa.hibernate.ddl-auto=validate  # En vez de update
spring.jpa.show-sql=false
```

### 3. Configurar Cache

```yaml
# Agregar Redis (opcional)
# Render ofrece Redis en planes pagos
```

---

## 💰 Costos

### Plan Free (Recomendado para desarrollo/demo)
```
✅ PostgreSQL: Gratis (1 GB, hasta 1 millón de filas)
✅ Web Service: Gratis (512 MB RAM)
⚠️ Limitaciones:
   - Hiberna después de 15 min inactividad
   - 750 horas/mes de servicio
   - Comparte recursos
```

### Plan Starter (Recomendado para producción)
```
💰 PostgreSQL: $7/mes (10 GB)
💰 Web Service: $7/mes (512 MB RAM, siempre activo)
✅ Total: $14/mes
✅ Beneficios:
   - Siempre activo (sin hibernación)
   - Mejor rendimiento
   - Soporte prioritario
```

---

## 🔗 Conectar Frontend

Una vez desplegado el backend, actualiza tu frontend:

```typescript
// En tu archivo de configuración del frontend
const API_URL = import.meta.env.VITE_API_URL || 'https://ecommerce-backend.onrender.com';

// axios/fetch configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## 📚 Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Render Community](https://community.render.com/)
- [PostgreSQL en Render](https://render.com/docs/databases)
- [Docker en Render](https://render.com/docs/docker)

---

## 🆘 Soporte

### Problemas Comunes

1. **Build muy lento**: Normal en el plan Free, puede tardar 5-10 minutos
2. **Primera petición lenta**: La app se está "despertando" (plan Free)
3. **Imágenes no persisten**: Usar almacenamiento externo (S3, Cloudinary)

### Contacto

- Render Support: support@render.com
- Render Community: https://community.render.com/
- Documentación: https://render.com/docs

---

## ✅ Checklist de Despliegue

- [ ] Código subido a GitHub/GitLab
- [ ] PostgreSQL creada en Render
- [ ] Web Service creado
- [ ] Todas las variables de entorno configuradas
- [ ] JWT Secret generado y configurado
- [ ] DATABASE_URL configurada (Internal)
- [ ] Health check funcionando
- [ ] Login funcionando
- [ ] API endpoints respondiendo
- [ ] CORS configurado para frontend
- [ ] Backup de base de datos configurado
- [ ] Frontend actualizado con nueva URL

---

**🎉 ¡Felicitaciones! Tu backend está desplegado en producción con Render.**

**Desarrollado por NebulaTech Team** ❤️

