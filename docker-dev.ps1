# Script para iniciar solo PostgreSQL para desarrollo local
# Uso: .\docker-dev.ps1

Write-Host "🔧 Iniciando PostgreSQL para desarrollo local..." -ForegroundColor Cyan
Write-Host ""

# Verificar si Docker está corriendo
Write-Host "Verificando Docker..." -ForegroundColor Yellow
docker info > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Docker no está corriendo. Por favor, inicia Docker Desktop." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker está corriendo" -ForegroundColor Green
Write-Host ""

Write-Host "🐘 Levantando PostgreSQL..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ PostgreSQL iniciado correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Conexión a la base de datos:" -ForegroundColor Cyan
    Write-Host "   Host: localhost" -ForegroundColor White
    Write-Host "   Port: 5432" -ForegroundColor White
    Write-Host "   Database: ecommerce_db" -ForegroundColor White
    Write-Host "   Username: ecommerce_user" -ForegroundColor White
    Write-Host "   Password: ecommerce_password" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Ahora puedes ejecutar tu aplicación Spring Boot desde el IDE" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🛑 Para detener PostgreSQL:" -ForegroundColor Cyan
    Write-Host "   docker-compose -f docker-compose.dev.yml down" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Error al iniciar PostgreSQL" -ForegroundColor Red
    exit 1
}

