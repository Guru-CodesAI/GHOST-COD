Add-Type -AssemblyName System.Drawing

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Get-Location }

$brainDir = "C:\Users\gurunathan\.gemini\antigravity\brain\bf896195-594a-4ee6-800c-91afa6169e52"

# Direct source maps from generated high-res assets
$brainMap = @{
    "android-chrome-512x512.png" = Join-Path $brainDir "ghost_favicon_512_1785999971559.png"
    "android-chrome-192x192.png" = Join-Path $brainDir "android_chrome_192_1786000047147.png"
    "apple-touch-icon.png"       = Join-Path $brainDir "apple_touch_icon_1786000083873.png"
    "favicon-32x32.png"          = Join-Path $brainDir "favicon_32x32_1786000106831.png"
    "favicon-16x16.png"          = Join-Path $brainDir "favicon_16x16_1786000243259.png"
    "favicon.ico"                = Join-Path $brainDir "favicon_32x32_1786000106831.png"
}

$copiedCount = 0
foreach ($key in $brainMap.Keys) {
    $src = $brainMap[$key]
    $dest = Join-Path $scriptDir $key
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "  [+] Extracted: $key"
        $copiedCount++
    }
}

if ($copiedCount -ge 5) {
    Write-Host "========================================================="
    Write-Host " [SUCCESS] All 6 favicon files installed to project root!"
    Write-Host "========================================================="
    exit 0
}

# Fallback: Crop & Resize from local repository image asset
$fallbackImages = @(
    Join-Path $scriptDir "asset\memories\Taskforce-141.jpg",
    Join-Path $scriptDir "asset\Hero-Sec\Ghost Modern-Hero Section Concept.jpg",
    Join-Path $scriptDir "asset\Simon-Ghost-Riley.jpg"
)

$sourcePath = $null
foreach ($img in $fallbackImages) {
    if (Test-Path $img) {
        $sourcePath = $img
        break
    }
}

if ($sourcePath) {
    Write-Host "[Fallback] Processing repository asset: $sourcePath"
    $srcImg = [System.Drawing.Image]::FromFile($sourcePath)
    $srcBmp = New-Object System.Drawing.Bitmap $srcImg
    $srcImg.Dispose()
    
    function Export-ResizedIcon($bmp, $outputPath, $targetWidth, $targetHeight) {
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
        Write-Host "  -> Generated: $(Split-Path $outputPath -Leaf) (${targetWidth}x${targetHeight})"
    }
    
    Export-ResizedIcon $srcBmp (Join-Path $scriptDir "android-chrome-512x512.png") 512 512
    Export-ResizedIcon $srcBmp (Join-Path $scriptDir "android-chrome-192x192.png") 192 192
    Export-ResizedIcon $srcBmp (Join-Path $scriptDir "apple-touch-icon.png") 180 180
    Export-ResizedIcon $srcBmp (Join-Path $scriptDir "favicon-32x32.png") 32 32
    Export-ResizedIcon $srcBmp (Join-Path $scriptDir "favicon-16x16.png") 16 16
    Export-ResizedIcon $srcBmp (Join-Path $scriptDir "favicon.ico") 32 32
    
    $srcBmp.Dispose()
    Write-Host "========================================================="
    Write-Host " [SUCCESS] Fallback favicon generation complete!"
    Write-Host "========================================================="
} else {
    Write-Error "No valid source image found for favicon generation!"
}
