export type DiagnosticSectionId = "happening" | "invisible" | "compounds";

export interface DiagnosticBlock {
  summary: string;
  bullets: string[];
}

export interface DiagnosticContent {
  happening: DiagnosticBlock;
  invisible: DiagnosticBlock;
  compounds: DiagnosticBlock;
}

export interface LeakDiagnostics {
  [leakType: string]: {
    [industry: string]: DiagnosticContent;
  };
}

const medSpaContent: Record<string, DiagnosticContent> = {
  "missed-calls": {
    happening: {
      summary: "High-intent callers hit voicemail or a busy tone during peak hours.",
      bullets: [
        "Front desk is in treatment rooms, not on phones.",
        "No overflow routing or live answering safety net.",
        "Call queue data isn’t monitored daily.",
      ],
    },
    invisible: {
      summary: "CRMs only log answered calls, so losses never surface.",
      bullets: [
        "Missed rings and abandoned calls aren’t tied to revenue.",
        "Voicemail drops aren’t tracked against marketing spend.",
        "Staff assumes callers will try again (most don’t).",
      ],
    },
    compounds: {
      summary: "Every missed call loses today’s visit and the lifetime value attached to it.",
      bullets: [
        "Competitors answer within seconds and capture the intent.",
        "Repeat treatment value multiplies the loss over months.",
        "Marketing ROI tanks because capture rate is weak.",
      ],
    },
  },
  "after-hours": {
    happening: {
      summary: "Evening and weekend inquiries go unanswered when intent is highest.",
      bullets: [
        "No after-hours routing to answering service or SMS bot.",
        "Weekend callers default to voicemail and drop off.",
        "No SLA for late-evening form submissions or DMs.",
      ],
    },
    invisible: {
      summary: "The team never sees what came in after 6pm, so it feels quiet.",
      bullets: [
        "No morning report of overnight or weekend inquiries.",
        "Voicemails aren’t tied to lost appointments.",
        "Assumption that “they’ll call Monday” (they call competitors).",
      ],
    },
    compounds: {
      summary: "Urgent-booking demand shifts to whoever replies first at night.",
      bullets: [
        "New patient value is high; losing one costs multiple visits.",
        "Word-of-mouth spreads from faster competitors.",
        "Ad spend keeps running while capture is closed.",
      ],
    },
  },
  "slow-response": {
    happening: {
      summary: "Leads wait longer than 15 minutes for a first reply, cooling intent.",
      bullets: [
        "Manual inbox checks; no instant SMS/email playbook.",
        "Front desk prioritizes in-person tasks over speed-to-lead.",
        "No ownership or SLA timer for first response.",
      ],
    },
    invisible: {
      summary: "Pipelines show “contacted,” but the clock to first touch isn’t tracked.",
      bullets: [
        "CRMs lack a first-response timestamp or alerting.",
        "Leads marked warm even if first reply was hours later.",
        "Team sees full pipeline, not the decay from late replies.",
      ],
    },
    compounds: {
      summary: "Response decay is steep; every minute drops conversion odds.",
      bullets: [
        "Hot leads price-shop and schedule with the fastest responder.",
        "Needing multi-touch follow-up is ignored once momentum is lost.",
        "Late replies increase no-shows and ghosted consults.",
      ],
    },
  },
  "no-follow-up": {
    happening: {
      summary: "Leads get 1–2 touches instead of a structured 5–7 touch sequence.",
      bullets: [
        "Reminders live in individual inboxes, not a system.",
        "No branching for “not now,” “shopping,” or “left on read.”",
        "Follow-up stops after busy days or staff turnover.",
      ],
    },
    invisible: {
      summary: "CRM says “contacted,” but no one audits depth or timing of touches.",
      bullets: [
        "No report on attempts per lead or channel mix.",
        "Manual notes hide gaps in timing and message quality.",
        "Partial follow-up looks like full effort in dashboards.",
      ],
    },
    compounds: {
      summary: "Under-followed leads become someone else’s loyal patient.",
      bullets: [
        "Re-engagement lifts bookings without extra ad spend.",
        "Competitive offers keep nudging while you stay silent.",
        "Each missed nurture cycle delays repeat and referral revenue.",
      ],
    },
  },
};

const leakDiagnostics: LeakDiagnostics = {
  ...Object.keys(medSpaContent).reduce((acc, key) => {
    acc[key] = { "med-spa": medSpaContent[key], default: medSpaContent[key] };
    return acc;
  }, {} as LeakDiagnostics),
};

export function getDiagnosticContent(leakType: string, industry?: string): DiagnosticContent {
  const fallbackIndustry = "med-spa";
  const leakContent = leakDiagnostics[leakType];
  if (!leakContent) {
    return {
      happening: { summary: "Operational gap is reducing captured demand.", bullets: [] },
      invisible: { summary: "It’s hard to see in reports because the data is incomplete.", bullets: [] },
      compounds: { summary: "The leak grows over time if left unchecked.", bullets: [] },
    };
  }

  if (industry && leakContent[industry]) {
    return leakContent[industry];
  }

  return leakContent[fallbackIndustry] || Object.values(leakContent)[0];
}

