Add-Type -AssemblyName System.Drawing

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Get-Location }

$sourcePath = Join-Path $scriptDir "asset\GR.png"
Write-Host "[1/3] Loading source image: $sourcePath"

if (Test-Path $sourcePath) {
    $srcImg = [System.Drawing.Image]::FromFile($sourcePath)
    $srcBmp = New-Object System.Drawing.Bitmap $srcImg
    $srcImg.Dispose()
    
    # Calculate crop area for top-left main icon in GR.png
    $width = $srcBmp.Width
    $height = $srcBmp.Height
    
    # Crop the main square icon on top-left of GR.png composite
    $cropX = [int]($width * 0.025)
    $cropY = [int]($height * 0.025)
    $cropW = [int]($width * 0.51)
    $cropH = [int]($height * 0.51)
    
    Write-Host "[2/3] Cropping primary Ghost favicon square ($cropW x $cropH)..."
    $cropRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
    $croppedBmp = $srcBmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $srcBmp.Dispose()
    
    function Export-ResizedPng($bmp, $outputPath, $targetWidth, $targetHeight) {
        $destBmp = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
        $g = [System.Drawing.Graphics]::FromImage($destBmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        $g.DrawImage($bmp, 0, 0, $targetWidth, $targetHeight)
        $g.Dispose()
        
        $destBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $destBmp.Dispose()
        Write-Host "  -> Saved: $(Split-Path $outputPath -Leaf) (${targetWidth}x${targetHeight})"
    }
    
    Write-Host "[3/3] Generating multi-resolution favicon suite..."
    Export-ResizedPng $croppedBmp (Join-Path $scriptDir "android-chrome-512x512.png") 512 512
    Export-ResizedPng $croppedBmp (Join-Path $scriptDir "android-chrome-192x192.png") 192 192
    Export-ResizedPng $croppedBmp (Join-Path $scriptDir "apple-touch-icon.png") 180 180
    Export-ResizedPng $croppedBmp (Join-Path $scriptDir "favicon-32x32.png") 32 32
    Export-ResizedPng $croppedBmp (Join-Path $scriptDir "favicon-16x16.png") 16 16
    Export-ResizedPng $croppedBmp (Join-Path $scriptDir "favicon.ico") 32 32
    
    $croppedBmp.Dispose()
    Write-Host "========================================================="
    Write-Host " [SUCCESS] All 6 favicon files created in project root!"
    Write-Host "========================================================="
} else {
    Write-Error "Source image asset/GR.png not found!"
}
