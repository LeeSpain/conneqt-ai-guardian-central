
import { MessageCircle, Settings, Users, Database, Brain } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    title: "AI Agent Platform",
    description: "Deploy intelligent AI agents that handle customer inquiries autonomously across all channels.",
    icon: <Brain size={24} />,
    color: "bg-blue-500",
    delay: 100
  },
  {
    title: "White-Label Solutions",
    description: "Complete rebrandable platform with your logo, colors, and custom domain for seamless integration.",
    icon: <Settings size={24} />,
    color: "bg-purple-500",
    delay: 200
  },
  {
    title: "Multi-Industry Templates",
    description: "Pre-built solutions for healthcare, e-commerce, SaaS, finance, and more with industry-specific workflows.",
    icon: <Users size={24} />,
    color: "bg-pink-500",
    delay: 300
  },
  {
    title: "Enterprise Integration",
    description: "Seamless connections to CRM, helpdesk, e-commerce platforms, and existing business systems.",
    icon: <Database size={24} />,
    color: "bg-green-500",
    delay: 400
  },
  {
    title: "Multilingual Support",
    description: "Native support for English, Spanish, and Dutch with natural conversation flows and cultural context.",
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
              Complete AI Call Center Platform
            </span>
          </h2>
          <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
            Everything you need to launch and scale your own AI-powered customer service business.
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

