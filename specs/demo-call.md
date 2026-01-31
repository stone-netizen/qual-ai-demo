# Demo Call Specification

## Overview
Live AI voice demo page where visitors can talk directly to the Qual AI voice agent powered by Retell AI.

## JTBD (Job to Be Done)
Let prospects experience the AI agent firsthand by having a live voice conversation.

## Retell AI Credentials
- **Agent ID**: `agent_338cb38fefb80627b1de2817f8`
- **Public Key**: `public_key_ffee8212ea583ca6ee344`

## Components

### Demo Page (`pages/Demo.tsx`)
- Dark immersive UI (navy gradient background)
- "Live AI Demo" badge indicator
- Headline: "Talk to Qual AI"
- Start/End call controls
- Visual call state indicator (idle/listening/speaking)
- Pulse animations when agent speaks
- **Audio waveform visualizer** (5 bars with gradient)
- **Microphone glow effect** when listening
- Error handling

### Audio Waveform Visualizer (`components/AudioWaveform.tsx`)
- 5 vertical bars with blue-to-purple gradient
- Animate heights based on call state:
  - **Idle**: 8px static height
  - **Listening**: Subtle breathing (8-16px range)
  - **Speaking**: Dynamic (16-56px range)
- Staggered 0.1s delays between bars

### API Endpoint (`api/create-web-call.ts`)
- Vercel serverless function
- POST endpoint to create Retell web call
- Returns access token for client-side SDK

### Client Integration
- Uses `retell-client-js-sdk` for WebRTC voice
- Event handlers for agent states
- Microphone permission request

## Call States
1. **Idle**: Microphone icon grayed, "Start Conversation" button
2. **Listening**: Blue mic icon with glow pulse, "Listening..." text, waveform breathing
3. **Agent Speaking**: Animated pulse, "AI is speaking..." text, waveform active
4. **Error**: Red error message

## Acceptance Criteria
- [x] User can start a voice call with one click
- [x] Visual feedback shows when AI is speaking vs listening
- [x] Call can be ended cleanly
- [x] Errors display user-friendly messages
- [x] Audio waveform visualizer (5 bars)
- [x] Microphone glow when listening
- [x] Clear visual states (idle/listening/speaking)
