# Script de compression d'images pour optimiser les performances
Write-Host "🚀 Compression des images pour optimiser la performance..." -ForegroundColor Green

$sourceDir = "WEB\Vue-skmern\public"
$tempDir = "temp_compressed"

# Créer le dossier temporaire
if (!(Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir
}

Write-Host "📁 Traitement des images dans $sourceDir" -ForegroundColor Yellow

# Vérifier si PowerShell peut redimensionner (Windows 10+)
try {
    Add-Type -AssemblyName System.Drawing
    
    function Compress-Image {
        param(
            [string]$inputPath,
            [string]$outputPath,
            [int]$quality = 85,
            [int]$maxWidth = 1920
        )
        
        $image = [System.Drawing.Image]::FromFile($inputPath)
        
        # Calculer les nouvelles dimensions
        $ratio = $image.Width / $image.Height
        $newWidth = [Math]::Min($maxWidth, $image.Width)
        $newHeight = [int]($newWidth / $ratio)
        
        # Créer la nouvelle image
        $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        
        # Configurer l'encodeur JPEG
        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
        
        # Sauvegarder
        $newImage.Save($outputPath, $encoder, $encoderParams)
        
        # Nettoyer
        $graphics.Dispose()
        $newImage.Dispose()
        $image.Dispose()
    }
    
    # Traiter chaque image
    $images = @("photo1.jpg", "photo3.jpg", "photo4.jpg")
    
    foreach ($imageName in $images) {
        $inputFile = Join-Path $sourceDir $imageName
        $outputFile = Join-Path $tempDir $imageName
        
        if (Test-Path $inputFile) {
            $originalSize = (Get-Item $inputFile).Length / 1MB
            Write-Host "🔄 Compression de $imageName (${originalSize:F1} MB)..." -ForegroundColor Cyan
            
            Compress-Image -inputPath $inputFile -outputPath $outputFile -quality 85 -maxWidth 1920
            
            $newSize = (Get-Item $outputFile).Length / 1MB
            $reduction = (($originalSize - $newSize) / $originalSize) * 100
            Write-Host "✅ $imageName compressée : ${newSize:F1} MB (-${reduction:F0}%)" -ForegroundColor Green
        }
    }
    
    Write-Host "`n📋 Instructions :" -ForegroundColor Yellow
    Write-Host "1. Vérifiez les images dans le dossier '$tempDir'" -ForegroundColor White
    Write-Host "2. Si elles sont bonnes, remplacez les originales :" -ForegroundColor White
    Write-Host "   Copy-Item '$tempDir\*' '$sourceDir' -Force" -ForegroundColor Cyan
    Write-Host "3. Supprimez le dossier temporaire :" -ForegroundColor White
    Write-Host "   Remove-Item '$tempDir' -Recurse -Force" -ForegroundColor Cyan
    
}
catch {
    Write-Host "❌ Erreur : Impossible de compresser avec PowerShell" -ForegroundColor Red
    Write-Host "💡 Solutions alternatives :" -ForegroundColor Yellow
    Write-Host "1. Utilisez un site web : https://tinypng.com" -ForegroundColor White
    Write-Host "2. Utilisez un logiciel : GIMP, Photoshop, etc." -ForegroundColor White
    Write-Host "3. Cible : Réduire de 16MB/13MB/11MB à 200-500KB maximum" -ForegroundColor White
} 