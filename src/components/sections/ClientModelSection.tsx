import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientModelSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Choose Your Model</h2>
          <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
            We offer two flexible service models to meet your specific business requirements.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
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
                to="/managed-services" 
                className="block text-center bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Request Managed Service Quote
              </Link>
            </div>
          </div>
          
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
                to="/client-management" 
                className="block text-center bg-gradient-to-r from-conneqt-blue to-blue-500 text-white px-6 py-3 rounded-md font-medium transition-all hover:shadow-lg"
              >
                Try Client Management Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientModelSection;
