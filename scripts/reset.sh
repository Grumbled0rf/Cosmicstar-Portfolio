#!/bin/bash

echo "=========================================="
echo "  Cosmicstar CMS - Reset Database"
echo "=========================================="
echo ""
echo "WARNING: This will delete all data!"
read -p "Are you sure? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Stopping services..."
    docker-compose down -v

    echo "Removing database volume..."
    docker volume rm cosmicstar-cms_db-data 2>/dev/null || true
    docker volume rm cosmicstar-cms_storage-data 2>/dev/null || true

    echo "Starting fresh..."
    docker-compose up -d

    echo ""
    echo "Database reset complete!"
    echo ""
fi
