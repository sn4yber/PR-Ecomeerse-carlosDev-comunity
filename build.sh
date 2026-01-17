# Render Build Script
#!/bin/bash

echo "🔨 Iniciando build para Render..."

# Establecer variables de entorno
export MAVEN_OPTS="-Xmx1024m"

# Limpiar builds anteriores
echo "🧹 Limpiando builds anteriores..."
./mvnw clean

# Compilar proyecto
echo "📦 Compilando proyecto..."
./mvnw package -DskipTests

# Verificar que el JAR se creó
if [ -f target/*.jar ]; then
    echo "✅ Build completado exitosamente"
    ls -lh target/*.jar
else
    echo "❌ Error: JAR no encontrado"
    exit 1
fi

echo "🎉 Build finalizado"

