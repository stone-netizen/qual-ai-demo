# AGENTS.md - Operational Guide

## Build & Run

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

## Validation

Run after implementing to get immediate feedback:

```bash
npm run build              # TypeScript + Vite build (catches type errors)
npx tsc --noEmit           # Type check only
npm run test:run           # Run all tests once
npm run test               # Run tests in watch mode
```

## Project Structure

- `pages/` - Route pages (Home, Demo, Contact, legal pages)
- `components/` - Reusable UI components
- `lib/` - Utilities and helpers
- `api/` - Vercel serverless functions
- `specs/` - Feature specifications
- `test/` - Vitest tests and setup

## Tech Stack

- React 19 + TypeScript
- Vite for bundling
- Framer Motion for animations
- React Router for routing
- Deployed on Vercel

## Codebase Patterns

- Use Framer Motion for animations (see `lib/animations.ts`)
- Components use TypeScript interfaces for props
- All copy driven from `constants.ts`

## Environment Variables

Required for Retell voice demo (set in Vercel dashboard):
- `RETELL_API_KEY` - Retell AI API key
- `RETELL_AGENT_ID` - Retell agent ID

See `.env.example` for reference.

