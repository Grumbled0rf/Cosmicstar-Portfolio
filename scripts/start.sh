#!/bin/bash

echo "=========================================="
echo "  Cosmicstar CMS - Starting Services"
echo "=========================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Start all services
echo ""
echo "Starting Supabase and Next.js..."
docker-compose up -d

echo ""
echo "Waiting for services to be ready..."
sleep 10

echo ""
echo "=========================================="
echo "  Services Started Successfully!"
echo "=========================================="
echo ""
echo "  Next.js App:      http://localhost:3000"
echo "  Supabase API:     http://localhost:8000"
echo "  Supabase Studio:  http://localhost:3001"
echo "  PostgreSQL:       localhost:5432"
echo ""
echo "  Default Admin:    admin@cosmicstar.com"
echo ""
echo "=========================================="
echo ""
echo "To view logs:    docker-compose logs -f"
echo "To stop:         docker-compose down"
echo ""
