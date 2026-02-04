# QualAI Results Page (Page 2)

## Summary

The Results + VSL + Calendar page is the conversion point of the QualAI funnel. It affirms the lead's fit, explains the High-Ticket Calls + AI Capture System, and drives them to book a strategy call.

## Users & Jobs-to-be-Done

### Primary User
HVAC/home service business owner who just completed the quiz — they are warm and pre-framed.

### JTBD
- "When I've just invested time in a quiz, I want to **see that it was worth it and get personalized insight**, so I can **feel confident this is relevant to my situation**."
- "When I'm considering a new service, I want to **quickly understand how it works**, so I can **decide if it's worth a call**."
- "When I'm ready to learn more, I want to **book a call easily**, so I can **get my questions answered without friction**."

## Context

- User just completed quiz and submitted contact info
- User is warm — copy should affirm their decision and build urgency
- This page must explain the QualAI system and persuade them to book
- Quiz data available to personalize messaging (future enhancement)
- Maintain visual continuity with Quiz Page

---

## Page Sections (In Order)

### 1. Results Banner

**Purpose:** Affirm fit, create excitement about the opportunity.

**Required Elements:**
- Headline affirming their qualification
- Subheadline with personalized opportunity framing
- Optional: Dynamic revenue projection line (stubbed for now)

**Copy:**

```
Headline:
"You Qualify for QualAI"

Subheadline:
"Based on your answers, you're likely leaving serious money on the table
from missed calls and leads that never get followed up.

Here's how QualAI fixes that — and you only pay when you profit."

Dynamic Line (stub for future):
"With your job value and lead volume, even 5-10 extra booked jobs
a month could mean $XX,XXX+ in additional revenue."
```

**Design:**
- Can have subtle background color or gradient to differentiate
- Large headline, clear hierarchy
- Centered, max-width container

---

### 2. VSL Section

**Purpose:** Explain the QualAI system and build desire for the call.

**Required Elements:**
- Section title above video
- Video embed placeholder (16:9 aspect ratio)
- Bullet recap of system benefits below video

**Copy:**

```
Title (above video):
"How QualAI Gets You More High-Ticket Jobs"

Video Placeholder:
[VSL Video Embed - 16:9 aspect ratio, max-width 720px, centered]

Benefit Bullets (below video):

✓ Exclusive high-intent calls
  We generate inbound calls for installs and replacements — not shared leads from marketplaces.

✓ AI answers and books 24/7
  Our AI picks up every call, qualifies the lead, and books appointments so you never miss a high-ticket opportunity.

✓ Automated follow-up
  AI follows up with new leads and old estimates to revive lost opportunities and keep your pipeline full.

✓ Review collection
  Simple flows that get you more 5-star reviews to boost your Google ranking and close rate.

✓ Performance-based pricing
  Small base fee + 10-15% of revenue from jobs that start from our tracked calls and automations. We only win when you win.
```

**Design:**
- Video prominently displayed
- Bullets as cards or clean list with checkmarks
- Generous spacing

---

### 3. Calendar Section

**Purpose:** Get the booking. Clear CTA with low friction.

**Required Elements:**
- Section headline
- Subheadline setting expectations
- Calendar embed placeholder
- Preparation bullets
- Trust/no-obligation text

**Copy:**

```
Headline:
"Book Your QualAI Strategy Call"

Subheadline:
"In 20-30 minutes, we'll map your numbers and show exactly how
QualAI can plug into your business."

Calendar Placeholder:
[Calendar Component Embed - Calendly/Cal.com/GHL]

Preparation Bullets:
• Come prepared with: your average job value, monthly lead volume, and close rate
• This is not a generic demo — we'll tailor everything to your trade and market

Trust Text (below or near calendar):
"No long-term contract. No obligation. Just a planning call to see if we're a fit."
```

**Design:**
- Clear visual break from VSL section
- Calendar prominently displayed
- Trust text visible but not overwhelming

---

### 4. Sticky CTA (Mobile)

On mobile, when calendar is not in view, show sticky CTA at bottom.

**Copy:**
```
Button: "Book Your Call →"
```

---

## Requirements

### Functional Requirements

- [ ] REQ-RP-001: QualAI logo displays in header (consistent with Quiz Page)
- [ ] REQ-RP-002: Results banner displays headline and subheadline
- [ ] REQ-RP-003: Dynamic revenue line displays (stubbed values initially)
- [ ] REQ-RP-004: VSL section displays title, video placeholder, and benefit bullets
- [ ] REQ-RP-005: Video placeholder maintains 16:9 aspect ratio
- [ ] REQ-RP-006: Calendar section displays headline, subheadline, and calendar placeholder
- [ ] REQ-RP-007: Preparation bullets and trust text display below calendar
- [ ] REQ-RP-008: Page receives quiz data from Page 1 (method TBD)
- [ ] REQ-RP-009: Page can display without quiz data (fallback copy)
- [ ] REQ-RP-010: Sticky CTA appears on mobile when calendar not in view

### Design Requirements (see design-system.md for details)

- [ ] REQ-RP-D01: Visual continuity with Quiz Page (same design system)
- [ ] REQ-RP-D02: VSL video above the fold on desktop
- [ ] REQ-RP-D03: VSL video near top on mobile
- [ ] REQ-RP-D04: Calendar visible without excessive scrolling after video
- [ ] REQ-RP-D05: Mobile-first responsive layout
- [ ] REQ-RP-D06: QualAI branding consistent throughout
- [ ] REQ-RP-D07: Clean SaaS-style UI, plenty of white space
- [ ] REQ-RP-D08: Single sans-serif font (Inter or similar)

---

## Acceptance Criteria

- [ ] AC-RP-001: QualAI logo visible in header
- [ ] AC-RP-002: User sees results banner with affirming headline after quiz completion
- [ ] AC-RP-003: Video placeholder displays with correct 16:9 aspect ratio
- [ ] AC-RP-004: All benefit bullets display correctly below video
- [ ] AC-RP-005: Calendar placeholder displays in calendar section
- [ ] AC-RP-006: Trust text ("No obligation...") is visible near calendar
- [ ] AC-RP-007: Page is fully responsive (mobile, tablet, desktop)
- [ ] AC-RP-008: Page maintains brand consistency with Quiz Page
- [ ] AC-RP-009: Sticky CTA appears on mobile when calendar not in view
- [ ] AC-RP-010: Page loads in under 3 seconds on 3G

---

## Component Structure

```
ResultsPage/
├── Header
│   └── QualAILogo
├── ResultsBanner
│   ├── Headline
│   ├── Subheadline
│   └── DynamicRevenueLine (optional/stubbed)
├── VSLSection
│   ├── SectionTitle
│   ├── VideoEmbed (placeholder, 16:9)
│   └── BenefitBullets
│       └── BenefitItem (x5)
├── CalendarSection
│   ├── SectionHeadline
│   ├── SectionSubheadline
│   ├── CalendarEmbed (placeholder)
│   ├── PreparationBullets
│   └── TrustText
└── StickyCTA (mobile only, when calendar not visible)
```

---

## Non-Goals

- Real calendar integration (placeholder only in v1)
- Actual dynamic calculations (stubbed)
- Video production (placeholder only)
- Backend for quiz data retrieval
- Soft disqualification flows

---

## Open Questions

- [ ] What calendar tool will be embedded? (Calendly, Cal.com, GHL?)
- [ ] Should we show explicit qualification status (qualified/not qualified)?
- [ ] What's the VSL video content and length?
- [ ] How is quiz data passed? (URL params, localStorage, API?)
- [ ] Any fallback if calendar embed fails to load?
