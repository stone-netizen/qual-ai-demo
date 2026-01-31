# Booking Flow Specification

## Overview
The contact/booking flow that converts website visitors into demo meetings.

## JTBD (Job to Be Done)
Enable HVAC business owners to easily schedule a demo call or consultation.

## Pages

### Contact Page (`pages/Contact.tsx`)
- LeadConnector calendar embed for booking demos
- Company contact information display
- SMS compliance disclosure

### Post-Booking Page (`pages/PostBooking.tsx`)
- Confirmation after successful booking
- What to expect next (video briefing)
- Hides header/footer for focused experience

## User Flow
1. User clicks CTA on homepage → navigates to /contact
2. User selects calendar time via LeadConnector embed
3. LeadConnector handles booking and redirects to confirmation
4. Confirmation shown with video and next steps

## Technical Notes
- LeadConnector widget handles form validation internally
- Calendar embed is loaded via external script
- A2P 10DLC compliance disclosure is displayed below the calendar

## Acceptance Criteria
- [x] User can book a demo from the contact page
- [x] Post-booking page confirms the booking
- [x] Flow works on mobile devices
- [N/A] Form validates required fields (handled by LeadConnector)
