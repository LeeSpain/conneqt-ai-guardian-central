import { ClientProfile } from "@/contexts/ClientProfileContext";
import { SERVICE_CATALOG, ServiceKey } from "@/types/services";

export type QuoteLine = {
  label: string;
  amount: number;
  note?: string;
};

export type BuilderQuotePricing = {
  currency: "EUR";
  tier: string;
  lines: QuoteLine[];
  subtotal: number;
  discount: number;
  adjustedSubtotal: number;
  setupFee: number;
  vat: number;
  total: number;
  assumptions: string[];
};

const to2 = (n: number) => Math.round(n * 100) / 100;

export function calculateBuilderQuote(profile: ClientProfile): BuilderQuotePricing {
  const answers = profile.assessmentAnswers || {};
  const tier = profile.assessmentResult?.suggestedTier || "starter";
  const services = profile.selectedServices || [];

  // Base platform by tier (monthly)
  const basePlatformByTier: Record<string, number> = {
    starter: 499,
    professional: 1299,
    enterprise: 2999,
  };
  const basePlatform = basePlatformByTier[tier] ?? 499;

  // Module fees (monthly) — simple, can be tuned later
  const moduleFees: Record<ServiceKey, number> = {
    ai_agent_calling: 600,
    live_chat: 300,
    analytics: 250,
    customer_support: 900,
    sales_marketing: 800,
    data_reporting: 500,
    hr_recruitment: 700,
    finance: 650,
    operations_project: 750,
    conversation_intelligence: 550,
    compliance_security: 600,
    industry_healthcare: 400,
    industry_ecommerce: 350,
    industry_saas: 350,
    industry_hospitality: 300,
    custom_enhancements: 0,
  };

  const coverage = answers.coverage as string | undefined; // business-hours | extended | 24/7
  const compliance = answers.compliance as string | undefined; // none | basic | strict
  const callVolume = answers.callVolume as string | undefined; // low | medium | high

  // Uplifts
  let coverageUplift = 0;
  if (coverage === "extended") coverageUplift = 0.2; // +20%
  if (coverage === "24/7") coverageUplift = 0.4; // +40%

  let complianceUplift = 0;
  if (compliance === "basic") complianceUplift = 0.1; // +10%
  if (compliance === "strict") complianceUplift = 0.25; // +25%

  let volumeUplift = 0;
  if (callVolume === "medium") volumeUplift = 0.15; // +15%
  if (callVolume === "high") volumeUplift = 0.35; // +35%

  const upliftFactor = 1 + coverageUplift + complianceUplift + volumeUplift;

  // Build line items
  const lines: QuoteLine[] = [];
  lines.push({ label: `Platform (${tier[0].toUpperCase() + tier.slice(1)})`, amount: basePlatform });

  let modulesSubtotal = 0;
  for (const svc of services as ServiceKey[]) {
    const fee = moduleFees[svc] ?? 0;
    modulesSubtotal += fee;
    const label = SERVICE_CATALOG.find((d) => d.key === svc)?.name || String(svc).replace(/_/g, ' ');
    lines.push({ label: `${label} module`, amount: fee });
  }

  const preUpliftSubtotal = basePlatform + modulesSubtotal;
  const adjustedSubtotal = to2(preUpliftSubtotal * upliftFactor);

  // Discount for bundles (3+ services)
  let discount = 0;
  if (services.length >= 3) {
    discount = to2(adjustedSubtotal * 0.1); // 10%
  } else if (services.length === 2) {
    discount = to2(adjustedSubtotal * 0.05); // 5%
  }

  // One-time setup fee (varies by tier)
  const setupFeeByTier: Record<string, number> = {
    starter: 500,
    professional: 1200,
    enterprise: 2500,
  };
  const setupFee = setupFeeByTier[tier] ?? 500;

  const subtotalAfterDiscount = to2(adjustedSubtotal - discount);
  const vat = to2((subtotalAfterDiscount + setupFee) * 0.21);
  const total = to2(subtotalAfterDiscount + setupFee + vat);

  const assumptions: string[] = [];
  if (coverage) assumptions.push(`Coverage: ${coverage}`);
  if (callVolume) assumptions.push(`Typical volume: ${callVolume}`);
  if (compliance) assumptions.push(`Compliance: ${compliance}`);
  if (services.length) assumptions.push(`Modules: ${services.join(", ")}`);

  return {
    currency: "EUR",
    tier,
    lines,
    subtotal: to2(preUpliftSubtotal),
    discount,
    adjustedSubtotal,
    setupFee,
    vat,
    total,
    assumptions,
  };
}
