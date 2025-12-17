/**
 * Industry-Specific Configuration
 * 
 * Each industry has unique:
 * - Pain points (different challenges)
 * - Leakage patterns (where they lose leads)
 * - Competitive dynamics (what matters in their market)
 * - Language/Terminology (how they talk)
 * - Urgency triggers (what scares them)
 * - Benchmarks (industry-specific metrics)
 */

export type IndustryType = 'medspa' | 'dental' | 'chiro' | 'physio' | 'other';

export interface IndustryColorScheme {
  primary: string;      // Tailwind color name (e.g., "purple")
  accent: string;       // Secondary color
  alert: string;        // Warning/urgency color
  gradient: string;     // CSS gradient for hero
}

export interface IndustryMetrics {
  avgTicketRange: { min: number; max: number; default: number };
  salesCycle: string;
  keyMetricName: string;
  keyMetricValue: number;
  keyPainPoint: string;
  urgencyWindow: string;
}

export interface IndustryLanguage {
  customer: string;          // "patient", "client"
  customerPlural: string;    // "patients", "clients"
  visit: string;             // "consultation", "appointment", "adjustment"
  visitPlural: string;
  service: string;           // "procedure", "treatment"
  servicePlural: string;
  urgencyHook: string;       // One-liner about why speed matters
}

export interface IndustryUrgencyTrigger {
  icon: 'moon' | 'clock' | 'alert' | 'users' | 'dollar' | 'phone' | 'activity';
  title: string;
  stat: string;
  description: string;
}

export interface IndustryPriorityFix {
  id: number;
  name: string;
  description: string;
  losses: string[];
  recovery: string[];
  industryInsight: {
    metric: string;
    impact: string;
    benchmark: string;
  };
}

export interface IndustryConfig {
  id: IndustryType;
  displayName: string;
  badgeLabel: string;
  colorScheme: IndustryColorScheme;
  metrics: IndustryMetrics;
  language: IndustryLanguage;
  heroSubtitle: string;
  leakDescription: string;
  urgencyTriggers: IndustryUrgencyTrigger[];
  urgencyCallout: {
    title: string;
    body: string;
    kicker: string;
  };
  priorityFixes: IndustryPriorityFix[];
  competitiveReality: {
    headline: string;
    body: string;
    dailyLossContext: string;
  };
}

// ============================================================================
// MEDSPA CONFIGURATION
// ============================================================================

const MEDSPA_CONFIG: IndustryConfig = {
  id: 'medspa',
  displayName: 'Medical Aesthetics',
  badgeLabel: 'Aesthetic Practice Analysis',
  colorScheme: {
    primary: 'purple',
    accent: 'pink',
    alert: 'orange',
    gradient: 'from-slate-900 via-purple-950 to-slate-900'
  },
  metrics: {
    avgTicketRange: { min: 1500, max: 5000, default: 2500 },
    salesCycle: '3-14 days',
    keyMetricName: 'After-Hours Loss',
    keyMetricValue: 73,
    keyPainPoint: 'After-hours inquiry loss',
    urgencyWindow: '2 hours'
  },
  language: {
    customer: 'client',
    customerPlural: 'clients',
    visit: 'consultation',
    visitPlural: 'consultations',
    service: 'procedure',
    servicePlural: 'procedures',
    urgencyHook: 'High-ticket cosmetic inquiries happen when you\'re closed'
  },
  heroSubtitle: 'High-ticket procedures slipping away',
  leakDescription: 'per month in lost cosmetic procedure inquiries',
  urgencyTriggers: [
    {
      icon: 'moon',
      title: 'After-Hours Loss',
      stat: '73%',
      description: 'of cosmetic inquiries happen outside business hours'
    },
    {
      icon: 'clock',
      title: 'Decision Window',
      stat: '2 hrs',
      description: 'Prospects book within 2 hours or move to the next provider'
    },
    {
      icon: 'dollar',
      title: 'High-Ticket Impact',
      stat: '$2,500+',
      description: 'Average procedure value at stake with each lost inquiry'
    }
  ],
  urgencyCallout: {
    title: 'The Aesthetic Market Reality',
    body: 'When someone researches Botox, fillers, or body contouring, they\'re comparing 3-5 med spas simultaneously. The practice that responds first—especially outside business hours when 73% of research happens—captures the consultation.',
    kicker: 'Your competitors with 24/7 response are booking while you sleep.'
  },
  competitiveReality: {
    headline: 'Competitive Reality Check',
    body: 'While you\'re reading this, top-performing medspas are answering cosmetic inquiries in under 30 seconds—even at 9 PM. Those high-ticket clients comparing providers? They\'re booking with whoever responds first.',
    dailyLossContext: 'in cosmetic procedure revenue going to faster competitors'
  },
  priorityFixes: [
    {
      id: 1,
      name: 'After-Hours Inquiry Capture',
      description: '73% of cosmetic procedure research happens between 6 PM - 11 PM when offices are closed',
      losses: [
        'Evening inquiries go to voicemail',
        'Weekend research calls unanswered',
        'Late-night form fills get next-day response',
        'High-ticket prospects book with 24/7 competitors'
      ],
      recovery: [
        'AI answers inquiries within 60 seconds, 24/7',
        'Weekend leads captured and qualified immediately',
        'Evening researchers book while motivated',
        'Consultations scheduled during high-intent moments'
      ],
      industryInsight: {
        metric: 'Average inquiry time: 8:30 PM',
        impact: '68% conversion drop after 2-hour delay',
        benchmark: 'Competitors with instant response capture 3.2x more consultations'
      }
    },
    {
      id: 2,
      name: 'Consultation No-Show Prevention',
      description: 'Average med spa consultation no-show rate is 25-35%. Each missed consult is a lost high-ticket sale.',
      losses: [
        '25-35% of booked consultations no-show',
        'No automated reminder sequence',
        'Lost prime appointment slots',
        'Staff time wasted on prep for no-shows'
      ],
      recovery: [
        'Multi-touchpoint automated reminders',
        'SMS confirmations 48hr + 24hr + 2hr before',
        'Reduce no-shows to under 10%',
        'Automatic reschedule offers for cancellations'
      ],
      industryInsight: {
        metric: 'Average consultation value: $3,500',
        impact: 'Each no-show = prime slot + prep time lost',
        benchmark: 'Top performers maintain 8% no-show rate'
      }
    },
    {
      id: 3,
      name: 'Price Shopping Follow-Up',
      description: 'Aesthetic clients compare 3-5 providers. Persistent, value-focused follow-up wins.',
      losses: [
        'Price shoppers get 1-2 contact attempts max',
        'No education on value vs. competitors',
        'Manual follow-up is inconsistent',
        'Lower-priced competitors win by default'
      ],
      recovery: [
        '6-8 touchpoint automated sequence',
        'Educational content on quality + safety',
        'Before/after showcases sent automatically',
        'Limited-time consultation offers'
      ],
      industryInsight: {
        metric: 'Average comparison period: 5-7 days',
        impact: 'Win rate: 40% → 65% with systematic follow-up',
        benchmark: 'Key differentiator: medical expertise over price'
      }
    }
  ]
};

// ============================================================================
// DENTAL CONFIGURATION
// ============================================================================

const DENTAL_CONFIG: IndustryConfig = {
  id: 'dental',
  displayName: 'Family Dentistry',
  badgeLabel: 'Dental Practice Analysis',
  colorScheme: {
    primary: 'blue',
    accent: 'cyan',
    alert: 'red',
    gradient: 'from-slate-900 via-blue-950 to-slate-900'
  },
  metrics: {
    avgTicketRange: { min: 300, max: 2000, default: 750 },
    salesCycle: 'Same-day to 7 days',
    keyMetricName: 'Emergency Rate',
    keyMetricValue: 42,
    keyPainPoint: 'Emergency call handling',
    urgencyWindow: 'Immediate'
  },
  language: {
    customer: 'patient',
    customerPlural: 'patients',
    visit: 'appointment',
    visitPlural: 'appointments',
    service: 'treatment',
    servicePlural: 'treatments',
    urgencyHook: 'Pain-driven decisions happen immediately'
  },
  heroSubtitle: 'New patients slipping through to other practices',
  leakDescription: 'per month in lost new patient opportunities',
  urgencyTriggers: [
    {
      icon: 'alert',
      title: 'Emergency Losses',
      stat: '42%',
      description: 'of calls are pain-driven emergencies needing same-day care'
    },
    {
      icon: 'phone',
      title: 'First Responder',
      stat: '80%',
      description: 'of patients book with the first practice that answers'
    },
    {
      icon: 'users',
      title: 'Family LTV',
      stat: '$8,400',
      description: 'lifetime value lost per family (avg 2.8 patients/family)'
    }
  ],
  urgencyCallout: {
    title: 'The Dental Emergency Reality',
    body: 'When someone has a toothache or cracked crown, they\'re calling 3-4 practices in rapid succession. The first one that answers AND can get them in same-day wins the patient—and often their entire family.',
    kicker: 'Every missed emergency call = lost family worth $8,400 lifetime value.'
  },
  competitiveReality: {
    headline: 'Competitive Reality Check',
    body: 'While you\'re with a patient, emergency calls are going to voicemail. The person in pain doesn\'t leave a message—they call the next practice. That one new patient could have brought their whole family.',
    dailyLossContext: 'in new patient value going to practices that answer faster'
  },
  priorityFixes: [
    {
      id: 1,
      name: 'Emergency Call Capture',
      description: '42% of dental inquiries are pain-driven emergencies requiring same-day response',
      losses: [
        'Emergency calls go to voicemail during patient care',
        'Lunch hour calls missed entirely',
        'After-hours emergencies redirected to competitors',
        '80% call next practice if unanswered'
      ],
      recovery: [
        'Every call answered within 15 seconds',
        'Emergency triage and same-day scheduling',
        'After-hours emergency protocol',
        'Capture patients while in pain (highest intent)'
      ],
      industryInsight: {
        metric: 'Emergency patients convert at 87% vs 45% routine',
        impact: 'Each emergency patient brings 2.8 family members avg',
        benchmark: '$8,400 family lifetime value'
      }
    },
    {
      id: 2,
      name: 'New Patient Follow-Up',
      description: '57% of new patient inquiries need 3+ contacts before booking. Manual follow-up fails.',
      losses: [
        'New patient leads get 1-2 manual calls max',
        'Insurance questions go unanswered',
        'Weekend inquiries wait until Monday',
        'Competitive practices follow up faster'
      ],
      recovery: [
        'Automated 6-touchpoint nurture sequence',
        'Insurance verification assistance',
        'Weekend leads contacted immediately',
        'Appointment reminders reduce no-shows'
      ],
      industryInsight: {
        metric: 'Industry avg: 1.8 contact attempts. Top performers: 4.2',
        impact: '38% of lost leads cite insurance confusion',
        benchmark: 'Response within 30 min = 5x higher booking rate'
      }
    },
    {
      id: 3,
      name: 'Recall Reactivation',
      description: '32% of your patient base is overdue for recall. Systematic reactivation recovers revenue.',
      losses: [
        'Manual recall calls are time-consuming',
        'Overdue patients slip further away',
        'No systematic reactivation process',
        'Hygiene schedule has unfilled gaps'
      ],
      recovery: [
        'Automated recall reminders (email + SMS)',
        'Overdue patient win-back campaigns',
        'Birthday/seasonal outreach',
        'Fill hygiene schedule gaps automatically'
      ],
      industryInsight: {
        metric: 'Average overdue patient worth $420 in deferred care',
        impact: 'Reactivation rate: 15% manual → 31% automated',
        benchmark: 'Fill 12-18 hygiene slots/month from reactivation'
      }
    }
  ]
};

// ============================================================================
// CHIROPRACTIC CONFIGURATION
// ============================================================================

const CHIRO_CONFIG: IndustryConfig = {
  id: 'chiro',
  displayName: 'Chiropractic Care',
  badgeLabel: 'Chiropractic Practice Analysis',
  colorScheme: {
    primary: 'green',
    accent: 'emerald',
    alert: 'red',
    gradient: 'from-slate-900 via-green-950 to-slate-900'
  },
  metrics: {
    avgTicketRange: { min: 200, max: 1000, default: 400 },
    salesCycle: 'Same-day to 3 days',
    keyMetricName: 'Acute Pain Rate',
    keyMetricValue: 68,
    keyPainPoint: 'Same-day acute care scheduling',
    urgencyWindow: '2-4 hours'
  },
  language: {
    customer: 'patient',
    customerPlural: 'patients',
    visit: 'adjustment',
    visitPlural: 'adjustments',
    service: 'treatment',
    servicePlural: 'treatments',
    urgencyHook: 'Acute pain creates an immediate decision window'
  },
  heroSubtitle: 'New patients and recurring revenue slipping away',
  leakDescription: 'per month in lost patient acquisition + retention',
  urgencyTriggers: [
    {
      icon: 'activity',
      title: 'Acute Pain Loss',
      stat: '68%',
      description: 'of inquiries are pain-driven needing same-day appointments'
    },
    {
      icon: 'alert',
      title: 'PI Lead Loss',
      stat: '3-4x',
      description: 'value of personal injury leads lost to response delays'
    },
    {
      icon: 'users',
      title: 'Retention Loss',
      stat: '37%',
      description: 'of wellness patients drop off months 6-12 without follow-up'
    }
  ],
  urgencyCallout: {
    title: 'The Pain-Driven Decision Window',
    body: 'When someone throws out their back or gets in an auto accident, they\'re in immediate pain and calling chiropractors right now. Window of opportunity is 2-4 hours. First practice that answers AND can accommodate same-day wins the patient.',
    kicker: 'Average chiro patient stays 18 months = $2,400 lifetime value per missed call.'
  },
  competitiveReality: {
    headline: 'Competitive Reality Check',
    body: 'While you\'re with a patient, acute pain calls are going to voicemail. The person who threw out their back this morning? They\'re calling the next chiropractor. Personal injury cases worth 3-4x? Gone to whoever answers first.',
    dailyLossContext: 'in patient lifetime value going to faster-responding practices'
  },
  priorityFixes: [
    {
      id: 1,
      name: 'Same-Day Acute Care Booking',
      description: '68% of new chiropractic inquiries are pain-driven and need same-day appointments',
      losses: [
        'Acute pain calls missed during adjustments',
        'Can\'t accommodate same-day requests',
        'Pain patients book with first available',
        'Lost high-conversion opportunities'
      ],
      recovery: [
        'Instant call answer with AI triage',
        'Real-time schedule access for same-day',
        'Emergency slots protected automatically',
        'Capture patients during peak pain = peak motivation'
      ],
      industryInsight: {
        metric: 'Same-day acute patients: 92% convert vs 41% later',
        impact: '$2,400 avg patient lifetime value over 18 months',
        benchmark: 'Acute patients who get same-day: 73% stay 12+ months'
      }
    },
    {
      id: 2,
      name: 'Personal Injury Lead Response',
      description: 'Auto accident and PI leads are worth 3-4x typical patients but require immediate response',
      losses: [
        'PI leads get delayed response',
        'No attorney/legal referral coordination',
        'Lost to clinics with instant response',
        'High-value cases slip away'
      ],
      recovery: [
        'Immediate PI lead response protocol',
        'Attorney coordination automation',
        'Documentation support from day 1',
        'Capture before they call 5 other clinics'
      ],
      industryInsight: {
        metric: '$4,200 avg PI case value vs $1,400 standard',
        impact: '72% of PI patients book with first responder',
        benchmark: 'Average PI case: 4-6 months ongoing care'
      }
    },
    {
      id: 3,
      name: 'Maintenance Plan Retention',
      description: '37% of wellness plan patients drop off between months 6-12 without systematic check-ins',
      losses: [
        'Maintenance patients fall off radar',
        'No proactive check-in system',
        'Gaps in schedule from attrition',
        'Recurring revenue declining'
      ],
      recovery: [
        'Automated wellness check-ins',
        'Progress milestone celebrations',
        'Re-engagement for at-risk patients',
        'Extend average patient lifetime 40%'
      ],
      industryInsight: {
        metric: 'Retention: 27% → 41% past 12 months',
        impact: '+$8,400/month in predictable recurring revenue',
        benchmark: 'Retained patients refer 1.8x more'
      }
    }
  ]
};

// ============================================================================
// PHYSICAL THERAPY CONFIGURATION
// ============================================================================

const PHYSIO_CONFIG: IndustryConfig = {
  id: 'physio',
  displayName: 'Physical Therapy',
  badgeLabel: 'Physical Therapy Practice Analysis',
  colorScheme: {
    primary: 'indigo',
    accent: 'violet',
    alert: 'orange',
    gradient: 'from-slate-900 via-indigo-950 to-slate-900'
  },
  metrics: {
    avgTicketRange: { min: 400, max: 1500, default: 800 },
    salesCycle: '3-7 days (referral-based)',
    keyMetricName: 'Referral Rate',
    keyMetricValue: 67,
    keyPainPoint: 'Physician referral response time',
    urgencyWindow: '24-48 hours'
  },
  language: {
    customer: 'patient',
    customerPlural: 'patients',
    visit: 'session',
    visitPlural: 'sessions',
    service: 'therapy',
    servicePlural: 'therapies',
    urgencyHook: 'Insurance authorization creates time pressure'
  },
  heroSubtitle: 'Referrals and treatment completions slipping away',
  leakDescription: 'per month in lost referral capture + treatment revenue',
  urgencyTriggers: [
    {
      icon: 'phone',
      title: 'Referral Response',
      stat: '67%',
      description: 'of patients are physician-referred and expect quick response'
    },
    {
      icon: 'clock',
      title: 'Auth Window',
      stat: '48 hrs',
      description: 'Insurance authorizations expire if not scheduled promptly'
    },
    {
      icon: 'activity',
      title: 'Completion Rate',
      stat: '62%',
      description: 'of patients complete full treatment plan (industry: 45%)'
    }
  ],
  urgencyCallout: {
    title: 'The Referral Response Reality',
    body: 'When a physician refers a post-surgery patient or someone with chronic pain, they expect you to contact that patient within 24 hours. Delays mean the patient calls another PT clinic—or doesn\'t follow through at all.',
    kicker: 'Every delayed referral = lost 8-12 session treatment plan worth $1,200+.'
  },
  competitiveReality: {
    headline: 'Competitive Reality Check',
    body: 'While you\'re with patients, physician referrals are sitting in your inbox. The longer a referral waits, the less likely the patient is to follow through. Your competitor down the street? They called within 2 hours.',
    dailyLossContext: 'in referral revenue going to faster-responding clinics'
  },
  priorityFixes: [
    {
      id: 1,
      name: 'Physician Referral Response',
      description: '67% of PT patients are physician-referred. Rapid response protects those relationships.',
      losses: [
        'Referrals sit in inbox for hours/days',
        'Patients call other clinics when no response',
        'Physician relationships weakened',
        'Lost high-value treatment plans'
      ],
      recovery: [
        'Instant referral acknowledgment',
        'Patient contacted within 2 hours',
        'Automated insurance verification start',
        'Physician feedback loop automated'
      ],
      industryInsight: {
        metric: 'Same-day referral contact: 78% show rate',
        impact: 'Average treatment plan: 8-12 sessions = $1,200+',
        benchmark: 'Top performers contact 94% of referrals within 4 hours'
      }
    },
    {
      id: 2,
      name: 'Insurance Auth Acceleration',
      description: 'Insurance verification delays cause 28% of scheduled patients to cancel before starting',
      losses: [
        'Manual insurance verification takes days',
        'Patients don\'t know their coverage',
        'Authorizations expire before scheduling',
        'Cancellations from coverage confusion'
      ],
      recovery: [
        'Automated insurance eligibility check',
        'Patient cost estimates before first visit',
        'Authorization tracking and alerts',
        'Reduce auth-related cancellations 60%'
      ],
      industryInsight: {
        metric: '28% of scheduled patients cancel due to coverage issues',
        impact: 'Average time to verify: 3 days manual → 4 hours automated',
        benchmark: 'Clear cost expectations = 89% show rate'
      }
    },
    {
      id: 3,
      name: 'Treatment Plan Completion',
      description: 'Only 45% of patients complete their full treatment plan. Automated follow-up improves outcomes.',
      losses: [
        'Patients drop off after 4-5 sessions',
        'No systematic progress check-ins',
        'Gaps in schedule from attrition',
        'Incomplete recovery = poor outcomes'
      ],
      recovery: [
        'Automated progress milestone check-ins',
        'Personalized encouragement messages',
        'Easy rescheduling for missed appointments',
        'Completion rate tracking and intervention'
      ],
      industryInsight: {
        metric: 'Completion rate: 45% avg → 62% with automation',
        impact: 'Each completed plan = +4 sessions average',
        benchmark: 'Completed patients refer 2.1x more'
      }
    }
  ]
};

// ============================================================================
// OTHER/GENERIC CONFIGURATION
// ============================================================================

const OTHER_CONFIG: IndustryConfig = {
  id: 'other',
  displayName: 'Healthcare Practice',
  badgeLabel: 'Practice Analysis',
  colorScheme: {
    primary: 'slate',
    accent: 'blue',
    alert: 'red',
    gradient: 'from-slate-900 to-slate-800'
  },
  metrics: {
    avgTicketRange: { min: 200, max: 2000, default: 500 },
    salesCycle: '1-7 days',
    keyMetricName: 'Response Gap',
    keyMetricValue: 55,
    keyPainPoint: 'Lead response time',
    urgencyWindow: '1-2 hours'
  },
  language: {
    customer: 'patient',
    customerPlural: 'patients',
    visit: 'appointment',
    visitPlural: 'appointments',
    service: 'service',
    servicePlural: 'services',
    urgencyHook: 'First responder advantage wins the patient'
  },
  heroSubtitle: 'Patients slipping through to other practices',
  leakDescription: 'per month in lost patient opportunities',
  urgencyTriggers: [
    {
      icon: 'phone',
      title: 'Missed Calls',
      stat: '55%',
      description: 'of practice calls go to voicemail during busy hours'
    },
    {
      icon: 'clock',
      title: 'Response Time',
      stat: '80%',
      description: 'of patients book with the first practice that responds'
    },
    {
      icon: 'dollar',
      title: 'LTV Impact',
      stat: '$2,400+',
      description: 'average lifetime value per lost patient opportunity'
    }
  ],
  urgencyCallout: {
    title: 'The Response Reality',
    body: 'When someone needs healthcare, they\'re often calling multiple practices. The first one that answers, qualifies their needs, and can schedule them wins. Every call to voicemail is a potential patient lost.',
    kicker: 'Your competitors with instant response are capturing patients while you\'re busy.'
  },
  competitiveReality: {
    headline: 'Competitive Reality Check',
    body: 'While you\'re with patients, calls are going to voicemail. Those callers don\'t wait—they call the next practice. Competitors with 24/7 response are booking the patients you\'re missing.',
    dailyLossContext: 'in patient revenue going to faster-responding practices'
  },
  priorityFixes: [
    {
      id: 1,
      name: 'Call Capture',
      description: 'Every missed call is a potential patient going to a competitor',
      losses: [
        'Calls go to voicemail during busy hours',
        'After-hours inquiries wait until morning',
        'Staff too busy to answer promptly',
        'Patients call next practice instead'
      ],
      recovery: [
        'Every call answered within seconds',
        '24/7 availability for inquiries',
        'Instant qualification and scheduling',
        'Zero calls slip through'
      ],
      industryInsight: {
        metric: 'First responder wins 80% of the time',
        impact: 'Average patient LTV: $2,400+',
        benchmark: 'Top performers answer 98% of calls within 15 seconds'
      }
    },
    {
      id: 2,
      name: 'Follow-Up Automation',
      description: 'Most leads need 3-5 contacts before booking. Manual follow-up fails.',
      losses: [
        'Leads get 1-2 contact attempts max',
        'Manual follow-up is inconsistent',
        'Hot leads go cold',
        'Competitors are more persistent'
      ],
      recovery: [
        'Automated multi-touchpoint sequences',
        'Personalized follow-up messages',
        'Optimal timing for each contact',
        'Persistent nurture until booked'
      ],
      industryInsight: {
        metric: 'Average needed: 4+ contacts to book',
        impact: 'Automated follow-up increases conversion 2.3x',
        benchmark: 'Top performers average 6 touchpoints'
      }
    },
    {
      id: 3,
      name: 'No-Show Reduction',
      description: 'Appointment no-shows cost practices 15-25% of potential revenue',
      losses: [
        'High no-show rates waste slots',
        'Manual reminder calls take staff time',
        'No confirmation system',
        'Lost revenue from empty appointments'
      ],
      recovery: [
        'Automated reminder sequences',
        'Two-way SMS confirmations',
        'Easy rescheduling options',
        'Waitlist filling for cancellations'
      ],
      industryInsight: {
        metric: 'No-show rate: 18% avg → 8% with automation',
        impact: 'Each prevented no-show = recovered revenue',
        benchmark: 'Top performers maintain <10% no-show rate'
      }
    }
  ]
};

// ============================================================================
// EXPORTS
// ============================================================================

export const INDUSTRY_CONFIGS: Record<IndustryType, IndustryConfig> = {
  medspa: MEDSPA_CONFIG,
  dental: DENTAL_CONFIG,
  chiro: CHIRO_CONFIG,
  physio: PHYSIO_CONFIG,
  other: OTHER_CONFIG
};

/**
 * Get industry configuration by type
 */
export function getIndustryConfig(industryType: string): IndustryConfig {
  const type = industryType as IndustryType;
  return INDUSTRY_CONFIGS[type] || INDUSTRY_CONFIGS.other;
}

/**
 * Get Tailwind color classes for an industry
 */
export function getIndustryColors(industryType: string) {
  const config = getIndustryConfig(industryType);
  const { primary, accent, alert } = config.colorScheme;
  
  return {
    // Primary colors
    primaryBg: `bg-${primary}-500`,
    primaryBgLight: `bg-${primary}-500/20`,
    primaryBorder: `border-${primary}-500`,
    primaryBorderLight: `border-${primary}-500/30`,
    primaryText: `text-${primary}-400`,
    primaryTextDark: `text-${primary}-600`,
    
    // Accent colors
    accentBg: `bg-${accent}-500`,
    accentText: `text-${accent}-400`,
    
    // Alert colors
    alertBg: `bg-${alert}-500`,
    alertBgLight: `bg-${alert}-500/20`,
    alertBorder: `border-${alert}-500/30`,
    alertText: `text-${alert}-400`,
    
    // Gradient
    gradient: config.colorScheme.gradient
  };
}

/**
 * Calculate industry-specific leak values
 */
export function calculateIndustryLeaks(
  leadsPerMonth: number,
  avgValue: number,
  responseTimeKey: string,
  industryType: string
): {
  afterHoursLoss: number;
  responseDelayLoss: number;
  followUpLoss: number;
  totalLeak: number;
} {
  const config = getIndustryConfig(industryType);
  const { keyMetricValue } = config.metrics;
  
  // Industry-specific calculations
  let afterHoursMultiplier = 0.35; // Default
  let responseDelayMultiplier = 0.30;
  let followUpMultiplier = 0.25;
  
  switch (industryType) {
    case 'medspa':
      afterHoursMultiplier = 0.73; // 73% of inquiries after hours
      responseDelayMultiplier = 0.45;
      followUpMultiplier = 0.35;
      break;
    case 'dental':
      afterHoursMultiplier = 0.25;
      responseDelayMultiplier = 0.42; // 42% emergency
      followUpMultiplier = 0.32;
      break;
    case 'chiro':
      afterHoursMultiplier = 0.30;
      responseDelayMultiplier = 0.68; // 68% acute pain
      followUpMultiplier = 0.37;
      break;
    case 'physio':
      afterHoursMultiplier = 0.20;
      responseDelayMultiplier = 0.28;
      followUpMultiplier = 0.45; // Treatment completion
      break;
  }
  
  const baseMonthlyOpportunity = leadsPerMonth * avgValue * 0.15; // Assumed 15% close rate
  
  const afterHoursLoss = Math.round(baseMonthlyOpportunity * afterHoursMultiplier);
  const responseDelayLoss = Math.round(baseMonthlyOpportunity * responseDelayMultiplier);
  const followUpLoss = Math.round(baseMonthlyOpportunity * followUpMultiplier);
  const totalLeak = afterHoursLoss + responseDelayLoss + followUpLoss;
  
  return {
    afterHoursLoss,
    responseDelayLoss,
    followUpLoss,
    totalLeak
  };
}

