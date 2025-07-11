#!/bin/bash

set -e

echo "🚀 Starting MonoLink deployment process..."

# Build the project
echo "🔨 Building project..."
./scripts/build.sh

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
if command -v vercel &> /dev/null; then
  cd apps/frontend
  vercel --prod
  cd ../..
else
  echo "⚠️ Vercel CLI not found. Please install it with: pnpm add -g vercel"
  echo "Then run: vercel login and vercel --prod in apps/frontend directory"
  exit 1
fi

echo "✅ Deployment completed successfully!"