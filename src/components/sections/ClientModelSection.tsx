import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientModelSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Choose Your Business Model</h2>
          <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
            Start your AI call center business with our flexible partnership models designed for growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="bg-conneqt-navy text-white p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">White-Label Partner</h3>
              <p className="mt-2 text-blue-100">Launch your own AI call center brand</p>
            </div>
            
            <div className="p-6">
              <p className="mb-6">
                Perfect for agencies and entrepreneurs who want to offer AI call center services under their own brand. 
                Complete platform with your branding and pricing.
              </p>
              
              <ul className="space-y-3 mb-8">
                {['Full platform rebranding', 'Custom domain and SSL', 
                  'Your pricing and billing', 'Multi-industry templates', 
                  'Partner support and training', 'Revenue sharing model'].map((item) => (
                  <li key={item} className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/partner-program" 
                className="block text-center bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Join Partner Program
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="bg-gradient-to-r from-conneqt-blue to-blue-500 text-white p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">SaaS Licensing</h3>
              <p className="mt-2 text-blue-50">Direct access for your business</p>
            </div>
            
            <div className="p-6">
              <p className="mb-6">
                Ideal for established businesses that want to offer AI call center services directly 
                to their existing customer base using our platform.
              </p>
              
              <ul className="space-y-3 mb-8">
                {['Full platform access', 'API and webhook integration', 'Custom AI training tools', 
                  'Advanced analytics and reporting', 'Priority support and training', 
                  'Enterprise security and compliance'].map((item) => (
                  <li key={item} className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/solution-builder" 
                className="block text-center bg-gradient-to-r from-conneqt-blue to-blue-500 text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-lg"
              >
                Build Your Solution
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientModelSection;
