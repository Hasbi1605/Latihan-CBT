#!/bin/bash
# Bootstrap Latihan-CBT di Ubuntu 24.04 (DigitalOcean Droplet)
set -euo pipefail

AUTH_SECRET="${AUTH_SECRET:?AUTH_SECRET wajib diset}"
REPO_URL="${REPO_URL:-https://github.com/Hasbi1605/Latihan-CBT.git}"
APP_DIR="/opt/latihan-cbt"

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y ca-certificates curl git nginx

# Docker
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

mkdir -p "$APP_DIR"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main

cat > .env.production <<EOF
AUTH_SECRET=${AUTH_SECRET}
DATABASE_URL=file:./prod.db
EOF

export AUTH_SECRET
docker compose -f docker-compose.production.yml build --no-cache
docker compose -f docker-compose.production.yml up -d

cp deploy/nginx-latihan-cbt.conf /etc/nginx/sites-available/latihan-cbt
ln -sf /etc/nginx/sites-available/latihan-cbt /etc/nginx/sites-enabled/latihan-cbt
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx docker
systemctl restart nginx

echo "Latihan-CBT deployed on port 80"
