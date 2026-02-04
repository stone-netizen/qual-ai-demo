# Quiz Questions Specification

## Summary

Detailed specification for all quiz questions, their order, options, and logic. The quiz qualifies HVAC/home service leads based on business type, volume, lead sources, pain points, and fit for performance-based pricing.

## Quiz Structure

**Total Steps:** 6 steps + Contact Info (7 total)
**Questions per Step:** 1-2 max
**Input Types:** Radio buttons, dropdowns, short text

---

## Step 1: Business Type

**Purpose:** Identify the service vertical for relevance and segmentation.

### Question 1.1
**Label:** "What type of service business do you run?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `hvac` | HVAC |
| `plumbing` | Plumbing |
| `electrical` | Electrical |
| `roofing` | Roofing |
| `remodeling` | Remodeling / Construction |
| `garage` | Garage Doors / Gates |
| `other` | Other |

**Conditional:** If "Other" selected, show text input: "Please specify your trade"

**Required:** Yes

---

## Step 2: Volume & Job Value

**Purpose:** Understand business scale and high-ticket potential.

### Question 2.1
**Label:** "How many new jobs do you complete per month on average?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `0-30` | 0-30 jobs |
| `31-75` | 31-75 jobs |
| `76-150` | 76-150 jobs |
| `151+` | 151+ jobs |

**Required:** Yes

### Question 2.2
**Label:** "What's your average job value for the services you most want more of?"

**Type:** Text input (short)

**Placeholder:** "e.g., $3,000 system install, $8,000 reroof"

**Validation:** Optional, but encouraged

**Required:** No (but display as important)

---

## Step 3: Leads & Calls

**Purpose:** Understand current lead volume and sources.

### Question 3.1
**Label:** "Roughly how many new leads or inbound calls do you get per month?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `0-50` | 0-50 |
| `51-100` | 51-100 |
| `101-250` | 101-250 |
| `251+` | 251+ |

**Required:** Yes

### Question 3.2
**Label:** "Where do most of your leads come from right now?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `google` | Google Ads / LSA |
| `seo` | SEO / Organic |
| `social` | Facebook / Instagram |
| `referrals` | Referrals |
| `marketplaces` | Lead marketplaces (HomeAdvisor/Angi/etc.) |
| `other` | Other |

**Conditional:** If "Other" selected, show text input: "Please specify"

**Required:** Yes

---

## Step 4: Missed Calls & Follow-up

**Purpose:** Identify pain points around missed opportunities and current automation.

### Question 4.1
**Label:** "How many of your high-intent calls do you think go to voicemail or get missed?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `0-10` | 0-10% |
| `11-25` | 11-25% |
| `26-40` | 26-40% |
| `41+` | 41%+ |

**Required:** Yes

### Question 4.2
**Label:** "Do you currently have any AI or automation handling calls and follow-up?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `none` | No — just humans and voicemail |
| `basic` | Some basic automation (texts/emails) |
| `not_working` | Yes, but it's not working well |
| `happy` | Yes, and we're happy with it |

**Required:** Yes

**Qualification Note:** Answer "happy" may indicate lower fit — flag for sales team.

---

## Step 5: Budget & Model Fit

**Purpose:** Qualify for pricing model and marketing sophistication.

### Question 5.1
**Label:** "What's your approximate monthly marketing budget?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `0-2500` | $0-$2,500 |
| `2501-5000` | $2,501-$5,000 |
| `5001-10000` | $5,001-$10,000 |
| `10001+` | $10,001+ |

**Required:** Yes

### Question 5.2
**Label:** "Would you be open to a performance-based model where we take a small base fee and 10-15% of revenue from jobs our AI system helps generate?"

**Type:** Radio buttons (single select)

**Options:**
| Value | Label |
|-------|-------|
| `yes` | Yes |
| `maybe` | Maybe, I'd need more details |
| `no` | No |

**Required:** Yes

**Qualification Note:** Answer "no" may indicate lower fit — still collect contact, but flag for sales team.

---

## Step 6: Contact Information

**Purpose:** Collect contact details for follow-up and booking.

### Header Copy
"Where should we send your personalized breakdown?"

### Fields

| Field | Label | Type | Required | Validation |
|-------|-------|------|----------|------------|
| `firstName` | First Name | text | Yes | Min 1 char |
| `lastName` | Last Name | text | Yes | Min 1 char |
| `email` | Email | email | Yes | Valid email format |
| `phone` | Mobile Phone | tel | Yes | Valid phone format |
| `companyName` | Company Name | text | Yes | Min 1 char |

### CTA Button
**Label:** "See My Results & Next Steps"

**Behavior:** Validate all fields, submit to API, redirect to Results page

---

## Data Schema

```typescript
interface QuizData {
  // Step 1
  businessType: 'hvac' | 'plumbing' | 'electrical' | 'roofing' | 'remodeling' | 'garage' | 'other';
  businessTypeOther?: string;

  // Step 2
  monthlyJobs: '0-30' | '31-75' | '76-150' | '151+';
  averageJobValue?: string;

  // Step 3
  monthlyLeads: '0-50' | '51-100' | '101-250' | '251+';
  leadSource: 'google' | 'seo' | 'social' | 'referrals' | 'marketplaces' | 'other';
  leadSourceOther?: string;

  // Step 4
  missedCallsPercent: '0-10' | '11-25' | '26-40' | '41+';
  currentAutomation: 'none' | 'basic' | 'not_working' | 'happy';

  // Step 5
  marketingBudget: '0-2500' | '2501-5000' | '5001-10000' | '10001+';
  openToRevShare: 'yes' | 'maybe' | 'no';

  // Step 6 - Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;

  // Metadata
  submittedAt: string; // ISO timestamp
  source?: string; // UTM source
}
```

---

## Qualification Logic (for Results Page)

### High Fit Indicators
- `businessType`: Any except "other" with unclear trade
- `monthlyJobs`: 31+ (indicates established business)
- `averageJobValue`: $2,000+ mentioned
- `monthlyLeads`: 51+ (has deal flow to optimize)
- `missedCallsPercent`: 11%+ (clear pain point)
- `currentAutomation`: "none" or "not_working" (opportunity)
- `marketingBudget`: $2,501+ (can sustain base fee)
- `openToRevShare`: "yes" or "maybe"

### Lower Fit Indicators (still engage, but flag)
- `monthlyJobs`: 0-30 with low job value (may not generate enough volume)
- `currentAutomation`: "happy" (may not need change)
- `openToRevShare`: "no" (pricing mismatch)
- `marketingBudget`: $0-$2,500 (may struggle with base fee)

---

## Requirements

- [ ] REQ-QQ-001: All 6 steps render correctly with proper question text
- [ ] REQ-QQ-002: Radio buttons allow single selection per question
- [ ] REQ-QQ-003: "Other" options reveal conditional text inputs
- [ ] REQ-QQ-004: Text inputs accept freeform text
- [ ] REQ-QQ-005: Contact info validates email format
- [ ] REQ-QQ-006: Contact info validates phone format
- [ ] REQ-QQ-007: Required fields block progression if empty
- [ ] REQ-QQ-008: All quiz data stored in state object matching schema
- [ ] REQ-QQ-009: Quiz data passed to Results page after submission

---

## Acceptance Criteria

- [ ] AC-QQ-001: Each step displays correct question(s) and options
- [ ] AC-QQ-002: User cannot advance without completing required fields
- [ ] AC-QQ-003: User can go back and change previous answers
- [ ] AC-QQ-004: "Other" selections show text input for clarification
- [ ] AC-QQ-005: Email field rejects invalid email formats
- [ ] AC-QQ-006: Phone field accepts standard US phone formats
- [ ] AC-QQ-007: Final submission includes all collected data
- [ ] AC-QQ-008: Invalid fields show specific error messages
