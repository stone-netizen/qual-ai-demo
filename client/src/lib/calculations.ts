import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ReportData {
  id: string;
  business_name: string;
  metrics: {
    monthly_revenue_lost: number;
    ninety_day_upside: number;
  };
  ai_report_json: {
    tier: "priority_install" | "audit_pilot" | "waitlist";
    executive_summary: string;
    leaks: Array<{
      name: string;
      why: string;
      monthly_loss_estimate: number;
      confidence: "high" | "medium" | "low";
    }>;
    mermaid_current_funnel: string;
    mermaid_fix_funnel: string;
  };
}

export function calculateReport(formData: any): ReportData {
  // 1. Parse Inputs
  const L = Number(formData.leads_per_month) || 100;
  const MCw = Number(formData.missed_calls_week) || 0;
  const c = (Number(formData.contact_rate) || 50) / 100;
  const b = (Number(formData.booking_rate) || 40) / 100;
  const s = (Number(formData.show_rate) || 70) / 100;
  const k = (Number(formData.close_rate) || 30) / 100;
  const A = Number(formData.avg_value) || 500;
  const responseTime = formData.response_time || "30_to_120";

  // 2. Current Revenue Calculation
  const R_current = L * c * b * s * k * A;

  // 3. Target Rates (Normal Improvement)
  // We assume AI automation improves contact, booking, and show rates significantly
  const c_target = Math.min(0.95, c + 0.20); // +20% contact rate
  const b_target = Math.min(0.90, b + 0.15); // +15% booking rate
  const s_target = Math.min(0.95, s + 0.15); // +15% show rate
  const k_target = Math.min(0.80, k + 0.05); // +5% close rate (better qualified leads)

  const R_target = L * c_target * b_target * s_target * k_target * A;
  
  // Funnel Optimization Value
  const funnel_upside = Math.max(0, R_target - R_current);

  // 4. Missed Call Recovery Calculation
  const MCm = MCw * 4.33; // Monthly missed calls
  
  // Recovery rate based on response time bucket (prompt logic)
  let recovery_rate = 0.35;
  if (responseTime === "under_5") recovery_rate = 0.20;
  else if (responseTime === "5_to_30") recovery_rate = 0.35;
  else if (responseTime === "30_to_120") recovery_rate = 0.45;
  else recovery_rate = 0.55; // hours+

  const recovered_leads = MCm * recovery_rate;
  // Value of these recovered leads flowing through the NEW funnel
  const missed_call_upside = recovered_leads * b_target * s_target * k_target * A;

  // 5. Total Lost Revenue
  const total_monthly_lost = funnel_upside + missed_call_upside;
  const ninety_day_upside = total_monthly_lost * 3;

  // 6. Identify Leaks
  const leaks = [];

  // Leak 1: Missed Calls (if significant)
  if (missed_call_upside > 1000 || MCw > 5) {
    leaks.push({
      name: "Missed Call Leakage",
      why: `${MCw} calls/week go unanswered. At your value of $${A}, that's huge.`,
      monthly_loss_estimate: Math.round(missed_call_upside),
      confidence: "high" as const
    });
  }

  // Leak 2: Speed to Lead (if slow)
  if (["30_to_120", "hours_plus", "next_day"].includes(responseTime)) {
    // Estimate loss from slow response specifically (diff between current C and target C attributed to speed)
    const speed_loss = L * (c_target - c) * b * s * k * A; 
    leaks.push({
      name: "Slow Speed-to-Lead",
      why: "Response time > 30 mins drops contact rates by up to 8x.",
      monthly_loss_estimate: Math.round(speed_loss),
      confidence: "high" as const
    });
  }

  // Leak 3: General Funnel Drop-off (Contact/Booking/Show)
  // Find the weakest link relative to benchmarks
  if (c < 0.5) {
    leaks.push({ name: "Low Contact Rate", why: "Less than 50% of leads are ever reached.", monthly_loss_estimate: Math.round(funnel_upside * 0.4), confidence: "medium" as const });
  } else if (s < 0.6) {
    leaks.push({ name: "High No-Show Rate", why: "No-shows are costing revenue. Reminders need automation.", monthly_loss_estimate: Math.round(funnel_upside * 0.3), confidence: "medium" as const });
  } else {
    leaks.push({ name: "Manual Follow-up Fatigue", why: "Manual follow-up limits volume and consistency.", monthly_loss_estimate: Math.round(funnel_upside * 0.3), confidence: "medium" as const });
  }

  // Ensure we have at least 3 leaks, fill with generic if needed
  while (leaks.length < 3) {
    leaks.push({
      name: "Database Reactivation",
      why: "Past leads are sitting dormant without automated nurture.",
      monthly_loss_estimate: Math.round(total_monthly_lost * 0.1),
      confidence: "medium" as const
    });
  }

  // Sort by impact
  leaks.sort((a, b) => b.monthly_loss_estimate - a.monthly_loss_estimate);
  const topLeaks = leaks.slice(0, 3);

  // 7. Dynamic Summary
  const executive_summary = `Based on ${L} monthly leads and ${MCw} missed calls/week, your clinic is potentially losing $${Math.round(total_monthly_lost).toLocaleString()}/month. Your primary bottleneck appears to be ${topLeaks[0].name}. Implementing Qual AI's automation could recover this revenue within 90 days.`;

  // 8. Dynamic Diagrams
  const mermaid_current = `
      graph TD
      %% Nodes
      Leads[Inbound Leads: ${L}/mo]
      
      subgraph Leaks [Revenue Leaks]
        Voicemail(Voicemail / No Answer)
        Ghosted(Manual Chase / Ghosted)
        NoShow(No-Show / Cancellation)
      end

      subgraph Process [Current Process]
        Reception(Reception Answered)
        Booked(Booked Consult)
        Showed(Showed Up)
        Revenue(Closed Revenue: $${Math.round(R_current).toLocaleString()})
      end

      %% Flows
      Leads -->|${Math.round((1-c)*100)}% Missed| Voicemail
      Leads -->|${Math.round(c*100)}% Answered| Reception
      
      Voicemail -.->|Lost Opportunity| Ghosted
      Reception -->|Manual Follow-up| Booked
      
      Booked -->|${Math.round((1-s)*100)}% Drop-off| NoShow
      Booked -->|${Math.round(s*100)}% Show| Showed
      
      Showed -->|${Math.round(k*100)}% Close| Revenue

      %% Styles
      style Voicemail fill:#ffebee,stroke:#ef5350,stroke-width:2px,color:#c62828
      style Ghosted fill:#ffebee,stroke:#ef5350,stroke-width:2px,color:#c62828
      style NoShow fill:#ffebee,stroke:#ef5350,stroke-width:2px,color:#c62828
      style Revenue fill:#f1f8e9,stroke:#8bc34a,stroke-width:2px,color:#33691e
      style Leads fill:#fafafa,stroke:#e0e0e0,stroke-width:1px
  `;

  const mermaid_fix = `
      graph TD
      %% Nodes
      Leads[Inbound Leads: ${L}/mo]

      subgraph AI_Layer [Qual AI Automation Layer]
        Instant(Instant AI Answer 24/7)
        Qualify(Auto-Qualification)
        SmartBook(Smart Booking & Deposit)
        Reminders(SMS Reminders & Nurture)
      end

      subgraph Revenue_Growth [Revenue Growth]
        Growth(Recovered Revenue: $${Math.round(R_target + missed_call_upside).toLocaleString()})
      end

      %% Flows
      Leads -->|0s Response Time| Instant
      Instant -->|Engage| Qualify
      Qualify -->|Convert| SmartBook
      SmartBook -->|Retain| Reminders
      Reminders -->|Close| Growth

      %% Styles
      style Instant fill:#e0f2f1,stroke:#26a69a,stroke-width:2px,color:#00695c
      style Qualify fill:#e0f2f1,stroke:#26a69a,stroke-width:2px,color:#00695c
      style SmartBook fill:#e0f2f1,stroke:#26a69a,stroke-width:2px,color:#00695c
      style Reminders fill:#e0f2f1,stroke:#26a69a,stroke-width:2px,color:#00695c
      style Growth fill:#ccff90,stroke:#7cb342,stroke-width:2px,color:#33691e
      style Leads fill:#fafafa,stroke:#e0e0e0,stroke-width:1px
  `;

  // 9. Determine Tier
  let tier: "priority_install" | "audit_pilot" | "waitlist" = "waitlist";
  if (total_monthly_lost > 10000) tier = "priority_install";
  else if (total_monthly_lost > 3000) tier = "audit_pilot";

  return {
    id: crypto.randomUUID(),
    business_name: formData.clinic_name || "Your Clinic",
    metrics: {
      monthly_revenue_lost: Math.round(total_monthly_lost),
      ninety_day_upside: Math.round(ninety_day_upside),
    },
    ai_report_json: {
      tier,
      executive_summary,
      leaks: topLeaks,
      mermaid_current_funnel: mermaid_current,
      mermaid_fix_funnel: mermaid_fix
    }
  };
}
