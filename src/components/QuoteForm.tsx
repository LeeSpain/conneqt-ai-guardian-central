
import { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { ContactInformation } from './quote/ContactInformation';
import { ServiceRequirements } from './quote/ServiceRequirements';
import { PriceBreakdown } from './quote/PriceBreakdown';
import { calculateQuotePrice } from '@/utils/pricing';
import type { QuoteFormData, QuotePrice } from '@/types/quote';

const QuoteForm = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: '',
    hoursPerDay: '',
    daysPerWeek: '',
    language: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [quotePrice, setQuotePrice] = useState<QuotePrice | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'hoursPerDay' || name === 'daysPerWeek') {
      const newPrice = calculateQuotePrice(
        name === 'hoursPerDay' ? value : formData.hoursPerDay,
        name === 'daysPerWeek' ? value : formData.daysPerWeek
      );
      setQuotePrice(newPrice);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', { ...formData, pricing: quotePrice });
      toast.success('Quote request submitted successfully!', {
        description: "We'll send you the detailed quote via email shortly."
      });
      setSubmitting(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        serviceType: '',
        hoursPerDay: '',
        daysPerWeek: '',
        language: '',
        message: ''
      });
      setQuotePrice(null);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <ContactInformation formData={formData} onChange={handleChange} />
        <ServiceRequirements formData={formData} onChange={handleChange} />
      </div>
      
      {quotePrice && <PriceBreakdown quotePrice={quotePrice} />}
      
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-conneqt-slate mb-1">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
        ></textarea>
      </div>
      
      <div className="mt-8">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-conneqt-blue hover:bg-blue-500 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          {submitting ? (
            <>Processing...</>
          ) : (
            <>
              Submit Quote Request <Check size={18} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default QuoteForm;
