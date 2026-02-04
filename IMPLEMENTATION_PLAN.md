# Implementation Plan

> Last updated: 2026-02-04
> Status: Gap analysis complete. Major work: QualAI Quiz Funnel (P0), Routing fixes (P1), Infrastructure (P2-P3).

---

## Summary

The current specs describe a **new QualAI Quiz Funnel** (`specs/quiz-*.md`, `specs/design-system.md`) that does **not yet exist** in the codebase. The existing `/audit` funnel is a separate revenue-leak calculator, not the quiz funnel described in the specs.

**Gap Analysis Results:**
- **P0 (Quiz Funnel):** 0% complete — No quiz route, no quiz components, no quiz page exists
- **P1 (Routing):** 0% complete — CTAs still route to `/contact` instead of `/audit`
- **P2 (Tailwind):** 0% complete — Still using CDN with inline config
- **P3 (Infrastructure):** Partially complete — Missing 404 route, error boundary, accessibility

---

## Tasks (Priority Order)

### P0 — QualAI Quiz Funnel Implementation

The specs in `specs/quiz-funnel-overview.md`, `specs/quiz-page.md`, `specs/quiz-questions.md`, `specs/results-page.md`, and `specs/design-system.md` describe a complete quiz funnel that does not exist.

#### Phase 0A: Foundation & Routing

- [ ] **QZ-001: Add QUIZ route to constants and App.tsx**
  - **Files**: `constants.ts`, `App.tsx`
  - **Changes**:
    - Add `QUIZ: "/quiz"` to ROUTES object
    - Add lazy-loaded Quiz page import
    - Add `<Route path={ROUTES.QUIZ} element={<Quiz />} />`
    - Set `hideHeader={true}` and `hideFooter={true}` for quiz route (like audit)
  - **Acceptance criteria**:
    - `/quiz` route is accessible
    - Quiz page renders without header/footer chrome

- [ ] **QZ-002: Create quiz TypeScript types**
  - **Files**: New file: `lib/quiz-types.ts`
  - **Changes**: Create `QuizData` interface matching schema in `specs/quiz-questions.md`:
    - businessType, businessTypeOther
    - monthlyJobs, averageJobValue
    - monthlyLeads, leadSource, leadSourceOther
    - missedCallsPercent, currentAutomation
    - marketingBudget, openToRevShare
    - firstName, lastName, email, phone, companyName
    - submittedAt, source
  - **Acceptance criteria**:
    - TypeScript interface matches spec schema exactly
    - Exports QuizData and QuizStep types

- [ ] **QZ-003: Create quiz constants**
  - **Files**: New file: `lib/quiz-constants.ts`
  - **Changes**: Create constants for:
    - QUIZ_STEPS array with step metadata
    - Question text for each step (from `specs/quiz-questions.md`)
    - Option values and labels for each question
    - Qualification logic thresholds
  - **Acceptance criteria**:
    - All 6 question steps have complete question/option data
    - Contact info step (step 7) metadata exists
    - Constants match spec exactly

#### Phase 0B: Quiz Page Components (Page 1)

- [ ] **QZ-004: Create Quiz page orchestrator**
  - **Files**: New files: `pages/Quiz.tsx`, `components/quiz/` directory
  - **Changes**: Create page that renders:
    - QualAI logo header (minimal)
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
    - AI Answers & Books 24/7 (Robot/AI icon)
    - Revive Lost Opportunities (Refresh icon)
    - Boost Your Reviews (Star icon)
    - Performance-Based Pricing (Handshake icon)
  - **Acceptance criteria**:
    - REQ-QP-004: Benefits section displays 4-5 items with icons
    - AC-QP-004: Benefits display with icons and clear hierarchy
    - Copy matches `specs/quiz-page.md` benefit table

- [ ] **QZ-007: Create QuizForm container component**
  - **Files**: New file: `components/quiz/QuizForm.tsx`
  - **Changes**: Create quiz card container with:
    - State management for currentStep and quizData
    - Progress bar component (shadcn Progress)
    - Dynamic step rendering
    - Navigation buttons (Back/Next)
    - Scroll into view on mount
  - **Acceptance criteria**:
    - REQ-QP-005: Quiz displays as centered card
    - REQ-QP-006: Progress bar shows "Step X of 7" accurately
    - AC-QP-005: Quiz displays as centered card with visible shadow
    - AC-QP-006: Progress bar accurately reflects current step

- [ ] **QZ-008: Create QuizStep component (option cards)**
  - **Files**: New file: `components/quiz/QuizStep.tsx`
  - **Changes**: Create reusable step component with:
    - Question text display
    - Option cards as full tappable blocks (not tiny radio circles)
    - Support for conditional "Other" text input
    - Support for optional text input fields (averageJobValue)
  - **Acceptance criteria**:
    - REQ-QP-007: Quiz shows one step per screen
    - REQ-QP-008: Option cards are full tappable blocks
    - AC-QP-007: User can tap option cards to select (not just tiny circles)
    - REQ-DS-005: Option cards are full tappable blocks (not tiny circles)
    - REQ-QQ-003: "Other" options reveal conditional text inputs

- [ ] **QZ-009: Implement Step 1 - Business Type**
  - **Files**: `components/quiz/QuizForm.tsx`, `lib/quiz-constants.ts`
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
    - Phone format validation
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
  - **Files**: `components/quiz/QuizForm.tsx`
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
  - **Acceptance criteria**:
    - REQ-QP-D06: Sticky CTA on mobile when quiz not in view
    - AC-QP-014: Sticky CTA appears on mobile when scrolled past quiz

#### Phase 0C: Results Page Components (Page 2)

- [ ] **QZ-017: Create QuizResults page**
  - **Files**: New files: `pages/QuizResults.tsx` or integrated into Quiz.tsx
  - **Changes**: Create results page with:
    - QualAI logo header
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
    - Calendar placeholder (or LeadConnector embed)
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
    - On submit: validate all fields
    - Store quiz data (localStorage or state)
    - Transition to results view
    - Add submittedAt timestamp
  - **Acceptance criteria**:
    - REQ-QP-014: On submit, quiz data is sent to API endpoint (stubbed)
    - REQ-QP-015: After successful submit, user sees Results page
    - REQ-QP-016: Quiz answers are passed to Results page
    - AC-QP-012: Successful submission redirects to Results page
    - AC-QQ-007: Final submission includes all collected data

- [ ] **QZ-023: Pass quiz data to Results page**
  - **Files**: `pages/Quiz.tsx`, `components/quiz/ResultsBanner.tsx`
  - **Changes**:
    - Store quiz data in component state or context
    - Results page receives quiz data
    - Display personalized content based on answers (optional enhancement)
  - **Acceptance criteria**:
    - REQ-RP-008: Page receives quiz data from Page 1
    - REQ-RP-009: Page can display without quiz data (fallback copy)
    - REQ-QQ-009: Quiz data passed to Results page after submission

#### Phase 0E: Design System Compliance

- [ ] **QZ-024: Apply design system styles to quiz components**
  - **Files**: All quiz components
  - **Changes**: Ensure compliance with `specs/design-system.md`:
    - Quiz card: max-width 480px, centered, rounded 16px, shadow-lg
    - Option cards: min 56px height, full tappable blocks
    - Buttons: min 52px height (thumb-friendly)
    - Progress bar: 8px height, proper colors
    - Typography: Inter font, proper scale
    - Spacing: 4px base unit scale
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
  - **Acceptance criteria**:
    - AC-QP-013: Page is fully responsive (mobile-first)
    - AC-RP-007: Page is fully responsive (mobile, tablet, desktop)
    - AC-DS-008: No horizontal scroll on any screen size
    - AC-DS-009: Design is consistent between Page 1 and Page 2

---

### P1 — Routing Realignment (Audit-First Conversion Flow)

CTAs and navigation should route to `/audit` as the primary conversion path.

- [ ] **RT-001: StickyCTA routes to /audit**
  - **Files**: `components/StickyCTA.tsx` (line 40)
  - **Change**: `navigate(ROUTES.CONTACT)` → `navigate(ROUTES.AUDIT)`
  - **Acceptance criteria**:
    - Clicking StickyCTA navigates to `/audit`

- [ ] **RT-002: Home page CTAs route to /audit**
  - **Files**: `pages/Home.tsx` (lines 80, 245)
  - **Changes**:
    - Hero CTA: `navigate(ROUTES.CONTACT)` → `navigate(ROUTES.AUDIT)`
    - Final CTA: `navigate(ROUTES.CONTACT)` → `navigate(ROUTES.AUDIT)`
  - **Acceptance criteria**:
    - Both hero and final CTA buttons on homepage navigate to `/audit`

- [ ] **RT-003: HowItWorks CTA routes to /audit**
  - **Files**: `pages/HowItWorks.tsx` (line 287)
  - **Change**: `ROUTES.CONTACT` → `ROUTES.AUDIT`
  - **Acceptance criteria**:
    - HowItWorks page CTA navigates to `/audit`

- [ ] **RT-004: Add audit link to Header navigation**
  - **Files**: `components/Header.tsx` (lines 10-15, 46)
  - **Changes**:
    - Add `{ label: 'Revenue Leak Audit', path: ROUTES.AUDIT }` to `navItems` array
    - Update "Start Pilot" CTA button (line 46) to route to `/audit` instead of `/contact`
  - **Acceptance criteria**:
    - Header nav includes "Revenue Leak Audit" link pointing to `/audit`
    - Header CTA button navigates to `/audit`

- [ ] **RT-005: Add audit link to Footer navigation**
  - **Files**: `components/Footer.tsx`
  - **Change**: Add "Revenue Leak Audit" link in Platform section
  - **Acceptance criteria**:
    - Footer Platform section includes "Revenue Leak Audit" link to `/audit`

- [ ] **RT-006: StickyCTA uses shadcn Button component**
  - **Files**: `components/StickyCTA.tsx` (line 39)
  - **Change**: Replace raw `<button>` element with `<Button>` from `@/components/ui/button`
  - **Acceptance criteria**:
    - StickyCTA renders using `<Button>` component from shadcn

- [ ] **RT-007: Fix unused UI_CONFIG constant**
  - **Files**: `constants.ts`, `components/StickyCTA.tsx`
  - **Change**: Use `UI_CONFIG.STICKY_CTA_SCROLL_THRESHOLD` instead of hardcoded `100`
  - **Acceptance criteria**:
    - Scroll threshold uses `UI_CONFIG` constant

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

### P3 — HTML, SEO & Production Infrastructure

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

- [ ] **INFRA-001: Add 404 catch-all route**
  - **Files**: `App.tsx`
  - **Change**: Add `<Route path="*">` fallback
  - **Acceptance criteria**:
    - Navigating to non-existent route shows 404 page

- [ ] **INFRA-002: Remove dead GEMINI_API_KEY config**
  - **Files**: `vite.config.ts`
  - **Change**: Remove unused `GEMINI_API_KEY` defines
  - **Acceptance criteria**:
    - `vite.config.ts` does not reference `GEMINI_API_KEY`

- [ ] **INFRA-003: Add Error Boundary**
  - **Files**: `App.tsx` or new `components/ErrorBoundary.tsx`
  - **Acceptance criteria**:
    - Unhandled render errors display friendly fallback UI

- [ ] **A11Y-001: Add mobile menu accessibility attributes**
  - **Files**: `components/Header.tsx` (line 54)
  - **Change**: Add `aria-label` and `aria-expanded` to hamburger button
  - **Acceptance criteria**:
    - Hamburger button has `aria-label` and `aria-expanded` attributes

---

### P4 — Cleanup & Test Gaps

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

- [ ] **TEST-001: Add routing test for /audit**
  - **Files**: `test/routing.test.tsx`
  - **Acceptance criteria**:
    - Test exists that renders `/audit` and asserts basic content

- [ ] **TEST-002: Add quiz funnel routing tests**
  - **Files**: `test/routing.test.tsx`
  - **Acceptance criteria**:
    - Test exists for `/quiz` route
    - Tests verify quiz page renders correctly

- [ ] **CLEAN-004: Improve TypeScript strictness**
  - **Files**: `components/audit/NicheSelection.tsx`
  - **Change**: Replace `(Icons as any)` cast with typed icon lookup
  - **Acceptance criteria**:
    - No `as any` casts in audit components

---

## Completed Items

### Previous P0 — Audit Landing Page Spec Compliance (COMPLETE)

All 8 tasks from former `specs/audit-landing.md` are satisfied:
- [x] AL-001: `darkMode: 'class'` added to Tailwind CDN config
- [x] AL-002: Hero accent text changed to "Want to Know Where?"
- [x] AL-003: Section 3 copy matches reference
- [x] AL-004: Section 4 header and body text match reference
- [x] AL-005: Privacy line below final CTA removed
- [x] AL-006: Video quote expanded to full version
- [x] AL-007: Spacing reduced throughout
- [x] AL-008: CTA button enlarged

### Previous P0 — Audit Funnel Spec Compliance (COMPLETE)

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
- CRM logos use Logo.dev API
- GHL booking widget hardcoded in Contact.tsx and Results.tsx
- Audit chunk is large (907KB) — consider lazy-loading sub-components
- `index.html` contains ~280 lines of custom CSS animations

---

## Spec-to-Task Mapping

| Spec | Status | Tasks |
|------|--------|-------|
| `quiz-funnel-overview.md` | Not started | QZ-001 through QZ-025 |
| `quiz-page.md` | Not started | QZ-004 through QZ-016 |
| `quiz-questions.md` | Not started | QZ-002, QZ-003, QZ-009 through QZ-015 |
| `results-page.md` | Not started | QZ-017 through QZ-023 |
| `design-system.md` | Not started | QZ-024, QZ-025 |
