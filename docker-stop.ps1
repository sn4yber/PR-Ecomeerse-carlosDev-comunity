# Script para detener los servicios de Docker Compose
# Uso: .\docker-stop.ps1

Write-Host "🛑 Deteniendo servicios de E-Commerce Backend..." -ForegroundColor Cyan
Write-Host ""

# Preguntar si quiere eliminar volúmenes
$removeVolumes = Read-Host "¿Deseas eliminar los volúmenes (datos)? (s/N)"
Write-Host ""

if ($removeVolumes -eq 's' -or $removeVolumes -eq 'S') {
    Write-Host "⚠️  ADVERTENCIA: Se eliminarán TODOS los datos (base de datos e imágenes)" -ForegroundColor Red
    $confirm = Read-Host "¿Estás seguro? (s/N)"
    if ($confirm -eq 's' -or $confirm -eq 'S') {
        Write-Host "🗑️  Deteniendo y eliminando todo..." -ForegroundColor Yellow
        docker-compose down -v
        Write-Host "✅ Servicios detenidos y volúmenes eliminados" -ForegroundColor Green
    } else {
        Write-Host "❌ Operación cancelada" -ForegroundColor Yellow
    }
} else {
    Write-Host "⏸️  Deteniendo servicios (conservando datos)..." -ForegroundColor Yellow
    docker-compose down
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Servicios detenidos correctamente" -ForegroundColor Green
        Write-Host "ℹ️  Los datos se han conservado en los volúmenes" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Error al detener servicios" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

