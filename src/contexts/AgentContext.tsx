import React, { createContext, useContext, useMemo, useState } from "react";

export type KnowledgeSource = {
  id: string;
  title: string;
  type: "url" | "pdf" | "faq";
  description?: string;
};

export type Agent = {
  id: string;
  name: string;
  persona: string;
  systemPrompt: string;
  channels: { chat: boolean; voice: boolean };
  tools: Record<string, boolean>;
  knowledgeSources: KnowledgeSource[];
};

export type MasterAgent = Agent;

type AgentContextType = {
  masterAgent: MasterAgent;
  clientAgents: Agent[];
  getClientAgent: (id: string) => Agent | undefined;
  updateMasterAgent: (updates: Partial<MasterAgent>) => void;
  updateClientAgent: (id: string, updates: Partial<Agent>) => void;
  addClientAgent: (agent: Omit<Agent, "id">) => Agent;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const initialMaster: MasterAgent = {
  id: "master",
  name: "Conneqt Master Agent",
  persona: "Helpful, expert operations brain for any business.",
  systemPrompt:
    "You are the Master Agent. Provide guidance, enforce policies, and orchestrate tools. Escalate complex tasks appropriately.",
  channels: { chat: true, voice: false },
  tools: {
    createTicket: true,
    lookupOrder: true,
    scheduleAppointment: true,
    getInvoice: true,
    updateCRMNote: true,
  },
  knowledgeSources: [
    { id: "k1", title: "Global FAQ", type: "faq" },
    { id: "k2", title: "Getting Started Guide", type: "url" },
  ],
};

const initialClients: Agent[] = [
  {
    id: "c-1001",
    name: "Acme Health Agent",
    persona: "Compassionate healthcare concierge.",
    systemPrompt:
      "You are Acme Health's dedicated AI. Be compliant, empathetic, and accurate.",
    channels: { chat: true, voice: false },
    tools: { createTicket: true, scheduleAppointment: true },
    knowledgeSources: [
      { id: "hc1", title: "Insurance FAQs", type: "faq" },
      { id: "hc2", title: "Clinic Locations", type: "url" },
    ],
  },
  {
    id: "c-1002",
    name: "Nova Commerce Agent",
    persona: "Sales-oriented ecommerce advisor.",
    systemPrompt:
      "You are Nova Commerce's AI. Focus on customer happiness and conversions.",
    channels: { chat: true, voice: false },
    tools: { createTicket: true, lookupOrder: true, getInvoice: true },
    knowledgeSources: [
      { id: "ec1", title: "Return Policy", type: "url" },
      { id: "ec2", title: "Product FAQ", type: "faq" },
    ],
  },
];

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [masterAgent, setMasterAgent] = useState<MasterAgent>(initialMaster);
  const [clientAgents, setClientAgents] = useState<Agent[]>(initialClients);

  const getClientAgent = (id: string) => clientAgents.find((a) => a.id === id);

  const updateMasterAgent = (updates: Partial<MasterAgent>) =>
    setMasterAgent((prev) => ({ ...prev, ...updates }));

  const updateClientAgent = (id: string, updates: Partial<Agent>) =>
    setClientAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );

  const addClientAgent = (agent: Omit<Agent, "id">) => {
    const newAgent: Agent = { ...agent, id: `c-${Date.now()}` };
    setClientAgents((prev) => [newAgent, ...prev]);
    return newAgent;
  };

  const value = useMemo(
    () => ({
      masterAgent,
      clientAgents,
      getClientAgent,
      updateMasterAgent,
      updateClientAgent,
      addClientAgent,
    }),
    [masterAgent, clientAgents]
  );

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
};

export const useAgent = () => {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used within AgentProvider");
  return ctx;
};
