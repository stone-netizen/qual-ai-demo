export const MOCK_REPORT_DATA = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  business_name: "Acme Dental",
  metrics: {
    monthly_revenue_lost: 12500,
    ninety_day_upside: 37500,
  },
  ai_report_json: {
    tier: "priority_install", // priority_install / audit_pilot / waitlist
    executive_summary: "Based on your call volume and response times, you are losing approximately $12,500/month. The primary bottleneck is missed calls during lunch hours and delayed follow-ups on web leads.",
    leaks: [
      {
        name: "Missed Calls",
        why: "43% of calls go to voicemail, primarily between 12-2PM.",
        monthly_loss_estimate: 8200,
        confidence: "high"
      },
      {
        name: "Slow Speed-to-Lead",
        why: "Average response time is >2 hours. Best practice is <5 mins.",
        monthly_loss_estimate: 3100,
        confidence: "medium"
      },
      {
        name: "No After-Hours Booking",
        why: "Patients searching at night have no way to self-schedule.",
        monthly_loss_estimate: 1200,
        confidence: "medium"
      }
    ],
    mermaid_current_funnel: `
      graph TD
      A[Leads: 100/mo] -->|43% Missed| B(Voicemail)
      A -->|57% Answered| C(Reception)
      B -->|10% Callback| C
      C -->|Booking Rate 40%| D(Appointment)
      D -->|Show Rate 85%| E(Revenue: $25k)
      style B fill:#ffcccc,stroke:#ff0000,stroke-width:2px
    `,
    mermaid_fix_funnel: `
      graph TD
      A[Leads: 100/mo] -->|AI Receptionist| B(Instant Answer 24/7)
      B -->|Qualify & Book| C(Appointment)
      C -->|SMS Reminders| D(Revenue: $37.5k)
      style B fill:#ccffcc,stroke:#00aa00,stroke-width:2px
    `
  }
};
