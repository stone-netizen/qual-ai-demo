# QualAI Design System Specification

## Summary

Design system for the QualAI quiz funnel. Clean, modern SaaS-style UI optimized for mobile-first with emphasis on conversion and usability.

---

## Core Principles

1. **Mobile-first** — Design for phone screens, then scale up
2. **Clarity over cleverness** — Every element serves conversion
3. **Whitespace is intentional** — Avoid clutter at all costs
4. **Thumb-friendly** — All interactive elements easily tappable
5. **Fast** — Minimal assets, quick load times

---

## Visual Style

### Overall Aesthetic
- Clean, modern SaaS-style
- Plenty of white space
- No heavy gradients
- Subtle depth through shadows
- Professional but approachable

### Color Palette

| Token | Usage | Value (suggested) |
|-------|-------|-------------------|
| `--color-primary` | CTAs, links, accent | `#2563EB` (blue-600) or brand color |
| `--color-primary-hover` | CTA hover state | `#1D4ED8` (blue-700) |
| `--color-background` | Page background | `#FFFFFF` or `#F9FAFB` (gray-50) |
| `--color-surface` | Cards, inputs | `#FFFFFF` |
| `--color-border` | Input borders, dividers | `#E5E7EB` (gray-200) |
| `--color-border-focus` | Focused input | `--color-primary` |
| `--color-text-primary` | Headlines, body | `#111827` (gray-900) |
| `--color-text-secondary` | Subheadlines, labels | `#6B7280` (gray-500) |
| `--color-text-muted` | Helper text, captions | `#9CA3AF` (gray-400) |
| `--color-success` | Confirmations | `#10B981` (green-500) |
| `--color-error` | Validation errors | `#EF4444` (red-500) |

### Typography

**Font Family:** Inter, SF Pro, system-ui, sans-serif (single font family throughout)

| Element | Size (mobile) | Size (desktop) | Weight | Line Height |
|---------|--------------|----------------|--------|-------------|
| H1 (Hero headline) | 28px | 48px | 700 (Bold) | 1.2 |
| H2 (Section heads) | 24px | 36px | 600 (Semibold) | 1.3 |
| H3 (Card titles) | 20px | 24px | 600 (Semibold) | 1.4 |
| Body | 16px | 18px | 400 (Regular) | 1.6 |
| Body small | 14px | 16px | 400 (Regular) | 1.5 |
| Caption | 12px | 14px | 400 (Regular) | 1.4 |
| Button | 16px | 18px | 600 (Semibold) | 1 |

### Spacing Scale

Base unit: 4px

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Small elements |
| `--radius-md` | 8px | Inputs, small cards |
| `--radius-lg` | 12px | Cards, modals |
| `--radius-xl` | 16px | Large cards |
| `--radius-full` | 9999px | Pills, avatars |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle depth |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, elevated cards |

---

## Component Specifications

### Quiz Card Container

The quiz displays as a centered card.

```
┌──────────────────────────────────────────┐
│  Progress Bar                            │
├──────────────────────────────────────────┤
│                                          │
│  Question                                │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Option Card 1                     │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │  Option Card 2                     │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │  Option Card 3                     │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌──────────┐       ┌──────────────────┐ │
│  │  Back    │       │      Next →      │ │
│  └──────────┘       └──────────────────┘ │
└──────────────────────────────────────────┘
```

**Styles:**
- Background: `--color-surface`
- Border radius: `--radius-xl` (16px)
- Shadow: `--shadow-lg`
- Padding: `--space-6` (24px) mobile, `--space-8` (32px) desktop
- Max width: 480px (centered)
- Width: 100% - 32px margin on mobile

---

### Progress Bar

Visible at top of quiz card showing "Step X of Y"

**Styles:**
- Height: 8px
- Background (track): `--color-border`
- Background (fill): `--color-primary`
- Border radius: `--radius-full`
- Text above: "Step X of Y" in `--color-text-secondary`, caption size
- Margin bottom: `--space-6`

---

### Option Cards (Radio Buttons)

**NOT tiny radio circles.** Full tappable blocks.

```
┌──────────────────────────────────────┐
│  ○  Option Label                     │
│     Optional description text        │
└──────────────────────────────────────┘
```

**Styles:**
- Background: `--color-surface`
- Border: 2px solid `--color-border`
- Border radius: `--radius-lg` (12px)
- Padding: `--space-4` (16px)
- Min height: 56px (thumb-friendly)
- Gap between options: `--space-3` (12px)

**Selected state:**
- Border: 2px solid `--color-primary`
- Background: `rgba(primary, 0.05)` (very subtle tint)
- Radio indicator filled with `--color-primary`

**Hover state (desktop):**
- Border: 2px solid `--color-primary` at 50% opacity
- Subtle background shift

---

### Text Inputs

**Styles:**
- Background: `--color-surface`
- Border: 1px solid `--color-border`
- Border radius: `--radius-md` (8px)
- Padding: `--space-3` `--space-4` (12px 16px)
- Height: 48px (thumb-friendly)
- Font size: 16px (prevents zoom on iOS)
- Width: 100%

**Focus state:**
- Border: 2px solid `--color-primary`
- Outline: none
- Box shadow: `0 0 0 3px rgba(primary, 0.1)`

**Error state:**
- Border: 2px solid `--color-error`
- Helper text below in `--color-error`

---

### Buttons

#### Primary Button (CTA)

**Styles:**
- Background: `--color-primary`
- Color: white
- Border radius: `--radius-md` (8px)
- Padding: `--space-4` `--space-6` (16px 24px)
- Height: 52px minimum (thumb-friendly)
- Font: 600 weight, 16-18px
- Full width on mobile
- Shadow: `--shadow-sm`

**Hover:**
- Background: `--color-primary-hover`

**Disabled:**
- Opacity: 0.5
- Cursor: not-allowed

#### Secondary Button (Back)

**Styles:**
- Background: transparent
- Color: `--color-text-secondary`
- Border: 1px solid `--color-border`
- Border radius: `--radius-md`
- Padding: `--space-4` `--space-6`
- Height: 52px minimum

**Hover:**
- Background: `--color-background`
- Border color: `--color-text-secondary`

---

### Sticky Mobile CTA

On mobile, primary CTA sticks to bottom of viewport.

**Styles:**
- Position: fixed
- Bottom: 0
- Left: 0
- Right: 0
- Background: `--color-surface`
- Padding: `--space-4`
- Border top: 1px solid `--color-border`
- Box shadow: `0 -4px 6px -1px rgba(0,0,0,0.1)`
- Z-index: 50

**Content:**
- Full-width primary button
- Safe area padding for notched phones: `padding-bottom: env(safe-area-inset-bottom)`

---

### Icons

Simple, modern line icons or filled icons with consistent style.

**Recommended icons:**
- Phone/Call
- Calendar
- AI/Robot/Sparkles
- Dollar sign
- Checkmark/Check circle
- Arrow right
- Arrow left

**Styles:**
- Size: 24px default, 20px small, 32px large
- Stroke width: 2px (if line icons)
- Color: inherit from parent or `--color-primary`

---

## Layout Patterns

### Mobile Layout (< 768px)

```
┌────────────────────────┐
│  Logo                  │  ← Header (sticky optional)
├────────────────────────┤
│                        │
│  Hero Content          │
│                        │
├────────────────────────┤
│                        │
│  Benefits              │
│                        │
├────────────────────────┤
│                        │
│  Quiz Card             │
│  (full width - margin) │
│                        │
├────────────────────────┤
│  Sticky CTA            │  ← Fixed bottom
└────────────────────────┘
```

- Container padding: 16px horizontal
- Section spacing: 48px vertical
- Quiz card: near full-width

### Desktop Layout (≥ 768px)

```
┌──────────────────────────────────────────────────────────┐
│  Logo                                         Nav (opt)  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              Hero Content (centered, max-width)          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              Benefits (centered, max-width)              │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              ┌─────────────────────┐                     │
│              │                     │                     │
│              │     Quiz Card       │                     │
│              │     (max 480px)     │                     │
│              │                     │                     │
│              └─────────────────────┘                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

- Container max-width: 1200px (content), centered
- Content max-width: 720px for text sections
- Quiz card max-width: 480px, centered
- Section spacing: 80px vertical

---

## Page-Specific Guidelines

### Quiz Page (Page 1)

- Hero: Large headline, clear subheadline, single CTA
- Benefits: 4 items, icon + text, can be 2x2 grid on desktop
- Quiz: Centered card, one step visible at a time
- Sticky CTA on mobile when quiz not in view

### Results Page (Page 2)

- Results banner: Full-width background possible, centered text
- VSL: Video 16:9, max-width 720px, centered
- Calendar: Below video, clear section break
- Trust text: Near calendar, small/muted

---

## Accessibility Requirements

- [ ] All interactive elements: min 44x44px touch target
- [ ] Color contrast: 4.5:1 minimum for body text
- [ ] Focus states visible on all interactive elements
- [ ] Form labels associated with inputs
- [ ] Error messages announced to screen readers
- [ ] Progress bar has aria-label
- [ ] Buttons have descriptive text (not just icons)

---

## Performance Guidelines

- [ ] Total page weight < 500KB initial load
- [ ] Largest Contentful Paint < 2.5s
- [ ] No layout shift during load
- [ ] Images lazy-loaded below fold
- [ ] Fonts: system fonts or single web font (Inter)
- [ ] Critical CSS inlined

---

## Requirements

- [ ] REQ-DS-001: Typography follows specified scale
- [ ] REQ-DS-002: Color palette implemented as CSS variables
- [ ] REQ-DS-003: Spacing uses 4px base unit scale
- [ ] REQ-DS-004: All cards use specified border radius and shadows
- [ ] REQ-DS-005: Option cards are full tappable blocks (not tiny circles)
- [ ] REQ-DS-006: Buttons meet 52px minimum height on mobile
- [ ] REQ-DS-007: Sticky CTA appears on mobile quiz page
- [ ] REQ-DS-008: Progress bar visible at top of quiz
- [ ] REQ-DS-009: Icons are consistent style throughout

---

## Acceptance Criteria

- [ ] AC-DS-001: Quiz displays as centered card with shadow
- [ ] AC-DS-002: Option cards are tappable full-width blocks
- [ ] AC-DS-003: Selected option shows clear visual distinction
- [ ] AC-DS-004: Mobile sticky CTA is visible and functional
- [ ] AC-DS-005: All touch targets are minimum 44px
- [ ] AC-DS-006: Progress bar accurately reflects current step
- [ ] AC-DS-007: Page loads in under 3s on 3G
- [ ] AC-DS-008: No horizontal scroll on any screen size
- [ ] AC-DS-009: Design is consistent between Page 1 and Page 2
