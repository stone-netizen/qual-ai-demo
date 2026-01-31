# UI Enhancements & Production Readiness Specification

## Overview
Document all visual polish enhancements, component APIs, mobile responsiveness requirements, and production readiness checklist.

---

## External Services

### Logo.dev (CRM Logos)
- **API Docs**: https://docs.logo.dev/introduction
- **Environment Variable**: `VITE_LOGODEV_TOKEN`
- **Usage Pattern**: `https://img.logo.dev/{domain}?token={TOKEN}`
- **Purpose**: Fetch real CRM brand logos for the integrations section

### Retell AI (Voice Demo)
- **Environment Variables**: `RETELL_API_KEY`, `RETELL_AGENT_ID`
- **Agent ID**: `agent_338cb38fefb80627b1de2817f8`
- **Public Key**: `public_key_ffee8212ea583ca6ee344`

---

## Production Readiness Checklist

### Environment Setup
- [x] `.env` file template provided (`.env.example`)
- [x] Keys are NOT committed to git (check .gitignore)
- [x] Vercel/hosting environment variables documented

### Mobile Responsiveness
- [x] No horizontal scroll on any page at 375px width
- [x] All touch targets minimum 44px × 44px
- [x] Text readable without zooming
- [x] Forms usable on mobile keyboards (LeadConnector embed)

### Performance
- [x] Images optimized (use Logo.dev CDN)
- [x] Lazy loading for below-fold content (React.lazy code splitting)
- [x] Bundle size reasonable: main 390KB, Demo chunk 448KB

### Accessibility
- [x] Color contrast meets WCAG AA
- [x] Interactive elements have focus states
- [x] Alt text on all images

---

## Component Specifications

### AnimatedCounter (`components/AnimatedCounter.tsx`)
**Purpose**: Count-up animation for stats section

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | required | Target value (e.g., "60s", "40-60%") |
| label | string | required | Description text |
| duration | number | 2 | Animation duration in seconds |

**Behavior**:
- Uses `useInView` from framer-motion
- Counts from 0 to numeric target
- Easing: ease-out cubic
- Triggers once when scrolled into view

---

### AudioWaveform (`components/AudioWaveform.tsx`)
**Purpose**: Voice demo visualizer

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| state | 'idle' \| 'listening' \| 'speaking' | required | Current call state |
| barCount | number | 5 | Number of bars |

**Behavior**:
- Gradient from blue-500 to purple
- Staggered 0.1s delays between bars
- State-dependent animations

---

### FAQAccordion (`components/FAQAccordion.tsx`)
**Purpose**: Collapsible FAQ list

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| items | Array<{question, answer}> | FAQ entries |

**Behavior**:
- One item open at a time
- 0.3s height animation
- Chevron rotates 180° when open

---

### StickyCTA (`components/StickyCTA.tsx`)
**Purpose**: Persistent call-to-action button

**Behavior**:
- Appears fixed bottom-right after 600px scroll
- "Apply for Partnership" with arrow icon
- Hidden on /contact page
- Scale-up appearance animation

---

### SocialProofToast
**Status**: ✅ REMOVED (per spec requirements)

---

### CRMLogos (`components/CRMLogos.tsx`)
**Purpose**: Display CRM integration partners

**Implementation**:
- Uses Logo.dev CDN URLs for real CRM brand logos
- Fallback to text name if token not configured
- **Logo containers should be circular** (use `rounded-full` instead of `rounded-xl`)
- Equal width/height for circle shape (e.g., `w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20`)
- Responsive styling:
  - Fade edges: `w-8 sm:w-12 md:w-24`
  - Logo padding: `mx-2 sm:mx-4 md:mx-6`
  - Logo height: `h-6 sm:h-7 md:h-8`

---

## CSS Classes Reference

### Glassmorphism Cards
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
  background-image:
    linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)),
    linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3));
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
```

### Animated Gradient Text
```css
.gradient-text-animated {
  background: linear-gradient(90deg, #2563eb, #7c3aed, #2563eb);
  background-size: 200% auto;
  animation: gradientMove 5s linear infinite;
}
```

### Microphone Glow (Listening State)
```css
.mic-glow-listening {
  box-shadow: 0 0 20px rgba(37,99,235,0.4), 0 0 40px rgba(37,99,235,0.2);
  animation: micGlowPulse 2s ease-in-out infinite;
}
```

### CTA Glow
```css
.cta-glow {
  box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
  animation: ctaGlow 2s ease-in-out infinite;
}
```

---

## Responsive Design Patterns

### Breakpoints (Tailwind)
| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

### Section Padding Pattern
```
py-12 px-4           /* Mobile */
md:py-16 sm:px-6     /* Tablet */
lg:py-20 lg:px-8     /* Desktop */
```

### Typography Scaling
```
H1: text-3xl sm:text-4xl md:text-5xl lg:text-6xl
H2: text-2xl sm:text-3xl md:text-4xl
H3: text-xl sm:text-2xl
Body: text-sm sm:text-base
Small: text-xs sm:text-sm
```

### Grid Patterns
```
2-col mobile:    grid-cols-1 sm:grid-cols-2
4-col desktop:   grid-cols-1 sm:grid-cols-2 md:grid-cols-4
3-col steps:     grid-cols-1 md:grid-cols-3
```

---

## Environment Variables Reference

| Variable | Purpose | Location |
|----------|---------|----------|
| `RETELL_API_KEY` | Retell AI API key for voice demo | Server-side only |
| `RETELL_AGENT_ID` | Retell agent identifier | Server-side only |
| `VITE_LOGODEV_TOKEN` | Logo.dev token for CRM logos | Client-side (VITE_ prefix) |

See `.env.example` for template.

---

## Testing Checklist

### Desktop (1440px)
- [x] All animations smooth
- [x] PhoneMockup visible in hero
- [x] Hover effects on cards/buttons
- [x] CRM marquee animates smoothly

### Tablet (768px)
- [x] Navigation switches to hamburger menu
- [x] Grids reflow appropriately
- [x] Touch-friendly spacing

### Mobile (375px)
- [x] No horizontal scroll
- [x] Text readable
- [x] Forms usable
- [x] CRM logos visible in marquee

### Build
- [x] `npm run build` passes (main 446KB, Demo 448KB)
- [x] `npm run test` passes (30 tests)
- [x] No console errors

### Shadcn Components
- [x] StickyCTA uses `@shadcn/button`
- [x] FAQAccordion uses `@shadcn/accordion`
- [x] Homepage uses `@shadcn/button`, `@shadcn/badge`, `@shadcn/card`
- [x] Legal pages use `@shadcn/card`, `@shadcn/separator`
