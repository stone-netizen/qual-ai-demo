# Implementation Plan

> Last updated: 2026-02-03
> Status: P0 complete. Routing realignment, Tailwind migration, SEO/production infrastructure, and cleanup pending.

---

## Summary

Core features (homepage, demo call, booking, legal pages) are implemented and production-ready with 30 passing tests (17 Demo + 13 routing). All 6 spec files are fully complete. **P0 (Audit Funnel Spec Compliance) is now complete** — all 23 acceptance criteria in `specs/audit-funnel.md` are satisfied. The remaining work is:

1. **Routing realignment** — CTAs and navigation should point to `/audit` (the primary conversion path)
2. **Tailwind migration** — Project has NO `tailwind.config` file; Tailwind runs entirely via CDN in `index.html`. Must create build-time Tailwind setup before removing CDN.
3. **HTML/SEO/Production fixes** — OG meta tags reference wrong page, missing `<meta name="description">`, no `robots.txt` or `sitemap.xml`, no 404 route, no error boundary, dead Gemini API key config
4. **Cleanup & test gaps** — Orphaned files, dead code, stale footer link, AUDIT route untested

## Key Architecture Decisions

- Animation system uses Framer Motion with shared variants in `lib/animations.ts`
- Code splitting via React.lazy() for page components
- CRM data consolidated in `constants.ts` as single source of truth
- LeadConnector handles booking flow and form validation externally
- Environment variables for Retell API credentials (set in Vercel dashboard)
- Shadcn components installed: button, badge, card, alert, separator, accordion, **progress**
- **IMPORTANT**: Tailwind CSS is loaded via CDN (`<script src="https://cdn.tailwindcss.com">`) with inline config in `index.html`. There is NO `tailwind.config.ts`, `tailwind.config.js`, or `postcss.config.js` file. The `components.json` (shadcn config) has empty `tailwind.config` and `tailwind.css` paths. Custom theme values (navy-800/900/950, accent blue, Inter/Lexend fonts) and ~280 lines of custom CSS animations are defined inline in `index.html`.
- HashRouter is used (routes prefixed with `/#/`)

---

## Tasks (Priority Order)

### P1 — Routing Realignment (Audit-First Conversion Flow)

The homepage spec (`specs/homepage.md`) requires audit-oriented CTAs. These changes have not been applied. All CTAs currently route to `/contact`.

- [ ] **Update primary CTA text** (`constants.ts` line 44)
  - Change `"Start Your HVAC Growth Engine"` → `"Find Your Revenue Leak"`
  - Affects: StickyCTA, Hero CTA, Final CTA (all read from `MESSAGING.cta.primary`)

- [ ] **StickyCTA routes to /audit** (`components/StickyCTA.tsx` line 40)
  - Change `navigate(ROUTES.CONTACT)` → `navigate(ROUTES.AUDIT)`

- [ ] **Home page CTAs route to /audit** (`pages/Home.tsx`)
  - Hero CTA button (line 80): `navigate(ROUTES.CONTACT)` → `navigate(ROUTES.AUDIT)`
  - Final CTA section button (line 245): `navigate(ROUTES.CONTACT)` → `navigate(ROUTES.AUDIT)`

- [ ] **HowItWorks CTA routes to /audit** (`pages/HowItWorks.tsx` line 287)
  - "Request Pilot Access" button: Change `ROUTES.CONTACT` → `ROUTES.AUDIT`
  - Optional text change: "Request Pilot Access" → "Find Your Revenue Leak" for consistency with audit-first messaging (per `specs/how-it-works.md` line 38)

- [ ] **Add audit link to Header navigation** (`components/Header.tsx`)
  - Add `{ label: 'Revenue Leak Audit', path: ROUTES.AUDIT }` to `navItems` array (lines 10-15, currently: Home, How It Works, Voice Demo, Book a Call)
  - Update "Start Pilot" CTA button (line 46) to route to `/audit` instead of `/contact`

- [ ] **Add audit link to Footer navigation** (`components/Footer.tsx`)
  - Add `<li><Link to={ROUTES.AUDIT}>Revenue Leak Audit</Link></li>` in Platform section (after line 30)
  - Update "Post-Booking VSL (Preview)" link text (line 31) — this label references the removed VSL. Rename to "Post-Booking Confirmation" or remove if not needed.

- [ ] **Fix unused UI_CONFIG constant** (`constants.ts` / `components/StickyCTA.tsx`)
  - `StickyCTA.tsx` line 20 hardcodes `100` instead of using `UI_CONFIG.STICKY_CTA_SCROLL_THRESHOLD` (currently `600` in constants.ts)
  - Resolution: update `UI_CONFIG.STICKY_CTA_SCROLL_THRESHOLD` to `100` and import/use it in StickyCTA, or remove `UI_CONFIG` if unused elsewhere

- [ ] **StickyCTA should use shadcn Button** (`components/StickyCTA.tsx`)
  - Per `specs/shared-ui-legal.md`, StickyCTA uses `@shadcn/button` internally
  - Currently uses a raw `<button>` element (line 39) with inline gradient classes
  - Replace with `<Button>` from `@/components/ui/button`

### P2 — Tailwind Migration (CDN → Build-Time)

**CRITICAL**: There is NO `tailwind.config.ts`, `tailwind.config.js`, or `postcss.config.js` file. Tailwind is served entirely via CDN with an inline config block in `index.html`. This means:
- All Tailwind utilities are resolved at runtime by the CDN script, not at build time
- Custom theme values (navy colors, accent blue, Inter/Lexend fonts) only exist in the inline config
- ~280 lines of custom CSS animations are defined in `<style>` tags in `index.html`
- The shadcn `components.json` has empty `tailwind.config` and `tailwind.css` paths

- [ ] **Create build-time Tailwind infrastructure**
  - Install `tailwindcss`, `postcss`, `autoprefixer` as dev dependencies
  - Create `tailwind.config.ts` with all custom theme values from `index.html` inline config:
    - Colors: `navy: { 800: '#1e293b', 900: '#0f172a', 950: '#020617' }`, `accent: '#2563eb'`
    - Fonts: `sans: ['Inter', ...]`, `heading: ['Lexend', ...]`
  - Create `postcss.config.js` with tailwindcss and autoprefixer plugins
  - Create `app.css` (or similar) with `@tailwind base; @tailwind components; @tailwind utilities;`
  - Migrate custom CSS animations from `index.html` `<style>` blocks into the CSS file
  - Import the CSS file in `index.tsx` (the app entry point — NOT `main.tsx`)
  - Update `components.json` with correct `tailwind.config` and `tailwind.css` paths

- [ ] **Remove Tailwind CDN from `index.html`**
  - Remove `<script src="https://cdn.tailwindcss.com"></script>`
  - Remove inline `tailwind.config` block
  - Keep custom CSS `<style>` block only if not fully migrated to CSS file
  - **Must verify**: Run the build and visually check all pages after migration

### P3 — HTML, SEO & Production Infrastructure

- [ ] **Fix OG meta tags in `index.html`**
  - Current `og:title`: "Your Evaluation is Confirmed | Qual AI" — this is PostBooking copy, not homepage
  - Update `og:title` to: "Qual AI | Automated Booking Systems for HVAC"
  - Update `og:description` to match homepage value proposition
  - Add `<meta name="description" content="...">` tag (currently missing)

- [ ] **Add `robots.txt`** (`public/robots.txt`)

- [ ] **Add `sitemap.xml`** (`public/sitemap.xml`)
  - Note: HashRouter `/#/` URLs are not crawlable by most search engines

- [ ] **Add 404 catch-all route** (`App.tsx`)
  - No fallback `<Route path="*">` exists

- [ ] **Remove dead `GEMINI_API_KEY` config from `vite.config.ts`**
  - Lines 15-16 define `process.env.API_KEY` and `process.env.GEMINI_API_KEY` — neither used

- [ ] **Add Error Boundary** (`App.tsx` or new `components/ErrorBoundary.tsx`)

- [ ] **Add mobile menu accessibility attributes** (`components/Header.tsx`)
  - Add `aria-label="Toggle navigation menu"` and `aria-expanded={isOpen}` to hamburger button

### P4 — Cleanup & Test Gaps

- [ ] **Delete orphaned `components/SocialProofToast.tsx`**
- [ ] **Remove stale `copy-of-qual-ai-lead-loss-audit.zip`** (if not needed)
- [ ] **Update routing tests** (`test/routing.test.tsx`)
  - **Add test for AUDIT route** — currently missing entirely
  - Tests still pass after P0 changes (verified)
- [ ] **Remove `alexhormoziimplementation` directory** (untracked)
- [ ] **Improve TypeScript strictness** (minor)
  - `NicheSelection.tsx`: `(Icons as any)` cast — could use typed icon lookup
  - `Calculator.tsx` `value: any` parameter fixed — now uses `AuditData[keyof AuditData]`

---

## Completed Items

### P0 — Audit Funnel Spec Compliance (COMPLETE)

All 23 acceptance criteria in `specs/audit-funnel.md` are now satisfied:
- [x] VSL step removed from state machine, type, and component deleted
- [x] EmailGate.tsx deleted (was orphaned)
- [x] `@shadcn/progress` component installed
- [x] Calculator step 8 auto-advances after 1.5s loading animation (replaces manual "REVEAL FINANCIAL REPORT" button)
- [x] Results page redesigned: Hero → Total Loss → Primary CTA → Loss Cards → Video → Calendar → Trust Footer + Sticky Mobile CTA
- [x] Results renders full-width (outside card container in Audit.tsx)
- [x] Calendar embed with LeadConnector iframe + form_embed.js script
- [x] "Book My Recovery Call" smooth-scrolls to `#calendar` section
- [x] Sticky mobile CTA bar (`md:hidden`, fixed bottom, blur background)
- [x] Video embed placeholder with `about:blank` iframe
- [x] A2P 10DLC compliance disclosure below calendar
- [x] All audit components now use shadcn: Button, Card, Badge, Progress, Separator
- [x] `commitment` and `leadInfo` fields removed from AuditData interface
- [x] `vsl-pulse` CSS animation removed from `index.html`
- [x] `Calculator.tsx` `value: any` parameter fixed to `AuditData[keyof AuditData]`

### Spec File Documentation
- [x] All 6 spec files complete with all required template sections

### Homepage, How It Works, Booking, Demo, Legal Pages
- [x] All acceptance criteria satisfied (see individual spec files)

### Infrastructure
- [x] 30 passing tests (17 Demo page + 13 routing)
- [x] Code splitting (main bundle ~442KB, Audit chunk ~907KB)
- [x] Shadcn components integrated (button, badge, card, alert, separator, accordion, progress)

---

## Notes

### Architecture & Conversion Flow
- The primary conversion flow is: Homepage CTA → /audit (funnel) → Results (booking embed)
- Secondary flow: /contact (direct booking) remains available
- Results page is terminal — no VSL or post-results step
- LeadConnector handles calendar booking and form validation
- HashRouter is used — all routes prefixed with `/#/`

### External Services
- CRM logos use Logo.dev API (`constants.ts` stores domains, `CRMLogos.tsx` constructs URLs)
- Logo.dev token configured via `VITE_LOGODEV_TOKEN` environment variable
- GHL booking widget ID (`86t1nPwKPa3V1sqBmr8t`) is hardcoded in Contact.tsx and Results.tsx
- Retell AI voice SDK used for Demo page with serverless API at `api/create-web-call.ts`
- PostBooking video hosted on Vercel blob storage

### Build & Infrastructure
- Code splitting via React.lazy() — main bundle ~442KB, Demo chunk ~448KB, Audit chunk ~907KB
- **NO `tailwind.config` file exists** — Tailwind runs entirely via CDN with inline config in `index.html`
- `index.html` contains ~280 lines of custom CSS animations in `<style>` tags
- Entry point is `index.tsx` (not `main.tsx`)
- Deployed to Vercel with `vercel.json` rewrite rules
- Audit chunk is large (907KB) due to radix-ui dependency from shadcn progress component — consider code-splitting radix-ui or lazy-loading audit sub-components

### Testing
- Tests located in `test/` directory with setup in `test/setup.ts`
- Vitest configured with `isolate: true` and `pool: 'forks'`
- AUDIT route is the only route without a render test in routing.test.tsx

### Component & Code Notes
- Footer has a stale "Post-Booking VSL (Preview)" label that should be updated after VSL removal
- `index.html` OG meta tags reference PostBooking page content instead of homepage
- `NicheSelection.tsx` uses `(Icons as any)` cast — could be typed more strictly
