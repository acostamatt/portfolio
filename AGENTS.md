# Portfolio Engineering Guide & Agent Directives

## 1. Context & Role
- **Owner**: Matias Acosta (Full Stack Developer & Consultor ERP / IoT @ Cooperativa Tera).
- **Location**: Rosario, Santa Fe, Argentina.

## 2. Design System & Styling
- **Aesthetic**: Sleek High-Tech & Minimalist. No brutalism, no fictitious counters or terminal animations.
- **Colors**:
  - Primary Brand: `#395CAA` (Blasphemous Blue) | Hover: `#2E4B8C`
  - Light Surface / Muted: `#D5DEEF` (Cold Shoulder) | `#F8FAFC`
  - Dark Surface / Background: `#0A0E17` | `#111726`
- **Navbar Rule**: Navigation links MUST have prominent visual contrast on hover (`px-3.5 py-1.5 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/80 font-semibold`).

## 3. Architecture & Data Integrity
- All dynamic copy must be mapped in `/src/data/translations.ts` (`es` and `en`).
- GitHub accounts:
  - Personal: `https://github.com/acostamatt`
  - Cooperative: `https://github.com/CoopTera/`
  - Academic: `https://github.com/acosta4038`
- Direct Contact:
  - Email: `macosta@tera.coop.ar`
  - WhatsApp: `+5493415152771`
  - LinkedIn: `https://www.linkedin.com/in/acostamati`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
