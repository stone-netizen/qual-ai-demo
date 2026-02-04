/**
 * Quiz Constants
 * All question text, options, and labels from specs/quiz-questions.md
 */

import type {
  QuizStep,
  QuizStepConfig,
  QuizOption,
  BusinessType,
  MonthlyJobs,
  MonthlyLeads,
  LeadSource,
  MissedCallsPercent,
  CurrentAutomation,
  MarketingBudget,
  OpenToRevShare,
} from './quiz-types';

/**
 * Total number of quiz steps (6 questions + 1 contact info = 7 screens)
 */
export const TOTAL_QUIZ_STEPS = 6;

/**
 * Quiz step configuration
 */
export const QUIZ_STEPS: QuizStepConfig[] = [
  { step: 1, title: 'Business Type' },
  { step: 2, title: 'Volume & Job Value' },
  { step: 3, title: 'Leads & Calls' },
  { step: 4, title: 'Missed Calls & Follow-up' },
  { step: 5, title: 'Budget & Model Fit' },
  { step: 6, title: 'Contact Information' },
];

// ============================================
// Step 1: Business Type
// ============================================

export const BUSINESS_TYPE_QUESTION = {
  label: 'What type of service business do you run?',
  required: true,
};

export const BUSINESS_TYPE_OPTIONS: QuizOption<BusinessType>[] = [
  { value: 'hvac', label: 'HVAC' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'remodeling', label: 'Remodeling / Construction' },
  { value: 'garage', label: 'Garage Doors / Gates' },
  { value: 'other', label: 'Other' },
];

export const BUSINESS_TYPE_OTHER_PLACEHOLDER = 'Please specify your trade';

// ============================================
// Step 2: Volume & Job Value
// ============================================

export const MONTHLY_JOBS_QUESTION = {
  label: 'How many new jobs do you complete per month on average?',
  required: true,
};

export const MONTHLY_JOBS_OPTIONS: QuizOption<MonthlyJobs>[] = [
  { value: '0-30', label: '0-30 jobs' },
  { value: '31-75', label: '31-75 jobs' },
  { value: '76-150', label: '76-150 jobs' },
  { value: '151+', label: '151+ jobs' },
];

export const AVERAGE_JOB_VALUE_QUESTION = {
  label: "What's your average job value for the services you most want more of?",
  required: false,
  placeholder: 'e.g., $3,000 system install, $8,000 reroof',
};

// ============================================
// Step 3: Leads & Calls
// ============================================

export const MONTHLY_LEADS_QUESTION = {
  label: 'Roughly how many new leads or inbound calls do you get per month?',
  required: true,
};

export const MONTHLY_LEADS_OPTIONS: QuizOption<MonthlyLeads>[] = [
  { value: '0-50', label: '0-50' },
  { value: '51-100', label: '51-100' },
  { value: '101-250', label: '101-250' },
  { value: '251+', label: '251+' },
];

export const LEAD_SOURCE_QUESTION = {
  label: 'Where do most of your leads come from right now?',
  required: true,
};

export const LEAD_SOURCE_OPTIONS: QuizOption<LeadSource>[] = [
  { value: 'google', label: 'Google Ads / LSA' },
  { value: 'seo', label: 'SEO / Organic' },
  { value: 'social', label: 'Facebook / Instagram' },
  { value: 'referrals', label: 'Referrals' },
  { value: 'marketplaces', label: 'Lead marketplaces (HomeAdvisor/Angi/etc.)' },
  { value: 'other', label: 'Other' },
];

export const LEAD_SOURCE_OTHER_PLACEHOLDER = 'Please specify';

// ============================================
// Step 4: Missed Calls & Follow-up
// ============================================

export const MISSED_CALLS_QUESTION = {
  label: 'How many of your high-intent calls do you think go to voicemail or get missed?',
  required: true,
};

export const MISSED_CALLS_OPTIONS: QuizOption<MissedCallsPercent>[] = [
  { value: '0-10', label: '0-10%' },
  { value: '11-25', label: '11-25%' },
  { value: '26-40', label: '26-40%' },
  { value: '41+', label: '41%+' },
];

export const CURRENT_AUTOMATION_QUESTION = {
  label: 'Do you currently have any AI or automation handling calls and follow-up?',
  required: true,
};

export const CURRENT_AUTOMATION_OPTIONS: QuizOption<CurrentAutomation>[] = [
  { value: 'none', label: 'No — just humans and voicemail' },
  { value: 'basic', label: 'Some basic automation (texts/emails)' },
  { value: 'not_working', label: "Yes, but it's not working well" },
  { value: 'happy', label: "Yes, and we're happy with it" },
];

// ============================================
// Step 5: Budget & Model Fit
// ============================================

export const MARKETING_BUDGET_QUESTION = {
  label: "What's your approximate monthly marketing budget?",
  required: true,
};

export const MARKETING_BUDGET_OPTIONS: QuizOption<MarketingBudget>[] = [
  { value: '0-2500', label: '$0-$2,500' },
  { value: '2501-5000', label: '$2,501-$5,000' },
  { value: '5001-10000', label: '$5,001-$10,000' },
  { value: '10001+', label: '$10,001+' },
];

export const OPEN_TO_REV_SHARE_QUESTION = {
  label:
    'Would you be open to a performance-based model where we take a small base fee and 10-15% of revenue from jobs our AI system helps generate?',
  required: true,
};

export const OPEN_TO_REV_SHARE_OPTIONS: QuizOption<OpenToRevShare>[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'maybe', label: "Maybe, I'd need more details" },
  { value: 'no', label: 'No' },
];

// ============================================
// Step 6: Contact Information
// ============================================

export const CONTACT_INFO_HEADER = 'Where should we send your personalized breakdown?';

export const CONTACT_INFO_FIELDS = {
  firstName: { label: 'First Name', required: true, type: 'text' as const },
  lastName: { label: 'Last Name', required: true, type: 'text' as const },
  email: { label: 'Email', required: true, type: 'email' as const },
  phone: { label: 'Mobile Phone', required: true, type: 'tel' as const },
  companyName: { label: 'Company Name', required: true, type: 'text' as const },
};

export const CONTACT_SUBMIT_BUTTON_TEXT = 'See My Results & Next Steps';

// ============================================
// Quiz Page Copy
// ============================================

export const QUIZ_HERO = {
  headline: 'Get More High-Ticket Jobs Without Hiring More Staff',
  subheadline: `QualAI delivers exclusive high-intent calls for installs and replacements. Our AI answers 24/7, qualifies leads, and books appointments — so you never miss another $5,000+ opportunity. You only pay when you profit.`,
  ctaText: 'See If You Qualify →',
  trustBar: 'For HVAC, Plumbing, Electrical, Roofing & Home Service Businesses',
};

export const QUIZ_BENEFITS = [
  {
    icon: 'phone',
    title: 'Exclusive High-Intent Calls',
    description:
      'We generate inbound calls for installs and replacements — not shared leads',
  },
  {
    icon: 'robot',
    title: 'AI Answers & Books 24/7',
    description:
      'Never miss a call. Our AI qualifies leads and books appointments around the clock',
  },
  {
    icon: 'refresh',
    title: 'Revive Lost Opportunities',
    description:
      'Automated follow-up reactivates old estimates and keeps your pipeline full',
  },
  {
    icon: 'star',
    title: 'Boost Your Reviews',
    description: 'Simple review-collection flows to improve your Google rating',
  },
  {
    icon: 'handshake',
    title: 'Performance-Based Pricing',
    description:
      'Small base fee + 10-15% of revenue from jobs we help generate',
  },
];

// ============================================
// Results Page Copy
// ============================================

export const RESULTS_BANNER = {
  headline: 'You Qualify for QualAI',
  subheadline: `Based on your answers, you're likely leaving serious money on the table from missed calls and leads that never get followed up.

Here's how QualAI fixes that — and you only pay when you profit.`,
  dynamicLine:
    'With your job value and lead volume, even 5-10 extra booked jobs a month could mean $XX,XXX+ in additional revenue.',
};

export const RESULTS_VSL = {
  title: 'How QualAI Gets You More High-Ticket Jobs',
  benefits: [
    {
      text: 'Exclusive high-intent calls',
      description:
        'We generate inbound calls for installs and replacements — not shared leads from marketplaces.',
    },
    {
      text: 'AI answers and books 24/7',
      description:
        'Our AI picks up every call, qualifies the lead, and books appointments so you never miss a high-ticket opportunity.',
    },
    {
      text: 'Automated follow-up',
      description:
        'AI follows up with new leads and old estimates to revive lost opportunities and keep your pipeline full.',
    },
    {
      text: 'Review collection',
      description:
        'Simple flows that get you more 5-star reviews to boost your Google ranking and close rate.',
    },
    {
      text: 'Performance-based pricing',
      description:
        'Small base fee + 10-15% of revenue from jobs that start from our tracked calls and automations. We only win when you win.',
    },
  ],
};

export const RESULTS_CALENDAR = {
  headline: 'Book Your QualAI Strategy Call',
  subheadline: `In 20-30 minutes, we'll map your numbers and show exactly how QualAI can plug into your business.`,
  preparationBullets: [
    'Come prepared with: your average job value, monthly lead volume, and close rate',
    "This is not a generic demo — we'll tailor everything to your trade and market",
  ],
  trustText:
    "No long-term contract. No obligation. Just a planning call to see if we're a fit.",
};

export const RESULTS_STICKY_CTA_TEXT = 'Book Your Call →';

// ============================================
// Validation
// ============================================

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// US phone: accepts (xxx) xxx-xxxx, xxx-xxx-xxxx, xxxxxxxxxx, etc.
export const PHONE_REGEX = /^[\d\s()+-]{10,}$/;

export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
};
