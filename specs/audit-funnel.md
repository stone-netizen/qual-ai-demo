# Audit Funnel Specification

**JTBD Served:** 1 (Self-Diagnose), 2 (Quantify Cost), 3 (Evaluate Without Committing), 4 (Book With Zero Friction), 7 (Protect Time/Privacy)

## Overview

Interactive 4-step lead loss audit that calculates estimated revenue leakage for home service businesses and converts visitors into booked calls. The funnel acts as a diagnostic tool, not a sales pitch. The visitor gets value (their specific revenue loss number) before being asked to do anything.

**Route:** `/#/audit`

## Flow

```
Landing -> Niche Selection -> Calculator (8 questions) -> Results + Booking
```

No VSL screen. Results page is the terminal conversion point.

## Components

### Step 1: Landing (`components/audit/LeakAuditLanding.tsx`)

**No changes from current implementation.**

- Problem-first headline: "Your Business Is Leaking Revenue. Let Me Show You Where It's Going."
- Subheadline with "9 out of 10 service businesses" stat
- Primary CTA: "Start My Leak Audit"
- "Takes 90 seconds. No sign-up needed."
- Trust badges: Private, Instant, No Sales Pitch
- Video placeholder section
- "Why It Matters" section with 3 leak point cards (Missed Calls, Lost CRM Leads, Dead DMs)
- Final CTA: "Run My Audit Now"

### Step 2: Niche Selection (`components/audit/NicheSelection.tsx`)

**No changes from current implementation.**

- Header: "How Much Revenue Is Your Business Leaking?"
- 2x4 grid of 8 industry tiles with icons from lucide-react
- Industries: HVAC, Roofing, Plumbing, Electrical, Pest Control, Cleaning, Landscaping, Gen. Contracting
- Trust footer: Instant Results, Secure Analysis
- Selecting an industry sets default job value and advances to Calculator

### Step 3: Calculator (`components/audit/Calculator.tsx`)

8 questions with progress bar. Each question has a title, description, and selection options.

**Questions:**
1. **Leak Identification** - Missed call frequency (rarely → all the time)
2. **Active Channels** - Multi-select lead channels (phone, website, social DMs, Google messages, SMS, email)
3. **Response Velocity** - Speed to lead (under 5 min → 6+ hours)
4. **Job Valuation** - Industry-specific job value ranges
5. **Persistence Analysis** - Follow-up process (automated → nothing)
6. **Database Audit** - Reactivation process (active → nothing)
7. **Trust Metrics** - Google visibility/reviews
8. **Compiling Your Report** - Auto-advances after 1.5s loading animation to Results (removes one click of friction)

**Change for step 8:** Replace the current "Strategy Compiled" step (which requires clicking "REVEAL FINANCIAL REPORT") with an auto-advancing loading state. Show "Compiling Your Report..." with a brief animation, then auto-advance to Results after ~1.5 seconds.

### Step 4: Results + Booking (`components/audit/Results.tsx`) - REDESIGNED

The Results page is the terminal conversion point. It must serve as both the emotional payoff AND the conversion mechanism.

**Layout (top to bottom):**

#### A. Revenue Loss Hero (above the fold)
- "Critical Revenue Loss" badge (red)
- "REVENUE LEAKAGE REPORT" heading
- Client sector label

#### B. Total Loss Number (the emotional peak)
- Blue hero card with total monthly loss (large, 7xl-9xl font)
- Annual figure below
- Quote: "Your lead flow has structural failures..."

#### C. Primary CTA (immediately after the number)
- Full-width button: "Book My Recovery Call"
- Scrolls to calendar section on click (smooth scroll, not navigation)

#### D. Loss Category Cards (proof/detail)
- 4 rounded cards showing per-category losses:
  - Omnichannel Leakage (LEAK #1)
  - Speed-to-Lead Gap (LEAK #2)
  - Follow-Up Failure (LEAK #3)
  - CRM Graveyard (GAP #4)
- Each shows dollar amount per month with context

#### E. Video Embed
- Embedded video player (YouTube/Vimeo iframe)
- Placeholder until real video URL is provided
- "Here's how we plug these leaks" framing

#### F. Calendar Embed
- GHL/LeadConnector calendar iframe directly on page
- iframe src: `https://api.leadconnectorhq.com/widget/booking/86t1nPwKPa3V1sqBmr8t`
- Script: `https://link.msgsndr.com/js/form_embed.js` (loaded via useEffect)
- Min height: 600px, 100% width, no border
- A2P 10DLC compliance disclosure below calendar

#### G. Trust Footer
- Lead Flow Logic, Profit Recovery, Trust Matrix badges

#### H. Sticky Mobile CTA
- Fixed bottom bar on mobile (`md:hidden`)
- "Book My Recovery Call" button
- White/blur background with border-top

## State Machine (`pages/Audit.tsx`)

```typescript
type AuditStep = 'niche-selection' | 'landing' | 'questions' | 'results';
// 'vsl' REMOVED
```

Steps:
- `landing` -> renders `LeakAuditLanding` (full-width, outside card container)
- `niche-selection` -> renders `NicheSelection`
- `questions` -> renders `Calculator`
- `results` -> renders `Results` (terminal, no onNext)

## Calculation Engine

Source: `lib/audit-constants.ts`

| Input | Values |
|-------|--------|
| Missed calls | rarely=2, sometimes=6, often=12, very-often=20, all-time=30 /month |
| Channel multiplier | 1 channel=1.0x ... 6 channels=1.6x |
| Response time loss | under-5=5%, 5-30=15%, 30-120=35%, 2-6h=55%, 6h+=75% |
| Follow-up loss | automated=0%, manual-1-2=25%, one-attempt=50%, nothing=70% |
| Reactivation gap | active=0%, occasional=15%, manual-slow=30%, nothing=45% |
| Review modifier | lots-positive=0%, some-mixed=10%, few-not-great=25%, not-much=40% |

Formula:
```
adjustedMissed = baseMissedNum * channelMultiplier
omnichannelLoss = adjustedMissed * avgJobValue * 0.4 (base conversion)
speedToLeadLoss = omnichannelLoss * responseTimeLoss
followUpLoss = omnichannelLoss * followUpFactor
reactivationLoss = (baseMissed * 12 * 5) * avgJobValue * 0.05 * reactivationFactor / 12
reputationLoss = omnichannelLoss * reviewModifier
totalMonthly = sum of all
totalAnnual = totalMonthly * 12
```

## Files

| File | Action |
|------|--------|
| `components/audit/Results.tsx` | Major redesign |
| `pages/Audit.tsx` | Remove VSL step, simplify state machine |
| `lib/audit-types.ts` | Remove 'vsl' from AuditStep |
| `components/audit/Calculator.tsx` | Auto-advance step 8 |
| `components/audit/VSLScreen.tsx` | DELETE |
| `components/audit/EmailGate.tsx` | DELETE |
| `components/audit/LeakAuditLanding.tsx` | No changes |
| `components/audit/NicheSelection.tsx` | No changes |
| `lib/audit-constants.ts` | No changes |

## Shadcn Components

| Component | Usage |
|-----------|-------|
| `@shadcn/button` | Primary CTAs ("Start My Leak Audit", "Book My Recovery Call"), calculator option buttons |
| `@shadcn/card` | Leak point cards on landing, industry tiles, loss category cards on results |
| `@shadcn/badge` | Trust badges, "Critical Revenue Loss" badge, step labels |
| `@shadcn/progress` | Calculator progress bar (8 steps) |
| `@shadcn/separator` | Section dividers on results page |

### Install Command
```bash
npx shadcn@latest add button card badge progress separator
```

### Component Implementation
```tsx
{/* Landing - Primary CTA */}
<Button size="lg" className="w-full text-lg py-6">
  Start My Leak Audit
</Button>

{/* Results - Revenue Loss Badge */}
<Badge variant="destructive">Critical Revenue Loss</Badge>

{/* Results - Loss Category Card */}
<Card>
  <CardHeader>
    <CardTitle>Omnichannel Leakage</CardTitle>
    <CardDescription>LEAK #1</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold text-red-500">$X,XXX/mo</p>
  </CardContent>
</Card>

{/* Calculator - Progress Bar */}
<Progress value={(currentStep / totalSteps) * 100} />

{/* Results - Primary CTA */}
<Button size="lg" className="w-full" onClick={scrollToCalendar}>
  Book My Recovery Call
</Button>
```

### Variants Used
- `variant="default"` — Primary CTAs (Start Audit, Book Call)
- `variant="destructive"` — Revenue loss badge
- `variant="outline"` — Industry selection tiles, calculator options
- `size="lg"` — All primary CTAs (min 44px touch target)

### Custom Components

#### AudioWaveform (`components/AudioWaveform.tsx`)
*Keep as custom component — not available in shadcn*

#### AnimatedCounter (`components/AnimatedCounter.tsx`)
*Keep as custom component — scroll-triggered count animation*

## CSS Classes

No custom CSS classes required — all styling uses Tailwind utilities and shadcn component defaults. The Calculator progress bar uses the `@shadcn/progress` component (no custom CSS). Existing custom animations (`vsl-pulse`) should be removed from `index.html` after VSL deletion.

## Acceptance Criteria

### Functionality
- [x] Flow completes: Landing -> Niche -> Calculator (8 questions) -> Results
- [x] VSL step is completely removed (no route, no component, no import)
- [x] EmailGate component is deleted
- [x] Calculator step 8 auto-advances after brief animation
- [x] Calendar embed loads and is interactive on Results page
- [x] Revenue loss numbers calculate correctly (no regression)
- [x] "Book My Recovery Call" button smooth-scrolls to calendar section

### Visual
- [x] Total loss number is first thing visible on Results page (above cards)
- [x] Book CTA appears above the loss category cards
- [x] Video embed renders below cards
- [x] Calendar embed renders below video
- [x] All loss amounts formatted as USD currency

### Mobile
- [x] Sticky CTA bar fixed to bottom on mobile
- [x] Calendar embed is usable on mobile (min-height, scrollable)
- [x] Touch targets minimum 44px
- [x] No horizontal scroll

### Shadcn
- [x] Primary CTAs use `@shadcn/button` component
- [x] Loss category cards use `@shadcn/card` component
- [x] Trust/status badges use `@shadcn/badge` component
- [x] Calculator progress bar uses `@shadcn/progress` component
- [x] Section dividers use `@shadcn/separator` component
