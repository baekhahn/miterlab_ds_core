#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Syncing Button/Input contract -> docs -> inspections -> plugin build"
npm run sync:button-input
echo
echo "Done."
