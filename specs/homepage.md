# Homepage Specification

## Overview
The main landing page for Qual AI - an AI-powered lead qualification and booking service for HVAC and home service companies.

## JTBD (Job to Be Done)
Help HVAC business owners understand what Qual AI does and convert them to book a demo.

## Sections

### Hero Section
- Badge: "Qual AI for HVAC"
- Headline + accent: Communicate AI-powered booking automation
- Subheadline: Brief value proposition
- Primary CTA: Navigate to contact/booking page
- Value props grid: 4 key benefits

### Stats Section
- 3 key metrics demonstrating results
- Animated on scroll

### CRM Integrations
- Display real CRM logos (actual logo images, not text placeholders)
- Supported CRMs: ServiceTitan, FieldEdge, Housecall Pro, Jobber, ServiceM8, Service Fusion, Workiz, GorillaDesk
- Marquee/carousel animation
- Logos should be consistent size and grayscale/muted to match dark theme

### How It Works
- 3-step process explanation
- Step cards with numbered badges

### FAQ Section
- Common objections/questions

### Final CTA
- Dark navy background
- Compelling closing pitch
- Primary CTA button

## Technical Requirements
- Framer Motion animations throughout
- Responsive: mobile-first design
- All copy driven from `constants.ts`

## Acceptance Criteria
- [x] Hero loads above the fold
- [x] CTA buttons navigate to /contact
- [x] Stats animate on scroll
- [x] All sections responsive
- [x] CRM section displays real logo images (not text placeholders)

