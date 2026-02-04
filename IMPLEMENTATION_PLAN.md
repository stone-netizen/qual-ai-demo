# Implementation Plan

> Last updated: 2026-02-04
> Status: Gap analysis complete. Major work: QualAI Quiz Funnel (P0).

---

## Summary

The specs describe a **QualAI Quiz Funnel** (`specs/quiz-*.md`, `specs/design-system.md`). The existing `/quiz` route and types are in place, but no UI components exist yet.

**Gap Analysis Results:**
- **P0 (Quiz Funnel):** ~10% complete — Route wired, types defined, but no UI components
- **P1 (Infrastructure):** Partial — Missing 404 route, error boundary, accessibility improvements
- **P2 (Tailwind):** 0% complete — Still using CDN with inline config
- **P3 (Cleanup):** Orphan files exist

---

## Completed Items

### Phase 0A: Foundation & Routing (COMPLETE)

- [x] **QZ-001: Quiz route wired in App.tsx**
  - Route `/quiz` exists in `constants.ts` (line 94)
  - Route wired in `App.tsx` (line 54) with lazy loading
  - Header/footer hidden for quiz page (line 40)

- [x] **QZ-002: Quiz TypeScript types created**
  - `lib/quiz-types.ts` exists with full schema
  - `QuizData` interface matches spec exactly
  - All type unions defined (BusinessType, MonthlyJobs, etc.)
  - `initialQuizData` helper exported
  - `QuizStep`, `QuizStepConfig`, `QuizOption`, `QuizQuestion` types defined

---

## Tasks (Priority Order)

### P0 — QualAI Quiz Funnel Implementation

The specs in `specs/quiz-funnel-overview.md`, `specs/quiz-page.md`, `specs/quiz-questions.md`, `specs/results-page.md`, and `specs/design-system.md` describe a complete quiz funnel. Route and types are ready; UI components are missing.

#### Phase 0A: Foundation (Remaining)

- [ ] **QZ-003: Create quiz constants**
  - **Files**: New file: `lib/quiz-constants.ts`
  - **Changes**: Create constants for:
    - QUIZ_STEPS array with step metadata (title, subtitle for each of 6 steps)
    - Question text for each step (from `specs/quiz-questions.md`)
    - Option values and labels for each question
    - Contact info step metadata
  - **Acceptance criteria**:
    - All 5 question steps have complete question/option data
    - Contact info step (step 6) metadata exists
    - Constants match spec exactly

#### Phase 0B: Quiz Page Components (Page 1)

- [ ] **QZ-004: Create Quiz page orchestrator**
  - **Files**: Rewrite `pages/Quiz.tsx`, create `components/quiz/` directory
  - **Changes**: Create page that renders:
    - QualAI logo header (minimal, no nav)
    - HeroSection
    - BenefitsSection
    - QuizForm
    - StickyCTA (mobile)
  - **Acceptance criteria**:
    - Quiz page renders with all sections
    - REQ-QP-001: QualAI logo displays in header
    - REQ-QP-002: Hero section displays headline, subheadline, CTA, trust bar

- [ ] **QZ-005: Create HeroSection component**
  - **Files**: New file: `components/quiz/HeroSection.tsx`
  - **Changes**: Implement hero with:
    - Headline: "Get More High-Ticket Jobs Without Hiring More Staff"
    - Subheadline with performance-based angle
    - CTA button "See If You Qualify →" (scrolls to quiz)
    - Trust bar: "For HVAC, Plumbing, Electrical, Roofing & Home Service Businesses"
  - **Acceptance criteria**:
    - AC-QP-002: User can view hero section with headline, subheadline, CTA, trust bar
    - AC-QP-003: Clicking CTA initiates quiz flow or scrolls to quiz
    - Copy matches `specs/quiz-page.md` exactly

- [ ] **QZ-006: Create BenefitsSection component**
  - **Files**: New file: `components/quiz/BenefitsSection.tsx`
  - **Changes**: Implement 5 benefit cards with icons:
    - Exclusive High-Intent Calls (Phone icon)
    - AI Answers & Books 24/7 (Bot icon)
    - Revive Lost Opportunities (RefreshCw icon)
    - Boost Your Reviews (Star icon)
    - Performance-Based Pricing (Handshake icon)
  - **Acceptance criteria**:
    - REQ-QP-004: Benefits section displays 5 items with icons
    - AC-QP-004: Benefits display with icons and clear hierarchy
    - Copy matches `specs/quiz-page.md` benefit table

- [ ] **QZ-007: Create QuizForm container component**
  - **Files**: New file: `components/quiz/QuizForm.tsx`
  - **Changes**: Create quiz card container with:
    - State management for currentStep (1-6) and quizData
    - showResults state for transitioning to results view
    - Progress bar using shadcn Progress component
    - Dynamic step rendering based on currentStep
    - Scroll into view on mount (quiz section ref)
  - **Acceptance criteria**:
    - REQ-QP-005: Quiz displays as centered card
    - REQ-QP-006: Progress bar shows "Step X of 6" accurately
    - AC-QP-005: Quiz displays as centered card with visible shadow
    - AC-QP-006: Progress bar accurately reflects current step

- [ ] **QZ-008: Create QuizStep component (option cards)**
  - **Files**: New file: `components/quiz/QuizStep.tsx`
  - **Changes**: Create reusable step component with:
    - Question text display
    - Option cards as full tappable blocks (not tiny radio circles)
    - Support for conditional "Other" text input
    - Support for optional text input fields (averageJobValue)
    - Navigation buttons (Back/Next)
  - **Acceptance criteria**:
    - REQ-QP-007: Quiz shows one step per screen
    - REQ-QP-008: Option cards are full tappable blocks
    - AC-QP-007: User can tap option cards to select (not just tiny circles)
    - REQ-DS-005: Option cards are full tappable blocks (not tiny circles)
    - REQ-QQ-003: "Other" options reveal conditional text inputs

- [ ] **QZ-009: Implement Step 1 - Business Type**
  - **Files**: `lib/quiz-constants.ts`, `components/quiz/QuizForm.tsx`
  - **Changes**: Wire up Step 1:
    - Question: "What type of service business do you run?"
    - Options: HVAC, Plumbing, Electrical, Roofing, Remodeling/Construction, Garage Doors/Gates, Other
    - Conditional text input for "Other"
  - **Acceptance criteria**:
    - AC-QQ-001: Step 1 displays correct question and options
    - AC-QQ-004: "Other" selection shows text input

- [ ] **QZ-010: Implement Step 2 - Volume & Job Value**
  - **Files**: `components/quiz/QuizForm.tsx`
  - **Changes**: Wire up Step 2:
    - Q2.1: "How many new jobs do you complete per month on average?" (radio)
    - Q2.2: "What's your average job value..." (optional text input)
  - **Acceptance criteria**:
    - AC-QQ-001: Step 2 displays correct questions and options
    - Text input accepts freeform text

- [ ] **QZ-011: Implement Step 3 - Leads & Calls**
  - **Files**: `components/quiz/QuizForm.tsx`
  - **Changes**: Wire up Step 3:
    - Q3.1: "Roughly how many new leads or inbound calls..." (radio)
    - Q3.2: "Where do most of your leads come from..." (radio with Other option)
  - **Acceptance criteria**:
    - AC-QQ-001: Step 3 displays correct questions and options
    - AC-QQ-004: "Other" selection shows text input

- [ ] **QZ-012: Implement Step 4 - Missed Calls & Follow-up**
  - **Files**: `components/quiz/QuizForm.tsx`
  - **Changes**: Wire up Step 4:
    - Q4.1: "How many of your high-intent calls go to voicemail..." (radio)
    - Q4.2: "Do you currently have any AI or automation..." (radio)
  - **Acceptance criteria**:
    - AC-QQ-001: Step 4 displays correct questions and options

- [ ] **QZ-013: Implement Step 5 - Budget & Model Fit**
  - **Files**: `components/quiz/QuizForm.tsx`
  - **Changes**: Wire up Step 5:
    - Q5.1: "What's your approximate monthly marketing budget?" (radio)
    - Q5.2: "Would you be open to a performance-based model..." (radio)
  - **Acceptance criteria**:
    - AC-QQ-001: Step 5 displays correct questions and options

- [ ] **QZ-014: Create ContactInfoStep component (Step 6)**
  - **Files**: New file: `components/quiz/ContactInfoStep.tsx`
  - **Changes**: Create contact form step with:
    - Header: "Where should we send your personalized breakdown?"
    - Fields: firstName, lastName, email, phone, companyName
    - Email format validation
    - Phone format validation (US formats)
    - Submit button: "See My Results & Next Steps"
  - **Acceptance criteria**:
    - REQ-QP-011: Final step collects required contact fields
    - REQ-QP-012: Email field validates format
    - REQ-QP-013: Phone field validates format
    - AC-QP-010: Required fields block progression with clear error message
    - AC-QP-011: Contact info validates email and phone formats
    - AC-QQ-005: Email field rejects invalid formats
    - AC-QQ-006: Phone field accepts standard US formats
    - AC-QQ-008: Invalid fields show specific error messages

- [ ] **QZ-015: Implement quiz navigation and validation**
  - **Files**: `components/quiz/QuizForm.tsx`, `components/quiz/QuizStep.tsx`
  - **Changes**:
    - "Next" validates current step before advancing
    - "Back" returns to previous step (preserves answers)
    - Required fields block progression
    - Final submit validates all contact fields
  - **Acceptance criteria**:
    - REQ-QP-009: "Next" button advances (validates first)
    - REQ-QP-010: "Back" button returns (preserves answers)
    - AC-QP-008: User can navigate forward through all steps
    - AC-QP-009: User can navigate backward and see previously entered answers
    - AC-QQ-002: User cannot advance without completing required fields
    - AC-QQ-003: User can go back and change previous answers

- [ ] **QZ-016: Create quiz mobile StickyCTA**
  - **Files**: New file: `components/quiz/QuizStickyCTA.tsx`
  - **Changes**: Create sticky CTA that:
    - Shows "Start Quiz" button when quiz not in viewport
    - Uses Intersection Observer to detect quiz visibility
    - Scrolls to quiz on click
    - Hidden when quiz is visible or user is in quiz flow
  - **Acceptance criteria**:
    - REQ-QP-D06: Sticky CTA on mobile when quiz not in view
    - AC-QP-014: Sticky CTA appears on mobile when scrolled past quiz

#### Phase 0C: Results Page Components (Page 2)

- [ ] **QZ-017: Create QuizResults view**
  - **Files**: New file: `components/quiz/QuizResults.tsx` (renders when showResults=true)
  - **Changes**: Create results view with:
    - QualAI logo header (consistent with quiz)
    - ResultsBanner section
    - VSLSection
    - CalendarSection
    - Mobile StickyCTA
  - **Acceptance criteria**:
    - REQ-RP-001: QualAI logo displays in header
    - AC-RP-001: QualAI logo visible in header
    - AC-RP-008: Page maintains brand consistency with Quiz Page

- [ ] **QZ-018: Create ResultsBanner component**
  - **Files**: New file: `components/quiz/ResultsBanner.tsx`
  - **Changes**: Create banner with:
    - Headline: "You Qualify for QualAI"
    - Subheadline affirming opportunity
    - Dynamic revenue line placeholder (stubbed)
  - **Acceptance criteria**:
    - REQ-RP-002: Results banner displays headline and subheadline
    - REQ-RP-003: Dynamic revenue line displays (stubbed)
    - AC-RP-002: User sees results banner with affirming headline

- [ ] **QZ-019: Create VSLSection component**
  - **Files**: New file: `components/quiz/VSLSection.tsx`
  - **Changes**: Create VSL section with:
    - Title: "How QualAI Gets You More High-Ticket Jobs"
    - Video placeholder (16:9 aspect ratio, max-width 720px)
    - 5 benefit bullets with checkmarks
  - **Acceptance criteria**:
    - REQ-RP-004: VSL section displays title, video placeholder, benefit bullets
    - REQ-RP-005: Video placeholder maintains 16:9 aspect ratio
    - AC-RP-003: Video placeholder displays with correct 16:9 aspect ratio
    - AC-RP-004: All benefit bullets display correctly below video

- [ ] **QZ-020: Create CalendarSection component**
  - **Files**: New file: `components/quiz/CalendarSection.tsx`
  - **Changes**: Create calendar section with:
    - Headline: "Book Your QualAI Strategy Call"
    - Subheadline setting expectations
    - Calendar placeholder (or LeadConnector embed like audit)
    - Preparation bullets
    - Trust text: "No long-term contract. No obligation..."
  - **Acceptance criteria**:
    - REQ-RP-006: Calendar section displays headline, subheadline, calendar
    - REQ-RP-007: Preparation bullets and trust text display
    - AC-RP-005: Calendar placeholder displays
    - AC-RP-006: Trust text is visible near calendar

- [ ] **QZ-021: Create results mobile StickyCTA**
  - **Files**: New file: `components/quiz/ResultsStickyCTA.tsx`
  - **Changes**: Create sticky CTA for results page:
    - Shows "Book Your Call →" when calendar not in viewport
    - Scrolls to calendar section on click
  - **Acceptance criteria**:
    - REQ-RP-010: Sticky CTA appears on mobile when calendar not in view
    - AC-RP-009: Sticky CTA appears on mobile when calendar not in view

#### Phase 0D: Quiz Data Flow & Submission

- [ ] **QZ-022: Implement quiz submission handler**
  - **Files**: `components/quiz/QuizForm.tsx`
  - **Changes**:
    - On submit: validate all contact fields
    - Store quiz data in component state
    - Set showResults to true to render results view
    - Add submittedAt timestamp
    - Log submission for debugging (console.log, later API)
  - **Acceptance criteria**:
    - REQ-QP-014: On submit, quiz data is captured (API stub)
    - REQ-QP-015: After successful submit, user sees Results view
    - REQ-QP-016: Quiz answers are available to Results view
    - AC-QP-012: Successful submission shows Results view
    - AC-QQ-007: Final submission includes all collected data

- [ ] **QZ-023: Pass quiz data to Results view**
  - **Files**: `pages/Quiz.tsx`, `components/quiz/QuizResults.tsx`
  - **Changes**:
    - Pass quizData as prop to QuizResults component
    - Results page can display personalized content based on answers
    - Fallback copy if no quiz data (direct URL access)
  - **Acceptance criteria**:
    - REQ-RP-008: Results view receives quiz data
    - REQ-RP-009: Results view can display without quiz data (fallback copy)
    - REQ-QQ-009: Quiz data passed to Results after submission

#### Phase 0E: Design System Compliance

- [ ] **QZ-024: Apply design system styles to quiz components**
  - **Files**: All quiz components in `components/quiz/`
  - **Changes**: Ensure compliance with `specs/design-system.md`:
    - Quiz card: max-width 480px, centered, rounded-xl (16px), shadow-lg
    - Option cards: min 56px height, full tappable blocks, 12px gap
    - Buttons: min 52px height (thumb-friendly)
    - Progress bar: 8px height, proper colors
    - Typography: Inter font, proper scale (H1 28/48, H2 24/36, body 16/18)
    - Spacing: 4px base unit scale
    - Colors: primary blue-600, text gray-900/500, surface white
  - **Acceptance criteria**:
    - REQ-DS-001 through REQ-DS-009 satisfied
    - AC-DS-001 through AC-DS-009 satisfied
    - REQ-QP-D01 through REQ-QP-D09 satisfied
    - REQ-RP-D01 through REQ-RP-D08 satisfied

- [ ] **QZ-025: Ensure mobile-first responsive layout**
  - **Files**: All quiz components
  - **Changes**:
    - Mobile layout: 16px horizontal padding, full-width quiz card
    - Desktop layout: max-width container, centered 480px quiz card
    - Section spacing: 48px mobile, 80px desktop
    - No horizontal scroll on any screen size
    - Test at 375px, 768px, 1440px breakpoints
  - **Acceptance criteria**:
    - AC-QP-013: Page is fully responsive (mobile-first)
    - AC-RP-007: Page is fully responsive (mobile, tablet, desktop)
    - AC-DS-008: No horizontal scroll on any screen size
    - AC-DS-009: Design is consistent between quiz and results views

---

### P1 — Infrastructure & Production Readiness

- [ ] **INFRA-001: Add 404 catch-all route**
  - **Files**: `App.tsx`
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
    - Update `og:title` to homepage branding
    - Update `og:description`
    - Add `<meta name="description">` tag
  - **Acceptance criteria**:
    - `og:title` matches homepage branding
    - `<meta name="description">` tag exists

- [ ] **SEO-002: Add robots.txt**
  - **Files**: New file: `public/robots.txt`
  - **Acceptance criteria**:
    - `robots.txt` is served at `/robots.txt`

- [ ] **SEO-003: Add sitemap.xml**
  - **Files**: New file: `public/sitemap.xml`
  - **Acceptance criteria**:
    - `sitemap.xml` exists in `public/`

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
    - Migrate custom CSS animations from `index.html`
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
  - **Change**: Remove unused `GEMINI_API_KEY` defines if present
  - **Acceptance criteria**:
    - `vite.config.ts` does not reference unused API keys

- [ ] **TEST-001: Add quiz funnel routing tests**
  - **Files**: `test/routing.test.tsx` or new test file
  - **Acceptance criteria**:
    - Test exists for `/quiz` route
    - Tests verify quiz page renders correctly

- [ ] **CLEAN-005: Improve TypeScript strictness**
  - **Files**: `components/audit/NicheSelection.tsx`
  - **Change**: Replace `(Icons as any)` cast with typed icon lookup
  - **Acceptance criteria**:
    - No `as any` casts in audit components

---

## Previous Completed Work

### Audit Landing Page Spec Compliance (COMPLETE)

All 8 tasks from former `specs/audit-landing.md` are satisfied:
- [x] AL-001: `darkMode: 'class'` added to Tailwind CDN config
- [x] AL-002: Hero accent text changed to "Want to Know Where?"
- [x] AL-003: Section 3 copy matches reference
- [x] AL-004: Section 4 header and body text match reference
- [x] AL-005: Privacy line below final CTA removed
- [x] AL-006: Video quote expanded to full version
- [x] AL-007: Spacing reduced throughout
- [x] AL-008: CTA button enlarged

### Audit Funnel Spec Compliance (COMPLETE)

All 23 acceptance criteria satisfied:
- [x] VSL step removed from state machine
- [x] EmailGate.tsx deleted
- [x] `@shadcn/progress` component installed
- [x] Calculator auto-advances after loading animation
- [x] Results page redesigned
- [x] Calendar embed with LeadConnector iframe
- [x] "Book My Recovery Call" smooth-scrolls
- [x] Sticky mobile CTA on results
- [x] Video embed placeholder
- [x] A2P 10DLC compliance disclosure
- [x] All audit components use shadcn
- [x] TypeScript types cleaned up

### Infrastructure (COMPLETE)

- [x] 30 passing tests
- [x] Code splitting implemented
- [x] Shadcn components integrated

---

## Key Architecture Decisions

- **Quiz Funnel vs Audit Funnel**: Two separate funnels serving different purposes
  - Audit (`/audit`): Revenue leak calculator, educational, bottom-funnel
  - Quiz (`/quiz`): Lead qualification, partnership positioning, top-funnel
- **Quiz State**: Component-level state in Quiz.tsx orchestrator (quizData, currentStep, showResults)
- **Quiz → Results**: Single page with conditional rendering (showResults flag)
- Animation system: Framer Motion with shared variants in `lib/animations.ts`
- Code splitting: React.lazy() for page components
- CRM data: consolidated in `constants.ts`
- LeadConnector handles booking flow externally
- Shadcn components for UI consistency
- **Tailwind CSS via CDN** — migration to build-time pending (P2)
- HashRouter (routes prefixed with `/#/`)
- Entry point: `index.tsx`

---

## Notes

- Primary conversion flow: Homepage CTA → `/audit` (revenue leak funnel) → Results (booking)
- New quiz funnel: `/quiz` → Quiz steps → Results (booking)
- Quiz uses same design language as audit but with different flow
- CRM logos use Logo.dev API
- GHL booking widget used in Contact.tsx, Audit Results, and will be used in Quiz Results
- Audit chunk is large (907KB) — consider lazy-loading sub-components
- `index.html` contains ~280 lines of custom CSS animations

---

## Spec-to-Task Mapping

| Spec | Status | Tasks |
|------|--------|-------|
| `quiz-funnel-overview.md` | ~10% | QZ-003 through QZ-025 |
| `quiz-page.md` | ~10% | QZ-004 through QZ-016 |
| `quiz-questions.md` | ~10% | QZ-003, QZ-009 through QZ-015 |
| `results-page.md` | Not started | QZ-017 through QZ-023 |
| `design-system.md` | Not started | QZ-024, QZ-025 |
