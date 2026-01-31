# Homepage Specification

## Overview
The main landing page for Qual AI - an AI-powered lead qualification and booking service for HVAC and home service companies.

## JTBD (Job to Be Done)
Help HVAC business owners understand what Qual AI does and convert them to book a demo.

---

## Sections

### Hero Section
- Badge: "Exclusive Partnership Program" with pulse animation
- Headline with animated gradient text accent ("Delivered")
- Subheadline: Brief value proposition
- Primary CTA: Navigate to contact/booking page with glow effect
- Value props grid: 4 key benefits with glassmorphism cards
- Floating particles background for visual depth
- Phone mockup (desktop only, lg:block) showing AI interface

### Stats Section
- 3 key metrics: "60s", "40-60%", "24/7"
- **Animated counters** that count from 0 to target on scroll
- Responsive typography for mobile

### CRM Integrations
- **Use Logo.dev API** to display real CRM logos (NOT local SVG files)
- Logo.dev URL pattern: `https://img.logo.dev/{domain}?token={TOKEN}&format=png&theme=dark`
- `format=png` for transparent backgrounds, `theme=dark` for dark background compatibility
- Supported CRMs: ServiceTitan, FieldEdge, Housecall Pro, Jobber, ServiceM8, Service Fusion, Workiz, GorillaDesk
- Marquee/carousel animation with fade edges
- **Logo containers should be circular** (rounded-full, equal width/height)
- **Responsive fade edges**: `w-8 sm:w-12 md:w-24`
- **Responsive logo padding**: `mx-2 sm:mx-4 md:mx-6`

### How It Works
- 3-step process explanation
- Step cards with numbered badges and glassmorphism effect
- Equal height cards

### FAQ Section
- **Interactive accordion** with expand/collapse
- Chevron rotation animation (180°)
- One open at a time behavior
- Minimum 44px touch targets for mobile

### Final CTA
- Dark navy background with dot pattern
- Compelling closing pitch
- Primary CTA button

---

## Conversion Elements

### Sticky CTA (KEEP)
- Fixed bottom-right after 600px scroll
- "Apply for Partnership" button with arrow
- Hidden on /contact page
- Shadow for depth

### Social Proof Toast (REMOVE)
- **REMOVED** - Do not include this component
- Remove import and usage from Home.tsx

---

## Mobile Responsiveness Requirements

### Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md)
- Desktop: > 1024px (lg)

### Hero Section
- Text centered on mobile, left-aligned on desktop
- PhoneMockup hidden on mobile/tablet
- Value props: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`

### Typography Scaling
- Headline: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Subheadline: `text-base sm:text-lg md:text-xl`

### Section Padding
- Mobile: `py-12 px-4`
- Tablet: `md:py-16 sm:px-6`
- Desktop: `lg:py-20 lg:px-8`

---

## Technical Requirements
- Framer Motion animations throughout
- Responsive: mobile-first design
- All copy driven from `constants.ts`
- Logo.dev API key in `.env` as `VITE_LOGODEV_TOKEN`

---

## Acceptance Criteria
- [x] Hero loads above the fold
- [x] CTA buttons navigate to /contact
- [x] Stats animate with count-up effect
- [x] All sections responsive (no horizontal scroll on mobile)
- [x] CRM section displays real logos from Logo.dev API
- [x] CRM logo containers are circular (rounded-full with equal w/h)
- [x] FAQ is interactive accordion
- [x] Hero has animated gradient text
- [x] Floating particles in hero background
- [x] Cards use glassmorphism effect
- [x] Social proof toast is REMOVED
- [x] Sticky CTA after 600px scroll (bottom-right)
- [x] Phone mockup visible on desktop hero only
- [x] Touch targets minimum 44px on mobile
- [x] CRM fade edges responsive for mobile
- [x] All CTAs use `@shadcn/button` component
- [x] All badges use `@shadcn/badge` component
- [x] FAQ uses `@shadcn/accordion` component
- [x] Cards use `@shadcn/card` component
