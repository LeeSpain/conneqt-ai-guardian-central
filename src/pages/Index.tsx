import { ArrowRight, MessageCircle, Bell, Phone, Database, Brain, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
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

  return (
    <>
      <Navbar />
      <Hero />
      
      {/* Services Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-conneqt-blue to-blue-600 bg-clip-text text-transparent">
              Our Core Services
            </h2>
            <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
              Comprehensive multilingual customer service solutions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      
      {/* Client Models Comparison */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Choose Your Model</h2>
            <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
              We offer two flexible service models to meet your specific business requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Managed Service */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <div className="bg-conneqt-navy text-white p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">Managed Service</h3>
                <p className="mt-2 text-blue-100">Let us handle everything for you</p>
              </div>
              
              <div className="p-6">
                <p className="mb-6">
                  Perfect for businesses that want zero staffing and to outsource support fully. 
                  We handle everything while you stay in the loop.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {['Dedicated multilingual team', 'Transparent view-only dashboard', 
                    'AI summaries and insights', 'Weekly/monthly reports', 
                    'Service adjustments via account manager', 'Zero staffing required from you'].map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                        <Check size={14} className="text-green-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/quote" 
                  className="block text-center bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Request Managed Service Quote
                </Link>
              </div>
            </div>
            
            {/* Subscription */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <div className="bg-gradient-to-r from-conneqt-blue to-blue-500 text-white p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">Subscription Access</h3>
                <p className="mt-2 text-blue-50">Use our platform with your team</p>
              </div>
              
              <div className="p-6">
                <p className="mb-6">
                  Ideal for businesses that want to manage their support internally using our 
                  powerful platform and tools.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {['Full dashboard access', 'Create tickets and workflows', 'Interactive AI Guardian Assistant', 
                    'Export reports and view analytics', 'Optional CRM and API access', 
                    'Custom workflows in higher tiers'].map((item) => (
                    <li key={item} className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                        <Check size={14} className="text-green-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/subscriptions" 
                  className="block text-center bg-gradient-to-r from-conneqt-blue to-blue-500 text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-lg"
                >
                  View Subscription Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Guardian */}
      <section className="section-padding bg-gradient-to-br from-conneqt-navy to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-white">AI Guardian Assistant</h2>
              <p className="text-lg text-blue-100 mb-6">
                Our AI Guardian Assistant is powered by OpenAI (ChatGPT) via secure API to deliver 
                intelligent automation, multilingual summaries, and real-time client support.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Responds to questions in English, Spanish, and Dutch",
                  "Monitors platform activity and detects patterns",
                  "Generates performance summaries and reports",
                  "Suggests proactive actions to reduce escalations",
                  "GDPR-compliant with secure API integration"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-400 bg-opacity-20 rounded-full p-1 mr-3 mt-1">
                      <Check size={16} className="text-blue-300" />
                    </div>
                    <span className="text-blue-100">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/quote" 
                className="inline-flex items-center bg-white text-conneqt-navy hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Learn More <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            
            <div className="relative hidden md:block">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                <div className="bg-white/10 p-5 rounded-lg mb-6 backdrop-blur-sm">
                  <p className="text-blue-100 font-medium">AI Guardian Response:</p>
                  <p className="text-white mt-2">
                    Today there are 12 open tickets with an average response time of 8 minutes. 
                    3 escalations occurred, all resolved within SLA parameters.
                  </p>
                </div>
                
                <div className="bg-white/10 p-5 rounded-lg mb-6 backdrop-blur-sm">
                  <p className="text-blue-100 font-medium">Query:</p>
                  <p className="text-white">What's the escalation average today?</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
                  </div>
                  <p className="text-sm text-blue-200">AI Guardian is thinking...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6">Ready to Enhance Your Customer Service?</h2>
          <p className="text-lg text-conneqt-slate mb-8 max-w-2xl mx-auto">
            Whether you need a fully managed service or access to our powerful platform, 
            we're here to help your business deliver exceptional customer experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/quote" 
              className="bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Request a Quote
            </Link>
            <Link 
              to="/about" 
              className="bg-white hover:bg-gray-50 text-conneqt-navy border border-conneqt-navy px-6 py-3 rounded-md font-medium transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
