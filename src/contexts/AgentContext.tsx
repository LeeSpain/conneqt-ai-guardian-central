import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { buildRedactedContext } from "@/utils/AgentPrivacy";

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
  // Extended configuration for voice + telephony + integrations
  languages?: string[]; // e.g., ["en","es","nl"]
  voice?: { provider: string; voiceId?: string; languageMap?: Record<string, string> };
  telephony?: {
    provider: string; // twilio | vonage | plivo | sip
    inboundNumbers: string[];
    outboundCallerId?: string;
    ivrEnabled: boolean;
    recordingEnabled: boolean;
  };
  integrations?: {
    crm?: string; // hubspot | salesforce | custom
    helpdesk?: string; // zendesk | freshdesk | custom
    billing?: string; // stripe | chargebee | custom
    calendar?: string; // google | microsoft | custom
  };
  // Hierarchy and privacy controls
  parentId?: string; // When present, this agent inherits policies from parent (e.g., "master")
  privacy?: {
    allowWebsite?: boolean;
    maskEmails?: boolean;
    maskPhones?: boolean;
    shareOnlyAllowlist?: boolean;
    allowlistKeys?: string[]; // keys from assessment/overview allowed to share upstream
  };
};

export type MasterAgent = Agent;

export type TrainingType =
  | "document"
  | "faq"
  | "sop"
  | "script"
  | "callflow"
  | "policy"
  | "intent";

export type TrainingVersion = {
  id: string;
  createdAt: string;
  author?: string;
  notes?: string;
  content: string;
};

export type TrainingItem = {
  id: string;
  title: string;
  type: TrainingType;
  description?: string;
  tags?: string[];
  scope: "master" | "client";
  clientId?: string;
  versions: TrainingVersion[];
  publishedVersionId?: string;
  archived?: boolean;
};

type AgentContextType = {
  masterAgent: MasterAgent;
  clientAgents: Agent[];
  getClientAgent: (id: string) => Agent | undefined;
  updateMasterAgent: (updates: Partial<MasterAgent>) => void;
  updateClientAgent: (id: string, updates: Partial<Agent>) => void;
  addClientAgent: (agent: Omit<Agent, "id">) => Agent;
  // Training
  trainingItems: TrainingItem[];
  getTrainingForMaster: () => TrainingItem[];
  getTrainingForClient: (clientId: string) => TrainingItem[];
  addTraining: (payload: {
    scope: "master" | "client";
    clientId?: string;
    title: string;
    type: TrainingType;
    description?: string;
    content: string;
    tags?: string[];
    author?: string;
    notes?: string;
  }) => TrainingItem;
  updateTraining: (
    id: string,
    updates: Partial<TrainingItem> & { newContent?: string; notes?: string; author?: string }
  ) => void;
  publishTraining: (id: string, versionId?: string) => void;
  archiveTraining: (id: string, archived?: boolean) => void;
  duplicateTraining: (
    id: string,
    overrides?: Partial<Omit<TrainingItem, "id" | "versions" | "publishedVersionId">>
  ) => TrainingItem | undefined;
  // Privacy utilities
  getRedactedForAgent: (agentId: string, profile: any) => any;
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
  languages: ["en", "es", "nl"],
  voice: { provider: "elevenlabs", voiceId: "TX3LPaxmHKxFdv7VOQHJ" },
  telephony: {
    provider: "twilio",
    inboundNumbers: [],
    outboundCallerId: "",
    ivrEnabled: true,
    recordingEnabled: true,
  },
  integrations: {
    crm: "",
    helpdesk: "",
    billing: "",
    calendar: "",
  },
};

const initialClients: Agent[] = [
  {
    id: "solution-builder",
    name: "Solution Builder Agent",
    persona: "Scoped onboarding assistant that gathers business basics only.",
    systemPrompt:
      "You are the Solution Builder. Collect only high-level, non-sensitive information needed for solution scoping. When escalating to the Master Agent, share a minimal, redacted context only.",
    channels: { chat: false, voice: false },
    tools: {},
    knowledgeSources: [],
    languages: ["en"],
    parentId: "master",
    privacy: {
      allowWebsite: false,
      maskEmails: true,
      maskPhones: true,
      shareOnlyAllowlist: true,
      allowlistKeys: [
        "industry",
        "teamSize",
        "callVolume",
        "complexity",
        "coverage",
        "integrations",
        "compliance",
        "selectedServices",
        "companyOverview.summary",
        "companyOverview.keyPoints"
      ],
    },
  },
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
    languages: ["en"],
    telephony: {
      provider: "twilio",
      inboundNumbers: [],
      outboundCallerId: "",
      ivrEnabled: false,
      recordingEnabled: true,
    },
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
    languages: ["en"],
    telephony: {
      provider: "twilio",
      inboundNumbers: [],
      outboundCallerId: "",
      ivrEnabled: false,
      recordingEnabled: true,
    },
  },
];

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [masterAgent, setMasterAgent] = useState<MasterAgent>(initialMaster);
  const [clientAgents, setClientAgents] = useState<Agent[]>(initialClients);
  const [trainingItems, setTrainingItems] = useState<TrainingItem[]>([
    {
      id: "t-master-1",
      title: "Global Support SOP",
      type: "sop",
      description: "Tier-1 support workflow",
      scope: "master",
      versions: [
        { id: "v1", createdAt: new Date().toISOString(), content: "Step 1: Greet. Step 2: Verify. Step 3: Resolve or escalate." }
      ],
      publishedVersionId: "v1",
      archived: false
    },
    {
      id: "t-master-2",
      title: "Refund Policy FAQ",
      type: "faq",
      description: "Standard refund policy answers",
      scope: "master",
      versions: [
        { id: "v1", createdAt: new Date().toISOString(), content: "Q: How to request refund? A: Within 30 days via portal." }
      ],
      publishedVersionId: "v1",
      archived: false
    }
  ]);

// Load from localStorage on mount
  useEffect(() => {
    try {
      const m = localStorage.getItem("cc.masterAgent");
      const c = localStorage.getItem("cc.clientAgents");
      const t = localStorage.getItem("cc.training");
      if (m) setMasterAgent({ ...initialMaster, ...JSON.parse(m) });

      if (c) {
        try {
          const loaded = JSON.parse(c);
          // Migration: ensure "Solution Builder" seed exists even if older storage is present
          const hasSolutionBuilder = Array.isArray(loaded) && loaded.some((a: any) => a?.id === "solution-builder");
          const seedSB = initialClients.find((a) => a.id === "solution-builder");
          const merged = hasSolutionBuilder || !seedSB ? loaded : [seedSB, ...loaded];
          setClientAgents(merged);
        } catch {
          setClientAgents(initialClients);
        }
      }

      if (t) setTrainingItems(JSON.parse(t));
    } catch (e) {
      console.warn("Failed to load agents/training from storage", e);
    }
  }, []);

// Persist on change
  useEffect(() => {
    try {
      localStorage.setItem("cc.masterAgent", JSON.stringify(masterAgent));
      localStorage.setItem("cc.clientAgents", JSON.stringify(clientAgents));
      localStorage.setItem("cc.training", JSON.stringify(trainingItems));
    } catch (e) {
      console.warn("Failed to save agents/training to storage", e);
    }
  }, [masterAgent, clientAgents, trainingItems]);
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

  // Training selectors and CRUD
  const getTrainingForMaster = () => trainingItems.filter((t) => t.scope === "master" && !t.archived);

  const getTrainingForClient = (clientId: string) =>
    trainingItems.filter(
      (t) => (t.scope === "master" || (t.scope === "client" && t.clientId === clientId)) && !t.archived
    );

  const addTraining = (payload: {
    scope: "master" | "client";
    clientId?: string;
    title: string;
    type: TrainingType;
    description?: string;
    content: string;
    tags?: string[];
    author?: string;
    notes?: string;
  }): TrainingItem => {
    const id = `t-${Date.now()}`;
    const vId = `v-${Date.now()}`;
    const item: TrainingItem = {
      id,
      title: payload.title,
      type: payload.type,
      description: payload.description,
      tags: payload.tags,
      scope: payload.scope,
      clientId: payload.scope === "client" ? payload.clientId : undefined,
      versions: [
        {
          id: vId,
          createdAt: new Date().toISOString(),
          author: payload.author,
          notes: payload.notes,
          content: payload.content,
        },
      ],
      publishedVersionId: vId,
      archived: false,
    };
    setTrainingItems((prev) => [item, ...prev]);
    return item;
  };

  const updateTraining = (
    id: string,
    updates: Partial<TrainingItem> & { newContent?: string; notes?: string; author?: string }
  ) => {
    setTrainingItems((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const { newContent, notes, author, ...meta } = updates;
        let versions = t.versions;
        let publishedVersionId = t.publishedVersionId;
        if (newContent && newContent.trim()) {
          const vId = `v-${Date.now()}`;
          versions = [
            ...t.versions,
            { id: vId, createdAt: new Date().toISOString(), notes, author, content: newContent },
          ];
          // keep current published unless explicitly published later
          publishedVersionId = t.publishedVersionId;
        }
        return { ...t, ...meta, versions, publishedVersionId };
      })
    );
  };

  const publishTraining = (id: string, versionId?: string) => {
    setTrainingItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, publishedVersionId: versionId ?? t.versions[t.versions.length - 1]?.id } : t))
    );
  };

  const archiveTraining = (id: string, archived: boolean = true) => {
    setTrainingItems((prev) => prev.map((t) => (t.id === id ? { ...t, archived } : t)));
  };

  const duplicateTraining = (
    id: string,
    overrides?: Partial<Omit<TrainingItem, "id" | "versions" | "publishedVersionId">>
  ) => {
    const src = trainingItems.find((t) => t.id === id);
    if (!src) return undefined;
    const vId = `v-${Date.now()}`;
    const copy: TrainingItem = {
      id: `t-${Date.now() + 1}`,
      title: overrides?.title ?? `${src.title} (Copy)`,
      type: overrides?.type ?? src.type,
      description: overrides?.description ?? src.description,
      tags: overrides?.tags ?? src.tags,
      scope: overrides?.scope ?? src.scope,
      clientId: overrides?.clientId ?? src.clientId,
      versions: [
        {
          id: vId,
          createdAt: new Date().toISOString(),
          content: src.versions[src.versions.length - 1]?.content ?? "",
        },
      ],
      publishedVersionId: vId,
      archived: false,
    };
    setTrainingItems((prev) => [copy, ...prev]);
    return copy;
  };

  const value = useMemo(
    () => ({
      masterAgent,
      clientAgents,
      getClientAgent,
      updateMasterAgent,
      updateClientAgent,
      addClientAgent,
      // Training
      trainingItems,
      getTrainingForMaster,
      getTrainingForClient,
      addTraining,
      updateTraining,
      publishTraining,
      archiveTraining,
      duplicateTraining,
      // Privacy utilities
      getRedactedForAgent: (agentId: string, profile: any) => {
        const agent = agentId === "master" ? masterAgent : getClientAgent(agentId);
        const opts = agent?.privacy || {};
        return buildRedactedContext(profile, opts);
      },
    }),
    [masterAgent, clientAgents, trainingItems]
  );

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
};

export const useAgent = () => {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used within AgentProvider");
  return ctx;
};
