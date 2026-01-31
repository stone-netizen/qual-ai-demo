# Legal Pages Specification

## Overview
Legal and compliance pages required for the Qual AI website.

## Pages

### Privacy Policy (`pages/PrivacyPolicy.tsx`)
- Route: /privacy
- Data collection practices
- User rights and controls

### Terms of Service (`pages/TermsOfService.tsx`)
- Route: /terms
- Service usage terms
- Liability limitations

### SMS Terms (`pages/SMSTerms.tsx`)
- Route: /sms-terms
- SMS/text message consent and opt-out
- TCPA compliance language

### Cookie Policy (`pages/CookiePolicy.tsx`)
- Route: /cookie-policy
- Types of cookies used

### Security (`pages/Security.tsx`)
- Route: /security
- Data security practices

## Technical Requirements
- Consistent styling with main site
- Accessible from footer links
- Proper heading hierarchy

## Acceptance Criteria
- [x] All 5 legal pages render correctly
- [x] Footer links navigate to each page
- [x] Pages follow consistent styling
- [x] Mobile-responsive layout
- [x] All pages use `@shadcn/card` as container
- [x] Section dividers use `@shadcn/separator`
- [x] Typography follows shadcn conventions

