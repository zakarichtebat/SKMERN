# Script simple de compression d'images
Write-Host "Debut de la compression des images..." -ForegroundColor Green

$sourceDir = "WEB\Vue-skmern\public"
$tempDir = "temp_compressed"

# Creer le dossier temporaire
if (!(Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir
}

Write-Host "Traitement des images dans $sourceDir" -ForegroundColor Yellow

# Verifier si PowerShell peut redimensionner
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
        
        # Creer la nouvelle image
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
            Write-Host "Compression de $imageName..." -ForegroundColor Cyan
            Write-Host "Taille originale: $([math]::Round($originalSize, 1)) MB" -ForegroundColor White
            
            Compress-Image -inputPath $inputFile -outputPath $outputFile -quality 85 -maxWidth 1920
            
            $newSize = (Get-Item $outputFile).Length / 1MB
            $reduction = (($originalSize - $newSize) / $originalSize) * 100
            Write-Host "Nouvelle taille: $([math]::Round($newSize, 1)) MB" -ForegroundColor Green
            Write-Host "Reduction: $([math]::Round($reduction, 0))%" -ForegroundColor Green
            Write-Host "------------------------" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "INSTRUCTIONS:" -ForegroundColor Yellow
    Write-Host "1. Verifiez les images dans le dossier '$tempDir'" -ForegroundColor White
    Write-Host "2. Si elles sont bonnes, remplacez les originales:" -ForegroundColor White
    Write-Host "   Copy-Item '$tempDir\*' '$sourceDir' -Force" -ForegroundColor Cyan
    Write-Host "3. Supprimez le dossier temporaire:" -ForegroundColor White
    Write-Host "   Remove-Item '$tempDir' -Recurse -Force" -ForegroundColor Cyan
    
}
catch {
    Write-Host "ERREUR: Impossible de compresser avec PowerShell" -ForegroundColor Red
    Write-Host ""
    Write-Host "SOLUTIONS ALTERNATIVES:" -ForegroundColor Yellow
    Write-Host "1. Site web: https://tinypng.com" -ForegroundColor White
    Write-Host "2. Site web: https://squoosh.app" -ForegroundColor White
    Write-Host "3. Logiciel: GIMP, Photoshop, etc." -ForegroundColor White
    Write-Host ""
    Write-Host "OBJECTIF: Reduire de 16MB/13MB/11MB vers 200-500KB maximum" -ForegroundColor White
} 