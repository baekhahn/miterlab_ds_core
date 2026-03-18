#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$REPO_ROOT"

printf '\033]0;%s\007' "Build Figma Plugin"

echo "[miterlab] building figma plugin..."
npm run plugin:build
echo "[miterlab] done"
