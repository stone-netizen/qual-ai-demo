# Implementation Plan

> Last updated: 2026-02-04
> Status: P0 Quiz Funnel complete. P1 Infrastructure partially complete (404, ErrorBoundary, A11Y done). Remaining: P1 SEO, P2 Tailwind, P3 Cleanup.

---

## Summary

The **QualAI Quiz Funnel** (`specs/quiz-*.md`, `specs/design-system.md`) is now fully implemented. All quiz components, results page, and data flow are complete.

**Status:**
- **P0 (Quiz Funnel):** 100% complete
- **P1 (Infrastructure):** Partial — Missing 404 route, error boundary, accessibility improvements
- **P2 (Tailwind):** 0% complete — Still using CDN with inline config
- **P3 (Cleanup):** Orphan files exist

---

## Completed Items

### P0 — QualAI Quiz Funnel (COMPLETE)

All 25 tasks from Phases 0A-0E are complete.

#### Phase 0A: Foundation & Routing (COMPLETE)

- [x] **QZ-001: Add QUIZ route to constants and App.tsx**
  - Route `/quiz` added to `constants.ts`
  - Lazy-loaded Quiz page in `App.tsx`
  - Header/footer hidden for quiz route

- [x] **QZ-002: Create quiz TypeScript types**
  - Created `lib/quiz-types.ts` with:
    - `QuizData` interface matching spec schema
    - All type unions (BusinessType, MonthlyJobs, etc.)
    - `QuizStep`, `QuizStepConfig`, `QuizOption` types
    - `initialQuizData` helper

- [x] **QZ-003: Create quiz constants**
  - Created `lib/quiz-constants.ts` with:
    - Question text for all 6 steps
    - Option values and labels
    - Hero copy, benefits copy, results copy
    - Validation regex and messages

#### Phase 0B: Quiz Page Components (COMPLETE)

- [x] **QZ-004: Create Quiz page orchestrator** (`pages/Quiz.tsx`)
- [x] **QZ-005: Create HeroSection component** (`components/quiz/HeroSection.tsx`)
- [x] **QZ-006: Create BenefitsSection component** (`components/quiz/BenefitsSection.tsx`)
- [x] **QZ-007: Create QuizForm container** (`components/quiz/QuizForm.tsx`)
- [x] **QZ-008: Create QuizStep component** (`components/quiz/QuizStep.tsx`)
- [x] **QZ-009: Implement Step 1 - Business Type**
- [x] **QZ-010: Implement Step 2 - Volume & Job Value**
- [x] **QZ-011: Implement Step 3 - Leads & Calls**
- [x] **QZ-012: Implement Step 4 - Missed Calls & Follow-up**
- [x] **QZ-013: Implement Step 5 - Budget & Model Fit**
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
  - Quiz card: max-width 480px, rounded-2xl, shadow-lg
  - Option cards: min 56px height, full tappable blocks
  - Buttons: min 52px height
  - Progress bar: 8px height
  - Mobile-first responsive layout

- [x] **QZ-025: Ensure mobile-first responsive layout**
  - Mobile: 16px padding, full-width quiz card
  - Desktop: centered 480px quiz card
  - Sticky CTA on mobile

#### Tests (COMPLETE)

- [x] **TEST-001: Add quiz funnel routing tests**
  - Quiz route test added to `test/routing.test.tsx`
  - Audit route test added
  - Header hidden tests for Quiz and Audit pages
  - Total: 34 passing tests

---

## Tasks (Priority Order)

### P1 — Infrastructure & Production Readiness

- [x] **INFRA-001: Add 404 catch-all route** ✅
  - **Files**: `App.tsx`, `pages/NotFound.tsx`
  - **Change**: Created NotFound page component, added catch-all route
  - **Acceptance criteria**: Navigating to non-existent route shows 404 page
  - **Test**: Added 404 test in `test/routing.test.tsx` (35 tests passing)

- [x] **INFRA-002: Add Error Boundary** ✅
  - **Files**: `components/ErrorBoundary.tsx`, `index.tsx`
  - **Change**: Created ErrorBoundary class component, wrapped App in index.tsx
  - **Acceptance criteria**: Unhandled render errors display friendly fallback UI

- [x] **A11Y-001: Add mobile menu accessibility attributes** ✅
  - **Files**: `components/Header.tsx`
  - **Change**: Added `aria-label`, `aria-expanded`, and `aria-hidden` to hamburger button/icon
  - **Acceptance criteria**: Hamburger button has proper accessibility attributes

- [ ] **SEO-001: Fix OG meta tags in index.html**
  - **Files**: `index.html`
  - **Changes**: Update `og:title`, `og:description`, add `<meta name="description">`
  - **Acceptance criteria**: Meta tags match homepage branding

- [ ] **SEO-002: Add robots.txt**
  - **Files**: New file: `public/robots.txt`
  - **Acceptance criteria**: `robots.txt` is served at `/robots.txt`

- [ ] **SEO-003: Add sitemap.xml**
  - **Files**: New file: `public/sitemap.xml`
  - **Acceptance criteria**: `sitemap.xml` exists in `public/`

---

### P2 — Tailwind Migration (CDN → Build-Time)

- [ ] **TW-001: Create build-time Tailwind infrastructure**
  - **Files**: `tailwind.config.ts`, `postcss.config.js`, CSS file
  - **Changes**: Install tailwindcss, create config, migrate inline config
  - **Acceptance criteria**: Build-time Tailwind compiles correctly

- [ ] **TW-002: Remove Tailwind CDN from index.html**
  - **Files**: `index.html`
  - **Changes**: Remove CDN script and inline config
  - **Acceptance criteria**: All pages render correctly with build-time Tailwind

---

### P3 — Cleanup

- [ ] **CLEAN-001: Delete orphaned SocialProofToast.tsx**
  - **Files**: `components/SocialProofToast.tsx`
  - **Acceptance criteria**: File removed, no imports reference it

- [ ] **CLEAN-002: Remove stale copy-of-qual-ai-lead-loss-audit.zip**
  - **Files**: `copy-of-qual-ai-lead-loss-audit.zip`
  - **Acceptance criteria**: File removed from working directory

- [ ] **CLEAN-003: Remove alexhormoziimplementation directory**
  - **Files**: `alexhormoziimplementation/`
  - **Acceptance criteria**: Directory removed

- [ ] **CLEAN-004: Remove unused GEMINI_API_KEY config**
  - **Files**: `vite.config.ts`
  - **Acceptance criteria**: No unused API key references

- [ ] **CLEAN-005: Improve TypeScript strictness**
  - **Files**: `components/audit/NicheSelection.tsx`
  - **Change**: Replace `(Icons as any)` cast with typed icon lookup
  - **Acceptance criteria**: No `as any` casts in audit components

---

## Previous Completed Work

### Audit Landing Page Spec Compliance (COMPLETE)

- [x] AL-001 through AL-008: All audit landing page tasks complete

### Audit Funnel Spec Compliance (COMPLETE)

- [x] All 23 acceptance criteria satisfied

### Infrastructure (COMPLETE)

- [x] 34 passing tests
- [x] Code splitting implemented
- [x] Shadcn components integrated

---

## Key Architecture Decisions

- **Quiz Funnel vs Audit Funnel**: Two separate funnels serving different purposes
  - Audit (`/audit`): Revenue leak calculator, educational, bottom-funnel
  - Quiz (`/quiz`): Lead qualification, partnership positioning, top-funnel
- **Quiz State**: Component-level state in Quiz.tsx (quizData, view)
- **Quiz → Results**: Single page with view state ('quiz' | 'results')
- Animation system: Framer Motion with shared variants in `lib/animations.ts`
- Code splitting: React.lazy() for page components
- Shadcn components for UI consistency
- **Tailwind CSS via CDN** — migration to build-time pending (P2)
- HashRouter (routes prefixed with `/#/`)

---

## Quiz Components Created

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

## Spec-to-Task Mapping

| Spec | Status | Tasks |
|------|--------|-------|
| `quiz-funnel-overview.md` | Complete | QZ-001 through QZ-025 |
| `quiz-page.md` | Complete | QZ-004 through QZ-016 |
| `quiz-questions.md` | Complete | QZ-003, QZ-009 through QZ-015 |
| `results-page.md` | Complete | QZ-017 through QZ-023 |
| `design-system.md` | Complete | QZ-024, QZ-025 |
