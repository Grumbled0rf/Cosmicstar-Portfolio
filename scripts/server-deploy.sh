#!/bin/bash
# Server-side deployment script for Cosmicstar CMS
# Run this on your Digital Ocean Droplet

set -e

APP_DIR="/opt/cosmicstar"
COMPOSE_FILE="docker-compose.yml"

echo "=== Cosmicstar CMS Deployment ==="

# Navigate to app directory
cd "$APP_DIR"

# Pull latest changes
echo "Pulling latest code..."
git fetch origin main
git reset --hard origin/main

# Pull latest Docker images
echo "Pulling Docker images..."
docker compose pull

# Build the app container
echo "Building application..."
docker compose build app

# Start/restart services
echo "Starting services..."
docker compose up -d

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 15

# Health check
echo "Running health check..."
if curl -sf http://localhost:3002/api/health > /dev/null; then
    echo "Health check passed!"
else
    echo "Health check failed!"
    docker compose logs app --tail=50
    exit 1
fi

# Cleanup old images
echo "Cleaning up old images..."
docker image prune -f

echo "=== Deployment Complete ==="
echo "App: http://localhost:3002"
echo "Supabase Studio: http://localhost:3005"
echo "Kong API: http://localhost:8000"
