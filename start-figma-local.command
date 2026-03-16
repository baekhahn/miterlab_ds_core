#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "[miterlab] restarting local figma dev session..."

if pgrep -f "node scripts/figma-dev.mjs" >/dev/null 2>&1; then
  echo "[miterlab] stopping previous figma:dev process"
  pkill -f "node scripts/figma-dev.mjs" || true
  sleep 1
fi

if pgrep -f "esbuild src/code.ts --bundle --platform=browser --target=es2017 --format=iife --outfile=code.js --watch" >/dev/null 2>&1; then
  echo "[miterlab] stopping previous plugin watch"
  pkill -f "esbuild src/code.ts --bundle --platform=browser --target=es2017 --format=iife --outfile=code.js --watch" || true
  sleep 1
fi

PORT_PIDS="$(lsof -ti tcp:8787 || true)"
if [ -n "$PORT_PIDS" ]; then
  echo "[miterlab] freeing port 8787"
  echo "$PORT_PIDS" | xargs kill -TERM || true
  sleep 1
fi

echo "[miterlab] starting figma:dev"
npm run figma:dev
