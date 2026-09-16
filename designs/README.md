# designs/

Mockups produced by `design_grill` sessions for features with a visible UI
surface.

## Conventions

- One directory per feature: `designs/<feature-slug>/` holding that feature's
  mockups.
- Mockups are **self-contained HTML/CSS** (inline styles or a single local
  stylesheet) so each file opens and previews standalone — no build step, no
  external dependencies.
- Each mockup may include short annotations (`data-note` attributes or HTML
  comments) recording the rationale behind layout / interaction choices.

## Status

Empty until the first design-grill session. The current homepage (hero,
abilities, crew, saga timeline, in `src/app/page.tsx`) is a provisional first
cut rendered from `src/content/` — treat it as scaffolding, not design.
