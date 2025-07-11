#!/bin/bash

set -e

echo "🚀 Starting MonoLink build process..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build shared packages first
echo "🔨 Building shared packages..."
pnpm --filter @monolink/types type-check
pnpm --filter @monolink/utils type-check

# Build CMS (if needed)
echo "🏗️ Building CMS..."
if [ -f "apps/cms/.env" ]; then
  pnpm --filter @monolink/cms build
else
  echo "⚠️ CMS .env file not found, skipping CMS build"
fi

# Build frontend
echo "🎨 Building frontend..."
pnpm --filter @monolink/frontend build

echo "✅ Build completed successfully!"