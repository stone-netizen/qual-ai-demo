# QualAI Quiz Funnel Overview

## Summary

A high-converting quiz funnel for **QualAI** — an agency that helps HVAC and home service businesses get more high-ticket jobs using **exclusive high-intent calls + an AI call/follow-up system** on a **performance-based (rev-share) pricing model**.

**Traffic Source:** Organic Instagram

## Users & Jobs-to-be-Done

### Primary User
HVAC and home service business owners/operators (plumbing, electrical, roofing, remodeling, garage doors, etc.) who:
- Already spend on marketing
- Have decent lead flow
- Care about booking more high-value jobs
- Don't want to hire more office staff

### JTBD Statements
- "When I am **missing inbound calls and losing high-ticket opportunities**, I want to **have a system that captures every lead**, so I can **close more jobs without hiring more office staff**."
- "When I am **skeptical of marketing agencies** that charge upfront with no guarantees, I want to **work with someone who shares the risk**, so I can **only pay when I actually make money**."
- "When I am **drowning in follow-up tasks and old estimates**, I want to **automate lead nurturing and reactivation**, so I can **focus on running jobs, not chasing leads**."
- "When I am **getting leads but not booking enough jobs**, I want to **never miss a call and always follow up**, so I can **convert more of the leads I'm already paying for**."

## Topics / Domains

- Quiz/survey UX
- Lead qualification
- Conversion copywriting (home services niche)
- Performance-based offer positioning
- AI automation messaging
- Calendar booking integration
- Mobile-first SaaS UI design

---

## The QualAI Offer

**What we do:**

1. **Generate exclusive, high-intent leads and inbound calls** (not shared leads) for high-ticket jobs — installs, replacements, big repairs

2. **AI-powered call system** that:
   - Answers calls instantly, 24/7
   - Qualifies callers
   - Books appointments automatically

3. **AI follow-up automations** that:
   - Follow up with new leads
   - Revive old estimates and lost opportunities
   - Keep the pipeline hot

4. **Review collection flows** to boost Google rating and conversion

5. **Performance-based pricing:**
   - Small base fee
   - Plus 10-15% of revenue from jobs that start from our tracked calls and automations

**Key positioning:** "High-ticket calls + AI capture system" — NOT a generic AI agency

**Ideal client profile:**
- Already spending on marketing
- Has decent lead flow (not starting from zero)
- Cares about booking more high-value jobs
- Doesn't want to hire more office staff

---

## Funnel Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Traffic Source: Organic Instagram                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  PAGE 1: Quiz + Opt-in Landing Page                         │
│  ─────────────────────────────────────────────────────────  │
│  • Hero section (AI + high-ticket jobs promise)             │
│  • Benefits section (4-5 bullets)                           │
│  • Quiz component (6 steps + contact info)                  │
│  • Contact info collection (final step)                     │
└─────────────────────────┬───────────────────────────────────┘
                          │ Submit
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  PAGE 2: Results + VSL + Calendar                           │
│  ─────────────────────────────────────────────────────────  │
│  • Results banner (personalized opportunity)                │
│  • VSL section (how QualAI system works)                    │
│  • Calendar section (book strategy call)                    │
└─────────────────────────────────────────────────────────────┘
```

**Key architectural decisions:**
- No separate "application form" page — the quiz IS the application
- Quiz broken into 6 steps + contact info for high completion rates
- One question (or max two related questions) per step
- Progress bar visible throughout
- Mobile-first SaaS-style design
- QualAI branding throughout

---

## Design System

### Style
**Clean, modern SaaS-style UI, optimized for mobile first**

### Color Palette
- Primary: Professional blues or teals
- Accent: High-contrast CTA color (orange, green, or brand color)
- Neutral: Clean whites, light grays for backgrounds
- Text: Dark grays/near-black for readability

### Typography
- Clean sans-serif fonts (Inter, system fonts, etc.)
- Clear hierarchy: large headlines, readable body text
- Mobile-optimized sizing

### Visual Elements
- Simple, modern icons (phone, calendar, AI/robot, dollar sign, checkmark)
- Subtle shadows and rounded corners (SaaS aesthetic)
- Generous whitespace
- Card-based layouts where appropriate

### UX Principles
- **Mobile-first:** Design for phone screens, then scale up
- Minimize scrolling during quiz steps
- One step per screen with clear "Next" and "Back"
- Clear progress indication ("Step X of 7")
- Accessible form patterns
- Fast load times
- Thumb-friendly tap targets (44px minimum)

---

## QualAI Branding

### Brand Name
**QualAI** (Qual-AI)

### Brand Voice
- Confident but not pushy
- Results-focused and specific
- Contractor-friendly language (no tech jargon)
- Performance-based positioning emphasized
- Professional but approachable

### Logo Placement
- Header/nav on both pages
- Keep prominent but not overwhelming

### Key Phrases to Use
- "High-ticket calls + AI capture system"
- "Exclusive high-intent calls" (not shared leads)
- "Performance-based" / "pay when you profit"
- "24/7 AI answering and booking"
- "Revive lost opportunities"
- "No more missed calls"

### Phrases to Avoid
- "AI agents" (too generic)
- "Chatbot" (sounds cheap)
- "Lead gen" (too commodity)
- "Marketing agency" (too generic)

---

## Non-Goals

- No testimonials section yet (no case studies) — leave placeholder for future
- No complex backend integration in v1 — just structure for API calls
- No dynamic revenue calculations wired up (stubbed for later)
- No real calendar integration in v1 (placeholder component)
- No video production (placeholder only)

---

## Open Questions

- [ ] What calendar tool will be used? (Calendly, Cal.com, GHL, etc.)
- [ ] Where will quiz submissions be stored? (GHL, custom API, etc.)
- [ ] What tracking/analytics are needed? (Meta Pixel, etc.)
- [ ] Exact QualAI brand colors and logo?
- [ ] VSL video content and length?
