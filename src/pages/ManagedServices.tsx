
import { Check, ShieldCheck, Clock, Settings, MessageSquare, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';

const ManagedServices = () => {
  useScrollToTop();

  const benefits = [
    {
      title: "24/7 Multilingual Support",
      description: "Round-the-clock customer service in English, Spanish, and Dutch with AI-powered assistance.",
      icon: <Clock className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Dedicated Account Management",
      description: "Personal account manager for seamless communication and service optimization.",
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Enterprise-Grade Security",
      description: "GDPR-compliant data handling with end-to-end encryption and secure protocols.",
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />
    },
    {
      title: "Full System Integration",
      description: "Seamless integration with your existing CRM, help desk, and business tools.",
      icon: <Settings className="w-6 h-6 text-indigo-500" />
    },
    {
      title: "Advanced Analytics & Reporting",
      description: "Comprehensive insights and performance metrics with custom reporting.",
      icon: <Database className="w-6 h-6 text-pink-500" />
    }
  ];

  const features = [
    "AI-powered response automation",
    "Custom workflow creation",
    "Real-time performance monitoring",
    "Quality assurance processes",
    "Dedicated support team",
    "Continuous service optimization",
    "Escalation management",
    "Training and onboarding support",
    "API integration support",
    "Custom reporting and analytics"
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-conneqt-blue via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Managed Service Solutions
                </span>
              </h1>
              <p className="text-xl text-conneqt-slate mb-8">
                Let our experts handle your customer service operations with AI-powered efficiency and human expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    {benefit.icon}
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  </div>
                  <p className="text-conneqt-slate">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What's Included</h2>
              <p className="text-conneqt-slate">Comprehensive service features designed for your success</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <Check className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Customer Service?</h2>
            <p className="text-lg text-conneqt-slate mb-8">
              Get a customized quote tailored to your business needs and see how our managed service can help you scale.
            </p>
            <Link to="/quote">
              <Button size="lg" className="bg-conneqt-blue hover:bg-blue-600 text-white">
                Request a Quote
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ManagedServices;
