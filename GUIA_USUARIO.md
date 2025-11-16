# 📖 Guía del Usuario - E-Commerce Universal

> **Manual completo para administradores y usuarios del sistema**

---

## 👤 Para Usuarios (Clientes)

### 🛍️ Cómo Comprar

#### 1. Navegar el Catálogo

**Desde la Página Principal:**
- Haz clic en cualquier categoría (Monitores, Teclados, etc.)
- O haz clic en "Ver Productos" en el hero section

**Barra de Navegación:**
- Haz clic en el menú hamburguesa (☰) 
- Selecciona "Productos"
- O elige una categoría específica

#### 2. Buscar Productos

**Búsqueda Rápida:**
- Escribe en la barra de búsqueda
- Los resultados se filtran instantáneamente
- Busca por nombre o descripción

**Filtrar por Categoría:**
- Usa el menú lateral de categorías
- Haz clic en "Todas" para ver todo

#### 3. Ver Detalles del Producto

Al hacer clic en un producto verás:
- 📸 **Imágenes**: Múltiples fotos del producto
- 💰 **Precio**: Precio actual
- 📦 **Stock**: Disponibilidad
- 📝 **Descripción**: Características detalladas
- 🏷️ **Categoría**: Tipo de producto

#### 4. Agregar al Carrito

1. Haz clic en **"Agregar al Carrito"**
2. Verás una confirmación visual
3. El contador del carrito se actualiza automáticamente
4. El producto se guarda (¡incluso si cierras el navegador!)

#### 5. Revisar el Carrito

**Acceder al Carrito:**
- Haz clic en el ícono del carrito (🛒) en la esquina superior derecha
- El número indica cuántos productos diferentes tienes

**En el Carrito puedes:**
- ➕ Aumentar cantidad
- ➖ Disminuir cantidad
- 🗑️ Eliminar productos
- 💵 Ver el total calculado automáticamente

#### 6. Realizar el Pedido

1. Haz clic en **"Proceder al Pago"**
2. Si no estás registrado, deberás:
   - Registrarte (solo toma 1 minuto)
   - O iniciar sesión
3. Confirma tu información de envío
4. Revisa el resumen del pedido
5. Haz clic en **"Confirmar Pedido"**

#### 7. Seguimiento del Pedido

**Ver tus Pedidos:**
- Inicia sesión
- Ve a "Mis Pedidos" en el menú de usuario
- Verás todos tus pedidos con sus estados:
  - ⏳ **PENDIENTE**: Recibimos tu pedido
  - 📦 **PROCESANDO**: Preparando tu envío
  - 🚚 **ENVIADO**: En camino
  - ✅ **ENTREGADO**: Completado
  - ❌ **CANCELADO**: Cancelado

---

## 👨‍💼 Para Administradores

### 🔐 Acceso al Panel Admin

1. Inicia sesión con una cuenta ADMIN
2. Verás un ícono de configuración (⚙️) en el header
3. Haz clic para acceder al **Panel de Administración**

### 📊 Dashboard Principal

Al entrar verás:

**Estadísticas Rápidas:**
- 💰 Ventas totales
- 📦 Pedidos pendientes
- 🏷️ Productos en stock
- 👥 Usuarios registrados

**Gráficos:**
- Ventas por mes
- Productos más vendidos
- Categorías populares

**Alertas:**
- 🚨 Stock bajo
- ⏰ Pedidos pendientes de procesar

### 📦 Gestión de Productos

#### Crear un Nuevo Producto

1. Ve a **"Productos"** en el menú lateral
2. Haz clic en **"➕ Nuevo Producto"**
3. Completa el formulario:

```
📝 Nombre del Producto
   Ejemplo: "Teclado Mecánico RGB Pro"

💵 Precio
   Ejemplo: 299900 (sin puntos ni comas)

📦 Stock
   Ejemplo: 50

📂 Categoría
   Selecciona de la lista desplegable
   (Las categorías se configuran en el Panel de Configuración)

⭐ Producto Destacado
   Activa si quieres mostrarlo en la página principal

📝 Descripción
   Escribe detalles completos del producto
   - Características técnicas
   - Beneficios
   - Especificaciones

📸 Imágenes
   - Haz clic en "Seleccionar archivos"
   - Puedes subir múltiples imágenes
   - Formatos: JPG, PNG, WEBP
   - Tamaño máximo: 5MB por imagen
```

4. Haz clic en **"Crear Producto"**
5. ¡Listo! El producto ya está visible en la tienda

#### Editar un Producto

1. En la tabla de productos, haz clic en el ícono de edición (✏️)
2. Modifica los campos que necesites
3. Para agregar más imágenes:
   - Haz clic en "Agregar más imágenes"
   - Selecciona los archivos
4. Haz clic en **"Actualizar Producto"**

#### Eliminar un Producto

1. Haz clic en el ícono de eliminar (🗑️)
2. Confirma la acción
3. ⚠️ **Nota**: Esta acción no se puede deshacer

#### Buscar y Filtrar Productos

**Búsqueda:**
- Usa la barra de búsqueda en la parte superior
- Busca por nombre

**Filtros:**
- Por categoría: Desplegable de categorías
- Por stock: "Todos", "En stock", "Sin stock"
- Por destacados: Solo productos destacados

### 🛒 Gestión de Pedidos

#### Ver Pedidos

**Tabla de Pedidos muestra:**
- 🔢 ID del pedido
- 👤 Cliente (nombre y email)
- 📅 Fecha del pedido
- 💰 Total
- 📦 Estado actual
- 🎬 Acciones disponibles

#### Estados de Pedidos

```
⏳ PENDIENTE
   → Pedido recién creado
   → Requiere procesamiento
   → Acción: Cambiar a "PROCESANDO"

📦 PROCESANDO
   → Preparando el envío
   → Empacando productos
   → Acción: Cambiar a "ENVIADO"

🚚 ENVIADO
   → En tránsito
   → Cliente notificado
   → Acción: Cambiar a "ENTREGADO"

✅ ENTREGADO
   → Completado exitosamente
   → Estado final
   → No requiere más acciones

❌ CANCELADO
   → Pedido cancelado
   → Stock devuelto
   → Estado final
```

#### Procesar un Pedido

1. Localiza el pedido en la tabla
2. Haz clic en **"Ver Detalles"** o el ícono 👁️
3. Verás:
   - Información del cliente
   - Dirección de envío
   - Productos ordenados (con cantidades y precios)
   - Total del pedido
4. Para cambiar el estado:
   - Haz clic en el dropdown de estado
   - Selecciona el nuevo estado
   - El cambio se guarda automáticamente
5. El cliente puede ver el estado actualizado en su panel

#### Filtrar Pedidos

**Por Estado:**
- Todos
- Pendientes
- Procesando
- Enviados
- Entregados
- Cancelados

**Por Fecha:**
- Usa los filtros de fecha
- Busca por rango

**Por Cliente:**
- Busca por nombre o email

### 👥 Gestión de Usuarios

#### Ver Usuarios

**Tabla de Usuarios muestra:**
- 👤 Nombre completo
- 📧 Email
- 🎭 Rol (USER o ADMIN)
- 📅 Fecha de registro
- 🎬 Acciones

#### Cambiar Rol de Usuario

1. Localiza el usuario en la tabla
2. Haz clic en **"Cambiar Rol"**
3. Selecciona:
   - **USER**: Cliente normal
   - **ADMIN**: Acceso al panel admin
4. Confirma el cambio

⚠️ **Importante**: 
- Solo usuarios ADMIN pueden gestionar otros usuarios
- No puedes cambiar tu propio rol
- Al menos un ADMIN debe existir

#### Eliminar Usuario

1. Haz clic en el ícono de eliminar (🗑️)
2. Confirma la acción
3. ⚠️ **Nota**: 
   - No puedes eliminar tu propia cuenta
   - Se eliminarán también los pedidos del usuario

### ⚙️ Panel de Configuración Universal

**La característica más poderosa del sistema**

Acceso: Panel Admin → Configuración (⚙️)

#### Tab 1: ⚙️ General

**Información Básica de tu Negocio**

```yaml
Nombre de la Tienda:
  - Ejemplo: "GamersHub Pro"
  - Aparece en el header y footer
  - Máximo 50 caracteres

Slogan:
  - Ejemplo: "Tu tienda gaming de confianza"
  - Aparece bajo el nombre
  - Máximo 100 caracteres

Email de Contacto:
  - Ejemplo: "contacto@gamershub.com"
  - Para consultas de clientes
  - Debe ser válido

Teléfono:
  - Ejemplo: "+57 321 456 7890"
  - Formato libre

WhatsApp:
  - Ejemplo: "+573214567890"
  - Se usa para el botón de contacto directo

Descripción:
  - Describe tu negocio en 2-3 líneas
  - Aparece en la página principal
  - SEO-friendly

Dirección:
  - Dirección física de la tienda
  - Aparece en el footer

Logo:
  - URL de la imagen
  - O un emoji grande (🛒, 🎮, 👕, etc.)

Tipo de Negocio:
  - Gaming
  - Ropa
  - Tecnología
  - Hogar
  - Deportes
  - Otro

Año de Fundación:
  - Ejemplo: "2020"
```

#### Tab 2: 🏪 Tienda

**Configuración Comercial**

```yaml
Moneda:
  - COP (Peso Colombiano)
  - USD (Dólar)
  - EUR (Euro)
  - MXN (Peso Mexicano)

Símbolo de Moneda:
  - Se actualiza automáticamente según la moneda
  - Puedes personalizarlo

IVA (%):
  - Ejemplo: 19
  - Se calcula automáticamente en el checkout
  - Rango: 0-100

Envío Gratis Desde:
  - Monto mínimo para envío gratuito
  - Ejemplo: 150000
  - En tu moneda seleccionada

Costo de Envío Base:
  - Ejemplo: 15000
  - Para pedidos bajo el mínimo de envío gratis
```

#### Tab 3: 🎭 Hero Section

**Banner Principal de la Página de Inicio**

```yaml
Título:
  - Ejemplo: "Descubre la Mejor Tecnología Gaming"
  - Grande y llamativo
  - Máximo 80 caracteres

Subtítulo:
  - Ejemplo: "Potencia tu Setup con los Mejores Productos"
  - Complementa el título
  - Máximo 100 caracteres

Descripción:
  - Texto más largo explicativo
  - 2-3 líneas
  - Vende el valor de tu tienda

Texto del Botón:
  - Ejemplo: "Ver Productos", "Comprar Ahora"
  - Corto y accionable

Imagen de Fondo:
  - URL de una imagen de alta calidad
  - Recomendado: 1920x1080px
  - Ejemplo de Unsplash:
    https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=1200

Badge Informativo:
  - Ejemplo: "⚡ Envío Gratis en Compras +$150k"
  - Pequeño texto destacado
  - Usa emojis para más impacto
```

#### Tab 4: ⭐ Características

**Beneficios y Ventajas de tu Tienda**

Puedes agregar hasta 6 características.

**Para cada característica:**

```yaml
Icono:
  - Usa emojis
  - Ejemplos:
    ✅ Calidad
    ⚡ Velocidad
    🔒 Seguridad
    📦 Envío
    💳 Pagos
    🎁 Regalos
    ↩️ Devoluciones
    ⭐ Garantía

Título:
  - Ejemplo: "Envío Gratis"
  - 2-4 palabras
  - Claro y directo

Descripción:
  - Ejemplo: "En compras superiores a $150.000"
  - Explica brevemente el beneficio
  - 1 línea
```

**Ejemplos de Características:**

```
✅ Envío Gratis
   En compras superiores a $150.000

⚡ Entrega Rápida
   Recibe tus productos en 24-48 horas

🔒 Compra Segura
   Protección total en tus transacciones

🎁 Envoltorio Regalo
   Gratis en todos los pedidos

↩️ Devolución Fácil
   30 días para devolver sin preguntas

⭐ Garantía Oficial
   2 años en todos los productos
```

#### Tab 5: 📱 Redes Sociales

**Links a tus Plataformas Sociales**

Para cada red social:

```yaml
Nombre:
  - Facebook
  - Instagram
  - Twitter
  - LinkedIn
  - WhatsApp

URL:
  - Link completo a tu perfil
  - Ejemplo: https://instagram.com/tu_tienda

Visible:
  - Toggle ON/OFF
  - Si está OFF, no se muestra en el footer
```

**Ejemplos:**

```
Facebook: https://facebook.com/gamershubpro
Instagram: https://instagram.com/gamershubpro
Twitter: https://twitter.com/gamershubpro
WhatsApp: https://wa.me/573214567890
LinkedIn: https://linkedin.com/company/gamershubpro
```

#### Tab 6: 📂 Categorías

**Define las Categorías de Productos de tu Tienda**

⚠️ **Importante**: 
- Las categorías que definas aquí aparecen en toda la tienda
- Los productos deben asignarse a estas categorías
- Puedes agregar hasta 12 categorías

**Para cada categoría:**

```yaml
Nombre:
  - Ejemplo: "Monitores"
  - Como aparecerá en el menú
  - 1-2 palabras

Icono:
  - Emoji representativo
  - Ejemplos:
    🖥️ Monitores
    ⌨️ Teclados
    🖱️ Ratones
    🎧 Headsets
    💻 Laptops
    📱 Smartphones
    👕 Camisetas
    👗 Vestidos
    👠 Zapatos
    🏠 Hogar
    🎮 Consolas
    📚 Libros

Slug:
  - Valor para URLs
  - Ejemplo: "monitores", "teclados-mecanicos"
  - Sin espacios, minúsculas, guiones permitidos

Gradiente de Color:
  - Define el color de la tarjeta
  - Formato: "from-[color]-700 to-[color]-700"
  - Ejemplos:
    from-gray-700 to-purple-700
    from-purple-700 to-pink-700
    from-pink-700 to-blue-700
    from-blue-700 to-indigo-700
```

**Ejemplos Completos:**

**Gaming:**
```
🖥️ Monitores | monitores | from-gray-700 to-purple-700
⌨️ Teclados | teclados | from-purple-700 to-pink-700
🖱️ Ratones | ratones | from-pink-700 to-blue-700
🎧 Headsets | headsets | from-blue-700 to-indigo-700
🎮 Consolas | consolas | from-indigo-700 to-green-700
```

**Ropa:**
```
👕 Camisetas | camisetas | from-blue-700 to-indigo-700
👗 Vestidos | vestidos | from-pink-700 to-purple-700
👠 Zapatos | zapatos | from-gray-700 to-black-700
👜 Bolsos | bolsos | from-purple-700 to-pink-700
💍 Joyería | joyeria | from-yellow-700 to-orange-700
```

**Tecnología:**
```
💻 Laptops | laptops | from-gray-700 to-blue-700
📱 Smartphones | smartphones | from-blue-700 to-indigo-700
⌚ Smartwatches | smartwatches | from-indigo-700 to-purple-700
🎧 Audio | audio | from-purple-700 to-pink-700
📷 Cámaras | camaras | from-pink-700 to-red-700
```

#### Tab 7: 🔧 Avanzada

**Configuraciones Técnicas**

```yaml
Modo Mantenimiento:
  - Toggle ON/OFF
  - Cuando está ON:
    * La tienda muestra mensaje de mantenimiento
    * Solo ADMINs pueden acceder
    * Útil para actualizaciones

Mostrar Productos Sin Stock:
  - Toggle ON/OFF
  - ON: Productos sin stock se muestran (pero no se pueden comprar)
  - OFF: Productos sin stock se ocultan completamente

Permitir Compras Sin Registro:
  - Toggle ON/OFF
  - ON: Los clientes pueden comprar como invitados
  - OFF: Requiere registro obligatorio
  - (⚠️ Actualmente requiere registro)

Notificar Stock Bajo:
  - Toggle ON/OFF
  - ON: Recibes alertas cuando el stock es bajo
  - OFF: No se notifica

Umbral de Stock Bajo:
  - Número
  - Ejemplo: 5
  - Si un producto tiene ≤5 unidades, se considera "stock bajo"
```

#### Guardar Configuración

1. Edita los campos que necesites en cualquier tab
2. Los cambios se guardan automáticamente cuando:
   - Cambias de tab
   - Sales del panel
3. Los cambios son instantáneos en toda la tienda
4. Se guardan en tu navegador (localStorage)

#### Vista Previa

Para ver los cambios:
1. Guarda la configuración
2. Sal del panel admin
3. Ve a la página principal
4. ¡Verás todos tus cambios aplicados!

---

## 💡 Consejos y Mejores Prácticas

### Para Administradores

**Gestión de Productos:**
- ✅ Usa fotos de alta calidad (mínimo 800x800px)
- ✅ Escribe descripciones detalladas y SEO-friendly
- ✅ Mantén el stock actualizado
- ✅ Marca productos destacados estratégicamente (máximo 6-8)
- ✅ Usa nombres descriptivos y claros

**Gestión de Pedidos:**
- ✅ Procesa pedidos pendientes diariamente
- ✅ Actualiza estados en tiempo real
- ✅ Comunica demoras a los clientes
- ✅ Revisa alertas de stock bajo

**Configuración:**
- ✅ Elige emojis representativos y profesionales
- ✅ Usa imágenes de alta calidad en el hero
- ✅ Escribe textos claros y vendedores
- ✅ Prueba diferentes configuraciones
- ✅ Mantén coherencia en los colores

**Categorías:**
- ✅ Máximo 8-10 categorías (no abrumes)
- ✅ Nombres cortos y descriptivos
- ✅ Emojis consistentes con tu marca
- ✅ Agrupa productos relacionados

### Para Usuarios

**Al Comprar:**
- ✅ Lee las descripciones completas
- ✅ Verifica el stock antes de agregar
- ✅ Revisa tu carrito antes de confirmar
- ✅ Guarda tu información de envío correctamente
- ✅ Verifica el estado de tus pedidos regularmente

**Seguridad:**
- ✅ Usa contraseñas seguras
- ✅ No compartas tu cuenta
- ✅ Cierra sesión en computadoras públicas

---

## ❓ Preguntas Frecuentes (FAQ)

### Para Usuarios

**P: ¿Se guarda mi carrito si cierro el navegador?**
R: Sí, tu carrito se guarda automáticamente. Puedes cerrar el navegador y al regresar lo encontrarás intacto.

**P: ¿Necesito registrarme para comprar?**
R: Actualmente sí. El registro toma menos de 1 minuto y te permite hacer seguimiento de tus pedidos.

**P: ¿Puedo cancelar un pedido?**
R: Contacta al administrador lo antes posible. Los pedidos en estado PENDIENTE pueden cancelarse.

**P: ¿Cómo sé cuando mi pedido fue enviado?**
R: Verás el cambio de estado en tu panel "Mis Pedidos". El estado cambiará a 🚚 ENVIADO.

**P: ¿Qué significa "Producto Destacado"?**
R: Son productos seleccionados por el administrador que aparecen en la página principal.

### Para Administradores

**P: ¿Los cambios en configuración son permanentes?**
R: Los cambios se guardan en localStorage. Para sincronización entre dispositivos, se requiere implementación backend.

**P: ¿Puedo tener múltiples administradores?**
R: Sí, puedes cambiar el rol de cualquier usuario a ADMIN desde el panel de usuarios.

**P: ¿Qué pasa si elimino una categoría que tiene productos?**
R: Los productos mantienen su categoría antigua. Debes reasignarlos manualmente.

**P: ¿Puedo recuperar un producto eliminado?**
R: No, la eliminación es permanente. Ten cuidado al eliminar productos.

**P: ¿Cuántas imágenes puedo subir por producto?**
R: No hay límite definido, pero recomendamos 3-5 imágenes de alta calidad por producto.

**P: ¿Cómo aumento el stock de un producto?**
R: Edita el producto y cambia el valor del campo "Stock".

---

## 🆘 Solución de Problemas

### Problemas Comunes

**No puedo iniciar sesión:**
- ✅ Verifica que el email y contraseña sean correctos
- ✅ Intenta restablecer tu contraseña
- ✅ Verifica que tu cuenta esté activa

**No veo el botón de Admin:**
- ✅ Tu cuenta debe tener rol ADMIN
- ✅ Contacta al administrador principal

**Las imágenes no cargan:**
- ✅ Verifica que la URL sea correcta
- ✅ Asegúrate de usar HTTP o HTTPS
- ✅ Verifica que el formato sea JPG, PNG o WEBP

**Los cambios de configuración no se ven:**
- ✅ Guarda los cambios antes de salir
- ✅ Refresca la página (F5)
- ✅ Limpia caché del navegador si persiste

**El carrito no se actualiza:**
- ✅ Verifica tu conexión a internet
- ✅ Refresca la página
- ✅ Asegúrate de estar autenticado

---

## 📞 Soporte

¿Necesitas ayuda adicional?

- 📧 **Email**: [soporte@tutienda.com]
- 💬 **Chat**: Disponible en la esquina inferior derecha
- 📱 **WhatsApp**: [+57 321 456 7890]
- 🕐 **Horario**: Lunes a Viernes, 9AM - 6PM

---

<div align="center">

**¡Gracias por usar nuestro sistema! 🎉**

*Tu éxito es nuestro éxito*

</div>
