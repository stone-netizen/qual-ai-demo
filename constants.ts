export const BRAND = {
  name: "Qual AI",
  tagline: "Performance-Driven Appointment Systems for Industry Leaders",
  legalName: "Qual AI Systems LLC",
  supportEmail: "info@qualai.co",
  supportPhone: "+1 949-382-4161",
  address: "338 S Western Ave STE C PMB 8019, Los Angeles, CA 90020, United States",
  domain: "qualai.co",
};

export const MESSAGING = {
  hero: {
    badge: "Exclusive Partnership Program",
    headline: "High-Intent Appointments",
    headlineAccent: "Delivered",
    subheadline: "Performance-driven booking systems that prep your techs to close. AI voice and SMS that turn leads into booked, ready-to-convert appointments.",
  },
  valueProp: [
    { title: "Pay on Performance", description: "Results-based partnership" },
    { title: "High-Intent Leads", description: "Pre-qualified and ready" },
    { title: "Calendar Integration", description: "Direct tech scheduling" },
    { title: "White-Glove Support", description: "Dedicated partner team" },
  ],
  stats: [
    { value: "60s", label: "Average Response Time" },
    { value: "40-60%", label: "Lead-to-Job Conversion" },
    { value: "24/7", label: "AI-Powered Follow-up" },
  ],
  howItWorks: [
    {
      title: "We Generate High-Intent Leads",
      description: "Strategic offers tailored to your market. Every lead is verified via AI voice and SMS before hitting your calendar.",
    },
    {
      title: "Your Techs Arrive Prepped",
      description: "Leads are pre-qualified with context on the job scope. Your team arrives ready to close, not discover.",
    },
    {
      title: "You Pay When Jobs Close",
      description: "Performance-based pricing aligned with your success. No upfront costs, no retainers—just results.",
    },
  ],
  cta: {
    primary: "Apply for Partnership",
    secondary: "Schedule Consultation",
    subtext: "Limited partnerships available",
  },
  faq: [
    {
      question: "How do you generate leads?",
      answer: "We run strategic offers tailored to your service area, then use AI voice and SMS to instantly follow up, qualify, and book appointments directly to your calendar.",
    },
    {
      question: "What makes your leads different?",
      answer: "Every lead is pre-qualified before it reaches you. We verify intent, confirm job scope, and prepare your techs with context—so they arrive ready to close, not discover.",
    },
    {
      question: "How does performance-based pricing work?",
      answer: "You only pay when appointments convert to closed jobs. We share your success, not your risk. No retainers, no upfront costs.",
    },
  ],
};

// CRM integrations with Logo.dev domains
// Logo URLs are constructed at runtime using VITE_LOGODEV_TOKEN
export const CRM_INTEGRATIONS = [
  { name: "ServiceTitan", domain: "servicetitan.com" },
  { name: "FieldEdge", domain: "fieldedge.com" },
  { name: "Housecall Pro", domain: "housecallpro.com" },
  { name: "Jobber", domain: "getjobber.com" },
  { name: "ServiceM8", domain: "servicem8.com" },
  { name: "Service Fusion", domain: "servicefusion.com" },
  { name: "Workiz", domain: "workiz.com" },
  { name: "GorillaDesk", domain: "gorilladesk.com" },
];

export const ROUTES = {
  HOME: "/",
  HOW_IT_WORKS: "/how-it-works",
  CONTACT: "/contact",
  POST_BOOKING: "/confirmed",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  SMS_TERMS: "/sms-terms",
  COOKIE_POLICY: "/cookie-policy",
  SECURITY: "/security",
  DEMO: "/demo"
};

export const SOCIAL_PROOF = [
  { name: "Mike T.", location: "Austin, TX", service: "AC Repair", timeAgo: "2 min ago" },
  { name: "Sarah L.", location: "Phoenix, AZ", service: "HVAC Install", timeAgo: "5 min ago" },
  { name: "David R.", location: "Dallas, TX", service: "Maintenance", timeAgo: "8 min ago" },
  { name: "Jennifer M.", location: "Houston, TX", service: "Duct Cleaning", timeAgo: "12 min ago" },
  { name: "Robert K.", location: "San Antonio, TX", service: "Heat Pump", timeAgo: "15 min ago" },
];
