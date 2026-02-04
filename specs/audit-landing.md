# Spec: Audit Landing Page Compliance

## Summary

The audit funnel entry page (`/audit`) must match the copy, structure, and spacing defined in `alexhormoziimplementation` identically. Every heading, paragraph, card title, quote, and CTA must use the exact wording from the reference. Elements that exist in the code but not in the reference must be removed. A dark mode rendering bug also needs fixing.

---

## Users & jobs-to-be-done (JTBD)

- Primary user: HVAC / service business owner arriving from an ad or link-in-bio

- Jobs-to-be-done:
  - "When I land on this page from an ad, I want to immediately understand what this audit does and feel compelled to start it, so I can find out how much revenue I'm losing."
  - "When I'm scrolling the page on my phone, I want the CTA to be large and obvious, so I can start the audit without hunting for a button."

---

## Topics

- Topics:
  - UI: audit landing page layout
  - UI: copy compliance with reference
  - UI: CTA button sizing and spacing
  - UI: dark mode rendering fix

---

## Context

- Screens/routes/pages involved: `/audit` (rendered via `/#/audit` due to HashRouter)
- Existing components or modules reused: `components/audit/LeakAuditLanding.tsx`
- Dark mode config: `index.html` (Tailwind CDN inline config block, line 23)
- Reference implementation: `alexhormoziimplementation` file (untracked, in repo root)
- External APIs/services touched: None
- Legacy constraints or known issues:
  - Tailwind runs via CDN with inline config in `index.html` (no `tailwind.config.ts` file)
  - shadcn `dark:` variants can activate via OS preference since no `darkMode: 'class'` is set

---

## Reference copy (source of truth)

Verbatim copy from `alexhormoziimplementation`, section by section:

### Section 1: Hero

- **Headline**: "Your Business Is Leaking Revenue. Want to Know Where?"
- **Subheadline**: "9 out of 10 service businesses lose thousands in missed calls, slow replies, and unmonetized leads. This free audit shows what it's costing you."
- **CTA button**: "Start My Leak Audit"
- **CTA subtitle**: "Takes 90 seconds. No sign-up needed."
- **Trust badges**: "Private. Instant. No sales pitch."

### Section 2: Micro-VSL

- **Quote**: "You're not losing leads because your ads suck... you're losing them because the bucket is cracked. We created a system that plugs every leak in your revenue flow using AI follow-up and instant engagement. This quick audit shows how bad the leaks are — and what you'd gain from fixing them."

### Section 3: Why It Matters

- **Header**: "Most Business Owners Don't Know What's Missing."
- **No subtitle** (nothing between header and cards)
- **Card titles** (3 items):
  1. "Missed calls / slow replies"
  2. "Lost leads in your CRM"
  3. "Dead DMs or contact forms"
- **Subtext**: "Whether you're HVAC, roofing, or pest control — the biggest loss isn't ads... it's lead conversion. This audit scans your systems and shows what you're really losing."

### Section 4: Trust + CTA

- **Header**: "Backed by Real Performance Math, Not Guesswork." (single line, no accent color)
- **Body**: "We don't sell software. We recover lost profit. Our tools are built to show you exactly what's broken — and fix it, without monthly fees or sales fluff."
- **CTA button**: "Run My Audit Now"
- **No privacy line below CTA** (nothing after the button)

---

## Requirements

1. Hero accent headline must read "Want to Know Where?" (not "Let Me Show You Where It's Going.").
2. Video quote must display the full 3-sentence quote from the reference, not a truncated version.
3. Section 3 subtitle above cards must be removed entirely.
4. Section 3 card titles must match reference exactly (use `/` and `or`, not `&`).
5. Section 3 bottom paragraph must match reference word-for-word (no "plumbing").
6. Section 4 header must render as a single line with no blue accent color on "Not Guesswork."
7. Section 4 body text must match reference word-for-word.
8. Privacy line below final CTA must be removed (not in reference).
9. Vertical spacing between CTA trust badges and video section must be reduced (target: <= 40px visual gap).
10. CTA button must be enlarged to `py-6 px-14 text-2xl` minimum with stronger shadow.
11. Dark mode must be set to `'class'` mode so `dark:` variants only activate when a `dark` class is explicitly added to the HTML element.

---

## Tasks

### Task AL-001: Fix dark mode rendering (index.html)

- **File**: `index.html` line 23 (Tailwind CDN inline config)
- **Change**: Add `darkMode: 'class'` to the `tailwind.config` object
- **Why**: Prevents shadcn `dark:` variants (e.g., `dark:bg-*`, `dark:text-*`) from activating via OS preference. Root cause of cards rendering with dark backgrounds on macOS dark mode.
- **Acceptance criteria**:
  - [x] `tailwind.config` in `index.html` includes `darkMode: 'class'`
  - [x] Cards on `/audit` render with white backgrounds regardless of OS dark/light mode setting

### Task AL-002: Fix hero headline accent (LeakAuditLanding.tsx)

- **File**: `components/audit/LeakAuditLanding.tsx` line 20
- **Current**: `"Let Me Show You Where It's Going."`
- **Reference**: `"Want to Know Where?"`
- **Acceptance criteria**:
  - [x] Hero accent text reads "Want to Know Where?"

### Task AL-003: Fix Section 3 copy (LeakAuditLanding.tsx)

- **File**: `components/audit/LeakAuditLanding.tsx`
- **Changes**:
  - Remove subtitle paragraph `"The biggest loss isn't your ads — it's lead conversion."` (lines 90-92)
  - Fix card titles to match reference:
    - `"Missed Calls & Slow Replies"` → `"Missed calls / slow replies"`
    - `"Lost Leads in Your CRM"` → `"Lost leads in your CRM"`
    - `"Dead DMs & Contact Forms"` → `"Dead DMs or contact forms"`
  - Replace bottom paragraph (lines 127-129) with reference text exactly: `"Whether you're HVAC, roofing, or pest control — the biggest loss isn't ads... it's lead conversion. This audit scans your systems and shows what you're really losing."`
  - Remove "plumbing" (not in reference)
- **Acceptance criteria**:
  - [x] No subtitle text appears between Section 3 heading and cards
  - [x] Card 1 title reads "Missed calls / slow replies"
  - [x] Card 2 title reads "Lost leads in your CRM"
  - [x] Card 3 title reads "Dead DMs or contact forms"
  - [x] Bottom paragraph matches reference word-for-word
  - [x] "plumbing" does not appear on the page

### Task AL-004: Fix Section 4 header and body (LeakAuditLanding.tsx)

- **File**: `components/audit/LeakAuditLanding.tsx` lines 135-142
- **Changes**:
  - Remove `<br />` and blue `text-blue-600` accent span from header. Render as single line: `"Backed by Real Performance Math, Not Guesswork."`
  - Replace body text: `"Our tools show you exactly what's broken — and how to fix it."` → `"Our tools are built to show you exactly what's broken — and fix it, without monthly fees or sales fluff."`
- **Acceptance criteria**:
  - [x] Section 4 header renders as a single line with no blue accent color
  - [x] Section 4 header text reads: "Backed by Real Performance Math, Not Guesswork."
  - [x] Section 4 body reads: "We don't sell software. We recover lost profit. Our tools are built to show you exactly what's broken — and fix it, without monthly fees or sales fluff."

### Task AL-005: Remove privacy line below final CTA (LeakAuditLanding.tsx)

- **File**: `components/audit/LeakAuditLanding.tsx` lines 153-156
- **Change**: Remove the `<div>` containing `"Your data stays private. Results are instant."` and the ShieldCheck icon below the final CTA button. This element does not exist in the reference.
- **Acceptance criteria**:
  - [x] No text or icon appears between the final CTA button and the footer

### Task AL-006: Fix video quote (LeakAuditLanding.tsx)

- **File**: `components/audit/LeakAuditLanding.tsx` lines 78-80
- **Current**: `"You're not losing leads because your ads suck — you're losing them because the bucket is cracked."`
- **Reference** (full quote): `"You're not losing leads because your ads suck... you're losing them because the bucket is cracked. We created a system that plugs every leak in your revenue flow using AI follow-up and instant engagement. This quick audit shows how bad the leaks are — and what you'd gain from fixing them."`
- **Acceptance criteria**:
  - [x] Video quote matches reference text exactly (all 3 sentences)
  - [x] Uses `...` (not `—`) after "suck"

### Task AL-007: Fix spacing between CTA and video (LeakAuditLanding.tsx)

- **File**: `components/audit/LeakAuditLanding.tsx`
- **Changes**:
  - Line 15: `pb-8 md:pb-12` → `pb-4 md:pb-6` (hero section bottom padding)
  - Line 33: `mb-4` → `mb-2` (CTA button bottom margin)
  - Line 44: `mt-8` → `mt-4` (trust icons top margin)
  - Line 58: `pb-12` → `pb-8` (video section bottom padding)
- **Acceptance criteria**:
  - [x] Vertical space between CTA trust badges and video section is <= 40px visually
  - [x] Layout still looks balanced at 375px, 768px, and 1440px viewports

### Task AL-008: Enlarge CTA button (LeakAuditLanding.tsx)

- **File**: `components/audit/LeakAuditLanding.tsx` line 33
- **Current**: `py-5 px-10 text-xl shadow-xl shadow-blue-600/25`
- **Target**: `py-6 px-14 text-2xl shadow-2xl shadow-blue-600/30`
- **Acceptance criteria**:
  - [x] CTA button uses `py-6 px-14 text-2xl` minimum sizing
  - [x] Shadow uses `shadow-2xl shadow-blue-600/30`

---

## Acceptance criteria

Overall page-level acceptance criteria (all must pass after all tasks are complete):

- [x] Hero accent text reads "Want to Know Where?"
- [x] Section 3 has no subtitle between heading and cards
- [x] Section 3 card titles match reference exactly (use `/` and `or`, not `&`)
- [x] Section 3 bottom paragraph matches reference word-for-word
- [x] Section 4 header is a single line with no blue accent
- [x] Section 4 body matches reference word-for-word
- [x] Video quote matches reference (full 3-sentence version, `...` not `—`)
- [x] No privacy line below final CTA
- [x] Vertical space between CTA trust badges and video <= 40px
- [x] CTA button is py-6 px-14 text-2xl minimum
- [x] Cards render white in both light and dark OS modes
- [x] "plumbing" does not appear anywhere on the page
- [x] Visual check passes at 375px, 768px, 1440px viewports

---

## Non-goals

- Not changing the calculator, niche selection, or results pages
- Not changing the homepage or other pages
- Not changing routing or URLs
- Not migrating Tailwind from CDN to build-time (separate P2 task)
- Not removing card description paragraphs (reference lists items as a "mini diagram" — descriptions are acceptable embellishments)
- Not removing the footer (reference doesn't specify a footer; current footer is fine to keep)

---

## Open questions

- None

---

## Verification procedure

After all tasks are implemented:

1. `npm run dev` → navigate to `/#/audit`
2. Compare every line of copy against `alexhormoziimplementation` section by section
3. Toggle Mac dark mode (System Preferences > Appearance) → cards must stay white
4. Check responsive layout at 375px, 768px, and 1440px viewport widths
