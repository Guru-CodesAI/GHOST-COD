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
git add .
git commit -m "Classified release: GHOST-COD high-fidelity responsive HUD"

echo.
echo [4/4] Transmitting telemetry stream to GitHub...
echo Please enter credentials if prompted.
echo.
git push -u origin main

echo.
echo =========================================================
echo  [TRANSMISSION COMPLETE] Secure branch main updated.
echo =========================================================
echo.
pause
