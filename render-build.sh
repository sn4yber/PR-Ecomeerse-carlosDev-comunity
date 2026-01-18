#!/bin/bash
# Script de build para Render

echo "🚀 Iniciando build para Render..."

# Instalar dependencias de Maven
echo "📦 Descargando dependencias..."
./mvnw dependency:go-offline -B || exit 1

# Compilar aplicación
echo "🔨 Compilando aplicación..."
./mvnw clean package -DskipTests -Dproject.build.sourceEncoding=UTF-8 || exit 1

echo "✅ Build completado exitosamente!"

