/**
 * Quiz TypeScript Types
 * Based on specs/quiz-questions.md schema
 */

// Business type options for Step 1
export type BusinessType =
  | 'hvac'
  | 'plumbing'
  | 'electrical'
  | 'roofing'
  | 'remodeling'
  | 'garage'
  | 'other';

// Monthly jobs range for Step 2
export type MonthlyJobs = '0-30' | '31-75' | '76-150' | '151+';

// Monthly leads range for Step 3
export type MonthlyLeads = '0-50' | '51-100' | '101-250' | '251+';

// Lead source options for Step 3
export type LeadSource =
  | 'google'
  | 'seo'
  | 'social'
  | 'referrals'
  | 'marketplaces'
  | 'other';

// Missed calls percentage for Step 4
export type MissedCallsPercent = '0-10' | '11-25' | '26-40' | '41+';

// Current automation status for Step 4
export type CurrentAutomation = 'none' | 'basic' | 'not_working' | 'happy';

// Marketing budget range for Step 5
export type MarketingBudget = '0-2500' | '2501-5000' | '5001-10000' | '10001+';

// Rev share openness for Step 5
export type OpenToRevShare = 'yes' | 'maybe' | 'no';

/**
 * Full quiz data interface matching specs/quiz-questions.md schema
 */
export interface QuizData {
  // Step 1 - Business Type
  businessType: BusinessType | null;
  businessTypeOther?: string;

  // Step 2 - Volume & Job Value
  monthlyJobs: MonthlyJobs | null;
  averageJobValue?: string;

  // Step 3 - Leads & Calls
  monthlyLeads: MonthlyLeads | null;
  leadSource: LeadSource | null;
  leadSourceOther?: string;

  // Step 4 - Missed Calls & Follow-up
  missedCallsPercent: MissedCallsPercent | null;
  currentAutomation: CurrentAutomation | null;

  // Step 5 - Budget & Model Fit
  marketingBudget: MarketingBudget | null;
  openToRevShare: OpenToRevShare | null;

  // Step 6 - Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;

  // Metadata
  submittedAt?: string; // ISO timestamp
  source?: string; // UTM source or traffic attribution
}

/**
 * Quiz step identifier (1-6 = questions, 7 = contact info)
 */
export type QuizStep = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Quiz step configuration
 */
export interface QuizStepConfig {
  step: QuizStep;
  title: string;
  subtitle?: string;
}

/**
 * Option for radio button selection
 */
export interface QuizOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
}

/**
 * Question configuration
 */
export interface QuizQuestion<T extends string = string> {
  id: string;
  label: string;
  type: 'radio' | 'text';
  options?: QuizOption<T>[];
  placeholder?: string;
  required: boolean;
  conditionalOn?: {
    field: keyof QuizData;
    value: string;
  };
}

/**
 * Initial empty quiz data
 */
export const initialQuizData: QuizData = {
  businessType: null,
  businessTypeOther: '',
  monthlyJobs: null,
  averageJobValue: '',
  monthlyLeads: null,
  leadSource: null,
  leadSourceOther: '',
  missedCallsPercent: null,
  currentAutomation: null,
  marketingBudget: null,
  openToRevShare: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  companyName: '',
};
