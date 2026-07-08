#!/bin/sh
set -e
cd /app

if [ ! -f prisma/prod.db ]; then
  echo ">> Inisialisasi database pertama kali..."
  npx prisma migrate deploy
  npm run db:seed
else
  echo ">> Migrasi database..."
  npx prisma migrate deploy
fi

exec "$@"
