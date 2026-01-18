# 🚀 Guía de Despliegue en Render

## 📋 Configuración del Web Service

### 1️⃣ Información Básica
- **Name**: `ecommerce-backend` (o el nombre que prefieras)
- **Language**: `Docker`
- **Branch**: `main`
- **Region**: `Oregon (US West)` (o el que prefieras)
- **Instance Type**: 
  - **Free** (para pruebas) - con limitaciones
  - **Starter** ($7/mes) - recomendado para producción

### 2️⃣ Build & Deploy Settings

#### Build Command (dejar vacío, Docker se encarga)
```bash
# Render detecta automáticamente el Dockerfile
# No necesitas configurar nada aquí
```

#### Start Command (opcional, ya está en Dockerfile)
```bash
java -jar app.jar
```

### 3️⃣ Variables de Entorno Requeridas

#### 🔐 **DATABASE_URL** (IMPORTANTE)
```
jdbc:postgresql://dpg-xxxxx-a.oregon-postgres.render.com:5432/tu_base_datos
```
⚠️ **IMPORTANTE**: La URL debe empezar con `jdbc:postgresql://` (no solo `postgresql://`)

#### 🔑 **JWT_SECRET**
```
mySecretKey12345678901234567890123456789012345678901234567890123456789012345678901234567890
```
O genera uno más seguro con:
```bash
openssl rand -base64 64
```

#### ⏰ **JWT_EXPIRATION**
```
86400
```
(24 horas en segundos)

#### 📁 **UPLOAD_PATH** (opcional)
```
/app/uploads/productos
```

#### 🌐 **CORS_ALLOWED_ORIGINS** (opcional)
```
*
```
O especifica tu dominio frontend:
```
https://tu-frontend.com
```

#### 🔧 **JAVA_OPTS** (opcional, para optimizar memoria)
```
-Xms256m -Xmx512m
```
Para instancia Free usa:
```
-Xms128m -Xmx256m
```

#### 🐛 **SPRING_PROFILES_ACTIVE** (opcional)
```
production
```

---

## 🗄️ Configuración de Base de Datos PostgreSQL

### 1️⃣ Crear Base de Datos en Render

1. Ve a **Dashboard** → **New** → **PostgreSQL**
2. Configura:
   - **Name**: `ecommerce-db`
   - **Database**: `ecommerce_db`
   - **User**: (se genera automáticamente)
   - **Region**: El mismo que tu Web Service
   - **Plan**: Free o Paid

3. Después de crear, ve a **Connect** y copia la **Internal Database URL**

### 2️⃣ Convertir la URL para Spring Boot

Render te da algo como:
```
postgresql://user:password@host:5432/database
```

Debes convertirlo a:
```
jdbc:postgresql://user:password@host:5432/database
```

**Solo agrega `jdbc:` al inicio!**

### 3️⃣ Configurar en el Web Service

Ve a tu Web Service → **Environment** → Agrega:
- Key: `DATABASE_URL`
- Value: `jdbc:postgresql://user:password@host:5432/database`

---

## 📝 Resumen de Variables de Entorno

```properties
# Base de Datos (OBLIGATORIO)
DATABASE_URL=jdbc:postgresql://dpg-xxxxx-a.oregon-postgres.render.com:5432/tu_base_datos

# JWT (OBLIGATORIO)
JWT_SECRET=tu_secreto_super_largo_y_seguro_minimo_64_caracteres_aqui
JWT_EXPIRATION=86400

# Opcional pero recomendado
JAVA_OPTS=-Xms256m -Xmx512m
SPRING_PROFILES_ACTIVE=production
UPLOAD_PATH=/app/uploads/productos
CORS_ALLOWED_ORIGINS=*

# Puerto (Render lo configura automáticamente)
PORT=10000
```

---

## 🔍 Verificación del Despliegue

### 1️⃣ Esperar el Build
El primer build puede tomar **5-10 minutos**:
- Render descarga las dependencias de Maven
- Compila el proyecto
- Crea la imagen Docker
- Inicia el contenedor

### 2️⃣ Verificar Logs
En Render → **Logs**, debes ver:
```
2026-01-17 ... Started EComeerseApplication in X.XXX seconds
```

### 3️⃣ Probar Health Check
```bash
curl https://tu-app.onrender.com/actuator/health
```

Debe responder:
```json
{
  "status": "UP"
}
```

### 4️⃣ Probar Endpoint de Prueba
```bash
curl https://tu-app.onrender.com/api/test
```

---

## ⚠️ Problemas Comunes

### ❌ Error: "Driver claims to not accept jdbcUrl"

**Causa**: La URL no tiene el prefijo `jdbc:`

**Solución**:
```bash
# ❌ Incorrecto
postgresql://host:5432/database

# ✅ Correcto
jdbc:postgresql://host:5432/database
```

### ❌ Error: "Failed to build"

**Causa**: Problema con codificación UTF-8 en archivos

**Solución**: Ya está arreglado en el Dockerfile actual con:
```bash
mvn clean package -DskipTests -Dproject.build.sourceEncoding=UTF-8
```

### ❌ Error: "Port 5432 already allocated"

**Causa**: Solo aplica en local. En Render no hay conflicto.

**Solución local**: El docker-compose ya usa el puerto 5434

### ❌ Error: "Application failed to start"

**Posibles causas**:
1. `DATABASE_URL` mal configurada
2. `JWT_SECRET` muy corto (mínimo 64 caracteres)
3. Base de datos no accesible

**Verificar**:
```bash
# En Render Logs
grep ERROR /var/log/render-app.log
```

---

## 🎯 Checklist de Despliegue

- [ ] Base de datos PostgreSQL creada en Render
- [ ] URL de base de datos convertida (con `jdbc:`)
- [ ] Variable `DATABASE_URL` configurada
- [ ] Variable `JWT_SECRET` configurada (mínimo 64 caracteres)
- [ ] Variable `JWT_EXPIRATION` configurada
- [ ] Código subido a GitHub (rama `main`)
- [ ] Web Service creado en Render
- [ ] Build completado exitosamente
- [ ] Aplicación iniciada (logs muestran "Started")
- [ ] Health check responde `/actuator/health`
- [ ] Endpoints de API funcionan

---

## 🔗 URLs Finales

Después del despliegue exitoso tendrás:

- **API Base URL**: `https://tu-app.onrender.com`
- **Health Check**: `https://tu-app.onrender.com/actuator/health`
- **API Docs** (si tienes Swagger): `https://tu-app.onrender.com/swagger-ui.html`

---

## 📚 Documentación Adicional

- [Render Docker Deploys](https://render.com/docs/deploy-docker)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Render PostgreSQL](https://render.com/docs/databases)

---

## 💡 Tips

1. **Free Tier**: La app se duerme después de 15 min de inactividad
2. **Primer Request**: Puede tardar ~30s en despertar
3. **Logs**: Revisa siempre los logs en caso de error
4. **Rollback**: Render permite hacer rollback a deploys anteriores
5. **Auto-Deploy**: Configura auto-deploy desde GitHub para CI/CD

---

¡Listo! 🎉 Tu backend está configurado para desplegarse en Render.

