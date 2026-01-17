# Script para ver logs de los servicios
# Uso: .\docker-logs.ps1 [servicio]

param(
    [string]$Service = "backend"
)

Write-Host "📋 Mostrando logs de $Service..." -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para salir" -ForegroundColor Yellow
Write-Host ""

docker-compose logs -f $Service

