# Implementation Plan

> Last updated: 2026-02-04
> Status: **Significant gaps identified** — Quiz and Results pages need major updates to match specs

---

## Summary

The QualAI Quiz Funnel has a foundational implementation but **does not match the current specs**. Major changes are needed to the quiz structure, copy, and results page to align with the specifications in `specs/`.

**Priority Levels:**
- **P0** — Breaks spec compliance, must fix before launch
- **P1** — Important for conversion optimization
- **P2** — Polish and enhancements

---

## Gap Analysis Summary

### Critical Mismatches (P0)

| Spec Requirement | Current Code | Gap |
|------------------|--------------|-----|
| 5 quiz steps + contact | 6 steps with different questions | Wrong quiz structure |
| Hero: "$10K+ missed calls" | "Get More High-Ticket Jobs" | Wrong headline |
| Trust bar: "150+ contractors, $2.3M+" | Trade types list | Missing social proof |
| 4 benefits with specific copy | 5 benefits, different copy | Benefits mismatch |
| Micro-copy below each question | None | Missing entirely |
| Progress celebrations (Steps 2, 4) | None | Missing entirely |
| Contact CTA: "Show Me My Revenue Opportunity" | "See My Results & Next Steps" | Wrong CTA text |
| Dynamic revenue box on Results | Stubbed text only | Missing calculation |
| "How It Works" 3-step section | VSL video placeholder | Wrong section |
| Trust box above calendar | Missing | Missing entirely |
| Urgency element below calendar | Missing | Missing entirely |
| Social proof near calendar | Missing | Missing entirely |

### Trust Elements Spec (trust-elements.md) — All Missing

| Requirement | Status |
|-------------|--------|
| REQ-TE-001: Contractor count in trust bar | ❌ Missing |
| REQ-TE-002: Revenue generated in trust bar | ❌ Missing |
| REQ-TE-003: "5-10 jobs" in hero subheadline | ❌ Missing |
| REQ-TE-004: Risk reversal in hero subheadline | ⚠️ Partial |
| REQ-TE-005: Trust box on Results Page | ❌ Missing |
| REQ-TE-006: Trust box above calendar | ❌ Missing |
| REQ-TE-007: Trust box min 14px font | ❌ Missing |
| REQ-TE-008: Urgency element below calendar | ❌ Missing |
| REQ-TE-009: Social proof near calendar | ❌ Missing |

---

## Tasks

### Phase 1: Quiz Page Copy & Structure (P0)

#### UI-001: Update Hero Section Copy to Match Spec

**Description:** Update hero headline, subheadline, CTA text, and trust bar to match quiz-page.md spec exactly.

**Files:** `lib/quiz-constants.ts`, `components/quiz/HeroSection.tsx`

**Acceptance Criteria:**
- [ ] Headline is "Stop Losing $10K+ Every Month to Missed Calls and Dead Leads"
- [ ] Subheadline includes "5-10 booked jobs per month"
- [ ] Subheadline includes "No setup fees. No long-term contracts."
- [ ] CTA button says "Get My Free Revenue Analysis →"
- [ ] Trust bar says "Trusted by 150+ HVAC, Plumbing & Roofing Contractors | $2.3M+ Revenue Generated"

---

#### UI-002: Update Benefits Section to Match Spec (4 Items)

**Description:** Update benefits to have exactly 4 items with the spec's outcome-focused copy.

**Files:** `lib/quiz-constants.ts`, `components/quiz/BenefitsSection.tsx`

**Acceptance Criteria:**
- [ ] Exactly 4 benefit cards displayed
- [ ] Benefit 1: "Never Miss a $5K+ Opportunity Again" with spec description
- [ ] Benefit 2: "Exclusive Calls, Not Marketplace Junk" with spec description
- [ ] Benefit 3: "Turn Old Estimates Into Booked Jobs" with spec description
- [ ] Benefit 4: "You Only Pay When You Profit" with spec description (risk reversal)
- [ ] All benefits have specific numbers (15-20%, $5K+)

---

#### UI-003: Restructure Quiz to 5 Steps + Contact

**Description:** Change quiz from 6 multi-question steps to 5 single-question steps per the spec. Remove "lead source", "current automation", and "marketing budget" questions. Use "pricing preference" instead of "openToRevShare".

**Files:** `lib/quiz-types.ts`, `lib/quiz-constants.ts`, `components/quiz/QuizForm.tsx`

**Acceptance Criteria:**
- [ ] Step 1: Trade Type (single question, 7 options + "Other")
- [ ] Step 2: Job Volume (single question, 4 options)
- [ ] Step 3: Lead Flow / Monthly Leads (single question, 4 options)
- [ ] Step 4: Missed Calls Percent (single question, 4 options)
- [ ] Step 5: Pricing Preference (single question, 3 options with softened language)
- [ ] Step 6: Contact Info (5 fields + optional job value)
- [ ] Progress shows "Step X of 5" for steps 1-5, "Last Step" for contact
- [ ] Questions have correct labels per quiz-questions.md
- [ ] TypeScript types updated to remove removed fields

---

#### UI-004: Add Micro-Copy Below Each Quiz Question

**Description:** Add educational micro-copy below each quiz question as specified.

**Files:** `lib/quiz-constants.ts`, `components/quiz/QuizStep.tsx`, `components/quiz/QuizForm.tsx`

**Acceptance Criteria:**
- [ ] Step 1 micro-copy: "This helps us tailor everything to your industry."
- [ ] Step 2 micro-copy: "This tells us your capacity for growth."
- [ ] Step 3 micro-copy: "More leads = more upside when we capture missed opportunities."
- [ ] Step 4 micro-copy: "Be honest — this is where the money is hiding."
- [ ] Step 5 micro-copy: "Most owners love this model — we only profit when you do."
- [ ] Micro-copy styled per design system (14px, gray-400, regular weight)

---

#### UI-005: Add Progress Celebrations After Steps 2 and 4

**Description:** Show positive feedback messages after completing steps 2 and 4.

**Files:** `components/quiz/QuizForm.tsx`, `components/quiz/ProgressCelebration.tsx` (new)

**Acceptance Criteria:**
- [ ] After Step 2: "Nice — you've got solid volume to work with."
- [ ] After Step 4 (if 11%+): "That's exactly where we recover the most revenue."
- [ ] After Step 4 (if 0-10%): "Even at that rate, we can help you capture more."
- [ ] Celebration styled with green-50 background, green border, checkmark icon
- [ ] Fade-in animation on appearance

---

#### UI-006: Update Contact Step Header and CTA

**Description:** Update contact step to use value-focused framing per spec.

**Files:** `lib/quiz-constants.ts`, `components/quiz/ContactInfoStep.tsx`

**Acceptance Criteria:**
- [ ] Header: "Last step — where should we send your personalized revenue breakdown?"
- [ ] Sub-header: "Takes 2 minutes to review. Shows exactly how much you're leaving on the table."
- [ ] CTA button: "Show Me My Revenue Opportunity →"
- [ ] Average job value field is present and optional (collapsed by default or clearly marked optional)

---

### Phase 2: Results Page Major Rebuild (P0)

#### UI-007: Add Dynamic Revenue Box to Results Banner

**Description:** Replace stubbed revenue line with prominently styled dynamic calculation box.

**Files:** `components/quiz/ResultsBanner.tsx`, new helper in `lib/quiz-calculations.ts`

**Acceptance Criteria:**
- [ ] Revenue box displays with prominent border, shadow, light background
- [ ] Shows "YOUR OPPORTUNITY BREAKDOWN" header with chart icon
- [ ] Calculates missed calls from quiz data (monthlyLeads × missedPercent midpoint)
- [ ] Calculates potential recovered calls (missed × 30% recovery rate)
- [ ] Shows average job value (from quiz or $5,000 default)
- [ ] Shows "POTENTIAL MONTHLY UPSIDE" as range (±20%)
- [ ] Trade type dynamically inserted ("Based on [TRADE] businesses")
- [ ] Below box: risk reversal text per spec

---

#### UI-008: Replace VSL Section with "How It Works" 3-Step Section

**Description:** Remove video placeholder, add 3-step visual explainer with outcome summary box.

**Files:** `components/quiz/VSLSection.tsx` → rename to `components/quiz/HowItWorksSection.tsx`

**Acceptance Criteria:**
- [ ] Section title: "How QualAI Turns Missed Calls Into Booked Jobs"
- [ ] Step 1: "AI Answers Every Call" with phone/checkmark icon and spec description
- [ ] Step 2: "Qualified Leads Get Booked" with calendar/person icon and spec description
- [ ] Step 3: "You Close More Jobs" with dollar/handshake icon and spec description
- [ ] Steps connected visually (arrows or lines on desktop, vertical stack on mobile)
- [ ] Outcome Summary Box with 4 checkmark items per spec
- [ ] Outcome box has green-tinted background

---

#### UI-009: Add Trust Box Above Calendar

**Description:** Add prominent trust box with Zero Risk Guarantee above calendar embed.

**Files:** `components/quiz/CalendarSection.tsx`, new `components/quiz/TrustBox.tsx`

**Acceptance Criteria:**
- [ ] Trust box appears ABOVE calendar placeholder
- [ ] Header: "🔒 Zero Risk Guarantee"
- [ ] 3 bullet points per spec (no obligation, no contracts, no fees)
- [ ] Closing line: "If we're not a fit, we'll tell you. No hard sell. No BS."
- [ ] Styled with border, green-50 or blue-50 background, min 14px font
- [ ] NOT italic or small text

---

#### UI-010: Add Urgency and Social Proof Near Calendar

**Description:** Add urgency element below calendar and social proof near CTA.

**Files:** `components/quiz/CalendarSection.tsx`

**Acceptance Criteria:**
- [ ] Urgency element: "⚡ We onboard 3-5 new contractors per week. Book now to secure your spot."
- [ ] Social proof: "Join 150+ contractors already using QualAI to capture missed revenue"
- [ ] Urgency has lightning emoji, amber-500 or gray-500 color
- [ ] Social proof appears near calendar area
- [ ] Neither element is aggressive (no countdown timers)

---

#### UI-011: Update Calendar Section Copy

**Description:** Update calendar headline and subheadline to match spec.

**Files:** `lib/quiz-constants.ts`, `components/quiz/CalendarSection.tsx`

**Acceptance Criteria:**
- [ ] Headline: "See Your Custom AI Plan in 20 Minutes (Free)"
- [ ] Subheadline includes trade type dynamically: "...built for your [TRADE] business"
- [ ] "What to Expect" bullets match spec (4 items per results-page.md)
- [ ] Remove or update current "Before your call" section

---

### Phase 3: Results Page Polish (P1)

#### UI-012: Pass Quiz Data to Results and Use for Personalization

**Description:** Ensure quiz data flows to results page and is used for dynamic content.

**Files:** `pages/Quiz.tsx`, `components/quiz/ResultsBanner.tsx`, `components/quiz/CalendarSection.tsx`

**Acceptance Criteria:**
- [ ] Quiz data passed as prop to ResultsBanner
- [ ] Trade type used in revenue box footer
- [ ] Trade type used in calendar subheadline
- [ ] Page displays with sensible defaults if quiz data is missing

---

#### UI-013: Update Results Banner Headline

**Description:** Update results banner to use pain-focused headline.

**Files:** `lib/quiz-constants.ts`, `components/quiz/ResultsBanner.tsx`

**Acceptance Criteria:**
- [ ] Headline: "Here's the Money You're Leaving on the Table"
- [ ] Remove "You Qualify for QualAI" messaging
- [ ] Subheadline references "Based on your answers..."

---

### Phase 4: Design System Compliance (P1)

#### UI-014: Add Option Card Selection Animation

**Description:** Add tactile feedback animation when option cards are selected.

**Files:** `components/quiz/QuizStep.tsx`

**Acceptance Criteria:**
- [ ] On selection: subtle scale (1.01) + shadow increase
- [ ] Animation duration: 150ms ease-out
- [ ] Feels responsive and tactile

---

#### UI-015: Verify All Touch Targets Meet 44px Minimum

**Description:** Audit all interactive elements for accessibility touch target compliance.

**Files:** Various components

**Acceptance Criteria:**
- [ ] All buttons meet 44x44px minimum
- [ ] All option cards meet minimum touch target
- [ ] No interactive elements smaller than 44px

---

### Phase 5: Data Schema Cleanup (P2)

#### FE-001: Remove Obsolete Fields from Quiz Types

**Description:** Clean up TypeScript types to remove fields no longer used per spec.

**Files:** `lib/quiz-types.ts`

**Acceptance Criteria:**
- [ ] Remove `leadSource` and `leadSourceOther` fields
- [ ] Remove `currentAutomation` field
- [ ] Remove `marketingBudget` field
- [ ] Rename `openToRevShare` to `pricingPreference`
- [ ] Update `pricingPreference` options to 'yes' | 'maybe' | 'flat'
- [ ] Ensure no runtime errors from removed fields

---

## Architecture Notes

- **Quiz Funnel Route:** `/quiz` (via HashRouter: `/#/quiz`)
- **View Management:** Single page with `view` state (`'quiz'` | `'results'`)
- **Quiz State:** Managed in `Quiz.tsx`, passed to Results components via props
- **Calculation Logic:** New `lib/quiz-calculations.ts` for revenue calculations
- **StickyCTA:** Existing component works correctly

---

## Dependency Order

```
UI-003 (quiz restructure) → UI-004 (micro-copy) → UI-005 (celebrations)
UI-001 (hero) can be done independently
UI-002 (benefits) can be done independently
UI-006 (contact step) depends on UI-003
UI-007 (revenue box) should come before UI-012
UI-008 (how it works) can be done independently
UI-009 (trust box) can be done independently
UI-010 (urgency/social) can be done independently
UI-011 (calendar copy) can be done independently
UI-012 (data flow) depends on UI-007
UI-013 (banner headline) can be done independently
FE-001 (types cleanup) depends on UI-003
```

---

## Notes

- Current implementation uses 6 steps with questions that were explicitly removed from spec
- The spec emphasizes streamlined 5 questions for higher completion rates
- "How It Works" section replaces VSL video placeholder (video is Non-Goal)
- Trust elements from `specs/trust-elements.md` are completely unimplemented
- Revenue calculation should use midpoint values from quiz ranges per spec
