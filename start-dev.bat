@echo off
echo 🚀 Starting Kinetic Crossfire Development Environment
echo.

REM Check if server\.env exists
if not exist "server\.env" (
    echo ⚠️ Backend .env file not found
    echo Creating from example...
    cd server
    copy env.example .env
    cd ..
    echo.
    echo 📝 Please edit server\.env and add your GunTab API tokens
    echo    Get tokens from: https://www.guntab.com/account/api
    echo.
    pause
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    call npm install
    echo.
)

if not exist "server\node_modules" (
    echo 📦 Installing backend dependencies...
    cd server
    call npm install
    cd ..
    echo.
)

echo 🎯 Starting servers...
echo.
echo Frontend will be at: http://localhost:8080
echo Backend will be at:  http://localhost:3001
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd server && npm run dev"

REM Wait a bit for backend to start
timeout /t 2 /nobreak >nul

REM Start frontend in current window
npm run dev

