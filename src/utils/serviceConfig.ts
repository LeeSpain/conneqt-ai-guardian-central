import { SERVICE_CATALOG, ServiceKey } from '@/types/services';

export type ServiceOverride = { 
  name?: string; 
  description?: string; 
  monthlyPrice?: number;
  setupFee?: number;
};

export type CustomService = {
  id: string;
  name: string;
  description: string;
  category: string;
  monthlyPrice: number;
  setupFee: number;
  enabled: boolean;
};

export type AdminServiceConfig = {
  enabled: Partial<Record<ServiceKey, boolean>>;
  overrides: Partial<Record<ServiceKey, ServiceOverride>>;
  customServices: CustomService[];
};

const STORAGE_KEY = 'service_admin_config_v1';

function getDefaultEnabled(): Record<ServiceKey, boolean> {
  const map = {} as Record<ServiceKey, boolean>;
  for (const svc of SERVICE_CATALOG) {
    map[svc.key] = true;
  }
  return map;
}

export function getAdminServiceConfig(): AdminServiceConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { enabled: getDefaultEnabled(), overrides: {}, customServices: [] };
    const parsed: AdminServiceConfig = JSON.parse(raw);
    // Ensure all current services exist in config
    const enabled = { ...getDefaultEnabled(), ...(parsed.enabled || {}) } as Partial<Record<ServiceKey, boolean>>;
    const overrides = parsed.overrides || {};
    const customServices = parsed.customServices || [];
    return { enabled, overrides, customServices };
  } catch {
    return { enabled: getDefaultEnabled(), overrides: {}, customServices: [] };
  }
}

export function saveAdminServiceConfig(cfg: AdminServiceConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

export function isServiceEnabled(key: ServiceKey): boolean {
  const cfg = getAdminServiceConfig();
  const val = cfg.enabled?.[key];
  return typeof val === 'boolean' ? val : true;
}

export function getServiceLabel(key: ServiceKey): string {
  const cfg = getAdminServiceConfig();
  const override = cfg.overrides?.[key]?.name;
  if (override) return override;
  const svc = SERVICE_CATALOG.find(s => s.key === key);
  return svc?.name || String(key).replace(/_/g, ' ');
}

export function getServiceDescription(key: ServiceKey): string {
  const cfg = getAdminServiceConfig();
  const override = cfg.overrides?.[key]?.description;
  if (override) return override;
  const svc = SERVICE_CATALOG.find(s => s.key === key);
  return svc?.description || '';
}

export function getServicePrice(key: ServiceKey): number {
  const cfg = getAdminServiceConfig();
  const override = cfg.overrides?.[key]?.monthlyPrice;
  if (typeof override === 'number') return override;
  // Default pricing based on category
  const svc = SERVICE_CATALOG.find(s => s.key === key);
  if (!svc) return 150;
  
  const categoryPricing: Record<string, number> = {
    customer_support: 200,
    sales_marketing: 180,
    data_reporting: 160,
    hr_recruitment: 140,
    finance: 170,
    operations_project: 150,
    conversation_intelligence: 190,
    compliance_security: 220,
    industry: 130,
    custom_enhancements: 250,
  };
  
  return categoryPricing[svc.category] || 150;
}

export function getServiceSetupFee(key: ServiceKey): number {
  const cfg = getAdminServiceConfig();
  const override = cfg.overrides?.[key]?.setupFee;
  if (typeof override === 'number') return override;
  // Default setup fee is 2x monthly price
  return getServicePrice(key) * 2;
}
