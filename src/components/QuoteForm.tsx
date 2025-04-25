import { useState } from 'react';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

interface QuotePrice {
  basePrice: number;
  discount: number;
  finalPrice: number;
  vat: number;
  total: number;
}

const QuoteForm = () => {
  const [formData, setFormData] = useState({
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

  const calculatePrice = () => {
    if (!formData.hoursPerDay || !formData.daysPerWeek) return null;

    const baseHourlyRate = 28; // €28/hour
    const hoursPerDay = Number(formData.hoursPerDay);
    const daysPerWeek = Number(formData.daysPerWeek);
    const totalHours = hoursPerDay * daysPerWeek * 4; // Monthly hours
    
    let discount = 0;
    if (hoursPerDay >= 12) discount = 0.05; // 5% discount
    if (hoursPerDay === 24 && daysPerWeek === 7) discount = 0.10; // 10% discount
    
    const basePrice = totalHours * baseHourlyRate;
    const discountAmount = basePrice * discount;
    const finalPrice = basePrice - discountAmount;
    const vat = finalPrice * 0.21; // 21% VAT
    const total = finalPrice + vat;

    return {
      basePrice,
      discount: discountAmount,
      finalPrice,
      vat,
      total
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Recalculate price when hours or days change
    if (name === 'hoursPerDay' || name === 'daysPerWeek') {
      const newPrice = calculatePrice();
      setQuotePrice(newPrice);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form and email submission
    setTimeout(() => {
      console.log('Form submitted:', { ...formData, pricing: quotePrice });
      toast.success('Quote request submitted successfully!', {
        description: "We'll send you the detailed quote via email shortly."
      });
      setSubmitting(false);
      // Reset form
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
        {/* Contact Information */}
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-conneqt-slate mb-1">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-conneqt-slate mb-1">
              Company Name*
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-conneqt-slate mb-1">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-conneqt-slate mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            />
          </div>
        </div>
        
        {/* Service Requirements */}
        <div className="space-y-5">
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-conneqt-slate mb-1">
              Service Type*
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            >
              <option value="">Select a service</option>
              <option value="customer-support">Multilingual Customer Support</option>
              <option value="device-monitoring">Device Monitoring & Notifications</option>
              <option value="emergency-calling">Emergency & Welfare Calling</option>
              <option value="crm-data">CRM & Data Management</option>
              <option value="ai-guardian">AI Guardian Assistant</option>
              <option value="subscription">Platform Subscription Only</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="hoursPerDay" className="block text-sm font-medium text-conneqt-slate mb-1">
              Hours Per Day*
            </label>
            <select
              id="hoursPerDay"
              name="hoursPerDay"
              value={formData.hoursPerDay}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            >
              <option value="">Select hours</option>
              <option value="8">8 hours</option>
              <option value="12">12 hours</option>
              <option value="24">24 hours (24/7)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="daysPerWeek" className="block text-sm font-medium text-conneqt-slate mb-1">
              Days Per Week*
            </label>
            <select
              id="daysPerWeek"
              name="daysPerWeek"
              value={formData.daysPerWeek}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            >
              <option value="">Select days</option>
              <option value="5">5 days (Mon-Fri)</option>
              <option value="6">6 days</option>
              <option value="7">7 days</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-conneqt-slate mb-1">
              Primary Language*
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
            >
              <option value="">Select language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="nl">Dutch</option>
              <option value="multiple">Multiple Languages</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Price Calculation */}
      {quotePrice && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-4">Estimated Monthly Price</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>€{quotePrice.basePrice.toFixed(2)}</span>
            </div>
            {quotePrice.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Volume Discount:</span>
                <span>-€{quotePrice.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>VAT (21%):</span>
              <span>€{quotePrice.vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total Monthly Price:</span>
              <span>€{quotePrice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Message Field */}
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
