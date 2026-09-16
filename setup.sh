#!/usr/bin/env bash
#
# setup.sh — idempotent one-time environment setup for luffy-portfolio.
#
# Installs dependencies when node_modules/ is missing or stale (package.json /
# package-lock.json newer than the last install). Uses `npm ci` when a
# package-lock.json exists and is in sync with package.json, otherwise
# `npm install`. Exits 0 when dependencies are already satisfied.
#
# There is intentionally no env-file generation or database seeding — this
# project has no backend, no database, and no external APIs (ADR 001).
set -euo pipefail

cd "$(dirname "$0")"

needs_install=false

if [ ! -d node_modules ]; then
  needs_install=true
elif [ ! -f node_modules/.package-lock.json ]; then
  # Installed tree exists but carries no install marker — cannot verify it
  # matches the manifest, so reinstall to be safe.
  needs_install=true
elif [ package.json -nt node_modules/.package-lock.json ] ||
  [ package-lock.json -nt node_modules/.package-lock.json ]; then
  needs_install=true
fi

if [ "$needs_install" = false ]; then
  echo "Dependencies already satisfied — nothing to do."
  exit 0
fi

echo "Installing dependencies (npm)…"
if [ -f package-lock.json ] && [ ! package.json -nt package-lock.json ]; then
  # Lockfile present and at least as new as the manifest — reproduce it exactly.
  npm ci
else
  npm install
fi

echo "Done. Start the dev server with ./run.sh"