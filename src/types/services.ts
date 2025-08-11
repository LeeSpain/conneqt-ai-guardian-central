export type ServiceCategory =
  | "customer_support"
  | "sales_marketing"
  | "data_reporting"
  | "hr_recruitment"
  | "finance"
  | "operations_project"
  | "conversation_intelligence"
  | "compliance_security"
  | "industry"
  | "custom_enhancements";

export type ServiceKey =
  | "ai_agent_calling"
  | "live_chat"
  | "analytics"
  | "customer_support"
  | "sales_marketing"
  | "data_reporting"
  | "hr_recruitment"
  | "finance"
  | "operations_project"
  | "conversation_intelligence"
  | "compliance_security"
  | "industry_healthcare"
  | "industry_ecommerce"
  | "industry_saas"
  | "industry_hospitality"
  | "custom_enhancements";

export type ServiceDefinition = {
  key: ServiceKey;
  name: string;
  description: string;
  category: ServiceCategory;
  tags?: string[];
};

export const SERVICE_CATALOG: ServiceDefinition[] = [
  // Core categories
  {
    key: "customer_support",
    name: "Customer Service & Support",
    description:
      "24/7 chat, email, SMS, voice; multilingual; knowledge base automation; sentiment and escalation; omnichannel.",
    category: "customer_support",
    tags: ["chat", "voice", "multilingual", "omnichannel"],
  },
  {
    key: "sales_marketing",
    name: "Sales & Marketing",
    description:
      "Lead qualification, recommendations, email/SMS campaigns, social engagement, cart recovery, forecasting.",
    category: "sales_marketing",
    tags: ["leads", "campaigns", "social", "upsell"],
  },
  {
    key: "data_reporting",
    name: "Data Management & Reporting",
    description:
      "CRM data automation, cleansing, unified customer records, custom dashboards, predictive analytics.",
    category: "data_reporting",
    tags: ["CRM", "dashboards", "predictive"],
  },
  {
    key: "hr_recruitment",
    name: "HR & Recruitment",
    description:
      "Job posting, CV screening, scheduling, onboarding/training, HR docs, performance reporting, leave tracking.",
    category: "hr_recruitment",
    tags: ["ATS", "onboarding", "HR"],
  },
  {
    key: "finance",
    name: "Accounts & Finance",
    description:
      "Invoicing, AR/AP, expenses, budgeting, payroll prep, integrations (Xero, QuickBooks).",
    category: "finance",
    tags: ["invoicing", "payroll", "accounting"],
  },
  {
    key: "operations_project",
    name: "Operations & Project Management",
    description:
      "Tasks, timelines, vendor comms, inventory, logistics coordination.",
    category: "operations_project",
    tags: ["projects", "inventory", "logistics"],
  },
  {
    key: "conversation_intelligence",
    name: "Conversation Intelligence & Insights",
    description:
      "Transcription, sentiment/intent, notes & summaries, opportunity highlights, training insights.",
    category: "conversation_intelligence",
    tags: ["transcription", "insights", "QA"],
  },
  {
    key: "compliance_security",
    name: "Compliance & Security",
    description:
      "GDPR/HIPAA handling, encryption, audit logs, policy monitoring.",
    category: "compliance_security",
    tags: ["GDPR", "HIPAA", "security"],
  },

  // Industry modules
  {
    key: "industry_healthcare",
    name: "Healthcare Module",
    description:
      "Appointments, patient follow-up, insurance verification.",
    category: "industry",
    tags: ["healthcare"],
  },
  {
    key: "industry_ecommerce",
    name: "E-commerce Module",
    description:
      "Order tracking, returns, upselling.",
    category: "industry",
    tags: ["ecommerce"],
  },
  {
    key: "industry_saas",
    name: "SaaS/Tech Module",
    description:
      "Troubleshooting, onboarding, subscription management.",
    category: "industry",
    tags: ["saas"],
  },
  {
    key: "industry_hospitality",
    name: "Hospitality Module",
    description:
      "Booking changes, itinerary assistance, VIP services.",
    category: "industry",
    tags: ["hospitality"],
  },

  // Custom enhancements
  {
    key: "custom_enhancements",
    name: "Custom Enhancements",
    description:
      "Tailored AI tone, API/webhooks, VIP routing, dedicated manager, white-label branding.",
    category: "custom_enhancements",
    tags: ["custom", "whitelabel"],
  },

  // Backwards-compatible individual modules
  {
    key: "ai_agent_calling",
    name: "AI Agent Calling",
    description: "Outbound/inbound AI calling with scheduling and CRM logging.",
    category: "customer_support",
  },
  {
    key: "live_chat",
    name: "Live Chat",
    description: "Chat widget with AI triage and handoff to human agents.",
    category: "customer_support",
  },
  {
    key: "analytics",
    name: "Analytics",
    description: "Real-time dashboards and performance insights across channels.",
    category: "data_reporting",
  },
];
