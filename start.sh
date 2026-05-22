#!/bin/sh

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL environment variable is not set"
  exit 1
fi

echo "DATABASE_URL set: ${DATABASE_URL%%@*}@..."
echo "Running Prisma migrations..."
npx prisma migrate deploy && echo "Migrations OK" || echo "Warning: migration skipped/failed, continuing..."

echo "Starting Next.js..."
exec npm start
