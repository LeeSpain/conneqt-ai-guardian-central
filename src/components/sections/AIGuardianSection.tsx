
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIGuardianSection = () => {
  return (
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
  );
};

export default AIGuardianSection;
