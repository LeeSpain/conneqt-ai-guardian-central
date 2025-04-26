
import { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { ContactInformation } from './quote/ContactInformation';
import { ServiceRequirements } from './quote/ServiceRequirements';
import { PriceBreakdown } from './quote/PriceBreakdown';
import { calculateQuotePrice } from '@/utils/pricing';
import type { QuoteFormData, QuotePrice } from '@/types/quote';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate that required fields are filled
    if (!formData.name || !formData.company || !formData.email || 
        !formData.serviceType || !formData.hoursPerDay || 
        !formData.daysPerWeek || !formData.language) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Calculate the quote price only when submitting
      const quotePrice = calculateQuotePrice(
        formData.hoursPerDay,
        formData.daysPerWeek
      );
      
      // Here we'd typically make an API call to send the email
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Quote request submitted successfully!');
      
      // Navigate to the confirmation page with the form data and quote
      navigate('/quote-confirmation', {
        state: {
          formData,
          quotePrice
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit quote request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Request a Quote</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <ContactInformation formData={formData} onChange={handleChange} />
        <ServiceRequirements formData={formData} onChange={handleChange} />
      </div>
      
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
