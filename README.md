# Luffy Portfolio

A fan-facing portfolio / showcase website for **Monkey D. Luffy** from _One
Piece_: his crew, abilities, adventures, and the road to the One Piece.

Content-driven marketing-style site built with Next.js (App Router),
TypeScript, Tailwind CSS, and framer-motion. There is no backend, no database,
and no external APIs — all content is static, typed data in `src/content/`.

Read [`docs/CONTEXT.md`](docs/CONTEXT.md) for the full project context and
[`docs/adr/`](docs/adr/) for the decision record.

## Getting started

```bash
./setup.sh   # idempotent dependency install (npm install / npm ci)
./run.sh     # Next.js dev server on http://localhost:3000 (bound to 0.0.0.0)
```

Manual equivalents:

```bash
npm install          # or: npm ci when package-lock.json is in sync
npm run dev -- --hostname 0.0.0.0
```

## Quality gate

```bash
./test-unit.sh   # runs lint + format:check, writes .yggdrasil/test-report.json
```

The unit phase currently gates on lint (ESLint, Next.js default config) and
format (Prettier). A test framework will be introduced when real testable
logic lands (per ADR 001).

## npm scripts

| Script                 | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start the Next.js dev server    |
| `npm run build`        | Production build                |
| `npm run start`        | Start the production server     |
| `npm run lint`         | ESLint (Next.js default config) |
| `npm run format`       | Prettier `--write .`            |
| `npm run format:check` | Prettier `--check .`            |

## Repository layout

- `src/app/` — App Router pages & layout
- `src/components/` — UI components (e.g. `Reveal`, a framer-motion wrapper)
- `src/content/` — central typed content data (provisional first cut)
- `docs/CONTEXT.md` — living project snapshot
- `docs/adr/` — ADR log (decision history; start with `001-project-init.md`)
- `designs/` — design-grill mockups (self-contained HTML/CSS)
- `.yggdrasil/` — Yggdrasil harness (managed Helm chart, generated reports)
- `setup.sh`, `run.sh`, `test-unit.sh` — standard entry points

## Notes

- The Yggdrasil Helm chart in `.yggdrasil/chart/` is a managed, strict template
  — not hand-edited. Local dev never uses it.
- Fan-made and not affiliated with the creators of _One Piece_.
