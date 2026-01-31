# Demo Call Specification

## Overview
Live AI voice demo page where visitors can talk directly to the Qual AI voice agent powered by Retell AI.

## JTBD (Job to Be Done)
Let prospects experience the AI agent firsthand by having a live voice conversation.

---

## Retell AI Configuration

### Credentials (stored in .env)
```env
RETELL_API_KEY=<your-retell-api-key>
RETELL_AGENT_ID=agent_338cb38fefb80627b1de2817f8
```

### Public Key (for reference)
- `public_key_ffee8212ea583ca6ee344`

### API Endpoint
- Backend: `api/create-web-call.ts` (Vercel serverless function)
- Creates web call and returns access token for client SDK

---

## Components

### Demo Page (`pages/Demo.tsx`)
- Dark immersive UI (navy gradient background)
- "Live AI Demo" badge with ping indicator
- Headline: "Talk to Qual AI" with gradient accent
- Start/End call controls
- Visual call state indicator (idle/listening/speaking)
- Pulse animations when agent speaks
- **Audio waveform visualizer** (5 bars with gradient)
- **Microphone glow effect** when listening
- Error handling with user-friendly messages

### Audio Waveform Visualizer (`components/AudioWaveform.tsx`)
- 5 vertical bars with blue-to-purple gradient
- Animate heights based on call state:
  - **Idle**: ~30% height, static
  - **Listening**: Subtle breathing animation (30-50% range)
  - **Speaking**: Dynamic animation (30-100% range)
- Staggered 0.1s delays between bars for organic movement

### API Endpoint (`api/create-web-call.ts`)
- Vercel serverless function
- POST endpoint to create Retell web call
- Reads credentials from environment variables
- Returns `access_token` for client-side SDK
- Proper error handling for missing env vars

### Client Integration
- Uses `retell-client-js-sdk` for WebRTC voice
- Event handlers: `agent_start_talking`, `agent_stop_talking`, `call_ended`, `error`
- Microphone permission request on call start

---

## Call States

| State | Visual | Text | Waveform |
|-------|--------|------|----------|
| Idle | Gray mic icon, dark circle | "Start Conversation" button | Static low bars |
| Listening | Blue mic icon with glow pulse | "Listening..." | Breathing animation |
| Speaking | Gradient circle with pulses | "AI is speaking..." | Active animation |
| Error | Red error banner | Error message | N/A |

---

## Mobile Responsiveness

### Requirements
- Full-screen immersive experience on all devices
- Touch-friendly button sizes (minimum 44px)
- Waveform scales appropriately on small screens
- Status text readable on mobile

### Specific Sizing
- Microphone circle: `w-32 h-32` (128px)
- Start button: `px-10 py-5` with large touch target
- Error messages: `text-sm` with proper padding

---

## Error Handling

### Scenarios
1. **Missing API credentials**: "Server configuration error"
2. **Network failure**: "Connection error. Please refresh and try again."
3. **Microphone denied**: "Could not start the call. Please check your microphone permissions."

### Display
- Red background (`bg-red-950/30`)
- Red border (`border-red-500/20`)
- Animated entrance

---

## Acceptance Criteria

### Functionality
- [x] User can start a voice call with one click
- [x] Visual feedback shows when AI is speaking vs listening
- [x] Call can be ended cleanly
- [x] Errors display user-friendly messages
- [x] Retell API credentials read from .env

### Visual
- [x] Audio waveform visualizer (5 bars)
- [x] Microphone glow when listening (`mic-glow-listening` CSS class)
- [x] Clear visual states (idle/listening/speaking)
- [x] Pulse animations when agent speaks

### Mobile
- [x] Full-screen experience works on mobile
- [x] Touch targets are 44px minimum
- [x] Text is readable without zooming
