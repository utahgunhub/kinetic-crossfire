@echo off
echo 🚀 Starting Kinetic Crossfire Backend Server
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

node --version
echo.

REM Navigate to server directory
cd server

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo ⚠️ Warning: .env file not found
    echo Creating .env from example...
    copy env.example .env
    echo.
    echo ⚠️ Please edit server\.env and add your GunTab API tokens
    echo Get tokens from: https://www.guntab.com/account/api
    echo.
    pause
)

REM Start the server
echo 🌐 Starting server on http://localhost:3001
echo.
call npm run dev

