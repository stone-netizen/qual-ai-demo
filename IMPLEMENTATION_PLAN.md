# Implementation Plan

> Last updated: 2026-01-30
> Status: Core features complete

## Current Milestone: Polish & Optimization

### Low Priority

- [ ] **Implement code-splitting to reduce bundle size**
  - Current build: ~845KB (warning threshold: 500KB)
  - Use dynamic imports for route-based code splitting
  - Consider lazy loading legal pages and Demo page

- [x] **Video thumbnail verified** - `/public/video-thumbnail.jpg` exists (54KB)

---

## Completed

- [x] **Integrate booking calendar on Contact page** (2026-01-30)
  - Added LeadConnector calendar embed from VSLSection
  - Added SMS compliance disclosure
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
- [x] All 5 legal pages (Privacy, Terms, SMS Terms, Cookie Policy, Security)
- [x] Footer with all legal links
- [x] Header with navigation
- [x] CRMLogos component with marquee animation
- [x] Mobile-responsive layout throughout
- [x] Routing for all pages configured in App.tsx

---

## Notes

- Run `./loop.sh plan` to analyze specs and generate tasks
- Run `./loop.sh` to implement tasks
- The booking flow is now: Homepage CTA → /contact (calendar) → user books via LeadConnector
- LeadConnector handles the redirect to confirmation page internally
