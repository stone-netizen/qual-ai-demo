# Implementation Plan

> Last updated: 2026-02-04
> Status: Gap analysis complete. Most quiz components built; needs integration.

---

## Summary

The specs describe a **QualAI Quiz Funnel** (`specs/quiz-*.md`, `specs/design-system.md`). Significant progress has been made — most individual components are built, but the main Quiz page (`pages/Quiz.tsx`) is still a placeholder and needs to orchestrate all components.

**Gap Analysis Results:**
- **P0 (Quiz Funnel):** ~75% complete — All core components exist; Quiz.tsx needs integration; Results view needs assembly
- **P1 (Infrastructure):** ~20% complete — Missing 404 route, error boundary, SEO files
- **P2 (Tailwind):** 0% complete — Still using CDN with inline config
- **P3 (Cleanup):** Orphan files and minor issues exist

---

## Completed Items

### Phase 0A: Foundation (COMPLETE)

- [x] **QZ-001: Quiz route wired in App.tsx**
  - Route `/quiz` exists in `constants.ts`
  - Route wired in `App.tsx` with lazy loading
  - Header/footer hidden for quiz page

- [x] **QZ-002: Quiz TypeScript types created**
  - `lib/quiz-types.ts` exists with full schema matching spec
  - All type unions defined (BusinessType, MonthlyJobs, etc.)
  - `initialQuizData` helper exported

- [x] **QZ-003: Quiz constants created**
  - `lib/quiz-constants.ts` exists with all question text, options, labels
  - All 5 question steps have complete data
  - Contact info step metadata exists
  - Hero, benefits, results copy all present

### Phase 0B: Quiz Page Components (MOSTLY COMPLETE)

- [x] **QZ-005: HeroSection component created**
  - `components/quiz/HeroSection.tsx` exists
  - Headline, subheadline, CTA button, trust bar implemented
  - Copy matches spec

- [x] **QZ-006: BenefitsSection component created**
  - `components/quiz/BenefitsSection.tsx` exists
  - 5 benefit cards with icons (Phone, Bot, RefreshCw, Star, Handshake)
  - Copy matches spec

- [x] **QZ-007: QuizForm container component created**
  - `components/quiz/QuizForm.tsx` exists
  - State management for currentStep (1-6) and quizData
  - Progress bar using shadcn Progress
  - Dynamic step rendering
  - Navigation buttons (Back/Next)

- [x] **QZ-008: QuizStep component created**
  - `components/quiz/QuizStep.tsx` exists
  - Full tappable option cards (not tiny radio circles)
  - Support for conditional "Other" text input
  - Proper styling (min-h-[56px], rounded-xl, border-2)

- [x] **QZ-009 through QZ-013: All quiz steps implemented**
  - Step 1 (Business Type) with conditional "Other" input
  - Step 2 (Volume & Job Value) with optional text input
  - Step 3 (Leads & Calls) with conditional "Other" input
  - Step 4 (Missed Calls & Follow-up)
  - Step 5 (Budget & Model Fit)
  - All wired in QuizForm.tsx

- [x] **QZ-014: ContactInfoStep component created**
  - `components/quiz/ContactInfoStep.tsx` exists
  - All fields: firstName, lastName, email, phone, companyName
  - Error state support

- [x] **QZ-015: Quiz navigation and validation implemented**
  - validateCurrentStep() checks each step's required fields
  - validateContactInfo() checks email/phone formats
  - Back/Next navigation works
  - Contact errors displayed

### Phase 0C: Results Page Components (MOSTLY COMPLETE)

- [x] **QZ-018: ResultsBanner component created**
  - `components/quiz/ResultsBanner.tsx` exists
  - Headline, subheadline, dynamic line placeholder

- [x] **QZ-019: VSLSection component created**
  - `components/quiz/VSLSection.tsx` exists
  - Title, video placeholder (16:9), 5 benefit bullets

- [x] **QZ-020: CalendarSection component created**
  - `components/quiz/CalendarSection.tsx` exists
  - Headline, subheadline, calendar placeholder
  - Preparation bullets, trust text
  - calendarRef prop for scroll-to

---

## Tasks (Priority Order)

### P0 — QualAI Quiz Funnel Implementation (Remaining)

The individual components are built. Now they need to be assembled.

#### Phase 0B: Quiz Page Integration

- [ ] **QZ-004: Integrate Quiz.tsx page orchestrator**
  - **Files**: Rewrite `pages/Quiz.tsx`
  - **Changes**: Replace placeholder with full implementation:
    - Import and render HeroSection, BenefitsSection, QuizForm
    - Add quiz section ref for scroll-to-quiz functionality
    - State: showResults flag to switch between quiz and results views
    - Pass onComplete callback to QuizForm
    - When quiz completes, set showResults=true and store quizData
    - Conditionally render quiz view or results view based on showResults
  - **Acceptance criteria**:
    - Quiz page renders HeroSection, BenefitsSection, QuizForm
    - REQ-QP-001: QualAI logo displays in header
    - REQ-QP-002: Hero section displays headline, subheadline, CTA, trust bar
    - REQ-QP-003: CTA button scrolls to quiz section
    - AC-QP-001 through AC-QP-003 satisfied

- [ ] **QZ-016: Create quiz mobile StickyCTA**
  - **Files**: New file: `components/quiz/QuizStickyCTA.tsx`, update `pages/Quiz.tsx`
  - **Changes**: Create sticky CTA that:
    - Shows "Start Quiz" button when quiz not in viewport
    - Uses Intersection Observer to detect quiz visibility
    - Scrolls to quiz on click
    - Hidden when user is in quiz flow (after first step)
  - **Acceptance criteria**:
    - REQ-QP-D06: Sticky CTA on mobile when quiz not in view
    - AC-QP-014: Sticky CTA appears on mobile when scrolled past quiz

#### Phase 0C: Results Page Integration

- [ ] **QZ-017: Create QuizResults view**
  - **Files**: New file: `components/quiz/QuizResults.tsx`
  - **Changes**: Create results view that:
    - Renders minimal header with QualAI logo
    - Renders ResultsBanner, VSLSection, CalendarSection
    - Accepts quizData prop for future personalization
    - Includes calendarRef for scroll-to functionality
  - **Acceptance criteria**:
    - REQ-RP-001: QualAI logo displays in header
    - AC-RP-001: QualAI logo visible in header
    - AC-RP-008: Page maintains brand consistency with Quiz Page

- [ ] **QZ-021: Create results mobile StickyCTA**
  - **Files**: New file: `components/quiz/ResultsStickyCTA.tsx`, update `components/quiz/QuizResults.tsx`
  - **Changes**: Create sticky CTA for results page:
    - Shows "Book Your Call →" when calendar not in viewport
    - Uses Intersection Observer
    - Scrolls to calendar section on click
  - **Acceptance criteria**:
    - REQ-RP-010: Sticky CTA appears on mobile when calendar not in view
    - AC-RP-009: Sticky CTA appears on mobile when calendar not in view

#### Phase 0D: Quiz Data Flow & Submission

- [ ] **QZ-022: Implement quiz submission handler in Quiz.tsx**
  - **Files**: `pages/Quiz.tsx`
  - **Changes**:
    - QuizForm calls onComplete with quizData
    - Quiz.tsx stores quizData and sets showResults=true
    - Log submission for debugging (console.log)
    - Future: send to API endpoint
  - **Acceptance criteria**:
    - REQ-QP-014: On submit, quiz data is captured
    - REQ-QP-015: After successful submit, user sees Results view
    - AC-QP-012: Successful submission shows Results view
    - AC-QQ-007: Final submission includes all collected data

- [ ] **QZ-023: Pass quiz data to QuizResults**
  - **Files**: `pages/Quiz.tsx`, `components/quiz/QuizResults.tsx`
  - **Changes**:
    - Pass quizData as prop to QuizResults component
    - QuizResults can display personalized content (future)
    - QuizResults renders correctly even without data (fallback)
  - **Acceptance criteria**:
    - REQ-RP-008: Results view receives quiz data
    - REQ-RP-009: Results view can display without quiz data
    - REQ-QQ-009: Quiz data passed to Results after submission

#### Phase 0E: Design System Compliance

- [ ] **QZ-024: Audit and apply design system styles**
  - **Files**: All quiz components in `components/quiz/`
  - **Changes**: Review and ensure compliance with `specs/design-system.md`:
    - Quiz card: max-width 480px ✓, rounded-2xl ✓, shadow-lg ✓
    - Option cards: min 56px height ✓, full tappable ✓, 12px gap (check spacing)
    - Buttons: min 52px height ✓ (h-[52px] used)
    - Progress bar: 8px height (currently h-2 = 8px ✓)
    - Typography: Inter font (check heading font is Inter not Lexend)
    - Verify colors: primary blue-600, proper text colors
  - **Acceptance criteria**:
    - REQ-DS-001 through REQ-DS-009 satisfied
    - AC-DS-001 through AC-DS-009 satisfied
    - All quiz components use consistent design tokens

- [ ] **QZ-025: Verify mobile-first responsive layout**
  - **Files**: All quiz components
  - **Changes**:
    - Test at 375px, 768px, 1440px breakpoints
    - Verify section spacing (48px mobile, 80px desktop)
    - Verify no horizontal scroll
    - Verify sticky CTA safe area padding
  - **Acceptance criteria**:
    - AC-QP-013: Page is fully responsive (mobile-first)
    - AC-RP-007: Page is fully responsive
    - AC-DS-008: No horizontal scroll on any screen size
    - AC-DS-009: Design is consistent between quiz and results views

---

### P1 — Infrastructure & Production Readiness

- [ ] **INFRA-001: Add 404 catch-all route**
  - **Files**: `App.tsx`, new `pages/NotFound.tsx`
  - **Change**: Add `<Route path="*">` fallback with 404 page
  - **Acceptance criteria**:
    - Navigating to non-existent route shows 404 page

- [ ] **INFRA-002: Add Error Boundary**
  - **Files**: `App.tsx` or new `components/ErrorBoundary.tsx`
  - **Acceptance criteria**:
    - Unhandled render errors display friendly fallback UI

- [ ] **A11Y-001: Add mobile menu accessibility attributes**
  - **Files**: `components/Header.tsx`
  - **Change**: Add `aria-label` and `aria-expanded` to hamburger button
  - **Acceptance criteria**:
    - Hamburger button has `aria-label` and `aria-expanded` attributes

- [ ] **SEO-001: Fix OG meta tags in index.html**
  - **Files**: `index.html`
  - **Changes**:
    - Update `og:title` to QualAI branding
    - Update `og:description` to match offer
    - Add `<meta name="description">` tag
  - **Acceptance criteria**:
    - `og:title` matches QualAI branding
    - `<meta name="description">` tag exists

- [ ] **SEO-002: Add robots.txt**
  - **Files**: New file: `public/robots.txt`
  - **Acceptance criteria**:
    - `robots.txt` is served at `/robots.txt`

- [ ] **SEO-003: Add sitemap.xml**
  - **Files**: New file: `public/sitemap.xml`
  - **Acceptance criteria**:
    - `sitemap.xml` exists in `public/`

- [ ] **TEST-001: Add quiz route to routing tests**
  - **Files**: `test/routing.test.tsx`
  - **Acceptance criteria**:
    - Test exists for `/quiz` route
    - Tests verify quiz page renders correctly

---

### P2 — Tailwind Migration (CDN → Build-Time)

Tailwind runs via CDN with inline config in `index.html`. No build-time CSS pipeline exists.

- [ ] **TW-001: Create build-time Tailwind infrastructure**
  - **Files**: New files: `tailwind.config.ts`, `postcss.config.js`, `src/index.css`
  - **Changes**:
    - Install `tailwindcss`, `postcss`, `autoprefixer` as dev dependencies
    - Create `tailwind.config.ts` with custom theme from `index.html` inline config
    - Create `postcss.config.js`
    - Create CSS file with Tailwind directives
    - Migrate custom CSS animations from `index.html` (~280 lines)
    - Import CSS file in `index.tsx`
    - Update `components.json` with correct tailwind paths
  - **Acceptance criteria**:
    - `tailwind.config.ts` exists with all custom theme values
    - `postcss.config.js` exists
    - CSS file imported in entry point
    - `components.json` tailwind paths are valid

- [ ] **TW-002: Remove Tailwind CDN from index.html**
  - **Files**: `index.html`
  - **Changes**:
    - Remove `<script src="https://cdn.tailwindcss.com"></script>`
    - Remove inline `tailwind.config` block
    - Move remaining `<style>` content to CSS file
  - **Acceptance criteria**:
    - No Tailwind CDN script in `index.html`
    - All pages render correctly with build-time Tailwind
    - Visual check at 375px, 768px, 1440px passes

---

### P3 — Cleanup & Test Gaps

- [ ] **CLEAN-001: Delete orphaned SocialProofToast.tsx**
  - **Files**: `components/SocialProofToast.tsx`
  - **Acceptance criteria**:
    - File does not exist; no imports reference it

- [ ] **CLEAN-002: Remove stale copy-of-qual-ai-lead-loss-audit.zip**
  - **Files**: `copy-of-qual-ai-lead-loss-audit.zip`
  - **Acceptance criteria**:
    - File removed from working directory

- [ ] **CLEAN-003: Remove alexhormoziimplementation directory**
  - **Files**: `alexhormoziimplementation/`
  - **Acceptance criteria**:
    - Directory removed

- [ ] **CLEAN-004: Remove unused GEMINI_API_KEY config**
  - **Files**: `vite.config.ts`
  - **Change**: Remove unused `GEMINI_API_KEY` defines
  - **Acceptance criteria**:
    - `vite.config.ts` does not reference unused API keys

- [ ] **CLEAN-005: Improve TypeScript strictness**
  - **Files**: `components/audit/NicheSelection.tsx`
  - **Change**: Replace `(Icons as any)` cast with typed icon lookup
  - **Acceptance criteria**:
    - No `as any` casts in audit components

---

## Key Architecture Decisions

- **Quiz Funnel vs Audit Funnel**: Two separate funnels serving different purposes
  - Audit (`/audit`): Revenue leak calculator, educational, bottom-funnel
  - Quiz (`/quiz`): Lead qualification, partnership positioning, top-funnel
- **Quiz State**: Component-level state in Quiz.tsx (quizData, showResults)
- **Quiz → Results**: Single page with conditional rendering (showResults flag)
- **Component Structure**: Individual components built, page orchestrates them
- Animation system: Framer Motion with shared variants in `lib/animations.ts`
- Code splitting: React.lazy() for page components
- CRM data: consolidated in `constants.ts`
- Shadcn components for UI consistency
- **Tailwind CSS via CDN** — migration to build-time pending (P2)
- HashRouter (routes prefixed with `/#/`)
- Entry point: `index.tsx`

---

## Notes

- Primary conversion flow: Homepage CTA → `/quiz` → Results (booking)
- Quiz funnel is the new primary funnel (replacing audit focus)
- All quiz components use Shadcn/Tailwind styling
- Calendar section has calendarRef prop for scroll-to functionality
- StickyCTA components need Intersection Observer implementation
- Audit funnel (`/audit`) still exists and works

---

## Spec-to-Task Mapping

| Spec | Status | Remaining Tasks |
|------|--------|-----------------|
| `quiz-funnel-overview.md` | ~75% | QZ-004, QZ-016, QZ-017, QZ-021-25 |
| `quiz-page.md` | ~80% | QZ-004, QZ-016 |
| `quiz-questions.md` | ~95% | QZ-022, QZ-023 |
| `results-page.md` | ~70% | QZ-017, QZ-021, QZ-023 |
| `design-system.md` | ~70% | QZ-024, QZ-025 |

---

## Recent Progress

- All quiz question/option constants complete
- All quiz step components (1-5) implemented in QuizForm
- ContactInfoStep with validation complete
- ResultsBanner, VSLSection, CalendarSection built
- HeroSection and BenefitsSection complete
- Only integration work remaining for P0
