# Homepage Specification

## Overview
The main landing page for Qual AI - an AI-powered lead qualification and booking service for HVAC and home service companies.

## JTBD (Job to Be Done)
Help HVAC business owners understand what Qual AI does and convert them to book a demo.

## Sections

### Hero Section
- Badge: "Qual AI for HVAC" with pulse animation
- Headline with animated gradient text accent
- Subheadline: Brief value proposition
- Primary CTA: Navigate to contact/booking page with glow effect
- Value props grid: 4 key benefits with glassmorphism cards
- Floating particles background for visual depth
- Phone mockup (desktop only) showing AI interface

### Stats Section
- 3 key metrics demonstrating results
- **Animated counters** that count from 0 to target on scroll
- Stats: "60s", "40-60%", "24/7"

### CRM Integrations
- Display real CRM logos (actual logo images, not text placeholders)
- Supported CRMs: ServiceTitan, FieldEdge, Housecall Pro, Jobber, ServiceM8, Service Fusion, Workiz, GorillaDesk
- Marquee/carousel animation
- Logos should be consistent size and styled for dark theme

### How It Works
- 3-step process explanation
- Step cards with numbered badges and glassmorphism effect

### FAQ Section
- **Interactive accordion** with expand/collapse
- Chevron rotation animation
- One open at a time behavior

### Final CTA
- Dark navy background
- Compelling closing pitch
- Primary CTA button

## Conversion Boosters

### Social Proof Toast
- Appears bottom-left after 5 second delay
- Cycles through recent "sign-ups"
- Slide-in animation from left
- Auto-dismiss after 5 seconds

### Sticky CTA
- Fixed bottom-right after 600px scroll
- "Apply for Partnership" button
- Hidden on /contact page

## Technical Requirements
- Framer Motion animations throughout
- Responsive: mobile-first design
- All copy driven from `constants.ts`

## Acceptance Criteria
- [x] Hero loads above the fold
- [x] CTA buttons navigate to /contact
- [x] Stats animate with count-up effect
- [x] All sections responsive
- [x] CRM section displays real logo images (not text placeholders)
- [x] FAQ is interactive accordion
- [x] Hero has animated gradient text
- [x] Floating particles in hero background
- [x] Cards use glassmorphism effect
- [x] Social proof toast appears after 5s
- [x] Sticky CTA after 600px scroll
- [x] Phone mockup visible on desktop hero
