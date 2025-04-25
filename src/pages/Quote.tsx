
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';

const Quote = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-6">Request a <span className="text-conneqt-blue">Quote</span></h1>
            <p className="text-xl text-conneqt-slate mb-4">
              Tell us about your customer service needs, and we'll create a custom quote for you.
            </p>
            <p className="text-conneqt-slate mb-8">
              Whether you're looking for a fully managed service or access to our platform, 
              we'll tailor a solution that fits your business perfectly.
            </p>
          </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Quote Information</h3>
                
                {/* Service Types */}
                <div className="mb-6">
                  <h4 className="font-medium text-conneqt-navy mb-2">Service Categories</h4>
                  <ul className="text-sm space-y-2 text-conneqt-slate">
                    <li>Multilingual Customer Support</li>
                    <li>Device Monitoring & Notifications</li>
                    <li>Emergency & Welfare Calling</li>
                    <li>CRM & Data Management</li>
                    <li>AI Guardian Assistant</li>
                  </ul>
                </div>
                
                {/* Languages */}
                <div className="mb-6">
                  <h4 className="font-medium text-conneqt-navy mb-2">Available Languages</h4>
                  <ul className="text-sm space-y-2 text-conneqt-slate">
                    <li>English</li>
                    <li>Spanish</li>
                    <li>Dutch</li>
                  </ul>
                </div>
                
                {/* Contact Info */}
                <div>
                  <h4 className="font-medium text-conneqt-navy mb-2">Questions?</h4>
                  <p className="text-sm text-conneqt-slate mb-2">
                    Email us at: <br />
                    <a href="mailto:info@conneqtcentral.com" className="text-conneqt-blue">
                      info@conneqtcentral.com
                    </a>
                  </p>
                  <p className="text-sm text-conneqt-slate">
                    Call us at: <br />
                    <a href="tel:+34123456789" className="text-conneqt-blue">
                      +34 123 456 789
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="md:col-span-2">
              <QuoteForm />
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/" className="inline-flex items-center text-conneqt-slate hover:text-conneqt-blue">
              <ArrowLeft size={16} className="mr-2" /> Return to Home
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Quote;
