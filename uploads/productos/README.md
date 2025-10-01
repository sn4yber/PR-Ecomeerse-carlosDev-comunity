# Directorio de Imágenes de Productos

Este directorio almacena las imágenes subidas para los productos del e-commerce.

## Características:
- Formatos permitidos: JPG, JPEG, PNG
- Tamaño máximo: 5MB por imagen
- Nomenclatura: UUID único para cada archivo

## Acceso:
Las imágenes son accesibles públicamente a través de:
`http://localhost:8080/uploads/productos/{nombre-archivo}`

## Seguridad:
- Solo administradores autenticados pueden subir imágenes
- Validación de tipo de archivo en el backend
- Validación de tamaño de archivo

## Mantenimiento:
Este directorio se crea automáticamente si no existe cuando se inicia la aplicación.
