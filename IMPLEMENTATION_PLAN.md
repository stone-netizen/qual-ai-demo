# Implementation Plan

> Last updated: 2026-02-04
> Status: P0 audit landing page spec compliance is complete (AL-001 through AL-008). P1 routing realignment is next.

---

## Summary

All 8 tasks from `specs/audit-landing.md` (AL-001 through AL-008) are **complete** — copy matches reference, dark mode is fixed, spacing is tightened, CTA is enlarged, and privacy line is removed. Build passes (30/30 tests). Remaining work: P1 routing realignment, P2 Tailwind migration, P3 SEO/infrastructure, P4 cleanup.

---

## Tasks (Priority Order)

### P1 — Routing Realignment (Audit-First Conversion Flow)

CTAs and navigation should route to `/audit` as the primary conversion path. All currently route to `/contact`.

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
  - **Change**: `ROUTES.CONTACT` → `ROUTES.AUDIT`; optionally rename button text from `"Request Pilot Access"` → `"Find Your Revenue Leak"` for consistency
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
  - **Files**: `components/Footer.tsx` (lines 30-31)
  - **Changes**:
    - Add `<li><Link to={ROUTES.AUDIT}>Revenue Leak Audit</Link></li>` in Platform section
    - Rename `"Post-Booking VSL (Preview)"` (line 31) to `"Post-Booking Confirmation"` or remove
  - **Acceptance criteria**:
    - Footer Platform section includes "Revenue Leak Audit" link to `/audit`
    - "Post-Booking VSL (Preview)" label is updated or removed

- [ ] **RT-006: StickyCTA uses shadcn Button component**
  - **Files**: `components/StickyCTA.tsx` (line 39)
  - **Change**: Replace raw `<button>` element with `<Button>` from `@/components/ui/button`
  - **Acceptance criteria**:
    - StickyCTA renders using `<Button>` component from shadcn

- [ ] **RT-007: Fix unused UI_CONFIG constant**
  - **Files**: `constants.ts` (line 79), `components/StickyCTA.tsx` (line 20)
  - **Change**: `StickyCTA.tsx` hardcodes `100` instead of using `UI_CONFIG.STICKY_CTA_SCROLL_THRESHOLD`. Import and use the constant, or remove `UI_CONFIG` if unused elsewhere.
  - **Acceptance criteria**:
    - Scroll threshold is not hardcoded; uses `UI_CONFIG` constant or `UI_CONFIG` is removed

---

### P2 — Tailwind Migration (CDN → Build-Time)

Tailwind runs entirely via CDN with inline config in `index.html`. No `tailwind.config.ts`, `postcss.config.js`, or build-time CSS pipeline exists.

- [ ] **TW-001: Create build-time Tailwind infrastructure**
  - **Files**: New files: `tailwind.config.ts`, `postcss.config.js`, `app.css` (or `src/index.css`); Modified: `index.tsx`, `components.json`
  - **Changes**:
    - Install `tailwindcss`, `postcss`, `autoprefixer` as dev dependencies
    - Create `tailwind.config.ts` with custom theme from `index.html` inline config (navy colors, accent, Inter/Lexend fonts)
    - Create `postcss.config.js`
    - Create CSS file with `@tailwind base; @tailwind components; @tailwind utilities;`
    - Migrate ~280 lines of custom CSS animations from `index.html` `<style>` blocks into CSS file
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
    - Move remaining `<style>` content (if not fully migrated) to CSS file
  - **Acceptance criteria**:
    - No Tailwind CDN script in `index.html`
    - All pages render correctly with build-time Tailwind
    - Visual check at 375px, 768px, 1440px passes

---

### P3 — HTML, SEO & Production Infrastructure

- [ ] **SEO-001: Fix OG meta tags in index.html**
  - **Files**: `index.html` (lines 8-12)
  - **Changes**:
    - `og:title`: `"Your Evaluation is Confirmed | Qual AI"` → `"Qual AI | Automated Booking Systems for HVAC"`
    - `og:description`: Update to homepage value proposition
    - Add `<meta name="description" content="...">` tag (currently missing)
  - **Acceptance criteria**:
    - `og:title` matches homepage branding
    - `<meta name="description">` tag exists

- [ ] **SEO-002: Add robots.txt**
  - **Files**: New file: `public/robots.txt`
  - **Acceptance criteria**:
    - `robots.txt` is served at `/robots.txt`

- [ ] **SEO-003: Add sitemap.xml**
  - **Files**: New file: `public/sitemap.xml`
  - **Note**: HashRouter `/#/` URLs are not crawlable — sitemap value is limited
  - **Acceptance criteria**:
    - `sitemap.xml` exists in `public/`

- [ ] **INFRA-001: Add 404 catch-all route**
  - **Files**: `App.tsx`
  - **Change**: Add `<Route path="*">` fallback
  - **Acceptance criteria**:
    - Navigating to a non-existent route shows a 404 page instead of blank screen

- [ ] **INFRA-002: Remove dead GEMINI_API_KEY config**
  - **Files**: `vite.config.ts` (lines 14-17)
  - **Change**: Remove `process.env.API_KEY` and `process.env.GEMINI_API_KEY` defines — neither is used anywhere
  - **Acceptance criteria**:
    - `vite.config.ts` does not reference `GEMINI_API_KEY`

- [ ] **INFRA-003: Add Error Boundary**
  - **Files**: New or modified: `App.tsx` (or new `components/ErrorBoundary.tsx`)
  - **Acceptance criteria**:
    - Unhandled render errors display a friendly fallback UI instead of crashing

- [ ] **A11Y-001: Add mobile menu accessibility attributes**
  - **Files**: `components/Header.tsx` (line 54)
  - **Change**: Add `aria-label="Toggle navigation menu"` and `aria-expanded={isOpen}` to hamburger button
  - **Acceptance criteria**:
    - Hamburger button has `aria-label` and `aria-expanded` attributes

---

### P4 — Cleanup & Test Gaps

- [ ] **CLEAN-001: Delete orphaned SocialProofToast.tsx**
  - **Files**: `components/SocialProofToast.tsx`
  - **Acceptance criteria**:
    - File does not exist; no imports reference it

- [ ] **CLEAN-002: Remove stale copy-of-qual-ai-lead-loss-audit.zip**
  - **Files**: `copy-of-qual-ai-lead-loss-audit.zip` (repo root)
  - **Acceptance criteria**:
    - File removed from working directory

- [ ] **CLEAN-003: Remove alexhormoziimplementation directory**
  - **Files**: `alexhormoziimplementation/` (repo root, untracked)
  - **Note**: Keep until all AL-* tasks are verified, then delete
  - **Acceptance criteria**:
    - Directory removed after audit landing spec is fully verified

- [ ] **TEST-001: Add routing test for /audit**
  - **Files**: `test/routing.test.tsx`
  - **Change**: Add render test for AUDIT route (only route without a test)
  - **Acceptance criteria**:
    - Test exists that renders `/audit` and asserts basic content
    - All tests pass

- [ ] **CLEAN-004: Improve TypeScript strictness (minor)**
  - **Files**: `components/audit/NicheSelection.tsx`
  - **Change**: Replace `(Icons as any)` cast with typed icon lookup
  - **Acceptance criteria**:
    - No `as any` casts in audit components

---

## Completed Items

### P0 — Audit Landing Page Spec Compliance (COMPLETE)

All 8 tasks from `specs/audit-landing.md` are satisfied:
- [x] AL-001: `darkMode: 'class'` added to Tailwind CDN config in `index.html`
- [x] AL-002: Hero accent text changed to "Want to Know Where?"
- [x] AL-003: Section 3 subtitle removed, card titles fixed to use `/` and `or`, bottom paragraph matches reference (no "plumbing")
- [x] AL-004: Section 4 header single-line (no blue accent), body text matches reference
- [x] AL-005: Privacy line below final CTA removed
- [x] AL-006: Video quote expanded to full 3-sentence version with `...`
- [x] AL-007: Spacing reduced (hero pb, CTA mb, trust mt, video pb)
- [x] AL-008: CTA button enlarged to `py-6 px-14 text-2xl shadow-2xl shadow-blue-600/30`

### Previous P0 — Audit Funnel Spec Compliance (COMPLETE)

All 23 acceptance criteria in the former `specs/audit-funnel.md` are satisfied:
- [x] VSL step removed from state machine, type, and component deleted
- [x] EmailGate.tsx deleted
- [x] `@shadcn/progress` component installed
- [x] Calculator step 8 auto-advances after 1.5s loading animation
- [x] Results page redesigned with correct layout order
- [x] Results renders full-width
- [x] Calendar embed with LeadConnector iframe
- [x] "Book My Recovery Call" smooth-scrolls to `#calendar`
- [x] Sticky mobile CTA bar on results
- [x] Video embed placeholder
- [x] A2P 10DLC compliance disclosure
- [x] All audit components use shadcn
- [x] `commitment` and `leadInfo` fields removed from AuditData
- [x] `vsl-pulse` CSS animation removed
- [x] `Calculator.tsx` `value: any` fixed

### Homepage, How It Works, Booking, Demo, Legal Pages
- [x] All acceptance criteria from former spec files satisfied

### Infrastructure
- [x] 30 passing tests (17 Demo + 13 routing)
- [x] Code splitting (main bundle ~442KB, Audit chunk ~907KB)
- [x] Shadcn components integrated

---

## Key Architecture Decisions

- Animation system: Framer Motion with shared variants in `lib/animations.ts`
- Code splitting: React.lazy() for page components
- CRM data: consolidated in `constants.ts`
- LeadConnector handles booking flow externally
- Retell API credentials via Vercel env vars
- Shadcn components: button, badge, card, alert, separator, accordion, progress
- **Tailwind CSS via CDN** with inline config in `index.html` — no build-time config
- HashRouter (routes prefixed with `/#/`)
- Entry point: `index.tsx` (not `main.tsx`)

---

## Notes

- Primary conversion flow: Homepage CTA → `/audit` (funnel) → Results (booking embed)
- Secondary flow: `/contact` (direct booking) remains available
- CRM logos use Logo.dev API (`constants.ts` stores domains)
- GHL booking widget ID hardcoded in Contact.tsx and Results.tsx
- Audit chunk is large (907KB) due to radix-ui — consider lazy-loading sub-components
- `index.html` contains ~280 lines of custom CSS animations in `<style>` tags
