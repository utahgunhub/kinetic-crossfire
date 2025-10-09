#!/bin/bash

echo "🚀 Starting Kinetic Crossfire Development Environment"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check if server/.env exists
if [ ! -f "server/.env" ]; then
    echo "⚠️  Backend .env file not found"
    echo "Creating from example..."
    cd server
    cp env.example .env
    cd ..
    echo ""
    echo "📝 Please edit server/.env and add your GunTab API tokens"
    echo "   Get tokens from: https://www.guntab.com/account/api"
    echo ""
    read -p "Press enter after you've added your tokens..."
    echo ""
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo ""
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd server
    npm install
    cd ..
    echo ""
fi

echo "🎯 Starting servers..."
echo ""
echo "Frontend will be at: http://localhost:8080"
echo "Backend will be at:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup INT TERM

# Start backend in background
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 2

# Start frontend in background
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait

