# Luffy Portfolio — Project Context

Living snapshot of the project's decisions and open questions. Updated as
features land (start with the ADR log below for the authoritative decision
history).

## Purpose

A fan-facing portfolio / showcase website for **Monkey D. Luffy** from _One
Piece_. The site displays his adventures, skills/abilities, crew (the Straw
Hat Pirates), and achievements. It is a content-driven marketing-style site —
no user accounts, no dynamic data.

## Tech stack

| Concern         | Choice                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| Framework       | Next.js (App Router), TypeScript                                       |
| Styling         | Tailwind CSS                                                           |
| Animations      | framer-motion (scroll reveals, hero animation, transitions)            |
| Package manager | npm (pinned via `packageManager` in `package.json`)                    |
| Lint            | ESLint — `npm run lint` (Next.js default config)                       |
| Format          | Prettier — `npm run format` / `npm run format:check`                   |
| Backend/data    | None — static content in `src/content/`, no database, no external APIs |

## Topology

Single-repo project. `/workspace` (`luffy-portfolio`) is the only linked repo
and the primary. There are **no sub-repos**, so nothing is wired as a git
submodule and there is no cross-repo runtime relationship.

Hosting: the Yggdrasil-managed Helm chart lives in `.yggdrasil/chart/`
(scaffolded, strict template — not hand-edited). The deployed app runs on
Next.js's Node server inside that chart's container; local dev never uses the
chart.

## Running the project

```bash
./setup.sh   # idempotent dependency install (npm install / npm ci)
./run.sh     # Next.js dev server on :3000, bound to 0.0.0.0
./test-unit.sh  # lint + format gate; writes .yggdrasil/test-report.json
```

## Repository layout

- `src/app/` — App Router pages & layout
- `src/components/` — UI components (e.g. `Reveal`, a framer-motion wrapper)
- `src/content/` — central typed content data (crew, sagas, abilities)
- `docs/adr/` — architecture decision record log (decision history)
- `docs/CONTEXT.md` — this file (living snapshot)
- `designs/` — mockups produced by `design_grill` sessions (self-contained
  HTML/CSS per feature)
- `.yggdrasil/` — Yggdrasil harness (Helm chart; generated test reports)
- `setup.sh`, `run.sh`, `test-unit.sh` — the standard entry points (see ADR 001)

## Decided

- Project purpose and stack (ADR 001) — see decision history below.
- No backend, no database, no external APIs; all content is static in-repo
  data consumed by page components.
- Single-repo topology; no sub-repos to wire.
- Local entry points: `./setup.sh` → `./run.sh`; the unit-phase gate is
  lint + format via `./test-unit.sh`; no integration phase until a feature
  introduces cross-service behavior.
- The Helm chart scaffold is conformant and untouched.

## Open (refined by future design sessions / feature builds)

- **Exact content model shape** — a provisional first cut exists in
  `src/content/` (crew member, saga, ability interfaces); the design session
  refines it.
- **Site sections & navigation** — the homepage currently renders hero,
  abilities, crew, and a saga timeline; final IA is open.
- **Visual theme** — light, amber/zinc palette currently; the official visual
  theme is open until mockups land in `designs/`.
- **Assets** — crew portraits etc. are placeholders (initials); image assets
  land in a future pass.

## Decision history

See `docs/adr/` (start: `001-project-init.md`).
