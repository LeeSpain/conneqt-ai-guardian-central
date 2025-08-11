
import { ReactNode, useMemo } from 'react';
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
  const services = useMemo(() => SERVICE_CATALOG.filter(s => isServiceEnabled(s.key)), []);
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-conneqt-blue via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Complete AI Business Agent — Services
            </span>
          </h2>
          <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
            Your all-in-one AI agent. Choose exactly what your business needs — start with the builder.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 place-items-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30 -z-10 blur-3xl" />
          {services.map((service) => {
            const icon = iconByKey[service.key] || iconByCategory[service.category] || <MessageCircle size={24} />;
            const color = colorByCategory[service.category] || 'bg-blue-500';
            return (
              <ServiceCard
                key={service.key}
                title={getServiceLabel(service.key)}
                description={getServiceDescription(service.key)}
                icon={icon}
                color={color}
              />
            );
          })}
        </div>
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
  {
    title: "AI + Human Hybrid",
    description: "Smart AI agents with seamless escalation to trained human agents when complex issues require personal touch.",
    icon: <Users size={24} />,
    color: "bg-purple-500",
    delay: 200
  },
  {
    title: "Full-Service Outsourcing",
    description: "Complete customer service outsourcing with dedicated teams, account management, and custom workflows.",
    icon: <Settings size={24} />,
    color: "bg-pink-500",
    delay: 300
  },
  {
    title: "Enterprise Integration",
    description: "Seamless connections to CRM, helpdesk, e-commerce platforms, and existing business systems across all service levels.",
    icon: <Database size={24} />,
    color: "bg-green-500",
    delay: 400
  },
  {
    title: "White-Label Platform",
    description: "Complete rebrandable solution with your logo, colors, and custom domain - available across all service tiers.",
    icon: <MessageCircle size={24} />,
    color: "bg-indigo-500",
    delay: 500
  }
];

const ServiceSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-conneqt-blue via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Complete Customer Service Solutions
            </span>
          </h2>
          <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
            From AI-only automation to full-service outsourcing - choose the perfect solution for your business needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10 place-items-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-30 -z-10 blur-3xl" />
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;

