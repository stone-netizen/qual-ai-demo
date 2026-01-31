# Demo Call Specification

## Overview
Live AI voice demo page where visitors can talk directly to the Qual AI voice agent powered by Retell AI.

## JTBD (Job to Be Done)
Let prospects experience the AI agent firsthand by having a live voice conversation.

## Components

### Demo Page (`pages/Demo.tsx`)
- Dark immersive UI (navy gradient background)
- "Live AI Demo" badge indicator
- Headline: "Talk to Qual AI"
- Start/End call controls
- Visual call state indicator (idle/listening/speaking)
- Pulse animations when agent speaks
- Error handling

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
2. **Listening**: Blue mic icon, "Listening..." text
3. **Agent Speaking**: Animated pulse, "AI is speaking..." text
4. **Error**: Red error message

## Acceptance Criteria
- [x] User can start a voice call with one click
- [x] Visual feedback shows when AI is speaking vs listening
- [x] Call can be ended cleanly
- [x] Errors display user-friendly messages

