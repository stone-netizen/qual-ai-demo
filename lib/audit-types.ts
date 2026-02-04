
export type AuditStep = 'niche-selection' | 'landing' | 'questions' | 'results';

export type Industry = 
  | 'hvac' 
  | 'roofing' 
  | 'plumbing' 
  | 'electrical' 
  | 'pest-control' 
  | 'cleaning' 
  | 'landscaping' 
  | 'general-contracting';

export type MissedCallFreq = 'rarely' | 'sometimes' | 'often' | 'very-often' | 'all-time';
export type ResponseTime = 'under-5' | '5-30' | '30-120' | '2-6h' | '6h-plus';
export type FollowUpProcess = 'automated' | 'manual-1-2' | 'one-attempt' | 'nothing';
export type ReactivationProcess = 'active' | 'occasional' | 'manual-slow' | 'nothing';
export type LeadChannel = 'phone' | 'website' | 'social-dm' | 'google-msg' | 'sms' | 'email';

export interface AuditData {
  industry: Industry;
  missedCallsFreq: MissedCallFreq | null; 
  channels: LeadChannel[];
  responseTime: ResponseTime | null;
  followUpProcess: FollowUpProcess | null;
  reactivationProcess: ReactivationProcess | null;
  jobValue: number | null;
  googleVisibility: string | null;
}

export interface CalculationResult {
  omnichannelLoss: number;
  speedToLeadLoss: number;
  followUpLoss: number;
  reactivationLoss: number;
  reputationLoss: number;
  totalMonthly: number;
  totalAnnual: number;
  missedCallsNum: number;
  avgJobValue: number;
}
