# ADR 001: Project Init — Luffy Portfolio

- **Status**: Accepted
- **Date**: 2026-09-16
- **Project**: `luffy-portfolio` (primary repo: `https://github.com/yggdrasil-hq/luffy-portfolio.git`)

## Context

This is the first-feature (`project_init`) ADR for a newly created project (ADR 002 §5-8). The primary repo is currently empty of application code: it contains only the Yggdrasil-scaffolded Helm chart (`.yggdrasil/chart/`, 4 commits) and no application code, docs, or scripts. No sub-repos are linked to this project.

This ADR establishes what the project is, and specifies the scaffolding/restructuring needed to bring the primary repo in line with Yggdrasil's child-project structure standard.

## Decision

### What the project is

A fan-facing portfolio / showcase website for the character Luffy (Monkey D. Luffy) from _One Piece_. The site displays his adventures, skills/abilities, crew (Straw Hat Pirates), and achievements, aimed at fans of the series. It is a content-driven marketing-style site, not an application with user accounts or dynamic data.

### Tech stack

- **Next.js, App Router, TypeScript** — scaffolded via `create-next-app@latest` (TS is its default), App Router for content routes.
- **Tailwind CSS** — styling utility layer.
- **framer-motion** — page/section animations (scroll reveals, hero animation, transitions).
- **npm** — package manager (`packageManager` pinned in `package.json`).
- **No backend, no database, no external APIs** — all content is static data/structured content inside the repo, rendered by Next.js. The hosted app runs on Next.js's Node server inside the Helm chart's container.
- Tooling: **ESLint** (Next.js default, `next lint`), **Prettier** (`prettier --check` / `--write` scripts).
- Suggested initial content model (typed TS interfaces): a central content data file defining crew members (name, role, epithet, bounty, image), adventures/saga timeline entries, and skill/ability entries — consumed by page components. (Exact shape is for the design session / first feature build to refine.)

### Repo relationships

Single-repo project. `/workspace` is the only linked repo and the primary. There are **no sub-repos**, so there is nothing to wire as a git submodule and no cross-repo runtime relationship to model. All local-run and hosting concerns are contained in this one repo.

### Scaffolding plan

The repo is empty of non-conforming code (only the Helm chart scaffold exists, which is already conformant), so everything below is scaffold-from-scratch by the `feature_build` run. No restructuring of existing code is required.

1. **`setup.sh`** (required — the project needs a bootstrap step):
   - Idempotent one-time environment setup.
   - Behavior: if `node_modules/` is missing or `package.json`/`package-lock.json` is newer than the last install, run `npm install` (npm is the pinned manager; `npm ci` when `package-lock.json` is present and up to date with `package.json`). Exit 0 if dependencies are already satisfied. No env-file generation, no database seeding (nothing to seed).
2. **`run.sh`** (required — always):
   - The single deterministic command that brings the app up locally: `npm run dev` (Next.js dev server on port 3000, `--hostname 0.0.0.0` so the preview ingress can reach it).
   - Guard: if `node_modules/` is missing, print a hint to run `./setup.sh` first and exit non-zero.
   - No docker-compose; this is the local-dev entry point only.
3. **`test-unit.sh`** (present ⇒ unit-test phase is enabled):
   - For now it runs **lint + format checks**, not a test framework: `npm run lint` and `npm run format:check` (Prettier `--check`), both of which the scaffold must define as npm scripts. No JSDoc/type-check step beyond what `next lint` implies.
   - Contract: exit with the checks' combined status and write the canonical `.yggdrasil/test-report.json` — `{passed, failed, skipped, total, coveragePercent?, failingTests}` — treating lint and format as two checks (e.g. `total: 2`, each pass/fail; on failure the offending rules/files listed in `failingTests`). `coveragePercent` omitted.
   - When a later feature introduces real testable logic, its ADR may upgrade this script to run Vitest; until then lint+format is the defined scope.
4. **`test-integration.sh`**: **omitted** — no backend or cross-service behavior to integrate. Presence is the toggle, and absence disables the integration phase cleanly.
5. **`docs/CONTEXT.md`** (required — always): scaffold with the decided context from this ADR (project purpose, stack, single-repo topology, decided-vs-open items — e.g. open: exact content model, site sections/navigation, visual theme) as the living snapshot.
6. **`docs/adr/`** (required — always): create the directory and store this ADR as `docs/adr/001-project-init.md`.
7. **`designs/`** (required — this project has a user-facing web interface): scaffold the directory for `design_grill` session output (self-contained HTML/CSS mockups). See `hasDesignSurface` below.
8. **`CLAUDE.md` + `AGENTS.md`** (required — always): an agent router at the repo root mirroring yggdrasil-core's `templates/child-repo/` pattern — `CLAUDE.md` is the canonical router pointing into `docs/` (CONTEXT.md, the ADR log, designs/); `AGENTS.md` is a thin pointer to `CLAUDE.md`.
9. **Application scaffold**: `create-next-app@latest` (TypeScript, App Router, Tailwind, ESLint, `src/` dir), then add `framer-motion` and `prettier` as dependencies. Default Next.js lint config accepted; Prettier wired with `format` (`prettier --write .`) and `format:check` (`prettier --check .`) npm scripts.

### Helm chart

The Helm chart already exists at `.yggdrasil/chart/` (scaffolded at project creation per ADR 003 §12 — strict template, `Chart.yaml`, `values.yaml`, `templates/deployment.yaml`, `templates/service.yaml`, image placeholder `nginxdemos/hello`). **Confirmed present and conformant; no re-scaffolding here.** Its `values.yaml` image placeholder is updated later by the hosting pipeline when the primary deployment image for this app is built — local dev never uses the chart.

### Sub-repos as git submodules

None — the project has no linked sub-repos. Nothing to wire.

### `hasDesignSurface`

**true** — this is a user-facing website, so `designs/` is scaffolded and `design_grill` sessions apply to features with visible UI.

## Consequences

- A developer on this repo can bring the full site up locally with two deterministic commands: `./setup.sh` then `./run.sh`.
- `script_test_run` runs a green lint+format gate in the unit phase from day one; the integration phase is off until a feature introduces cross-service behavior.
- Future features are specced via the standard feature grill against `docs/CONTEXT.md` and the `docs/adr/` log, with mockups produced under `designs/` for UI work.
- No action items gate this build: no secrets, no design session, no blocking subtask features, no external test requests.
