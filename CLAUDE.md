# Luffy Portfolio — agent guide

Canonical entry point for coding agents working in this repo. Start here, then
follow the links. This file mirrors the Yggdrasil child-repo template: a
canonical router at the root pointing into `docs/` and `designs/`.

## Read first

- **`docs/CONTEXT.md`** — the living snapshot: what this project is, its
  stack, repo topology, and open questions. Always up to date with the latest
  decisions.
- **`docs/adr/`** — the decision record (ADR log). `001-project-init.md` is
  the foundation: project purpose, tech stack, and the standard entry points
  (`setup.sh`, `run.sh`, `test-unit.sh`).
- **`designs/`** — mockups from design-grill sessions for features with a
  visible UI surface.

## Key conventions

- **Framework**: Next.js (App Router) + TypeScript. Read the managed block
  below carefully — this Next.js version has breaking changes from older
  versions; consult `node_modules/next/dist/docs/` before writing code.
- **Entry points** (singular, deterministic):
  - `./setup.sh` — idempotent dependency install
  - `./run.sh` — local dev server (`npm run dev` on :3000, hostname 0.0.0.0)
  - `./test-unit.sh` — unit-phase gate: lint + format; writes
    `.yggdrasil/test-report.json`
- **npm scripts**: `dev`, `build`, `start`, `lint` (ESLint), `format`
  (Prettier `--write .`), `format:check` (Prettier `--check .`).
- **Content**: static, typed, in `src/content/` — single source of truth
  consumed by page components. No backend, no database, no external APIs.
- Keep `docs/CONTEXT.md` in sync when you change decisions; record new
  decisions as ADRs in `docs/adr/`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->