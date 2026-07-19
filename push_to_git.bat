@echo off
title GHOST-COD SECURE GIT HANDSHAKE
echo =========================================================
echo  [SECURE CHANNEL INITIALIZATION]
echo  Target Repository: https://github.com/Guru-CodesAI/GHOST-COD
echo =========================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not found in system PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    echo.
    pause
    exit /b
)

echo [1/4] Initializing local repository...
if not exist .git (
    git init
) else (
    echo Local repository already initialized.
)

echo [2/4] Linking secure remote channel...
git remote remove origin >nul 2>nul
git remote add origin https://github.com/Guru-CodesAI/GHOST-COD.git
git branch -M main

echo [3/4] Indexing and committing declassified dossier files...
if not exist "e:\SGR\asset" mkdir "e:\SGR\asset"
echo Copying tactical weapon blueprint images to asset folder...
copy /y "C:\Users\gurunathan\.gemini\antigravity\brain\ded08ab9-221d-4daf-8989-c18e0141c267\acr_blueprint_1784395377806.png" "e:\SGR\asset\acr_blueprint.png" >nul
copy /y "C:\Users\gurunathan\.gemini\antigravity\brain\ded08ab9-221d-4daf-8989-c18e0141c267\knife_blueprint_1784395391069.png" "e:\SGR\asset\knife_blueprint.png" >nul
copy /y "C:\Users\gurunathan\.gemini\antigravity\brain\ded08ab9-221d-4daf-8989-c18e0141c267\usp_blueprint_1784395409539.png" "e:\SGR\asset\usp_blueprint.png" >nul
git add .
git commit -m "Classified release: GHOST-COD high-fidelity responsive HUD"

echo.
echo [4/4] Transmitting telemetry stream to GitHub...
echo Pulling latest remote changes to synchronize branch...
git pull origin main --rebase
echo Please enter credentials if prompted.
echo.
git push -u origin main

echo.
echo =========================================================
echo  [TRANSMISSION COMPLETE] Secure branch main updated.
echo =========================================================
echo.
pause
