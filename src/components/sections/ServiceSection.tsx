
import { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Megaphone,
  BarChart3,
  Users,
  Wallet,
  ListChecks,
  AudioLines,
  ShieldCheck,
  Stethoscope,
  ShoppingCart,
  CloudCog,
  Hotel,
  Wand2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { SERVICE_CATALOG } from '@/types/services';
import { isServiceEnabled, getServiceLabel, getServiceDescription } from '@/utils/serviceConfig';

const iconByCategory: Record<string, ReactNode> = {
  customer_support: <MessageCircle size={24} />,
  sales_marketing: <Megaphone size={24} />,
  data_reporting: <BarChart3 size={24} />,
  hr_recruitment: <Users size={24} />,
  finance: <Wallet size={24} />,
  operations_project: <ListChecks size={24} />,
  conversation_intelligence: <AudioLines size={24} />,
  compliance_security: <ShieldCheck size={24} />,
  industry: <CloudCog size={24} />,
  custom_enhancements: <Wand2 size={24} />,
};

const iconByKey: Record<string, ReactNode> = {
  ai_agent_calling: <PhoneCall size={24} />,
  live_chat: <MessageSquare size={24} />,
  analytics: <BarChart3 size={24} />,
  industry_healthcare: <Stethoscope size={24} />,
  industry_ecommerce: <ShoppingCart size={24} />,
  industry_saas: <CloudCog size={24} />,
  industry_hospitality: <Hotel size={24} />,
};

const colorByCategory: Record<string, string> = {
  customer_support: 'bg-blue-500',
  sales_marketing: 'bg-purple-500',
  data_reporting: 'bg-green-500',
  hr_recruitment: 'bg-pink-500',
  finance: 'bg-amber-500',
  operations_project: 'bg-indigo-500',
  conversation_intelligence: 'bg-teal-500',
  compliance_security: 'bg-red-500',
  industry: 'bg-gray-500',
  custom_enhancements: 'bg-cyan-500',
};

const ServiceSection = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(SERVICE_CATALOG.map((s) => s.category));
    return ['all', ...Array.from(set)];
  }, []);

  const enabledServices = useMemo(() => SERVICE_CATALOG.filter((s) => isServiceEnabled(s.key)), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enabledServices.filter((s) => {
      const inCategory = selectedCategory === 'all' || s.category === selectedCategory;
      if (!inCategory) return false;
      if (!q) return true;
      const name = getServiceLabel(s.key).toLowerCase();
      const desc = getServiceDescription(s.key).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [enabledServices, selectedCategory, query]);

  const visible = showAll ? filtered : filtered.slice(0, 9);

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-conneqt-blue via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Complete AI Business Agent — Services
            </span>
          </h2>
          <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
            Your all-in-one AI agent. Choose exactly what your business needs — start with the builder.
          </p>
        </header>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === selectedCategory ? 'default' : 'secondary'}
                onClick={() => { setSelectedCategory(cat); setShowAll(false); }}
                className="whitespace-nowrap"
              >
                {cat === 'all' ? 'All' : cat.replace(/_/g, ' ')}
              </Button>
            ))}
          </div>
          <div className="w-full md:w-80">
            <Input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowAll(false); }}
              placeholder="Search services..."
              aria-label="Search services"
            />
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {visible.length} of {filtered.length} services
        </div>

        <div className="grid md:grid-cols-3 gap-10 place-items-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30 -z-10 blur-3xl" />
          {visible.map((service) => {
            const icon = iconByKey[service.key] || iconByCategory[service.category] || <MessageCircle size={24} />;
            const color = colorByCategory[service.category] || 'bg-blue-500';
            return (
              <Link
                key={service.key}
                to={`/solution-builder?preselect=${encodeURIComponent(service.key)}`}
                aria-label={`Select ${getServiceLabel(service.key)} in builder`}
                className="w-full"
              >
                <ServiceCard
                  title={getServiceLabel(service.key)}
                  description={getServiceDescription(service.key)}
                  icon={icon}
                  color={color}
                />
              </Link>
            );
          })}
        </div>

        {filtered.length > 9 && (
          <div className="text-center mt-8">
            <Button onClick={() => setShowAll((s) => !s)} variant="outline">
              {showAll ? 'Show less' : `Show all ${filtered.length} services`}
            </Button>
          </div>
        )}

        <div className="text-center mt-10">
          <a href="/solution-builder" className="inline-block px-6 py-3 rounded-md bg-conneqt-blue text-white hover:bg-blue-500 transition-colors">
            Start with the Builder
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
