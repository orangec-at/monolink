#!/bin/bash

set -e

echo "🚀 Starting MonoLink development environment..."

# Check if CMS .env exists
if [ ! -f "apps/cms/.env" ]; then
  echo "⚠️ CMS .env file not found. Please copy apps/cms/.env.example to apps/cms/.env and configure your environment variables."
  exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install
fi

echo "🏗️ Starting CMS development server..."
pnpm --filter @monolink/cms dev &
CMS_PID=$!

# Wait a bit for CMS to start
sleep 5

echo "🎨 Starting frontend development server..."
pnpm --filter @monolink/frontend dev &
FRONTEND_PID=$!

# Function to handle cleanup on exit
cleanup() {
  echo "🛑 Shutting down development servers..."
  kill $CMS_PID $FRONTEND_PID 2>/dev/null || true
  exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo "✅ Development servers started!"
echo "📝 CMS Admin: http://localhost:1337/admin"
echo "🌐 Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop all servers"

# Wait for background processes
wait