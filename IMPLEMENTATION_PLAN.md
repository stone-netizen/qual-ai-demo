# Implementation Plan

> Last updated: 2026-02-04
> Status: P0 Quiz Funnel complete. P1 Infrastructure complete. P3 Cleanup complete. Remaining: P2 Tailwind.

---

## Summary

The **QualAI Quiz Funnel** (`specs/quiz-*.md`, `specs/design-system.md`) is fully implemented. All quiz components, results page, and data flow are complete.

**Current Status:**
- **P0 (Quiz Funnel):** ✅ 100% complete — All core functionality works
- **P1 (Infrastructure):** ✅ 100% complete — 404, ErrorBoundary, A11Y, SEO all done
- **P2 (Tailwind):** ❌ 0% complete — Still using CDN with inline config
- **P3 (Cleanup):** ✅ 100% complete — All orphan files removed, unused config cleaned

---

## Gap Analysis Summary

### Specs vs Code Status

| Spec | Status | Notes |
|------|--------|-------|
| `quiz-funnel-overview.md` | ✅ Complete | All sections implemented |
| `quiz-page.md` | ✅ Complete | All requirements satisfied |
| `quiz-questions.md` | ✅ Complete | All 6 steps + contact info |
| `results-page.md` | ✅ Complete | All sections implemented |
| `design-system.md` | ✅ Complete | Typography now uses Inter only |

### Remaining Issues

1. **Tailwind**: CDN-based, not build-time (components.json has empty tailwind paths)

---

## Remaining Tasks (Priority Order)

### P2 — Tailwind Migration (CDN → Build-Time)

Tailwind runs via CDN with inline config in `index.html`. No build-time CSS pipeline exists. The `components.json` file has empty paths for tailwind config and css.

- [ ] **TW-001: Create build-time Tailwind infrastructure**
  - **Files**: New files: `tailwind.config.ts`, `postcss.config.js`, `src/index.css`; Update: `components.json`
  - **Changes**:
    - Install `tailwindcss`, `postcss`, `autoprefixer` as dev dependencies
    - Create `tailwind.config.ts` with custom theme from `index.html` inline config (colors, fontFamily)
    - Create `postcss.config.js`
    - Create CSS file with Tailwind directives (`@tailwind base;`, etc.)
    - Migrate custom CSS animations from `index.html` (~280 lines of keyframes)
    - Import CSS file in `index.tsx`
    - Update `components.json` with correct tailwind paths (`tailwind.config.ts`, `src/index.css`)
  - **Acceptance criteria**:
    - `tailwind.config.ts` exists with all custom theme values (navy colors, accent, Inter font)
    - `postcss.config.js` exists
    - CSS file imported in entry point
    - `components.json` tailwind paths are valid and point to real files

- [ ] **TW-002: Remove Tailwind CDN from index.html**
  - **Files**: `index.html`
  - **Changes**:
    - Remove `<script src="https://cdn.tailwindcss.com"></script>`
    - Remove inline `tailwind.config` block (lines 22-41)
    - Move remaining `<style>` content to CSS file (keyframes already migrated in TW-001)
    - Keep only minimal head content (meta tags, font links, favicon)
  - **Acceptance criteria**:
    - No Tailwind CDN script in `index.html`
    - No inline `tailwind.config` in `index.html`
    - `<style>` block removed (all CSS in build-time file)
    - All pages render correctly with build-time Tailwind
    - Visual check at 375px, 768px, 1440px passes

---

## Completed Items

### P0 — QualAI Quiz Funnel (COMPLETE)

All 25 tasks from Phases 0A-0E are complete.

#### Phase 0A: Foundation & Routing (COMPLETE)

- [x] **QZ-001: Add QUIZ route to constants and App.tsx**
- [x] **QZ-002: Create quiz TypeScript types**
- [x] **QZ-003: Create quiz constants**

#### Phase 0B: Quiz Page Components (COMPLETE)

- [x] **QZ-004: Create Quiz page orchestrator** (`pages/Quiz.tsx`)
- [x] **QZ-005: Create HeroSection component** (`components/quiz/HeroSection.tsx`)
- [x] **QZ-006: Create BenefitsSection component** (`components/quiz/BenefitsSection.tsx`)
- [x] **QZ-007: Create QuizForm container** (`components/quiz/QuizForm.tsx`)
- [x] **QZ-008: Create QuizStep component** (`components/quiz/QuizStep.tsx`)
- [x] **QZ-009–QZ-013: Implement Steps 1-5**
- [x] **QZ-014: Create ContactInfoStep component** (`components/quiz/ContactInfoStep.tsx`)
- [x] **QZ-015: Implement quiz navigation and validation**
- [x] **QZ-016: Create quiz mobile StickyCTA** (`components/quiz/QuizStickyCTA.tsx`)

#### Phase 0C: Results Page Components (COMPLETE)

- [x] **QZ-017: Create QuizResults view** (integrated in `pages/Quiz.tsx`)
- [x] **QZ-018: Create ResultsBanner component** (`components/quiz/ResultsBanner.tsx`)
- [x] **QZ-019: Create VSLSection component** (`components/quiz/VSLSection.tsx`)
- [x] **QZ-020: Create CalendarSection component** (`components/quiz/CalendarSection.tsx`)
- [x] **QZ-021: Create results mobile StickyCTA** (reuses `QuizStickyCTA.tsx`)

#### Phase 0D: Quiz Data Flow (COMPLETE)

- [x] **QZ-022: Implement quiz submission handler**
- [x] **QZ-023: Pass quiz data to Results view**

#### Phase 0E: Design System Compliance (COMPLETE)

- [x] **QZ-024: Apply design system styles**
- [x] **QZ-025: Ensure mobile-first responsive layout**

#### Tests (COMPLETE)

- [x] **TEST-001: Add quiz funnel routing tests**

### P1 — Infrastructure (COMPLETE)

- [x] **INFRA-001: Add 404 catch-all route** ✅
- [x] **INFRA-002: Add Error Boundary** ✅
- [x] **A11Y-001: Add mobile menu accessibility attributes** ✅
- [x] **SEO-001: Fix OG meta tags in index.html** ✅
  - `og:title` set to "QualAI | High-Ticket Calls + AI Capture System"
  - `<meta name="description">` tag exists
  - Page title reflects QualAI branding
- [x] **SEO-002: Add robots.txt** ✅
  - `robots.txt` exists in `public/`
- [x] **SEO-003: Add sitemap.xml** ✅
  - `sitemap.xml` exists in `public/`
  - Contains main page URLs (/, /quiz, /how-it-works, /demo, /audit, /privacy, /terms)
  - Valid XML structure

### P3 — Cleanup (COMPLETE)

- [x] **DS-001: Unify heading font to Inter** ✅
  - Removed Lexend from Google Fonts link
  - Removed `font-heading` from Tailwind config
  - Removed CSS rule setting h1-h4 to Lexend
  - Removed all `font-heading` class usages from 12 files
- [x] **CLEAN-001: Delete orphaned SocialProofToast.tsx** ✅
- [x] **CLEAN-002: Remove stale copy-of-qual-ai-lead-loss-audit.zip** ✅
- [x] **CLEAN-003: Remove alexhormoziimplementation file** ✅
- [x] **CLEAN-004: Remove stale new_plan.md file** ✅
- [x] **CLEAN-005: Remove unused GEMINI_API_KEY config** ✅
  - Removed unused `define` block and `loadEnv` import from vite.config.ts

---

## Key Architecture Decisions

- **Quiz Funnel**: Single page (`/quiz`) with conditional rendering
  - `view === 'quiz'`: Shows HeroSection, BenefitsSection, QuizForm
  - `view === 'results'`: Shows ResultsBanner, VSLSection, CalendarSection
- **Quiz State**: Component-level state in Quiz.tsx (quizData, view)
- **StickyCTA**: Reusable component with Intersection Observer for both quiz and results
- **Component Structure**: Individual components for each section, orchestrated by Quiz.tsx
- **Tailwind CSS via CDN** — migration to build-time pending (P2)
- **HashRouter** (routes prefixed with `/#/`)
- **Code splitting**: React.lazy() for page components

---

## Quiz Components Structure

```
components/quiz/
├── HeroSection.tsx      # Hero with headline, CTA, trust bar
├── BenefitsSection.tsx  # 5 benefit cards with icons
├── QuizForm.tsx         # Main quiz orchestrator (state, steps, navigation)
├── QuizStep.tsx         # Reusable step with option cards
├── TextInput.tsx        # Text input field component
├── ContactInfoStep.tsx  # Step 6 contact form
├── QuizStickyCTA.tsx    # Mobile sticky CTA (intersection observer)
├── ResultsBanner.tsx    # Results page hero banner
├── VSLSection.tsx       # Video section with benefit bullets
└── CalendarSection.tsx  # Calendar booking section
```

---

## Notes

- Primary conversion flow: `/quiz` → Quiz form → Results (calendar booking)
- Quiz funnel is the primary funnel (audit funnel at `/audit` still exists)
- All quiz components use Shadcn/Tailwind styling
- Video and calendar are placeholders pending real integrations
- `quizData` is captured and available for future personalization/API submission
