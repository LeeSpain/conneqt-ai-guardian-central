
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PriceBreakdown } from '@/components/quote/PriceBreakdown';
import type { QuoteFormData, QuotePrice } from '@/types/quote';
import useScrollToTop from '@/hooks/useScrollToTop';

interface LocationState {
  formData: QuoteFormData;
  quotePrice: QuotePrice;
}

const QuoteConfirmation = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.formData || !state?.quotePrice) {
      navigate('/quote');
    }
  }, [state, navigate]);

  if (!state?.formData || !state?.quotePrice) {
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
              We've sent a copy of this quote to {state.formData.email}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Quote Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-conneqt-slate">
                  <p><span className="font-medium">Name:</span> {state.formData.name}</p>
                  <p><span className="font-medium">Company:</span> {state.formData.company}</p>
                  <p><span className="font-medium">Email:</span> {state.formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {state.formData.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Service Requirements</h3>
                <div className="space-y-2 text-conneqt-slate">
                  <p><span className="font-medium">Service Type:</span> {state.formData.serviceType}</p>
                  <p><span className="font-medium">Hours Per Day:</span> {state.formData.hoursPerDay}</p>
                  <p><span className="font-medium">Days Per Week:</span> {state.formData.daysPerWeek}</p>
                  <p><span className="font-medium">Language:</span> {state.formData.language}</p>
                </div>
              </div>
            </div>

            <PriceBreakdown quotePrice={state.quotePrice} />

            {state.formData.message && (
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Additional Notes</h3>
                <p className="text-conneqt-slate">{state.formData.message}</p>
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
