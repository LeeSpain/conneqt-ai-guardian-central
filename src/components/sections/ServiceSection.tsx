
import { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  MessageSquare,
  Building2,
  TrendingUp,
  Shield
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

// Business-focused service groupings
const businessGroups = {
  core: {
    title: 'Core Business Operations',
    icon: <Building2 size={20} />,
    categories: ['customer_support', 'sales_marketing', 'finance', 'hr_recruitment']
  },
  intelligence: {
    title: 'Intelligence & Analytics',
    icon: <TrendingUp size={20} />,
    categories: ['data_reporting', 'conversation_intelligence', 'compliance_security']
  },
  industry: {
    title: 'Industry Solutions',
    icon: <Shield size={20} />,
    categories: ['industry']
  },
  advanced: {
    title: 'Custom & Advanced',
    icon: <Wand2 size={20} />,
    categories: ['operations_project', 'custom_enhancements']
  }
};

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState('core');
  const [showAll, setShowAll] = useState(false);

  const enabledServices = useMemo(() => SERVICE_CATALOG.filter((s) => isServiceEnabled(s.key)), []);

  const getServicesForGroup = (groupKey: string) => {
    const group = businessGroups[groupKey as keyof typeof businessGroups];
    return enabledServices.filter(service => group.categories.includes(service.category));
  };

  const currentServices = getServicesForGroup(activeTab);
  const visible = showAll ? currentServices : currentServices.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
              Complete AI Business Solutions
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Transform your business operations with our comprehensive AI agent platform. 
            Choose from our curated solutions designed for modern enterprises.
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-gradient-to-r from-background to-muted/30 p-1 h-auto rounded-2xl shadow-lg border">
            {Object.entries(businessGroups).map(([key, group]) => (
              <TabsTrigger 
                key={key} 
                value={key} 
                className="flex flex-col items-center gap-3 py-6 px-4 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 hover:bg-muted/50 group"
              >
                <div className="p-2 rounded-lg bg-muted/50 group-data-[state=active]:bg-white/20 transition-colors">
                  {group.icon}
                </div>
                <span className="text-sm font-semibold text-center leading-tight">{group.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(businessGroups).map(([key, group]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-3 flex items-center justify-center gap-3">
                  {group.icon}
                  {group.title}
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5 opacity-50 -z-10 blur-3xl rounded-3xl" />
                {visible.map((service, index) => {
                  const icon = iconByKey[service.key] || iconByCategory[service.category] || <MessageCircle size={24} />;
                  const color = colorByCategory[service.category] || 'bg-primary';
                  return (
                    <Link
                      key={service.key}
                      to={`/solution-builder?preselect=${encodeURIComponent(service.key)}`}
                      aria-label={`Select ${getServiceLabel(service.key)} in solution builder`}
                      className="w-full animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ServiceCard
                        title={getServiceLabel(service.key)}
                        description={getServiceDescription(service.key)}
                        icon={icon}
                        color={color}
                        delay={index * 100}
                      />
                    </Link>
                  );
                })}
              </div>

              {currentServices.length > 6 && (
                <div className="text-center mt-10">
                  <button 
                    onClick={() => setShowAll(prev => !prev)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
                  >
                    {showAll ? 'Show Less' : `View All ${currentServices.length} Solutions`}
                  </button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-16 pt-12 border-t border-border">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Ready to Build Your Solution?</h3>
            <p className="text-muted-foreground">Start with our intelligent builder to create your custom AI business agent</p>
          </div>
          <Link 
            to="/solution-builder" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Wand2 size={20} />
            Launch Solution Builder
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
