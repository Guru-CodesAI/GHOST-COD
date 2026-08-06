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

:: Increase Git postBuffer to 500MB to fix HTTP 408 timeout on large payload push
git config http.postBuffer 524288000
git config http.lowSpeedLimit 0
git config http.lowSpeedTime 999999

:: Abort any pending rebase operation if stuck
git rebase --abort >nul 2>nul

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

echo [3/4] Indexing and committing declassified dossier files and favicons...
if exist generate_favicons.ps1 powershell -ExecutionPolicy Bypass -File generate_favicons.ps1
git add .
git commit -m "SEO and Favicons: Deploy multi-resolution favicon suite, site.webmanifest, and head meta tags"

echo.
echo [4/4] Transmitting telemetry stream to GitHub...
echo Please enter credentials if prompted.
echo.
git push -f -u origin main

echo.
echo =========================================================
echo  [TRANSMISSION COMPLETE] Secure branch main updated.
echo =========================================================
echo.
pause
