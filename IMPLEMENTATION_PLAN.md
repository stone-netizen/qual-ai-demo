# Implementation Plan

> Last updated: 2026-01-30
> Status: Core features complete, polish items remaining

## Current Milestone: Polish & Alignment

### Low Priority

- [ ] **Implement code-splitting to reduce bundle size**
  - Current build has no code splitting (all routes loaded synchronously in `App.tsx`)
  - Use `React.lazy()` and `Suspense` for route-based code splitting
  - Candidate pages for lazy loading:
    - Legal pages (Privacy, Terms, SMS Terms, Cookie, Security) - 5 pages
    - Demo page (large Retell SDK dependency)
    - How It Works page
  - File: `App.tsx`

- [ ] **Add testing infrastructure**
  - No tests currently exist for application code
  - Consider adding: Vitest (already using Vite), React Testing Library
  - Priority test areas:
    - Demo page Retell integration (error handling, call states)
    - Navigation/routing (all routes accessible)
    - Form/calendar embed loading

---

## Completed

- [x] **Expand How It Works page to 5 steps** (2026-01-30)
  - Updated from 3 steps to 5 steps per spec: Lead Capture, AI Qualification, CRM Integration, Booking & Scheduling, Handoff
  - Updated grid layout to handle 5 steps responsively

- [x] **Replace CRM text labels with actual logo images** (2026-01-30)
  - Created `public/logos/` directory with SVG logos for all 8 CRMs
  - Updated `constants.ts` CRM_INTEGRATIONS to include logo paths
  - Updated `CRMLogos.tsx` to use image logos from constants (consolidated single source of truth)
  - Installed missing `clsx` and `tailwind-merge` dependencies for TypeScript build

- [x] **Integrate booking calendar on Contact page** (2026-01-30)
  - Added LeadConnector calendar embed
  - Added A2P 10DLC SMS compliance disclosure
  - Moved contact info cards to secondary section below calendar

- [x] **Add CRM Logos to How It Works page** (2026-01-30)
  - Imported and added CRMLogos component after steps section

- [x] **Add Framer Motion animations to How It Works page** (2026-01-30)
  - Replaced CSS animations with Framer Motion
  - Added fadeInUp, staggerContainer, hoverLift effects

- [x] **Add Demo CTA to How It Works page** (2026-01-30)
  - Added "Try Voice Demo" button linking to /demo

- [x] **Clean up deprecated components** (2026-01-30)
  - Removed ComplianceForm.tsx (was exporting null)
  - Removed VSLSection.tsx (content moved to Contact page)

- [x] **Move Retell API key to environment variables** (2026-01-30)
  - Updated api/create-web-call.ts to use RETELL_API_KEY and RETELL_AGENT_ID
  - Added .env.example documenting required variables
  - Must set these in Vercel dashboard for production

- [x] Homepage with all sections (Hero, Stats, CRM Integrations, How It Works, FAQ, Final CTA)
- [x] Framer Motion animations on Homepage
- [x] All copy driven from constants.ts
- [x] Demo page with Retell voice integration
- [x] API endpoint for creating web calls
- [x] PostBooking confirmation page with video
- [x] Video thumbnail verified - `/public/video-thumbnail.jpg` exists (54KB)
- [x] All 5 legal pages (Privacy, Terms, SMS Terms, Cookie Policy, Security)
- [x] Footer with all legal links and Demo link
- [x] Header with navigation including Voice Demo link
- [x] CRMLogos component with marquee animation
- [x] CRM logos using actual SVG images (not text placeholders)
- [x] Mobile-responsive layout throughout
- [x] Routing for all pages configured in App.tsx
- [x] Shared animation utilities in lib/animations.ts

---

## Acceptance Criteria Status

### Homepage (`specs/homepage.md`)
- [x] Hero loads above the fold
- [x] CTA buttons navigate to /contact
- [x] Stats animate on scroll
- [x] All sections responsive
- [x] CRM section displays real logo images (not text placeholders)

### Booking Flow (`specs/booking-flow.md`)
- [x] User can book a demo from the contact page
- [x] Post-booking page confirms the booking
- [x] Flow works on mobile devices
- [N/A] Form validates required fields (LeadConnector handles validation)

### Demo Call (`specs/demo-call.md`)
- [x] User can start a voice call with one click
- [x] Visual feedback shows when AI is speaking vs listening
- [x] Call can be ended cleanly
- [x] Errors display user-friendly messages

### How It Works (`specs/how-it-works.md`)
- [x] CRM logos displayed
- [x] CTA to try demo or book consultation
- [x] Mobile-friendly layout
- [x] Clear step-by-step explanation (5 steps)

### Legal Pages (`specs/legal-pages.md`)
- [x] All 5 legal pages render correctly
- [x] Footer links navigate to each page
- [x] Pages follow consistent styling
- [x] Mobile-responsive layout

---

## Notes

- Run `./loop.sh plan` to analyze specs and generate tasks
- Run `./loop.sh` to implement tasks
- The booking flow is now: Homepage CTA → /contact (calendar) → user books via LeadConnector
- LeadConnector handles the redirect to confirmation page internally
- CRM list is now consolidated in `constants.ts` with logo paths, used by `CRMLogos.tsx`
- SVG logos added to `public/logos/` directory for all 8 CRM integrations
- Vite config has no code splitting configured - all routes are bundled together
