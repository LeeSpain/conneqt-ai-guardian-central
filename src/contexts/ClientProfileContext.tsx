import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ServiceKey } from "@/types/services";

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
};

const DEFAULT_PROFILE: ClientProfile = {
  selectedServices: [],
  paid: false,
  createdAt: new Date().toISOString(),
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

  const markPaid = () => setProfile((p) => ({ ...p, paid: true }));

  const resetProfile = () => setProfile(DEFAULT_PROFILE);

  const isModuleEnabled = (service: ServiceKey) => profile.selectedServices.includes(service);

  const value = useMemo(
    () => ({ profile, setSelectedServices, markPaid, resetProfile, isModuleEnabled, setAssessment }),
    [profile]
  );

  return <ClientProfileContext.Provider value={value}>{children}</ClientProfileContext.Provider>;
};

export const useClientProfile = () => {
  const ctx = useContext(ClientProfileContext);
  if (!ctx) throw new Error("useClientProfile must be used within ClientProfileProvider");
  return ctx;
};
