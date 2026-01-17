# Script para construir y ejecutar el backend con Docker Compose
}
    exit 1
    Write-Host "Ver logs con: docker-compose logs" -ForegroundColor Yellow
    Write-Host "❌ Error al iniciar los servicios" -ForegroundColor Red
    Write-Host ""
} else {
    }
        docker-compose logs -f backend
        Write-Host "📋 Mostrando logs (Ctrl+C para salir)..." -ForegroundColor Yellow
        Write-Host ""
    if ($logs -eq 's' -or $logs -eq 'S') {
    $logs = Read-Host "¿Deseas ver los logs del backend? (s/N)"
    # Preguntar si quiere ver los logs

    Write-Host ""
    Write-Host "   docker-compose down" -ForegroundColor White
    Write-Host "🛑 Detener servicios:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   docker-compose logs -f backend" -ForegroundColor White
    Write-Host "📝 Ver logs en tiempo real:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   PostgreSQL: localhost:5432" -ForegroundColor White
    Write-Host "   Health Check: http://localhost:8080/actuator/health" -ForegroundColor White
    Write-Host "   Backend API: http://localhost:8080" -ForegroundColor White
    Write-Host "🌐 URLs disponibles:" -ForegroundColor Cyan
    Write-Host ""
    docker-compose ps
    Write-Host "📊 Estado de los servicios:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✅ Servicios iniciados correctamente!" -ForegroundColor Green
    Write-Host ""
if ($LASTEXITCODE -eq 0) {

docker-compose up -d
Write-Host "🐳 Levantando servicios..." -ForegroundColor Yellow
Write-Host ""

}
    Write-Host "📦 Usando imágenes existentes..." -ForegroundColor Yellow
} else {
    docker-compose build --no-cache
    docker-compose down -v
    Write-Host "🔨 Construyendo imágenes..." -ForegroundColor Yellow
if ($rebuild -eq 's' -or $rebuild -eq 'S') {
$rebuild = Read-Host "¿Deseas reconstruir las imágenes? (s/N)"
# Preguntar si quiere hacer un build limpio

Write-Host ""
Write-Host "✅ Docker está corriendo" -ForegroundColor Green
}
    exit 1
    Write-Host "❌ Error: Docker no está corriendo. Por favor, inicia Docker Desktop." -ForegroundColor Red
if ($LASTEXITCODE -ne 0) {
docker info > $null 2>&1
Write-Host "Verificando Docker..." -ForegroundColor Yellow
# Verificar si Docker está corriendo

Write-Host ""
Write-Host "🚀 Iniciando E-Commerce Backend con Docker..." -ForegroundColor Cyan

# Uso: .\docker-start.ps1

