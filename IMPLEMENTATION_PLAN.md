# Implementation Plan

> Last updated: 2026-02-04
> Status: P0 Quiz Funnel ✅ | P1 Infrastructure ✅ | P2 Tailwind Migration ❌ | P3 Cleanup ✅

---

## Summary

The **QualAI Quiz Funnel** is fully implemented and functional. All specs in `specs/` are satisfied by the current codebase.

**Current Status:**
- **P0 (Quiz Funnel):** ✅ 100% complete — All core functionality works
- **P1 (Infrastructure):** ✅ 100% complete — 404, ErrorBoundary, A11Y, SEO all done
- **P2 (Tailwind Migration):** ❌ 0% complete — Still using CDN with inline config
- **P3 (Cleanup):** ✅ 100% complete — All orphan files removed

---

## Gap Analysis Summary

### Specs vs Code Status

| Spec | Status | Notes |
|------|--------|-------|
| `quiz-funnel-overview.md` | ✅ Complete | Architecture, branding, offer all implemented |
| `quiz-page.md` | ✅ Complete | Hero, Benefits, Quiz Form, Sticky CTA |
| `quiz-questions.md` | ✅ Complete | All 6 steps + contact info, validation |
| `results-page.md` | ✅ Complete | Results Banner, VSL, Calendar sections |
| `design-system.md` | ✅ Complete | Inter font, mobile-first, 52px buttons |

### Remaining Issues

1. **Tailwind CSS**: Running via CDN (`https://cdn.tailwindcss.com`) with inline config in `index.html`
2. **components.json**: Has empty paths for `tailwind.config` and `css`

---

## Remaining Tasks (Priority Order)

### P2 — Tailwind Migration (CDN → Build-Time)

Tailwind runs via CDN with inline config in `index.html`. No build-time CSS pipeline exists. This is functional but not production-ready.

- [ ] **TW-001: Create build-time Tailwind infrastructure**
  - **Files**: Create: `tailwind.config.ts`, `postcss.config.js`, `src/index.css`; Update: `components.json`, `index.tsx`
  - **Changes**:
    - Install `tailwindcss`, `postcss`, `autoprefixer` as dev dependencies
    - Create `tailwind.config.ts` with custom theme from `index.html` inline config:
      - Colors: navy (800/900/950), accent (#2563eb)
      - Font family: Inter
    - Create `postcss.config.js`
    - Create CSS file with Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`)
    - Migrate custom CSS animations from `index.html` (~280 lines of keyframes) to the CSS file
    - Import CSS file in entry point
    - Update `components.json` with correct tailwind paths
  - **Acceptance criteria**:
    - [ ] `tailwind.config.ts` exists with navy colors, accent color, Inter font
    - [ ] `postcss.config.js` exists
    - [ ] CSS file with Tailwind directives + animations exists
    - [ ] CSS file imported in `index.tsx`
    - [ ] `components.json` tailwind paths point to real files
    - [ ] `npm run build` succeeds

- [ ] **TW-002: Remove Tailwind CDN from index.html**
  - **Files**: `index.html`
  - **Changes**:
    - Remove `<script src="https://cdn.tailwindcss.com"></script>`
    - Remove inline `tailwind.config` block (lines 22-41)
    - Remove all CSS from `<style>` block (already migrated in TW-001)
    - Keep only: meta tags, font links, favicon link
  - **Acceptance criteria**:
    - [ ] No Tailwind CDN script in `index.html`
    - [ ] No inline `tailwind.config` in `index.html`
    - [ ] `<style>` block removed
    - [ ] All pages render correctly with build-time Tailwind
    - [ ] Visual check at 375px, 768px, 1440px passes

---

## Completed Items

### P0 — QualAI Quiz Funnel (COMPLETE ✅)

All quiz funnel tasks are complete.

**Quiz Page Components:**
- [x] Quiz page orchestrator (`pages/Quiz.tsx`) with view state management
- [x] HeroSection with headline, subheadline, CTA, trust bar
- [x] BenefitsSection with 5 benefit cards and Lucide icons
- [x] QuizForm container with step navigation and validation
- [x] QuizStep with full tappable option cards (56px min-height)
- [x] TextInput component for text fields
- [x] ContactInfoStep with all 5 fields + validation
- [x] QuizStickyCTA with IntersectionObserver for mobile

**Results Page Components:**
- [x] ResultsBanner with qualification headline
- [x] VSLSection with video placeholder (16:9) and 5 benefit bullets
- [x] CalendarSection with calendar placeholder and trust text
- [x] Results sticky CTA reusing QuizStickyCTA component

**Data & Types:**
- [x] Quiz types (`lib/quiz-types.ts`) matching spec schema
- [x] Quiz constants (`lib/quiz-constants.ts`) with all copy
- [x] Quiz data passed from Quiz to Results view
- [x] Email and phone validation

**Design System Compliance:**
- [x] Inter font throughout (no Lexend)
- [x] 52px minimum button height
- [x] Mobile-first responsive layout
- [x] Option cards are full tappable blocks
- [x] Progress bar shows "Step X of 6"

### P1 — Infrastructure (COMPLETE ✅)

- [x] **INFRA-001: 404 catch-all route** — `NotFound.tsx` renders for unknown routes
- [x] **INFRA-002: Error Boundary** — `ErrorBoundary.tsx` wraps app
- [x] **A11Y-001: Mobile menu accessibility** — Proper ARIA attributes
- [x] **SEO-001: OG meta tags** — Title, description, image, URL in `index.html`
- [x] **SEO-002: robots.txt** — Exists in `public/`
- [x] **SEO-003: sitemap.xml** — Exists in `public/` with all routes

### P3 — Cleanup (COMPLETE ✅)

- [x] **DS-001: Unify typography to Inter** — Removed Lexend, `font-heading` class
- [x] **CLEAN-001-005: Orphan files removed** — SocialProofToast, zip file, etc. all cleaned

---

## Key Architecture Decisions

- **Quiz Funnel**: Single page (`/quiz`) with conditional rendering
  - `view === 'quiz'`: Shows HeroSection, BenefitsSection, QuizForm
  - `view === 'results'`: Shows ResultsBanner, VSLSection, CalendarSection
- **Quiz State**: Component-level state in Quiz.tsx (quizData, view)
- **StickyCTA**: Reusable component with Intersection Observer
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
- Video and calendar are placeholders pending real integrations
- `quizData` is captured and available for future personalization/API submission
- Tailwind CDN is functional but should be migrated for production builds
