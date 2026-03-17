#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

printf '\033]0;%s\007' "Build Figma Plugin"

echo "[miterlab] building figma plugin..."
npm run plugin:build
echo "[miterlab] done"
