# QualAI Quiz Page (Page 1)

## Summary

The Quiz + Opt-in Landing Page is the entry point of the QualAI funnel. It qualifies HVAC/home service leads through a multi-step quiz and collects contact information for follow-up. Traffic comes from organic Instagram.

## Users & Jobs-to-be-Done

### Primary User
HVAC and home service business owners arriving from organic Instagram who:
- Already spend on marketing
- Have decent lead flow
- Want more high-ticket jobs
- Don't want to hire more office staff

### JTBD
- "When I see a post promising more high-ticket jobs, I want to **quickly understand if this is legit and relevant to my business**, so I can **decide whether to invest my time**."
- "When I'm filling out a form, I want to **see progress and feel like it's quick**, so I can **complete it without frustration**."

## Context

- Traffic: Organic Instagram
- Users are cold/warm — need immediate value proposition
- Must communicate: "High-ticket calls + AI capture system for HVAC/service businesses"
- Quiz is the application — no separate application form
- Position as high-ticket revenue growth, NOT generic AI agency

---

## Page Sections (In Order)

### 1. Hero Section

**Purpose:** Immediately communicate value prop and drive users to start quiz.

**Required Elements:**
- QualAI logo (header)
- Headline focused on high-ticket jobs + AI
- Subheadline explaining performance-based angle
- Primary CTA button (scrolls to or starts quiz)
- Trust bar for context

**Copy:**

```
Headline:
"Get More High-Ticket Jobs Without Hiring More Staff"

Subheadline:
"QualAI delivers exclusive high-intent calls for installs and replacements.
Our AI answers 24/7, qualifies leads, and books appointments —
so you never miss another $5,000+ opportunity.
You only pay when you profit."

CTA Button:
"See If You Qualify →"

Trust Bar:
"For HVAC, Plumbing, Electrical, Roofing & Home Service Businesses"
```

**Alternative Headlines (test options):**
- "Stop Missing High-Ticket Calls. Let AI Capture Them For You."
- "More $5K+ Jobs. No Extra Office Staff. AI Does The Work."
- "Exclusive Calls + AI That Books Them — You Only Pay When You Profit"

---

### 2. Benefits Section

**Purpose:** Quickly reinforce the value before quiz.

**Required Elements:** 4-5 benefit items with icons, laid out as cards or list

**Copy:**

| Icon | Benefit Title | Description |
|------|---------------|-------------|
| Phone | **Exclusive High-Intent Calls** | We generate inbound calls for installs and replacements — not shared leads |
| Robot/AI | **AI Answers & Books 24/7** | Never miss a call. Our AI qualifies leads and books appointments around the clock |
| Refresh/Loop | **Revive Lost Opportunities** | Automated follow-up reactivates old estimates and keeps your pipeline full |
| Star | **Boost Your Reviews** | Simple review-collection flows to improve your Google rating |
| Handshake | **Performance-Based Pricing** | Small base fee + 10-15% of revenue from jobs we help generate |

---

### 3. Quiz Component

**Purpose:** Qualify leads and collect data while maintaining engagement.

**Layout:** Centered card with progress bar at top (see design-system.md)

**Required Elements:**
- Progress bar UI ("Step X of 7")
- Step-by-step questions (see `quiz-questions.md` for full spec)
- Option cards (full tappable blocks, not tiny radio circles)
- "Next" and "Back" navigation buttons
- Final step collects contact info
- Submit redirects to Results page

**Mobile: Sticky CTA**
When quiz is not in viewport, show sticky "Start Quiz" button at bottom of screen.

**Technical Requirements:**
- Track current step in state
- Store all answers in state object
- Validate required fields before allowing "Next"
- Validate contact info on final step (email format, phone format)
- On submit: send to API endpoint, then redirect to Results page
- Pass quiz data via URL params, localStorage, or API (TBD)

---

## Requirements

### Functional Requirements

- [ ] REQ-QP-001: QualAI logo displays in header
- [ ] REQ-QP-002: Hero section displays headline, subheadline, CTA, and trust bar
- [ ] REQ-QP-003: CTA button scrolls to quiz or triggers quiz start
- [ ] REQ-QP-004: Benefits section displays 4-5 items with icons
- [ ] REQ-QP-005: Quiz displays as centered card
- [ ] REQ-QP-006: Progress bar shows "Step X of 7" accurately
- [ ] REQ-QP-007: Quiz shows one step per screen
- [ ] REQ-QP-008: Option cards are full tappable blocks
- [ ] REQ-QP-009: "Next" button advances to next step (validates current step first)
- [ ] REQ-QP-010: "Back" button returns to previous step (preserves answers)
- [ ] REQ-QP-011: Final step collects: first name, last name, email, phone, company name
- [ ] REQ-QP-012: Email field validates format before submission
- [ ] REQ-QP-013: Phone field validates format before submission
- [ ] REQ-QP-014: On submit, quiz data is sent to API endpoint
- [ ] REQ-QP-015: After successful submit, user is redirected to Results page
- [ ] REQ-QP-016: Quiz answers are passed to Results page

### Design Requirements (see design-system.md for details)

- [ ] REQ-QP-D01: Mobile-first responsive layout
- [ ] REQ-QP-D02: Clean, modern SaaS-style UI
- [ ] REQ-QP-D03: Plenty of white space, no clutter
- [ ] REQ-QP-D04: Quiz card centered with rounded corners and shadow
- [ ] REQ-QP-D05: Buttons minimum 52px height (thumb-friendly)
- [ ] REQ-QP-D06: Sticky CTA on mobile when quiz not in view
- [ ] REQ-QP-D07: Simple icons for benefits (phone, AI, etc.)
- [ ] REQ-QP-D08: Single sans-serif font (Inter or similar)
- [ ] REQ-QP-D09: No heavy gradients

---

## Acceptance Criteria

- [ ] AC-QP-001: QualAI logo visible in header
- [ ] AC-QP-002: User can view hero section with headline, subheadline, CTA, trust bar
- [ ] AC-QP-003: Clicking CTA initiates quiz flow or scrolls to quiz
- [ ] AC-QP-004: Benefits display with icons and clear hierarchy
- [ ] AC-QP-005: Quiz displays as centered card with visible shadow
- [ ] AC-QP-006: Progress bar accurately reflects current step out of total steps
- [ ] AC-QP-007: User can tap option cards to select (not just tiny circles)
- [ ] AC-QP-008: User can navigate forward through all quiz steps
- [ ] AC-QP-009: User can navigate backward and see previously entered answers
- [ ] AC-QP-010: Required fields block progression with clear error message
- [ ] AC-QP-011: Contact info validates email and phone formats
- [ ] AC-QP-012: Successful submission redirects to Results page
- [ ] AC-QP-013: Page is fully responsive (mobile-first)
- [ ] AC-QP-014: Sticky CTA appears on mobile when scrolled past quiz
- [ ] AC-QP-015: Page loads in under 3 seconds on 3G

---

## Component Structure

```
QuizPage/
├── Header
│   └── QualAILogo
├── HeroSection
│   ├── Headline
│   ├── Subheadline
│   ├── CTAButton
│   └── TrustBar
├── BenefitsSection
│   └── BenefitCard (x5)
│       ├── Icon
│       ├── Title
│       └── Description
├── QuizForm
│   ├── QuizCard
│   │   ├── ProgressBar
│   │   ├── QuizStep (dynamic based on current step)
│   │   │   ├── StepQuestion
│   │   │   └── OptionCards / TextInput
│   │   └── NavigationButtons
│   │       ├── BackButton
│   │       └── NextButton / SubmitButton
│   └── ContactInfoStep (final step)
│       ├── FirstNameInput
│       ├── LastNameInput
│       ├── EmailInput
│       ├── PhoneInput
│       └── CompanyNameInput
└── StickyCTA (mobile only, when quiz not visible)
```

---

## Non-Goals

- Testimonials section (reserved for future)
- Dynamic calculations (stubbed, not wired)
- Real backend integration (structure only)
- Heavy animations or transitions

---

## Open Questions

- [ ] Should quiz auto-advance after selection, or require "Next" click?
- [ ] Phone number format/validation requirements (US only? International?)
- [ ] Should we show a loading state during submission?
- [ ] Exact QualAI logo file and brand colors?
