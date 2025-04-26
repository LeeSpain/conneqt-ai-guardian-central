
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PriceBreakdown } from '@/components/quote/PriceBreakdown';
import { ServiceRequirements } from '@/components/quote/ServiceRequirements';
import type { QuoteFormData, QuotePrice } from '@/types/quote';
import useScrollToTop from '@/hooks/useScrollToTop';
import { calculateQuotePrice } from '@/utils/pricing';

interface LocationState {
  formData: QuoteFormData;
  quotePrice: QuotePrice;
}

const QuoteConfirmation = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<QuoteFormData>(() => 
    (location.state as LocationState)?.formData || null
  );
  const [quotePrice, setQuotePrice] = useState<QuotePrice>(() => 
    (location.state as LocationState)?.quotePrice || null
  );

  useEffect(() => {
    if (!formData || !quotePrice) {
      navigate('/quote');
    }
  }, [formData, quotePrice, navigate]);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
    
    // Recalculate quote price when service requirements change
    if (name === 'hoursPerDay' || name === 'daysPerWeek') {
      const newQuotePrice = calculateQuotePrice(
        updatedFormData.hoursPerDay,
        updatedFormData.daysPerWeek
      );
      setQuotePrice(newQuotePrice);
    }
  };

  if (!formData || !quotePrice) {
    return null;
  }

  return (
    <>
      <Navbar />
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="mb-4">Thank You for Your Quote Request</h1>
            <p className="text-lg text-conneqt-slate">
              We've sent a copy of this quote to {formData.email}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Quote Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-conneqt-slate">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Company:</span> {formData.company}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Service Requirements</h3>
                <ServiceRequirements formData={formData} onChange={handleServiceChange} />
              </div>
            </div>

            <PriceBreakdown quotePrice={quotePrice} />

            {formData.message && (
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Additional Notes</h3>
                <p className="text-conneqt-slate">{formData.message}</p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button onClick={() => navigate('/')} className="bg-conneqt-blue hover:bg-blue-500">
                Return to Homepage
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default QuoteConfirmation;

