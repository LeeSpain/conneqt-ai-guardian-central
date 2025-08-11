import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SERVICE_CATALOG, ServiceKey } from '@/types/services';
import { getAdminServiceConfig, saveAdminServiceConfig, AdminServiceConfig, CustomService } from '@/utils/serviceConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
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
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newService, setNewService] = useState<Partial<CustomService>>({
    name: '',
    description: '',
    category: 'custom_enhancements',
    monthlyPrice: 150,
    setupFee: 300,
    enabled: true,
  });
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
  const updateOverride = (key: ServiceKey, field: 'name' | 'description' | 'monthlyPrice' | 'setupFee', val: string | number) => {
    setConfig((c) => ({ 
      ...c, 
      overrides: { 
        ...c.overrides, 
        [key]: { 
          ...(c.overrides?.[key] || {}), 
          [field]: val 
        } 
      } 
    }));
  };

  const addCustomService = () => {
    if (!newService.name || !newService.description) {
      toast({ title: 'Error', description: 'Name and description are required.', variant: 'destructive' });
      return;
    }
    
    const service: CustomService = {
      id: `custom_${Date.now()}`,
      name: newService.name!,
      description: newService.description!,
      category: newService.category!,
      monthlyPrice: newService.monthlyPrice || 150,
      setupFee: newService.setupFee || 300,
      enabled: true,
    };

    setConfig((c) => ({ ...c, customServices: [...c.customServices, service] }));
    setNewService({ name: '', description: '', category: 'custom_enhancements', monthlyPrice: 150, setupFee: 300, enabled: true });
    setShowAddDialog(false);
    toast({ title: 'Custom service added', description: 'Your new service is now available in the platform.' });
  };

  const deleteCustomService = (id: string) => {
    setConfig((c) => ({ ...c, customServices: c.customServices.filter(s => s.id !== id) }));
    toast({ title: 'Service deleted', description: 'Custom service has been removed.' });
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
            <p className="text-conneqt-slate/80 mt-2">Toggle visibility and customize labels/descriptions/pricing. Changes apply to the Builder and homepage.</p>
            <div className="text-xs text-muted-foreground mt-1">
              Enabled {SERVICE_CATALOG.filter(s => (config.enabled[s.key] !== false)).length} of {SERVICE_CATALOG.length} + {config.customServices.filter(s => s.enabled).length} custom services
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Custom Service</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Service Name</label>
                    <Input value={newService.name || ''} onChange={(e) => setNewService(s => ({ ...s, name: e.target.value }))} placeholder="My Custom Service" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Description</label>
                    <Textarea rows={3} value={newService.description || ''} onChange={(e) => setNewService(s => ({ ...s, description: e.target.value }))} placeholder="What this service does..." />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Category</label>
                    <Select value={newService.category} onValueChange={(v) => setNewService(s => ({ ...s, category: v }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer_support">Customer Support</SelectItem>
                        <SelectItem value="sales_marketing">Sales & Marketing</SelectItem>
                        <SelectItem value="data_reporting">Data & Reporting</SelectItem>
                        <SelectItem value="hr_recruitment">HR & Recruitment</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations_project">Operations</SelectItem>
                        <SelectItem value="conversation_intelligence">Conversation Intelligence</SelectItem>
                        <SelectItem value="compliance_security">Compliance & Security</SelectItem>
                        <SelectItem value="industry">Industry Specific</SelectItem>
                        <SelectItem value="custom_enhancements">Custom Enhancements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Monthly Price (€)</label>
                      <Input type="number" value={newService.monthlyPrice || 150} onChange={(e) => setNewService(s => ({ ...s, monthlyPrice: Number(e.target.value) }))} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Setup Fee (€)</label>
                      <Input type="number" value={newService.setupFee || 300} onChange={(e) => setNewService(s => ({ ...s, setupFee: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                    <Button onClick={addCustomService}>Add Service</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="w-full md:w-80">
              <Input placeholder="Search services..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Display name</label>
                      <Input value={config.overrides[svc.key]?.name || ''} onChange={(e) => updateOverride(svc.key, 'name', e.target.value)} placeholder={svc.name} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Description</label>
                      <Textarea rows={3} value={config.overrides[svc.key]?.description || ''} onChange={(e) => updateOverride(svc.key, 'description', e.target.value)} placeholder={svc.description} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Monthly Price (€)</label>
                      <Input type="number" value={config.overrides[svc.key]?.monthlyPrice || ''} onChange={(e) => updateOverride(svc.key, 'monthlyPrice', Number(e.target.value))} placeholder={`Default: €${(() => {
                        const categoryPricing: Record<string, number> = {
                          customer_support: 200, sales_marketing: 180, data_reporting: 160,
                          hr_recruitment: 140, finance: 170, operations_project: 150,
                          conversation_intelligence: 190, compliance_security: 220,
                          industry: 130, custom_enhancements: 250,
                        };
                        return categoryPricing[svc.category] || 150;
                      })()}`} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Setup Fee (€)</label>
                      <Input type="number" value={config.overrides[svc.key]?.setupFee || ''} onChange={(e) => updateOverride(svc.key, 'setupFee', Number(e.target.value))} placeholder={`Default: €${(() => {
                        const categoryPricing: Record<string, number> = {
                          customer_support: 400, sales_marketing: 360, data_reporting: 320,
                          hr_recruitment: 280, finance: 340, operations_project: 300,
                          conversation_intelligence: 380, compliance_security: 440,
                          industry: 260, custom_enhancements: 500,
                        };
                        return categoryPricing[svc.category] || 300;
                      })()}`} />
                    </div>
                  </div>
                  {idx < list.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Custom Services */}
        {config.customServices.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Custom Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.customServices.map((svc, idx) => (
                <div key={svc.id} className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium">{svc.name}</div>
                      <div className="text-sm text-muted-foreground">{svc.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={svc.enabled} onCheckedChange={(v) => {
                        setConfig(c => ({
                          ...c,
                          customServices: c.customServices.map(s => s.id === svc.id ? { ...s, enabled: v } : s)
                        }));
                      }} />
                      <Button variant="ghost" size="sm" onClick={() => deleteCustomService(svc.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Service name</label>
                      <Input value={svc.name} onChange={(e) => {
                        setConfig(c => ({
                          ...c,
                          customServices: c.customServices.map(s => s.id === svc.id ? { ...s, name: e.target.value } : s)
                        }));
                      }} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Description</label>
                      <Textarea rows={3} value={svc.description} onChange={(e) => {
                        setConfig(c => ({
                          ...c,
                          customServices: c.customServices.map(s => s.id === svc.id ? { ...s, description: e.target.value } : s)
                        }));
                      }} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Monthly Price (€)</label>
                      <Input type="number" value={svc.monthlyPrice} onChange={(e) => {
                        setConfig(c => ({
                          ...c,
                          customServices: c.customServices.map(s => s.id === svc.id ? { ...s, monthlyPrice: Number(e.target.value) } : s)
                        }));
                      }} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Setup Fee (€)</label>
                      <Input type="number" value={svc.setupFee} onChange={(e) => {
                        setConfig(c => ({
                          ...c,
                          customServices: c.customServices.map(s => s.id === svc.id ? { ...s, setupFee: Number(e.target.value) } : s)
                        }));
                      }} />
                    </div>
                  </div>
                  {idx < config.customServices.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button onClick={onSave}>Save changes</Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminServices;
