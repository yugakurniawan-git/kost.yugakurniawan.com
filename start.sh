#!/bin/sh

# Fallback jika Coolify belum set DATABASE_URL
DATABASE_URL="${DATABASE_URL:-postgresql://bantukos:BantuKos2026!@bantukos-postgres:5432/bantukos_reports?schema=public}"
export DATABASE_URL

echo "DATABASE_URL set: ${DATABASE_URL%%@*}@..."
echo "Running Prisma migrations..."
npx prisma migrate deploy && echo "Migrations OK" || echo "Warning: migration skipped/failed, continuing..."

echo "Starting Next.js..."
exec npm start
