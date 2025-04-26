
import { Check, ShieldCheck, Clock, Settings, MessageSquare, Database, Globe, Wrench, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ServiceCard from '@/components/ServiceCard';

const ManagedServices = () => {
  useScrollToTop();

  const benefits = [
    {
      title: "24/7 Multilingual Support",
      description: "Round-the-clock customer service in English, Spanish, and Dutch with AI-powered assistance and real-time translation capabilities.",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-500"
    },
    {
      title: "Global Account Management",
      description: "Dedicated international account managers ensuring seamless communication and continuous service optimization across time zones.",
      icon: <Globe className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-500"
    },
    {
      title: "Enterprise Security",
      description: "ISO 27001 certified security protocols with end-to-end encryption, GDPR compliance, and regular security audits.",
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      color: "bg-green-500"
    },
    {
      title: "Advanced Integration",
      description: "Seamless integration with your existing CRM, help desk, and business tools through our enterprise-grade API infrastructure.",
      icon: <Settings className="w-6 h-6 text-indigo-500" />,
      color: "bg-indigo-500"
    },
    {
      title: "Business Intelligence",
      description: "Real-time analytics dashboard with AI-powered insights, custom reporting, and predictive customer behavior analysis.",
      icon: <Database className="w-6 h-6 text-pink-500" />,
      color: "bg-pink-500"
    },
    {
      title: "Technical Excellence",
      description: "Access to our elite technical team for custom implementations, automation workflows, and system optimizations.",
      icon: <Wrench className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-500"
    }
  ];

  const features = [
    {
      title: "AI-Powered Solutions",
      items: [
        "Natural Language Processing",
        "Automated Response Generation",
        "Sentiment Analysis",
        "Pattern Recognition"
      ]
    },
    {
      title: "Operational Excellence",
      items: [
        "Custom Workflow Creation",
        "Quality Assurance Processes",
        "Performance Monitoring",
        "Resource Optimization"
      ]
    },
    {
      title: "Team Management",
      items: [
        "Dedicated Support Teams",
        "Continuous Training",
        "Skill Development",
        "Performance Analytics"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Enterprise-Grade Managed Services
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Transform your customer service operations with our comprehensive managed solution, 
                combining AI innovation with human expertise for unparalleled service quality.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/quote">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Request Custom Quote
                  </Button>
                </Link>
                <a href="#benefits">
                  <Button variant="outline" size="lg">
                    Explore Benefits
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section id="benefits" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Service Benefits</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our managed services combine cutting-edge technology with expert human oversight 
                to deliver exceptional customer experiences.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <ServiceCard
                  key={benefit.title}
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                  color={benefit.color}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Enterprise Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Leverage our comprehensive suite of features designed for scalable enterprise operations.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <ul className="space-y-3">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <Check className="text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Customer Service?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join leading enterprises who trust our managed services to deliver 
              exceptional customer experiences at scale.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ManagedServices;
