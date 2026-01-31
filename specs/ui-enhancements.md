# UI Enhancements Specification

## Overview
Document all visual polish enhancements, component APIs, and animation behaviors.

## External Services

### Brandfetch (Logo Service)
For sourcing official brand logos:
- **API Key**: `L-EOAjS6ZGHoS62ijiBRri1aPhjaw4MLkLqywggw-cWv-f1D7LI9FGurz5-dNri_StFcLCHUB_TawIFapF9GhA`
- **Access Key**: `brandfetch:1id23iYap-aNIVXQ5a-`
- **URL**: https://brandfetch.com/

## New Components

### AnimatedCounter (`components/AnimatedCounter.tsx`)
**Purpose**: Count-up animation for stats

**Props**:
- `value: string` - Target value (e.g., "60s", "40-60%", "24/7")
- `label: string` - Description text
- `duration?: number` - Animation duration (default: 2s)

**Behavior**:
- Uses `useInView` from framer-motion
- Counts from 0 to numeric target
- Easing: ease-out cubic

### AudioWaveform (`components/AudioWaveform.tsx`)
**Purpose**: Voice demo visualizer

**Props**:
- `state: 'idle' | 'listening' | 'speaking'`
- `barCount?: number` - Number of bars (default: 5)

**Behavior**:
- 5 vertical bars with gradient (blue-500 to purple)
- Staggered 0.1s delays
- State-dependent animations

### FAQAccordion (`components/FAQAccordion.tsx`)
**Purpose**: Collapsible FAQ list

**Props**:
- `items: { question: string; answer: string }[]`

**Behavior**:
- One item open at a time
- Click to expand/collapse
- 0.3s height animation

### FAQItem (`components/FAQItem.tsx`)
**Purpose**: Single FAQ entry

**Props**:
- `question: string`
- `answer: string`
- `isOpen: boolean`
- `onToggle: () => void`

### FloatingParticles (`components/FloatingParticles.tsx`)
**Purpose**: Background depth effect for hero

**Behavior**:
- 5 blurred orbs with blur-3xl
- Slow translateY animation (4-8s duration)
- Blue/purple gradients at low opacity
- z-0 positioning

### PhoneMockup (`components/PhoneMockup.tsx`)
**Purpose**: Hero phone visualization

**Behavior**:
- Desktop only (hidden lg:block)
- 3D perspective tilt (rotateY -15deg)
- Shows simplified AI interface
- Floating animation

### SocialProofToast (`components/SocialProofToast.tsx`)
**Purpose**: Conversion social proof

**Behavior**:
- Appears bottom-left after 5s delay
- Shows partner signup messages
- Cycles through 5 messages
- Slide-in from left animation
- Auto-dismiss after 5s

### StickyCTA (`components/StickyCTA.tsx`)
**Purpose**: Persistent call-to-action

**Behavior**:
- Fixed bottom-right after 600px scroll
- "Apply for Partnership" button
- Hidden on /contact page
- Scale-up appearance animation

## CSS Enhancements

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

### Microphone Glow
```css
.mic-glow-listening {
  box-shadow: 0 0 20px rgba(37,99,235,0.4), 0 0 40px rgba(37,99,235,0.2);
  animation: micGlowPulse 2s ease-in-out infinite;
}
```

## Animation Variants (lib/animations.ts)

### waveformBar
State-based scaleY animations for audio bars

### accordionContent
Height/opacity transitions for FAQ content

### chevronRotate
180° rotation for accordion chevron

### toastSlide
Slide-in from left with opacity

### stickyCtaVariants
Scale + opacity appearance

### floatAnimation
Continuous translateY loop

### particleFloat
Continuous Y+X translation with custom durations

## Verification Checklist
- [x] All 8 CRM logos are real brand images
- [x] Stats count up when scrolling into view
- [x] Audio waveform animates on Demo page
- [x] FAQ accordion expands/collapses smoothly
- [x] Cards have glassmorphism effect
- [x] Hero text has animated gradient
- [x] Floating particles visible in hero
- [x] Mic glows when listening on Demo
- [x] Phone mockup visible on desktop hero
- [x] Social proof toast appears after 5s
- [x] Sticky CTA shows after scrolling 600px
- [x] Build passes
- [x] Tests pass
