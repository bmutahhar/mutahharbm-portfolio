# Mutahhar Portfolio — Signal Graph

Interactive portfolio built as a node-graph editor: the career is modeled as a
pipeline (education + skills → profile → experience → work → impact → contact/resume)
on an infinite React Flow canvas.

## Tech Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- React Flow (`@xyflow/react`)
- Tailwind CSS v4 (CSS-first tokens, oklch palette)
- shadcn/ui primitives (button, drawer, form, command) + Vaul + cmdk
- next-themes (dark default, light "drafting paper" theme)
- Bricolage Grotesque + IBM Plex Mono via `next/font`

## Features

- Pipeline-shaped canvas with typed ports and kind-tinted animated signal edges
- Single inspector surface for node details — side panel on desktop, bottom sheet on mobile
- Guided tour ("run" the graph) with camera moves, captions, and keyboard control
- ⌘K command palette: jump to modules, copy email, toggle theme, download resume
- Editor chrome: zoom dock, CAD-style status readouts, re-center rescue pill, onboarding hint
- Contact form (react-hook-form + zod) delivered through Resend
- Server-rendered semantic text fallback + structured data for SEO

## Getting Started

1. Install dependencies:
   `pnpm install`
2. Run development server:
   `pnpm dev`
3. Open:
   `http://localhost:3000`

## Scripts

- `pnpm dev` - start local dev server
- `pnpm build` - production build
- `pnpm start` - run production server
- `pnpm lint` - run ESLint (no warnings allowed)
- `pnpm lint:fix` - auto-fix lint issues

## Contact Form (Resend)

The contact view sends messages through `POST /api/contact` backed by Resend.

Set these environment variables:

- `RESEND_API_KEY` - your Resend API key
- `RESEND_FROM_EMAIL` - sender email (for example `Portfolio <hello@yourdomain.com>`)
- `CONTACT_TO_EMAIL` - destination inbox where contact messages are received

## Project Structure

- `src/app` - App Router files (layout, page, global styles, og image, SEO routes)
- `src/components/canvas` - graph data, providers, camera, compound `NodeCard`
  primitives, ports, signal edge, and the eight node modules (`nodes/`)
- `src/components/inspector` - inspector shell, shared view primitives, per-kind
  detail views (`views/`)
- `src/components/chrome` - top bar, dock, command menu, tour, hints, status
  readouts, boot screen
- `src/components/ui` - shadcn/ui primitives actually in use
- `src/data/portfolio-content.ts` - all portfolio content (single source of truth)
- `public` - static assets (resume PDF, favicons)

## Architecture Notes

- `CanvasProvider` exposes a `{ state, actions }` context; consumers never know
  how state is stored (composition over prop drilling).
- `NodeCard` is a compound component — each node composes Eyebrow/Title/Body/
  Stat/ChipRow/Footer and inherits its kind accent via the `--node-accent` CSS
  variable.
- Camera moves go through `use-camera.ts` (`setViewport`/`setCenter`), avoiding
  react-flow's queued `fitView`, which never flushes on a static controlled graph.
- The canvas bundle is loaded with `next/dynamic` (`ssr: false`) behind a boot
  screen; the server response still carries full text content for crawlers.

## Quality Setup

- ESLint configured with strict no-warning policy
- Husky enabled via `prepare` script
