# 📝 Configuración Exacta para Render Web Service

## 🎯 Campos a Completar

### 1. Source Code
```
✅ YA ESTÁ: sn4yber/PR-Ecomeerse-carlosDev-comunity
```

### 2. Name
```
ecommerce-backend
```
(Puedes dejarlo como está si prefieres: PR-Ecomeerse-carlosDev-comunity)

### 3. Project (Opcional)
```
Dejar vacío o crear uno nuevo si quieres organizar
```

### 4. Language
```
✅ YA ESTÁ: Docker
```

### 5. Branch
```
✅ YA ESTÁ: main
```

### 6. Region
```
✅ YA ESTÁ: Oregon (US West)
```
(Bueno que sea la misma región donde tienes la base de datos)

### 7. Root Directory
```
DEJAR VACÍO
```

### 8. Instance Type
```
📦 Free (para empezar)
$0/month - 512 MB RAM

O si prefieres sin hibernación:
💰 Starter - $7/month - 512 MB RAM
```

---

## 🔑 Environment Variables (Variables de Entorno)

### Copia estas exactamente:

#### 1. DATABASE_URL
```
✅ YA LA TIENES
(La que dice ••••••••••••)
```
Asegúrate que sea la **Internal Database URL** de tu PostgreSQL en Render.

#### 2. JWT_SECRET
```bash
# Genera uno nuevo ejecutando en tu terminal:
openssl rand -base64 64

# O en PowerShell:
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))

# Ejemplo de salida (NO USES ESTE, genera el tuyo):
aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789+/aBcDeFgHiJkLmNoPqRsTuVwXyZ==
```

**Añadir:**
```
Name: JWT_SECRET
Value: <el valor generado>
```

#### 3. JWT_EXPIRATION
```
Name: JWT_EXPIRATION
Value: 86400
```

#### 4. SPRING_PROFILES_ACTIVE
```
Name: SPRING_PROFILES_ACTIVE
Value: production
```

#### 5. JAVA_OPTS
```
Name: JAVA_OPTS
Value: -Xms256m -Xmx400m -XX:+UseContainerSupport -XX:+UseG1GC
```

#### 6. CORS_ALLOWED_ORIGINS
```
Name: CORS_ALLOWED_ORIGINS
Value: *
```
(Después cambia esto por la URL de tu frontend: https://tu-frontend.com)

#### 7. UPLOAD_PATH (Opcional pero recomendado)
```
Name: UPLOAD_PATH
Value: /app/uploads/productos
```

---

## 📋 Resumen de Variables de Entorno

Al final deberías tener estas variables:

```
DATABASE_URL            = postgresql://ecommerce_user:xxx@xxx.render.com/ecommerce_db
JWT_SECRET              = <tu clave generada de 256+ bits>
JWT_EXPIRATION          = 86400
SPRING_PROFILES_ACTIVE  = production
JAVA_OPTS               = -Xms256m -Xmx400m -XX:+UseContainerSupport -XX:+UseG1GC
CORS_ALLOWED_ORIGINS    = *
UPLOAD_PATH             = /app/uploads/productos
```

---

## 🚀 Después de Configurar

1. Click en **"Create Web Service"** (abajo de la página)
2. Render comenzará a:
   - ✅ Clonar el repositorio
   - ✅ Detectar el Dockerfile
   - ✅ Construir la imagen (~5-10 minutos)
   - ✅ Desplegar el contenedor
3. Espera a que el estado sea **"Live"** (verde)

---

## 🧪 Verificar el Despliegue

Una vez que esté "Live", prueba:

```bash
# Reemplaza con tu URL de Render
curl https://pr-ecomeerse-carlosdev-comunity.onrender.com/actuator/health

# Deberías ver:
{"status":"UP"}
```

---

## ⚠️ Notas Importantes

### Sobre DATABASE_URL
- Debe ser la **Internal Database URL** (no la External)
- Formato: `postgresql://user:password@internal-host/database`
- Se obtiene del dashboard de tu PostgreSQL en Render

### Sobre el Plan Free
- ⏰ Se "hiberna" después de 15 minutos sin uso
- 🐌 Primera petición tarda 30-60 segundos en "despertar"
- 💡 Para evitarlo: upgrade a Starter ($7/mes)

### Sobre CORS
- `*` permite cualquier origen (solo para testing)
- En producción, cambia a tu dominio real:
  ```
  CORS_ALLOWED_ORIGINS=https://tu-frontend.com,https://tu-frontend.vercel.app
  ```

---

## 🔧 Configuración Avanzada (Opcional)

### Health Check Path
Si te lo pide Render, agrega:
```
/actuator/health
```

### Docker Command
Dejar vacío (usa el CMD del Dockerfile)

### Dockerfile Path
```
./Dockerfile
```

---

## 📱 Tu URL Final

Una vez desplegado, tu API estará en:
```
https://pr-ecomeerse-carlosdev-comunity.onrender.com
```

O si cambias el nombre a "ecommerce-backend":
```
https://ecommerce-backend.onrender.com
```

---

¡Listo para crear el servicio! 🎉

