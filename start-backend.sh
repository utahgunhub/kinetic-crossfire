#!/bin/bash

echo "🚀 Starting Kinetic Crossfire Backend Server"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Navigate to server directory
cd server

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "Creating .env from example..."
    cp env.example .env
    echo ""
    echo "⚠️  Please edit server/.env and add your GunTab API tokens"
    echo "Get tokens from: https://www.guntab.com/account/api"
    echo ""
    read -p "Press enter after you've added your tokens to .env..."
fi

# Start the server
echo "🌐 Starting server on http://localhost:3001"
echo ""
npm run dev

