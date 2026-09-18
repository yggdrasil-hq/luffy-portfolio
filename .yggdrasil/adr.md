# ADR 001: Project Init — Luffy's Portfolio

**Status:** Accepted (project_init)

**Context:** This is the first ADR for the Luffy's Portfolio project — a portfolio website for the fictional One Piece character Monkey D. Luffy. The primary repo at `/workspace` is essentially empty (only `.git/` and the auto-scaffolded Helm chart exist). This ADR establishes the project's identity, tech stack, and the scaffolding needed to bring the repo in line with Yggdrasil's structure standard.

## Decision

### 1. Project Purpose (seed for `docs/CONTEXT.md`)

Luffy's Portfolio is an **in-universe character portfolio/resume** for Monkey D. Luffy (the protagonist of One Piece). It presents Luffy as if he had a professional portfolio site, showcasing:

- His character stats, abilities, and Devil Fruit powers (Gomu Gomu no Mi / Hito Hito no Mi, Model: Nika)
- His journey and key battles / bounty milestones
- The Straw Hat Pirates crew (each member's profile and role)
- His dream: to become the Pirate King
- A timeline of major adventures (East Blue → Grand Line → New World → Final Saga)

Visually polished with smooth animations (Framer Motion) and a well-laid-out, responsive design (Tailwind CSS). The tone is fun, adventurous, and heroic — matching Luffy's personality.

### 2. Tech Stack

- **Framework:** Next.js (App Router, static export or SSR)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **No backend / database** — purely static content (character data, crew profiles, timeline) stored in TypeScript data files.

### 3. Repo Relationships

Single-repo project. Only the primary repository is linked; no sub-repos. No git submodules to wire in.

### 4. Scaffolding Plan

The following files and directories need to be created from scratch (nothing exists currently except `.git/` and the Helm chart):

| Artifact | Spec |
|---|---|
| `setup.sh` | `#!/usr/bin/env bash` — runs `npm install` to install Next.js, Tailwind CSS, TypeScript, Framer Motion, and development dependencies. |
| `run.sh` | `#!/usr/bin/env bash` — runs `npm run dev` to start the Next.js development server on port 3000. |
| `test-unit.sh` | `#!/usr/bin/env bash` — runs linting and formatting checks (e.g., `npx next lint` + `npx prettier --check .` or equivalent). Must write `.yggdrasil/test-report.json` on completion. |
| `docs/CONTEXT.md` | Living context document (mirrors this ADR's Decisions §1-3 plus ongoing project status). |
| `docs/adr/` | Directory for ADRs, starting with this file as `001-project-init.md`. |
| `designs/` | Directory for design mockups produced by `design_grill` sessions (required because this project has a user-facing web interface). |
| `CLAUDE.md` | Agent router file pointing into `docs/`. Follows yggdrasil-core's `templates/child-repo/CLAUDE.md` pattern. |
| `AGENTS.md` | Thin pointer to `CLAUDE.md`. Follows yggdrasil-core's `templates/child-repo/AGENTS.md` pattern. |
| `Dockerfile` | Multi-stage build for the Next.js app: `npm run build` (with `output: "standalone"` in next.config.ts) then serve via `node server.js`. Exposes port 3000. |
| `.dockerignore` | Excludes `node_modules`, `.next`, `.git`, etc. from Docker build context. |

### 5. Helm Chart Update

The existing Helm chart (`.yggdrasil/chart/`) currently uses the placeholder `nginxdemos/hello` image. It must be updated to:

- Change `values.yaml` `image.repository` to the project's actual image (e.g., `luffy-portfolio`) and `image.tag` to a CI-managed tag.
- Update `deployment.yaml` `containerPort` from `80` to `3000` (Next.js default).
- Update `service.yaml` `targetPort` from `80` to `3000`.
- Add a `checksum/Dockerfile` annotation trigger or similar to ensure proper rollouts when the image changes.

### 6. Has Design Surface

`hasDesignSurface: true` — this is a web portfolio with a user-facing interface. The `designs/` directory will be scaffolded for future `design_grill` sessions.

### 7. No Restructuring Needed

The repo is essentially empty — there is no existing non-conforming code to restructure. Everything is a fresh scaffold.

## Consequences

- The `feature_build` container (next run) will have write access to the repo and will execute the scaffolding plan above.
- After the build PR merges, the repo will conform to Yggdrasil's structure standard and be ready for normal feature development.
- A `design_grill` session should be the first follow-up feature to establish the visual design (mockups in `designs/`).
