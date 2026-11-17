# Active session — Blue Ocean Realty (Pty) Ltd

Max 60 lines, current state only. History: `context/docs/session-log.md`.

## Current state
23-page static site (Tailwind + vanilla JS, PHP-first contact form with FormSubmit fallback). Full mobile optimization and viewport hardening across all 11 commercial & industrial listing pages completed and verified across 320px, 375px, 414px, and 1440px. Not yet deployed.

## In progress
- None.

## Next steps (ordered)
1. Clear `apex_check` errors (run `node ~/.gemini/apex-library/tools/apex_check.mjs .` from the project root): banned copy words (19, e.g. "seamless", "Sanctuary", "Elevated" on listing pages) and one star glyph in `css/tier-trophy.css`.
2. Add JSON-LD (`RealEstateAgent` + `Organization` + `Person`, per-listing `Offer`) and meta descriptions; 19 pages have no schema, 11 have no meta description.
3. Review warnings: default fonts (Inter, Playfair) on listing pages, eyebrow labels, 91 images without width/height.
4. Render check at 320, 375 and 1440 px, then deploy to the Cloudflare Pages staging preview for stakeholder review.

## Blockers / waiting on client
- FFC numbers: "In process / available on request".

## Decisions that must not be re-litigated
- 2026-11 — Site is the official showcase of Blue Ocean Realty (Pty) Ltd; Rohan Ramlall appears as Candidate Property Practitioner under Benjamin Govindraj (PPA 22 of 2019, Reg. 34).
- 2026-11 — Standalone Blue Ocean Realty logo in the header; no "Rohan Realty" primary branding.
