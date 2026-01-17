# 🚀 Deploy Rápido en Render

## ⚡ Inicio Rápido (5 minutos)

### 1. Preparar el Proyecto
```powershell
.\prepare-render.ps1
```

### 2. Subir a GitHub
```bash
git add .
git commit -m "Backend listo para Render"
git remote add origin https://github.com/TU_USUARIO/ecommerce-backend.git
git branch -M main
git push -u origin main
```

### 3. Crear Base de Datos en Render
1. Ve a [Render](https://dashboard.render.com/)
2. New + → PostgreSQL
3. Name: `ecommerce-database`
4. Copia la **Internal Database URL**

### 4. Crear Web Service
1. New + → Web Service
2. Conecta tu repo de GitHub
3. Configuración:
   - **Name**: `ecommerce-backend`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile`
   - **Health Check Path**: `/actuator/health`

### 5. Variables de Entorno
Agrega en Environment Variables:

```bash
# Base de Datos (copia de Render PostgreSQL)
DATABASE_URL=<Internal Database URL de Render>

# JWT (genera uno nuevo)
JWT_SECRET=<genera con: openssl rand -base64 64>
JWT_EXPIRATION=86400

# Spring
SPRING_PROFILES_ACTIVE=production

# Java Memory (Optimizado para Free/Starter 512MB)
JAVA_OPTS=-Xms256m -Xmx400m -XX:+UseContainerSupport -XX:+UseG1GC

# CORS (ajusta con la URL de tu frontend)
CORS_ALLOWED_ORIGINS=https://tu-frontend.com
```

**💡 Nota sobre JAVA_OPTS:**
- Plan Free/Starter (512MB): `-Xms256m -Xmx400m -XX:+UseContainerSupport -XX:+UseG1GC`
- Plan Standard (2GB): `-Xms512m -Xmx1536m -XX:+UseContainerSupport -XX:+UseG1GC`

### 6. Deploy
Click en **"Create Web Service"** y espera ~5-10 minutos.

---

## 🌐 Tu API estará en:
```
https://ecommerce-backend.onrender.com
```

## 🧪 Probar:
```bash
curl https://ecommerce-backend.onrender.com/actuator/health
```

---

## 📚 Documentación Completa
Ver [DEPLOY_RENDER.md](./DEPLOY_RENDER.md) para instrucciones detalladas.

---

## 🆘 Problemas Comunes

### Build falla
```bash
git update-index --chmod=+x mvnw
git commit -m "Fix mvnw permissions"
git push
```

### App muy lenta (Plan Free)
- Normal: hiberna después de 15 min
- Primera petición tarda 30-60s en despertar
- Solución: Upgrade a Starter ($7/mes)

### Imágenes no persisten
- Render no tiene filesystem persistente
- Solución: Usar Cloudinary o S3

---

**¡Listo para producción! 🎉**

