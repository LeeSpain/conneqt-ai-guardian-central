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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const setMeta = () => {
  document.title = 'Admin: Platform Products | Conneqt Central';
  const desc = 'Manage platform products: enable/disable and edit labels/descriptions for Builder & Homepage.';
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
  meta.setAttribute('content', desc);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
  canonical.setAttribute('href', window.location.origin + '/admin/services');
};

function groupByCategory(list = SERVICE_CATALOG) {
  const groups: Record<string, typeof SERVICE_CATALOG> = {} as any;
  for (const s of list) {
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
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICE_CATALOG;
    return SERVICE_CATALOG.filter((s) =>
      s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [query]);

  const groups = useMemo(() => groupByCategory(filteredServices), [filteredServices]);

  const updateEnabled = (key: ServiceKey, val: boolean) => {
    setConfig((c) => ({ ...c, enabled: { ...c.enabled, [key]: val } }));
  };
  const updateOverride = (key: ServiceKey, field: 'name' | 'description', val: string) => {
    setConfig((c) => ({ ...c, overrides: { ...c.overrides, [key]: { ...(c.overrides?.[key] || {}), [field]: val } } }));
  };

const onSave = () => {
  saveAdminServiceConfig(config);
  toast({ title: 'Changes saved', description: 'Service settings were updated.' });
};

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-conneqt-navy">Platform Products</h1>
            <p className="text-conneqt-slate/80 mt-2">Toggle visibility and customize labels/descriptions. Changes apply to the Builder and homepage.</p>
            <div className="text-xs text-muted-foreground mt-1">
              Enabled {SERVICE_CATALOG.filter(s => (config.enabled[s.key] !== false)).length} of {SERVICE_CATALOG.length}
            </div>
          </div>
          <div className="w-full md:w-80">
            <Input placeholder="Search services..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </header>

        {Object.entries(groups).map(([cat, list]) => (
          <Card key={cat} className="mb-6">
            <CardHeader>
              <CardTitle className="capitalize">{cat.replace(/_/g, ' ')}</CardTitle>
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
                      <Textarea rows={3} value={config.overrides[svc.key]?.description || ''} onChange={(e) => updateOverride(svc.key, 'description', e.target.value)} placeholder={svc.description} />
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
