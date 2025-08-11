import { SERVICE_CATALOG, ServiceKey } from '@/types/services';

export type ServiceOverride = { name?: string; description?: string };
export type AdminServiceConfig = {
  enabled: Partial<Record<ServiceKey, boolean>>;
  overrides: Partial<Record<ServiceKey, ServiceOverride>>;
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
    if (!raw) return { enabled: getDefaultEnabled(), overrides: {} };
    const parsed: AdminServiceConfig = JSON.parse(raw);
    // Ensure all current services exist in config
    const enabled = { ...getDefaultEnabled(), ...(parsed.enabled || {}) } as Partial<Record<ServiceKey, boolean>>;
    const overrides = parsed.overrides || {};
    return { enabled, overrides };
  } catch {
    return { enabled: getDefaultEnabled(), overrides: {} };
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
