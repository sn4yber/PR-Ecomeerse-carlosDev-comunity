# Script de Preparación para Deploy en Render
# Ejecuta este script antes de subir a GitHub

Write-Host "🚀 Preparando proyecto para Render..." -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (!(Test-Path "pom.xml")) {
    Write-Host "❌ Error: Ejecuta este script desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Dar permisos de ejecución a mvnw (para Linux en Render)
Write-Host "📝 Configurando permisos de mvnw..." -ForegroundColor Yellow
git update-index --chmod=+x mvnw
git update-index --chmod=+x build.sh

# Verificar archivos necesarios
Write-Host "✅ Verificando archivos necesarios..." -ForegroundColor Yellow
$requiredFiles = @(
    "Dockerfile",
    "Procfile",
    "build.sh",
    "render.yaml",
    "src/main/resources/application-production.properties",
    ".env.render"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file (FALTA)" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (!$allFilesExist) {
    Write-Host ""
    Write-Host "❌ Faltan archivos necesarios para Render" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Todos los archivos necesarios están presentes" -ForegroundColor Green
Write-Host ""

# Verificar si Git está inicializado
if (!(Test-Path ".git")) {
    Write-Host "📦 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git inicializado" -ForegroundColor Green
} else {
    Write-Host "✅ Repositorio Git ya existe" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Siguiente paso: Subir a GitHub" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ejecuta los siguientes comandos:" -ForegroundColor White
Write-Host ""
Write-Host "  1. git add ." -ForegroundColor Yellow
Write-Host "  2. git commit -m 'Backend listo para Render'" -ForegroundColor Yellow
Write-Host "  3. git remote add origin https://github.com/TU_USUARIO/TU_REPO.git" -ForegroundColor Yellow
Write-Host "  4. git branch -M main" -ForegroundColor Yellow
Write-Host "  5. git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 Luego sigue las instrucciones en: DEPLOY_RENDER.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ ¡Proyecto listo para desplegar en Render!" -ForegroundColor Green

