#!/usr/bin/env bash
#
# run.sh — the single deterministic command that brings the app up locally.
#
# Starts the Next.js dev server on port 3000, bound to 0.0.0.0 so the preview
# ingress can reach it. Guarded: without node_modules/ it prints a hint and
# exits non-zero.
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "node_modules/ not found — run ./setup.sh first." >&2
  exit 1
fi

exec npm run dev -- --hostname 0.0.0.0