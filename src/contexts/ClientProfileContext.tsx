import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ServiceKey } from "@/types/services";
import type { BusinessDetails, Ticket } from "@/types/client";
export type CompanyOverview = {
  website?: string;
  summary: string;
  keyPoints?: string[];
  sources?: { type: "website" | "reviews"; url: string }[];
};

export type ClientProfile = {
  selectedServices: ServiceKey[];
  paid: boolean;
  createdAt: string;
  // Extended fields to persist assessment context
  assessmentAnswers?: Record<string, string>;
  assessmentResult?: {
    overallScore: number;
    suggestedTier: string;
    recommendations: string[];
    riskFactors: string[];
    strengths: string[];
    suggestedServices: ServiceKey[];
  };
  companyOverview?: CompanyOverview;
  businessDetails?: BusinessDetails;
  tickets: Ticket[];
};

const DEFAULT_PROFILE: ClientProfile = {
  selectedServices: [],
  paid: false,
  createdAt: new Date().toISOString(),
  tickets: [],
};

const STORAGE_KEY = "client_profile";

type ClientProfileContextType = {
  profile: ClientProfile;
  setSelectedServices: (services: ServiceKey[]) => void;
  markPaid: () => void;
  resetProfile: () => void;
  isModuleEnabled: (service: ServiceKey) => boolean;
  setAssessment: (
    answers: Record<string, string>,
    result: NonNullable<ClientProfile["assessmentResult"]>
  ) => void;
  setCompanyOverview: (overview: CompanyOverview) => void;
  updateBusinessDetails: (details: BusinessDetails) => void;
  addTicket: (input: { subject: string; priority: Ticket["priority"] }) => Ticket;
};

const ClientProfileContext = createContext<ClientProfileContextType | undefined>(undefined);

export const ClientProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ClientProfile>(DEFAULT_PROFILE);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ClientProfile;
        setProfile({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch (e) {
      console.warn("Failed to parse client profile from storage", e);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn("Failed to persist client profile", e);
    }
  }, [profile]);

  const setSelectedServices = (services: ServiceKey[]) => {
    setProfile((p) => ({ ...p, selectedServices: services }));
  };

const setAssessment: ClientProfileContextType["setAssessment"] = (answers, result) => {
  setProfile((p) => ({ ...p, assessmentAnswers: answers, assessmentResult: result }));
};

const setCompanyOverview: ClientProfileContextType["setCompanyOverview"] = (overview) => {
  setProfile((p) => ({ ...p, companyOverview: overview }));
};

  const markPaid = () => setProfile((p) => ({ ...p, paid: true }));

  const resetProfile = () => setProfile(DEFAULT_PROFILE);

  const isModuleEnabled = (service: ServiceKey) => profile.selectedServices.includes(service);

  const updateBusinessDetails: ClientProfileContextType["updateBusinessDetails"] = (details) => {
    setProfile((p) => ({ ...p, businessDetails: details }));
  };

  const addTicket: ClientProfileContextType["addTicket"] = (input) => {
    const newTicket: Ticket = {
      id: Date.now(),
      clientId: 1,
      subject: input.subject,
      status: "Open",
      priority: input.priority,
      created: new Date().toISOString(),
    };
    setProfile((p) => ({ ...p, tickets: [newTicket, ...(p.tickets ?? [])] }));
    return newTicket;
  };

  const value = useMemo(
    () => ({
      profile,
      setSelectedServices,
      markPaid,
      resetProfile,
      isModuleEnabled,
      setAssessment,
      setCompanyOverview,
      updateBusinessDetails,
      addTicket,
    }),
    [profile]
  );
  return <ClientProfileContext.Provider value={value}>{children}</ClientProfileContext.Provider>;
};

export const useClientProfile = () => {
  const ctx = useContext(ClientProfileContext);
  if (!ctx) throw new Error("useClientProfile must be used within ClientProfileProvider");
  return ctx;
};
