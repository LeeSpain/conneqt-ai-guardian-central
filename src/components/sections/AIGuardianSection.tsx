
import { Shield, Bot, Brain, MessageCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIGuardianSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-conneqt-navy to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6 text-white">AI Agent Platform</h2>
            <p className="text-lg text-blue-100 mb-8">
              Transform your customer service with our autonomous AI Agent platform. 
              Seamlessly handle customer interactions across multiple channels while 
              maintaining complete control and oversight.
            </p>
            
            <ul className="space-y-6 mb-8">
              {[
                {
                  icon: Bot,
                  title: "Autonomous Operation",
                  description: "95% autonomous resolution rate with smart human escalation"
                },
                {
                  icon: Brain,
                  title: "Intelligent Integration",
                  description: "Connects with your CRM, ERP, and business systems"
                },
                {
                  icon: MessageCircle,
                  title: "Multilingual Support",
                  description: "Natural conversations in English, Spanish, and Dutch"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "GDPR-compliant with end-to-end encryption"
                },
                {
                  icon: TrendingUp,
                  title: "Performance Analytics",
                  description: "Real-time insights and operational metrics"
                }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="bg-blue-400 bg-opacity-20 rounded-lg p-2">
                    <item.icon size={20} className="text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-blue-100 text-sm">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/ai-guardian" 
              className="inline-flex items-center bg-white text-conneqt-navy hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Experience AI Agent Demo
            </Link>
          </div>
          
          <div className="relative hidden md:block">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8 backdrop-blur-sm border border-white/10">
              <div className="bg-white/10 p-5 rounded-lg mb-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Bot className="text-blue-300" size={20} />
                  <p className="text-blue-100 font-medium">AI Agent Analysis</p>
                </div>
                <p className="text-white">
                  "Based on the transaction history and account status, I recommend 
                  offering the premium service upgrade with a 20% loyalty discount."
                </p>
              </div>
              
              <div className="bg-white/10 p-5 rounded-lg mb-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="text-green-300" size={20} />
                  <p className="text-blue-100 font-medium">Confidence Score: 98%</p>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-green-400 h-full rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Brain className="text-blue-300 animate-pulse" size={20} />
                  <p className="text-sm text-blue-200">Processing customer data...</p>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full animate-pulse" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGuardianSection;
