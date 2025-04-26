
import { MessageCircle, Bell, Phone, Database, Brain } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    title: "Multilingual Customer Support",
    description: "Phone, email, and live chat support handled by human staff in English, Spanish, and Dutch.",
    icon: <MessageCircle size={24} />,
    color: "bg-blue-500",
    delay: 100
  },
  {
    title: "Device Monitoring & Notifications",
    description: "Alerts for glucose, medication, and smart devices with photo verification and escalation workflows.",
    icon: <Bell size={24} />,
    color: "bg-purple-500",
    delay: 200
  },
  {
    title: "Emergency & Welfare Calling",
    description: "Scheduled well-being check-in calls, comfort call workflows, and emergency response.",
    icon: <Phone size={24} />,
    color: "bg-pink-500",
    delay: 300
  },
  {
    title: "CRM & Data Management",
    description: "Updating records, tracking interactions, and secure, GDPR-compliant data handling.",
    icon: <Database size={24} />,
    color: "bg-green-500",
    delay: 400
  },
  {
    title: "AI Guardian Assistant",
    description: "Real-time insights, smart summaries, and automated alerts in English, Spanish, and Dutch.",
    icon: <Brain size={24} />,
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
              Our Core Services
            </span>
          </h2>
          <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
            Comprehensive multilingual customer service solutions tailored to your business needs.
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

