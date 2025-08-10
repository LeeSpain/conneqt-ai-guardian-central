export type ServiceKey =
  | "ai_agent_calling"
  | "live_chat"
  | "analytics";

export type ServiceDefinition = {
  key: ServiceKey;
  name: string;
  description: string;
};

export const SERVICE_CATALOG: ServiceDefinition[] = [
  {
    key: "ai_agent_calling",
    name: "AI Agent Calling",
    description: "Outbound and inbound AI calling with scheduling and CRM logging.",
  },
  {
    key: "live_chat",
    name: "Live Chat",
    description: "Chat widget with AI triage and handoff to human agents.",
  },
  {
    key: "analytics",
    name: "Analytics",
    description: "Real-time dashboards and performance insights across channels.",
  },
];
