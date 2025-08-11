import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SERVICE_CATALOG, ServiceKey } from '@/types/services';
import { getAdminServiceConfig, saveAdminServiceConfig, AdminServiceConfig } from '@/utils/serviceConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const setMeta = () => {
  document.title = 'Admin: Services | Conneqt Central';
  const desc = 'Enable/disable services and edit display text for the platform service menu.';
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
  meta.setAttribute('content', desc);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
  canonical.setAttribute('href', window.location.origin + '/admin/services');
};

function groupByCategory() {
  const groups: Record<string, typeof SERVICE_CATALOG> = {} as any;
  for (const s of SERVICE_CATALOG) {
    const cat = s.category || 'Other';
    if (!groups[cat]) groups[cat] = [] as any;
    groups[cat].push(s);
  }
  return groups;
}

const AdminServices = () => {
  useEffect(() => { setMeta(); }, []);
  const initial = useMemo(() => getAdminServiceConfig(), []);
  const [config, setConfig] = useState<AdminServiceConfig>(initial);

  const groups = useMemo(() => groupByCategory(), []);

  const updateEnabled = (key: ServiceKey, val: boolean) => {
    setConfig((c) => ({ ...c, enabled: { ...c.enabled, [key]: val } }));
  };
  const updateOverride = (key: ServiceKey, field: 'name' | 'description', val: string) => {
    setConfig((c) => ({ ...c, overrides: { ...c.overrides, [key]: { ...(c.overrides?.[key] || {}), [field]: val } } }));
  };

  const onSave = () => {
    saveAdminServiceConfig(config);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-conneqt-navy">Services configuration</h1>
          <p className="text-conneqt-slate/80 mt-2">Enable services and customize their labels and descriptions.</p>
        </header>

        {Object.entries(groups).map(([cat, list]) => (
          <Card key={cat} className="mb-6">
            <CardHeader>
              <CardTitle className="capitalize">{cat}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {list.map((svc, idx) => (
                <div key={svc.key} className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium">{svc.name}</div>
                      <div className="text-sm text-muted-foreground">{svc.description}</div>
                    </div>
                    <Switch checked={Boolean(config.enabled[svc.key] ?? true)} onCheckedChange={(v) => updateEnabled(svc.key, Boolean(v))} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Display name</label>
                      <Input value={config.overrides[svc.key]?.name || ''} onChange={(e) => updateOverride(svc.key, 'name', e.target.value)} placeholder={svc.name} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Description</label>
                      <Input value={config.overrides[svc.key]?.description || ''} onChange={(e) => updateOverride(svc.key, 'description', e.target.value)} placeholder={svc.description} />
                    </div>
                  </div>
                  {idx < list.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button onClick={onSave}>Save changes</Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminServices;
