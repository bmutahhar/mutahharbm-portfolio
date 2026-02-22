
# Mutahhar Portfolio

Interactive portfolio built with Next.js App Router and React Flow.

## Tech Stack

- Next.js 16
- React 18
- TypeScript
- React Flow (`@xyflow/react`)
- Tailwind CSS v4
- Motion (`motion/react`)
- shadcn/ui + Radix + Vaul
- next-themes

## Features

- Interactive node-based portfolio canvas
- Custom glowing animated edges
- Responsive layouts for desktop, tablet, and mobile
- Theme toggle (light/dark)
- Mobile/tablet drawer navigation
- Dialog-based section content (profile, work, experience, skills, education, contact)
- Resume node that opens the PDF in a new tab
- Branded monogram logo (`mbm.`) used in navbar

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

## Project Structure

- `src/app` - Next.js app router files (`layout`, `page`, global styles)
- `src/components` - flow canvas, navbar, dialogs, shared UI
- `src/components/nodes` - reusable node components and wrappers
- `src/components/navbar` - desktop/mobile navbar + theme toggle + brand logo
- `src/data/flow-layout-data.ts` - desktop/tablet/mobile nodes and edges
- `public` - static assets (resume PDF, logo SVGs)

## Brand Assets

- Primary navbar logo: `public/mbm-logo.svg`
- Alternate logo variant: `public/mbm-logo-v2.svg`

## Quality Setup

- ESLint configured with strict no-warning policy
- Husky enabled via `prepare` script
  
