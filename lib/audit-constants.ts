
import { Industry, LeadChannel } from './audit-types';

export const MISSED_CALL_MAP: Record<string, number> = {
  'rarely': 2,
  'sometimes': 6,
  'often': 12,
  'very-often': 20,
  'all-time': 30,
};

export const CHANNEL_MULTIPLIER: Record<number, number> = {
  1: 1.0,
  2: 1.1,
  3: 1.3,
  4: 1.4,
  5: 1.5,
  6: 1.6,
};

export const RESPONSE_TIME_LOSS: Record<string, number> = {
  'under-5': 0.05,
  '5-30': 0.15,
  '30-120': 0.35,
  '2-6h': 0.55,
  '6h-plus': 0.75,
};

export const FOLLOW_UP_LOSS: Record<string, number> = {
  'automated': 0,
  'manual-1-2': 0.25,
  'one-attempt': 0.50,
  'nothing': 0.70,
};

export const REACTIVATION_GAP: Record<string, number> = {
  'active': 0,
  'occasional': 0.15,
  'manual-slow': 0.30,
  'nothing': 0.45,
};

export const REVIEW_LOSS_MODIFIER: Record<string, number> = {
  'lots-positive': 0,
  'some-mixed': 0.10,
  'few-not-great': 0.25,
  'not-much': 0.40,
};

export interface IndustryConfig {
  label: string;
  icon: string;
  unit: string;
  customerType: string;
  stat: string;
  painPoint: string;
  jobValueRanges: { label: string; value: number }[];
}

export const CHANNEL_LABELS: Record<LeadChannel, string> = {
  'phone': 'Phone calls',
  'website': 'Website contact form',
  'social-dm': 'Facebook/Instagram DMs',
  'google-msg': 'Google Business Messages',
  'sms': 'SMS/Text inquiries',
  'email': 'Email',
};

export const INDUSTRY_CONFIGS: Record<Industry, IndustryConfig> = {
  'hvac': {
    label: 'HVAC',
    icon: 'Thermometer',
    unit: 'service call',
    customerType: 'homeowner',
    stat: '89% of homeowners check reviews before booking HVAC service.',
    painPoint: 'Someone reaches out via phone or form but doesn\'t get an instant response—by the time you follow up, they\'ve hired a competitor.',
    jobValueRanges: [
      { label: '$300-600', value: 450 },
      { label: '$600-1,500', value: 1050 },
      { label: '$1,500-4K', value: 2750 },
      { label: '$4K-8K', value: 6000 },
      { label: '$8K-12K+', value: 10000 },
    ]
  },
  'roofing': {
    label: 'Roofing',
    icon: 'Home',
    unit: 'project inquiry',
    customerType: 'homeowner',
    stat: '92% of roofing customers won\'t call a company with less than 4.5 stars.',
    painPoint: 'High-value roofing leads are lost if not engaged within the first 2 minutes of inquiry.',
    jobValueRanges: [
      { label: '$1,000-3K (Repair)', value: 2000 },
      { label: '$3K-8K (Mid Repair)', value: 5500 },
      { label: '$8K-15K (Standard)', value: 11500 },
      { label: '$15K-25K (Large)', value: 20000 },
      { label: '$25K+ (Commercial)', value: 35000 },
    ]
  },
  'plumbing': {
    label: 'Plumbing',
    icon: 'Droplets',
    unit: 'emergency call',
    customerType: 'homeowner',
    stat: '85% of people calling a plumber are in an "emergency" state and hire the first one who answers.',
    painPoint: 'A pipe burst. They call, text, or DM 3 plumbers. The fastest responder wins the $1,000 job.',
    jobValueRanges: [
      { label: '$200-500', value: 350 },
      { label: '$500-1,200', value: 850 },
      { label: '$1,200-3K', value: 2100 },
      { label: '$3K-7K', value: 5000 },
      { label: '$7K+', value: 10000 },
    ]
  },
  'electrical': {
    label: 'Electrical',
    icon: 'Zap',
    unit: 'service request',
    customerType: 'client',
    stat: 'Local SEO for electricians is driven 70% by recent, positive Google reviews.',
    painPoint: 'Complex electrical quotes often go cold because contractors fail to follow up more than twice.',
    jobValueRanges: [
      { label: '$150-400', value: 275 },
      { label: '$400-1,000', value: 700 },
      { label: '$1,000-2,500', value: 1750 },
      { label: '$2,500-5K', value: 3750 },
      { label: '$5K+', value: 7500 },
    ]
  },
  'pest-control': {
    label: 'Pest Control',
    icon: 'Bug',
    unit: 'treatment call',
    customerType: 'homeowner',
    stat: '88% of pest control leads are lost if not answered on the first ring.',
    painPoint: 'Seasonal pest surges flood all channels. If you miss the DM or Google Message, you miss the lead.',
    jobValueRanges: [
      { label: '$100-250', value: 175 },
      { label: '$250-500', value: 375 },
      { label: '$500-1,000', value: 750 },
      { label: '$1,000-2,500', value: 1750 },
      { label: '$2,500+', value: 4000 },
    ]
  },
  'cleaning': {
    label: 'Cleaning',
    icon: 'Sparkles',
    unit: 'recurring booking',
    customerType: 'client',
    stat: 'The LTV (Lifetime Value) of a cleaning client is 10x the initial booking.',
    painPoint: 'Cleaning leads often inquire via DMs. Slow response means they\'ve already booked another crew.',
    jobValueRanges: [
      { label: '$150-300', value: 225 },
      { label: '$300-600', value: 450 },
      { label: '$600-1,200', value: 900 },
      { label: '$1,200-2,500', value: 1850 },
      { label: '$2,500+', value: 5000 },
    ]
  },
  'landscaping': {
    label: 'Landscaping',
    icon: 'Leaf',
    unit: 'project quote',
    customerType: 'homeowner',
    stat: '90% of landscaping projects are awarded to the contractor who provides the fastest quote.',
    painPoint: 'Your "Dead Lead Graveyard" likely contains thousands in missed spring maintenance revenue.',
    jobValueRanges: [
      { label: '$200-800', value: 500 },
      { label: '$800-2,500', value: 1650 },
      { label: '$2,500-7K', value: 4750 },
      { label: '$7K-15K', value: 11000 },
      { label: '$15K+', value: 25000 },
    ]
  },
  'general-contracting': {
    label: 'Gen. Contracting',
    icon: 'Hammer',
    unit: 'remodel inquiry',
    customerType: 'homeowner',
    stat: 'Homeowners interview 3 GCs. 75% choose the one with the most reviews.',
    painPoint: 'GCs lose the most money on "Follow-Up Failure"—failing to nurture a lead over a 3-week decision cycle.',
    jobValueRanges: [
      { label: '$1,000-5K', value: 3000 },
      { label: '$5K-15K', value: 10000 },
      { label: '$15K-40K', value: 27500 },
      { label: '$40K-100K', value: 70000 },
      { label: '$100K+', value: 150000 },
    ]
  }
};

export const LABELS: Record<string, string> = {
  'rarely': 'Rarely (1-3/month)',
  'sometimes': 'Sometimes (4-8/month)',
  'often': 'Often (9-15/month) ⚠️',
  'very-often': 'Very Often (16-25/month) 🔴',
  'all-time': 'All the time (25+/month) 🔴',
  'under-5': 'Under 5 minutes ⚡',
  '5-30': '5-30 minutes',
  '30-120': '30 min - 2 hours ⚠️',
  '2-6h': '2-6 hours',
  '6h-plus': '6+ hours or next day 🔴',
  'automated': 'Automated follow-up sequence',
  'manual-1-2': 'Manual follow-up (1-2 times)',
  'one-attempt': 'One attempt, then we move on',
  'active': 'Active reactivation campaigns',
  'occasional': 'Occasional email blasts',
  'manual-slow': 'Manually call some (when slow)',
  'nothing': 'Nothing—they sit in CRM 🔴',
  'lots-positive': 'Lots of reviews (4.5+ ⭐)',
  'some-mixed': 'Some reviews (3.5-4.5 ⭐)',
  'few-not-great': 'Few reviews (below 4.0 ⭐) ⚠️',
  'not-much': 'Barely any reviews 🔴',
};
