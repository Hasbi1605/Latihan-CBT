#!/usr/bin/env bash
# Deploy / redeploy Latihan-CBT di Droplet (dipanggil GitHub Actions atau manual SSH).
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/latihan-cbt}"
BRANCH="${DEPLOY_BRANCH:-main}"
COMPOSE_FILE="docker-compose.production.yml"

: "${AUTH_SECRET:?AUTH_SECRET wajib diset}"

cd "$APP_DIR"

echo ">> git pull ($BRANCH)"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
echo ">> commit: $(git rev-parse --short HEAD)"

echo ">> docker build"
export AUTH_SECRET
docker compose -f "$COMPOSE_FILE" build

echo ">> docker up"
docker compose -f "$COMPOSE_FILE" up -d --force-recreate

echo ">> tunggu app siap"
ready=0
for i in $(seq 1 40); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/login 2>/dev/null || echo "000")
  echo "   check $i -> HTTP $code"
  if [ "$code" = "200" ]; then
    ready=1
    break
  fi
  sleep 3
done

if [ "$ready" != "1" ]; then
  echo "ERROR: app tidak ready"
  docker compose -f "$COMPOSE_FILE" logs --tail=40
  exit 1
fi

echo ">> verifikasi login cookie (tanpa Secure di HTTP)"
cookie_header=$(curl -s -X POST http://127.0.0.1/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nomorPeserta":"1234567890","password":"password"}' \
  -D - -o /dev/null | grep -i "^set-cookie:" || true)

echo "$cookie_header"

if [ -z "$cookie_header" ]; then
  echo "ERROR: tidak ada Set-Cookie dari login API"
  exit 1
fi

if echo "$cookie_header" | grep -qi "; Secure"; then
  echo "ERROR: cookie masih Secure — login via HTTP akan gagal"
  exit 1
fi

echo ">> COOKIE_SECURE di container: $(docker compose -f "$COMPOSE_FILE" exec -T cbt printenv COOKIE_SECURE 2>/dev/null || echo missing)"
echo ">> DEPLOY_SELESAI"
